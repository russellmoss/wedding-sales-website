/**
 * This file contains the rubric data for each scenario in the sales simulator.
 * Each rubric includes scoring criteria, descriptions, and weights.
 */

// Base criteria that's common across scenarios
const baseCriteria = [
  {
    name: "Preparation",
    description: "Reviewed inquiry details before the call",
    weight: 10
  },
  {
    name: "Rapport Building",
    description: "Established a comfortable conversation flow",
    weight: 20
  },
  {
    name: "Professional Tone",
    description: "Maintained professional yet warm tone throughout",
    weight: 15
  },
  {
    name: "Question Quality",
    description: "Asked open-ended questions to gather information",
    weight: 20
  },
  {
    name: "Active Listening",
    description: "Demonstrated active listening and acknowledged responses",
    weight: 15
  },
  {
    name: "Budget Discussion",
    description: "Addressed budget concerns professionally",
    weight: 20
  },
  {
    name: "Value Proposition",
    description: "Highlighted venue features that match their needs",
    weight: 10
  }
];

// Initial Inquiry Response Rubric
export const initialInquiryRubric = {
  title: "Initial Inquiry Response",
  description: "Evaluate how effectively the sales representative responds to an initial wedding inquiry by building rapport, gathering information, and moving the prospect toward scheduling a venue tour.",
  scoringScale: [
    { value: 1, label: "Poor", description: "Does not meet expectations; significant improvement needed" },
    { value: 2, label: "Fair", description: "Partially meets expectations; considerable improvement needed" },
    { value: 3, label: "Satisfactory", description: "Meets basic expectations; some improvement needed" },
    { value: 4, label: "Good", description: "Exceeds expectations in some areas; minor improvements needed" },
    { value: 5, label: "Excellent", description: "Consistently exceeds expectations; exemplary performance" }
  ],
  criteria: [
    {
      name: "Response Time",
      description: "Acknowledged the importance of responding quickly to inquiries",
      weight: 10,
      levels: {
        poor: "Fails to acknowledge importance of prompt response",
        satisfactory: "Mentions responding within 24 hours",
        excellent: "Emphasizes responding within 3-4 hours as a competitive advantage"
      }
    },
    {
      name: "Personalization",
      description: "Used the couple's names and personalized the response",
      weight: 15,
      levels: {
        poor: "Generic response with no personalization",
        satisfactory: "Uses couple's names but minimal personalization",
        excellent: "Uses couple's names and references specific details from their inquiry"
      }
    },
    {
      name: "Warmth & Enthusiasm",
      description: "Demonstrated genuine enthusiasm and warmth",
      weight: 15,
      levels: {
        poor: "Cold, transactional tone",
        satisfactory: "Pleasant but generic enthusiasm",
        excellent: "Genuine excitement and warmth that builds connection"
      }
    },
    {
      name: "Professional Tone",
      description: "Maintained professional yet friendly tone throughout",
      weight: 15,
      levels: {
        poor: "Overly casual or formal; inconsistent",
        satisfactory: "Maintains professional tone with occasional lapses",
        excellent: "Perfect balance of professional yet friendly tone throughout"
      }
    },
    {
      name: "Information Gathering",
      description: "Asked appropriate qualification questions about vision, guest count, and date preferences",
      weight: 20,
      levels: {
        poor: "Fails to ask qualification questions",
        satisfactory: "Asks basic questions about date and guest count",
        excellent: "Asks thoughtful questions about vision, preferences, timeline, and budget"
      }
    },
    {
      name: "Clear Next Steps",
      description: "Provided a clear next step (typically scheduling a tour)",
      weight: 15,
      levels: {
        poor: "No clear call to action",
        satisfactory: "Suggests scheduling a tour but lacks specifics",
        excellent: "Provides specific available dates/times for a tour with clear instructions"
      }
    },
    {
      name: "Follow-Up Plan",
      description: "Mentioned a specific follow-up plan if they don't respond",
      weight: 10,
      levels: {
        poor: "No mention of follow-up",
        satisfactory: "Vague mention of following up",
        excellent: "Detailed follow-up plan with specific timing and method"
      }
    }
  ]
};

