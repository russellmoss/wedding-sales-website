import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  async function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function getUserData(user) {
    if (!user) return null;
    
    try {
      console.log("Getting user data for:", user.email);
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log("User data retrieved:", userData);
        return userData;
      } else {
        // Create user document if it doesn't exist
        const userData = {
          email: user.email,
          role: 'user',
          createdAt: new Date(),
        };
        try {
          await setDoc(userRef, userData);
          console.log("Created new user document with role:", userData.role);
          return userData;
        } catch (error) {
          console.error("Error creating user document:", error);
          // Return default user data even if document creation fails
          return { role: 'user' };
        }
      }
    } catch (error) {
      console.error("Error getting user data:", error);
      // Return default user data in case of error
      return { role: 'user' };
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserData(user);
        setCurrentUser(user);
        setUserRole(userData?.role || 'user');
        console.log("User authenticated:", user.email, "with role:", userData?.role || 'user');
      } else {
        setCurrentUser(null);
        setUserRole(null);
        console.log("User signed out");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    login,
    signup,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 