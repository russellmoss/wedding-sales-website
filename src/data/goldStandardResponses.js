/**
 * Gold standard responses for different sales scenarios
 * These are exemplary responses that demonstrate best practices
 */

export const goldStandardResponses = {
  // Wedding Venue Scenario
  'wedding_venue': {
    title: 'Wedding Venue Sales',
    description: 'A conversation with a couple looking to book a wedding venue',
    general: {
      keyElements: [
        'personalized approach',
        'active listening',
        'addressing concerns',
        'building rapport',
        'showing value',
        'creating urgency',
        'handling objections',
        'closing techniques'
      ],
      problematicPhrases: [
        'you have to',
        'you must',
        'you should',
        'that\'s not possible',
        'we can\'t',
        'you\'re wrong',
        'that\'s not how it works',
        'you don\'t understand',
        'that\'s too expensive',
        'you can\'t afford',
        'you need to decide now',
        'this is your last chance',
        'everyone else is booking',
        'you\'ll regret it',
        'you\'re making a mistake'
      ],
      tone: 'empathetic'
    },
    stages: {
      initial: [
        {
          context: 'First contact',
          keyElements: [
            'warm welcome',
            'introduction',
            'establishing rapport',
            'showing interest',
            'asking open-ended questions',
            'listening actively'
          ],
          problematicPhrases: [
            'what\'s your budget',
            'how many guests',
            'when do you need it',
            'what date',
            'do you have a deposit'
          ],
          tone: 'friendly'
        }
      ],
      discovery: [
        {
          context: 'Understanding needs',
          keyElements: [
            'open-ended questions',
            'probing for pain points',
            'identifying priorities',
            'showing empathy',
            'acknowledging concerns',
            'building trust'
          ],
          problematicPhrases: [
            'that\'s not important',
            'you don\'t need that',
            'that\'s not possible',
            'we don\'t offer that',
            'that\'s not how it works'
          ],
          tone: 'empathetic'
        }
      ],
      presentation: [
        {
          context: 'Presenting the venue',
          keyElements: [
            'highlighting benefits',
            'addressing specific needs',
            'showing value',
            'creating emotional connection',
            'using storytelling',
            'demonstrating expertise'
          ],
          problematicPhrases: [
            'it\'s the best',
            'everyone loves it',
            'you\'ll love it',
            'it\'s perfect for you',
            'you won\'t find better'
          ],
          tone: 'confident'
        }
      ],
      objection: [
        {
          context: 'Handling price objection',
          keyElements: [
            'acknowledging concern',
            'showing value',
            'offering alternatives',
            'explaining benefits',
            'creating payment options',
            'addressing emotional aspects'
          ],
          problematicPhrases: [
            'it\'s not that expensive',
            'you get what you pay for',
            'if you can\'t afford it',
            'maybe this isn\'t for you',
            'you\'ll have to look elsewhere'
          ],
          tone: 'empathetic'
        },
        {
          context: 'Handling date availability objection',
          keyElements: [
            'acknowledging concern',
            'offering alternatives',
            'showing flexibility',
            'creating options',
            'explaining availability',
            'suggesting compromises'
          ],
          problematicPhrases: [
            'that date is booked',
            'we\'re fully booked',
            'you\'re too late',
            'you should have booked earlier',
            'there\'s nothing we can do'
          ],
          tone: 'helpful'
        }
      ],
      closing: [
        {
          context: 'Attempting to close',
          keyElements: [
            'summarizing benefits',
            'addressing final concerns',
            'creating urgency',
            'offering incentives',
            'making it easy to decide',
            'asking for commitment'
          ],
          problematicPhrases: [
            'you need to decide now',
            'this is your last chance',
            'the price goes up tomorrow',
            'someone else is interested',
            'you\'ll lose your date',
            'you\'ll regret it'
          ],
          tone: 'confident'
        }
      ]
    }
  },
  
  // Corporate Event Scenario
  'corporate_event': {
    title: 'Corporate Event Sales',
    description: 'A conversation with a corporate client looking to book an event space',
    general: {
      keyElements: [
        'professional approach',
        'understanding business needs',
        'showing ROI',
        'addressing logistics',
        'highlighting amenities',
        'demonstrating expertise',
        'handling objections',
        'closing techniques'
      ],
      problematicPhrases: [
        'that\'s not our policy',
        'we don\'t do that',
        'you have to',
        'you must',
        'that\'s not possible',
        'we can\'t accommodate',
        'you\'re wrong',
        'that\'s not how it works'
      ],
      tone: 'professional'
    },
    stages: {
      initial: [
        {
          context: 'First contact',
          keyElements: [
            'professional greeting',
            'introduction',
            'establishing business context',
            'showing expertise',
            'asking about company',
            'understanding event purpose'
          ],
          problematicPhrases: [
            'what\'s your budget',
            'how many people',
            'when do you need it',
            'what date',
            'do you have approval'
          ],
          tone: 'professional'
        }
      ],
      discovery: [
        {
          context: 'Understanding business needs',
          keyElements: [
            'asking about company goals',
            'understanding event objectives',
            'identifying decision makers',
            'probing for pain points',
            'showing business acumen',
            'building credibility'
          ],
          problematicPhrases: [
            'that\'s not important',
            'you don\'t need that',
            'that\'s not possible',
            'we don\'t offer that',
            'that\'s not how it works'
          ],
          tone: 'professional'
        }
      ],
      presentation: [
        {
          context: 'Presenting the venue',
          keyElements: [
            'highlighting business benefits',
            'showing ROI',
            'addressing specific needs',
            'demonstrating expertise',
            'using case studies',
            'addressing logistics'
          ],
          problematicPhrases: [
            'it\'s the best',
            'everyone uses us',
            'you\'ll love it',
            'it\'s perfect for you',
            'you won\'t find better'
          ],
          tone: 'confident'
        }
      ],
      objection: [
        {
          context: 'Handling budget objection',
          keyElements: [
            'acknowledging concern',
            'showing ROI',
            'offering alternatives',
            'explaining value',
            'creating payment options',
            'addressing business impact'
          ],
          problematicPhrases: [
            'it\'s not that expensive',
            'you get what you pay for',
            'if you can\'t afford it',
            'maybe this isn\'t for you',
            'you\'ll have to look elsewhere'
          ],
          tone: 'professional'
        }
      ],
      closing: [
        {
          context: 'Attempting to close',
          keyElements: [
            'summarizing benefits',
            'addressing final concerns',
            'creating urgency',
            'offering incentives',
            'making it easy to decide',
            'asking for commitment'
          ],
          problematicPhrases: [
            'you need to decide now',
            'this is your last chance',
            'the price goes up tomorrow',
            'someone else is interested',
            'you\'ll lose your date',
            'you\'ll regret it'
          ],
          tone: 'confident'
        }
      ]
    }
  }
}; 