// Qualification Call Rubric
export const qualificationCallRubric = {
  title: "Qualification Call",
  description: "Evaluate how effectively the sales representative conducts a qualification call to determine fit, understand the couple's needs, discuss budget parameters, and advance the sales process.",
  scoringScale: [
    { value: 1, label: "Poor", description: "Does not meet expectations; significant improvement needed" },
    { value: 2, label: "Fair", description: "Partially meets expectations; considerable improvement needed" },
    { value: 3, label: "Satisfactory", description: "Meets basic expectations; some improvement needed" },
    { value: 4, label: "Good", description: "Exceeds expectations in some areas; minor improvements needed" },
    { value: 5, label: "Excellent", description: "Consistently exceeds expectations; exemplary performance" }
  ],
  criteria: [
    {
      name: "Preparation",
      description: "Reviewed their inquiry details before the call",
      weight: 10,
      levels: {
        poor: "No evidence of reviewing inquiry details",
        satisfactory: "References basic details from inquiry",
        excellent: "Thoroughly prepared with specific references to previous communication"
      }
    },
    {
      name: "Rapport Building",
      description: "Established a comfortable conversation flow and personal connection",
      weight: 20,
      levels: {
        poor: "Fails to connect personally",
        satisfactory: "Establishes basic rapport",
        excellent: "Creates strong personal connection and trust"
      }
    },
    {
      name: "Professional Tone",
      description: "Maintained professional yet warm tone throughout",
      weight: 15,
      levels: {
        poor: "Inconsistent or inappropriate tone",
        satisfactory: "Maintains professional tone with occasional lapses",
        excellent: "Perfect balance of professionalism and warmth throughout"
      }
    },
    {
      name: "Question Quality",
      description: "Asked open-ended questions to gather information",
      weight: 20,
      levels: {
        poor: "Closed-ended or minimal questions",
        satisfactory: "Mix of open and closed questions",
        excellent: "Thoughtful, open-ended questions that reveal needs and preferences"
      }
    },
    {
      name: "Active Listening",
      description: "Demonstrated active listening and acknowledged their responses",
      weight: 15,
      levels: {
        poor: "Does not acknowledge responses",
        satisfactory: "Acknowledges responses but doesn't build on them",
        excellent: "Demonstrates excellent listening by referencing and building on responses"
      }
    },
    {
      name: "Budget Discussion",
      description: "Addressed budget concerns professionally",
      weight: 20,
      levels: {
        poor: "Avoids budget or handles awkwardly",
        satisfactory: "Discusses budget but lacks flexibility or value focus",
        excellent: "Skillfully addresses budget, emphasizes value, and offers options"
      }
    }
  ]
};

