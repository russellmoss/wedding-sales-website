import React from 'react';
import ContentTemplate from '../weddings/ContentTemplate';
import { Link } from 'react-router-dom';
import { FaChartLine, FaEnvelope, FaUserCheck, FaMapMarkedAlt, FaFileAlt, FaPhoneAlt, FaHandshake, FaClipboardCheck, FaDatabase } from 'react-icons/fa';
import Highlights from '../shared/Highlights';

function SalesProcess() {
  const fallbackContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-gilda text-darkBrown mb-4">About Sales at Milea</h2>
        <p className="text-gray-700 mb-4">
          Welcome to the Sales Process at Milea Estate Vineyard. Our structured approach guides potential clients through a seamless journey from initial inquiry to booking and beyond. Each step is designed to provide personalized attention and comprehensive information about our venue and services.
        </p>
      </div>
      
      <Highlights title="Sales Process Overview">
        <ul className="list-disc list-inside space-y-2">
          <li>Structured approach from inquiry to booking and beyond</li>
          <li>Personalized attention at each stage</li>
          <li>Comprehensive information about venue and services</li>
          <li>Clear communication and follow-up</li>
          <li>Dedicated support throughout the process</li>
        </ul>
      </Highlights>
      
      <div>
        <h2 className="text-2xl font-gilda text-darkBrown mb-4">Our Sales Process</h2>
        <p className="text-gray-700 mb-4">
          At Milea Estate Vineyard, we follow a comprehensive sales process designed to guide potential clients through each stage of their journey with us. From the initial inquiry to post-booking support, our team is dedicated to providing exceptional service and ensuring a seamless experience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overview Card */}
        <div className="bg-amber-50 p-6 rounded-lg shadow-sm border border-amber-200">
          <div className="flex items-center mb-4">
            <FaChartLine className="text-amber-600 text-2xl mr-3" />
            <h3 className="text-xl font-gilda text-darkBrown">Overview</h3>
          </div>
          <p className="text-gray-700">
            The sales process at Milea Estate Vineyard is designed to guide potential clients through a seamless journey from initial inquiry to booking and beyond. Our structured approach ensures that each client receives personalized attention and comprehensive information about our venue and services.
          </p>
        </div>

        {/* Inquiry Card */}
        <div className="bg-amber-50 p-6 rounded-lg shadow-sm border border-amber-200">
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-amber-600 text-2xl mr-3" />
            <h3 className="text-xl font-gilda text-darkBrown">Inquiry</h3>
          </div>
          <p className="text-gray-700">
            The first step in our sales process begins with responding to client inquiries. We aim to provide prompt, informative responses that address their initial questions and set the stage for a productive relationship. Our goal is to gather essential information while making a positive first impression.
          </p>
        </div>

        {/* Qualification Card */}
        <div className="bg-amber-50 p-6 rounded-lg shadow-sm border border-amber-200">
          <div className="flex items-center mb-4">
            <FaUserCheck className="text-amber-600 text-2xl mr-3" />
            <h3 className="text-xl font-gilda text-darkBrown">Qualification</h3>
          </div>
          <p className="text-gray-700">
            During the qualification phase, we assess the client's needs, budget, and timeline to determine if Milea Estate Vineyard is the right fit for their event. This step helps us focus our efforts on clients who are most likely to benefit from our services and align with our venue's capabilities.
          </p>
        </div>

        {/* Venue Tour Card */}
        <div className="bg-amber-50 p-6 rounded-lg shadow-sm border border-amber-200">
          <div className="flex items-center mb-4">
            <FaMapMarkedAlt className="text-amber-600 text-2xl mr-3" />
            <h3 className="text-xl font-gilda text-darkBrown">Venue Tour</h3>
          </div>
          <p className="text-gray-700">
            A venue tour is a crucial step in helping clients visualize their event at Milea Estate Vineyard. During the tour, we showcase our spaces, discuss layout options, and address specific requirements. This hands-on experience allows clients to see the potential of our venue for their special occasion.
          </p>
        </div>

        {/* Proposal Card */}
        <div className="bg-amber-50 p-6 rounded-lg shadow-sm border border-amber-200">
          <div className="flex items-center mb-4">
            <FaFileAlt className="text-amber-600 text-2xl mr-3" />
            <h3 className="text-xl font-gilda text-darkBrown">Proposal</h3>
          </div>
          <p className="text-gray-700">
            The proposal stage involves presenting a detailed, customized package that outlines the services, pricing, and terms for the client's event. We ensure that each proposal is tailored to the client's specific needs and preferences, providing clear information to facilitate decision-making.
          </p>
        </div>

        {/* Follow-up Card */}
        <div className="bg-amber-50 p-6 rounded-lg shadow-sm border border-amber-200">
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="text-amber-600 text-2xl mr-3" />
            <h3 className="text-xl font-gilda text-darkBrown">Follow-up</h3>
          </div>
          <p className="text-gray-700">
            After presenting the proposal, we engage in proactive follow-up to address any questions or concerns the client may have. This stage is essential for maintaining momentum and ensuring that the client feels supported throughout their decision-making process.
          </p>
        </div>

        {/* Closing Card */}
        <div className="bg-amber-50 p-6 rounded-lg shadow-sm border border-amber-200">
          <div className="flex items-center mb-4">
            <FaHandshake className="text-amber-600 text-2xl mr-3" />
            <h3 className="text-xl font-gilda text-darkBrown">Closing</h3>
          </div>
          <p className="text-gray-700">
            The closing phase involves finalizing the booking and securing the client's commitment to Milea Estate Vineyard. We guide clients through the contract signing process, ensuring that all terms are clear and agreed upon. This step marks the successful conclusion of the sales process.
          </p>
        </div>

        {/* Post-Booking Card */}
        <div className="bg-amber-50 p-6 rounded-lg shadow-sm border border-amber-200">
          <div className="flex items-center mb-4">
            <FaClipboardCheck className="text-amber-600 text-2xl mr-3" />
            <h3 className="text-xl font-gilda text-darkBrown">Post-Booking</h3>
          </div>
          <p className="text-gray-700">
            After the booking is confirmed, we transition to the post-booking phase, where we focus on preparing for the client's event. This includes coordinating with vendors, finalizing details, and ensuring that all arrangements are in place for a successful event. Our goal is to provide ongoing support and ensure a seamless experience.
          </p>
        </div>

        {/* CRM Tips Card */}
        <div className="bg-amber-50 p-6 rounded-lg shadow-sm border border-amber-200">
          <div className="flex items-center mb-4">
            <FaDatabase className="text-amber-600 text-2xl mr-3" />
            <h3 className="text-xl font-gilda text-darkBrown">CRM Tips</h3>
          </div>
          <p className="text-gray-700">
            Effective Customer Relationship Management (CRM) is essential for maintaining strong client relationships and ensuring long-term success. We utilize CRM tools to track client interactions, manage follow-ups, and streamline the sales process. This helps us provide personalized service and maintain high client satisfaction.
          </p>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-gilda text-darkBrown mb-4">Best Practices</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Always respond to inquiries within 24 hours</li>
          <li>Personalize all communications with the client's name</li>
          <li>Follow up consistently but don't overwhelm</li>
          <li>Document all client interactions in the CRM</li>
          <li>Be transparent about pricing and policies</li>
          <li>Set clear expectations at each stage</li>
        </ul>
      </div>
      
      <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Contact Information</h3>
        <p>
          For more information about our sales process, please contact us at{' '}
          <a href="mailto:events@mileaestatevineyard.com" className="text-amber-600 hover:text-amber-800">
            events@mileaestatevineyard.com
          </a>{' '}
          or by calling{' '}
          <a href="tel:8453922422" className="text-amber-600 hover:text-amber-800">
            (845) 392-2422
          </a>
          .
        </p>
      </div>
      
      <div className="mt-8 text-center">
        <Link
          to="/quizzes/sales/process"
          className="button button-primary"
        >
          Take the Sales Process Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="About Sales at Milea" fallbackContent={fallbackContent} contentId="sales-process" />;
}

export default SalesProcess; 