// Venue Tour Rubric
export const venueTourRubric = {
  title: "Venue Tour",
  description: "Evaluate how effectively the sales representative conducts a venue tour, highlights features that match the couple's vision, addresses concerns, and creates momentum toward booking.",
  scoringScale: [
    { value: 1, label: "Poor", description: "Does not meet expectations; significant improvement needed" },
    { value: 2, label: "Fair", description: "Partially meets expectations; considerable improvement needed" },
    { value: 3, label: "Satisfactory", description: "Meets basic expectations; some improvement needed" },
    { value: 4, label: "Good", description: "Exceeds expectations in some areas; minor improvements needed" },
    { value: 5, label: "Excellent", description: "Consistently exceeds expectations; exemplary performance" }
  ],
  criteria: [
    {
      name: "Preparation",
      description: "Prepared the venue for the tour",
      weight: 10,
      levels: {
        poor: "Venue not prepared for tour",
        satisfactory: "Basic preparation evident",
        excellent: "Exceptional preparation with personalized touches"
      }
    },
    {
      name: "Welcoming Experience",
      description: "Created a warm, welcoming atmosphere",
      weight: 15,
      levels: {
        poor: "Cold or rushed welcome",
        satisfactory: "Warm, professional welcome",
        excellent: "Memorable, exceptional welcome that sets positive tone"
      }
    },
    {
      name: "Rapport Building",
      description: "Built and maintained rapport throughout the tour",
      weight: 20,
      levels: {
        poor: "Transactional; fails to connect",
        satisfactory: "Maintains basic rapport",
        excellent: "Builds strong emotional connection throughout tour"
      }
    },
    {
      name: "Storytelling/Visualization",
      description: "Used storytelling to highlight venue features",
      weight: 20,
      levels: {
        poor: "Simply lists features",
        satisfactory: "Describes features with some benefits",
        excellent: "Uses powerful storytelling to help couple visualize their wedding"
      }
    },
    {
      name: "Personalization",
      description: "Tailored the tour to their specific interests",
      weight: 15,
      levels: {
        poor: "Generic tour for all clients",
        satisfactory: "Some customization to interests",
        excellent: "Fully tailored tour highlighting aspects matching their vision"
      }
    },
    {
      name: "Question Handling",
      description: "Addressed their questions confidently",
      weight: 20,
      levels: {
        poor: "Avoids or poorly answers questions",
        satisfactory: "Adequately answers questions",
        excellent: "Anticipates questions and provides insightful, confident answers"
      }
    }
  ]
};

// Proposal Presentation Rubric
export const proposalPresentationRubric = {
  title: "Proposal Presentation",
  description: "Evaluate how effectively the sales representative presents a customized proposal, handles objections, emphasizes value over price, and moves toward closing the sale.",
  scoringScale: [
    { value: 1, label: "Poor", description: "Does not meet expectations; significant improvement needed" },
    { value: 2, label: "Fair", description: "Partially meets expectations; considerable improvement needed" },
    { value: 3, label: "Satisfactory", description: "Meets basic expectations; some improvement needed" },
    { value: 4, label: "Good", description: "Exceeds expectations in some areas; minor improvements needed" },
    { value: 5, label: "Excellent", description: "Consistently exceeds expectations; exemplary performance" }
  ],
  criteria: [
    {
      name: "Proposal Quality",
      description: "Created a comprehensive, customized proposal",
      weight: 15,
      levels: {
        poor: "Generic proposal",
        satisfactory: "Somewhat customized proposal",
        excellent: "Comprehensive, highly customized proposal"
      }
    },
    {
      name: "Presentation Skills",
      description: "Delivered the proposal confidently and clearly",
      weight: 15,
      levels: {
        poor: "Unclear or unconfident delivery",
        satisfactory: "Clear, professional delivery",
        excellent: "Engaging, confident presentation that builds excitement"
      }
    },
    {
      name: "Rapport Maintenance",
      description: "Maintained strong rapport throughout presentation",
      weight: 20,
      levels: {
        poor: "Loses connection during presentation",
        satisfactory: "Maintains basic rapport",
        excellent: "Strengthens emotional connection throughout presentation"
      }
    },
    {
      name: "Value Communication",
      description: "Emphasized value rather than just price",
      weight: 20,
      levels: {
        poor: "Focuses on price rather than value",
        satisfactory: "Balances price and value discussion",
        excellent: "Masterfully emphasizes value over price"
      }
    },
    {
      name: "Objection Handling",
      description: "Addressed concerns professionally",
      weight: 20,
      levels: {
        poor: "Avoids or poorly handles objections",
        satisfactory: "Adequately addresses concerns",
        excellent: "Skillfully turns objections into opportunities"
      }
    },
    {
      name: "Closing Technique",
      description: "Asked for the booking confidently",
      weight: 10,
      levels: {
        poor: "Fails to ask for the booking",
        satisfactory: "Asks for booking but lacks confidence",
        excellent: "Confidently uses appropriate closing technique"
      }
    }
  ]
}; 