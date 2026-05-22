const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    // Slideshow Settings
    slideInterval: { type: Number, default: 5000, description: 'Milliseconds between slides' },
    slideTransition: { type: String, enum: ['fade', 'slide', 'zoom'], default: 'fade', description: 'Type of transition animation' },
    autoPlay: { type: Boolean, default: true, description: 'Auto-play slideshow on page load' },
    showNavigation: { type: Boolean, default: true, description: 'Show navigation arrows' },
    showDots: { type: Boolean, default: true, description: 'Show indicator dots' },
    
    // Theme and General
    themeMode: { type: String, enum: ['light', 'dark'], default: 'light' },
    siteName: { type: String, default: 'UMP CFERI Platform' },
    siteDescription: { type: String, default: '' },
    contactEmail: { type: String, default: '' },
    contactPhone: { type: String, default: '' },
    
    // About Page Content
    aboutDescription: { type: String, default: 'UMPCFERI is a dynamic entrepreneurship hub dedicated to fostering innovation, supporting student startups, and driving economic growth through structured incubation programs and mentorship.' },
    mission: { type: String, default: 'To foster a dynamic entrepreneurship ecosystem through development programmes, strategic partnerships, and applied research aimed at building sustainable enterprises and contributing to local, national and regional economic growth.' },
    vision: { type: String, default: 'To be a leading entrepreneurship centre in nurturing innovative and creative enterprises for sustainable development within the African context.' },
    achievementsHeading: { type: String, default: "CFERI'S KEY ACHIEVEMENTS" },
    values: { type: [String], default: ['Innovation', 'Excellence', 'Collaboration', 'Integrity', 'Diversity', 'Adaptability', 'Relevance'] },
    goals: {
      type: [
        {
          title: { type: String, default: '' },
          objectives: { type: [String], default: [] }
        }
      ],
      default: [
        {
          title: 'Goal 1: Foster Dynamic Entrepreneurial Ecosystem',
          objectives: [
            'To support start-ups through growth-oriented incubation services.',
            'To contribute to the local entrepreneurship ecosystem building.'
          ]
        },
        {
          title: 'Goal 2: To identify, nurture and support entrepreneurial talent and innovation.',
          objectives: [
            'To identify and enable students with business ideas into entrepreneurs.',
            'To promote entrepreneurship and creative problem solving in staff and students.',
            'To offer business support services'
          ]
        },
        {
          title: 'Goal 3: To establish and maintain strategic partnerships, locally, nationally and internationally.',
          objectives: [
            'To facilitate strategic relationships through collaborations, networks, linkages and partnerships.',
            'To leverage resources through our partnerships.'
          ]
        },
        {
          title: 'Goal 4: To contribute to applied research in entrepreneurship development.',
          objectives: [
            'To conduct applied research in entrepreneurship to inform policy and practice.',
            'To provide consultancy services in entrepreneurship'
          ]
        }
      ]
    },
    achievements: {
      type: [{
        year: { type: String, default: '' },
        message: { type: String, default: '' }
      }],
      default: [
        { year: '2020', message: 'INCEPTION OF UMPCFERI INFRASTRUCTURAL DEVELOPMENT. UMP PARTICIPATED VIRTUALLY IN EDHE NATIONAL ROUNDS DURING LOCKDOWN.' },
        { year: '2021', message: 'CONTINUED PARTNERSHIP/MOA WITH SEDFA. STUDENTPRENEUR ADVANCED TO EDHE NATIONAL FINALS. CENTRE ACQUIRED STATE-OF-THE-ART EQUIPMENT AND INFRASTRUCTURE FOR SHARED WORKING SPACES AND THE ENTREPRENEURSHIP HUB.' },
        { year: '2022', message: 'UMPCFERI WON THE BEST PITCH AWARD AT UNIFIC SUMMIT (MALAYSIA). MOA SIGNED WITH 11 ASIAN UNIVERSITIES CONSORTIUM. 6 STUDENTPRENEURS COMPETED IN THE EDHE REGIONAL ROUNDS AND 3 ADVANCED TO THE NATIONAL ROUNDS.' },
        { year: '2023', message: 'GRAND OPENING OF UMPCFERI, INCLUDING ENTREPRENEURSHIP EXHIBITION. HOSTED EDHE REGIONAL ROUNDS WITH 3 OTHER UNIVERSITIES. HOSTED POP-UP MARKET (CBD, PARTNERSHIP WITH SEDFA). LAUNCHED UMP SWEEP CHAPTER WITH STANDARD BANK, OLD MUTUAL, ETC. UMP STUDENTPRENEURS WON BRAND FUSION SA PITCH TOUR (TOP 3 PRIZES IN MPUMALANGA). 2 STUDENTPRENEURS REPRESENTED MPUMALANGA AT THE CAPE TOWN INNOVATION SUMMIT (FUNDED BY TIA, MLAB, AND SET UP A START-UP).' },
        { year: '2024', message: 'UMPCFERI TEAM WON 1ST PLACE IN THE PHILIPPINES (UNIC HEALTH & WELLNESS IDEATHON) WITH THE MANGO AGROPROCESSING PROJECT. HOSTED THE 1ST UMP ENTREPRENEURSHIP SUMMIT. HOSTED THE 1ST WOMEN IN LEADERSHIP CONFERENCE (SWEEP). 1ST CONTRACT FROM THE GOVERNMENT DEPARTMENT DEDT TO DEVELOP MPUMALANGA INFORMAL SECTOR POLICY. SIGNED MOU WITH TUT; RENEWED MOU WITH SEDA (FUNDING). CO-AUTHORED 2 BOOKS ON UNIVERSITY-LED ENTREPRENEURSHIP. SECURED EDHE EAO AND UCDP FUNDING.' },
        { year: '2025', message: 'HOSTED AFRICA-ASIA ROUNDTABLE EVENT WITH MORE THAN 90 DELEGATES FROM MORE THAN 11 COUNTRIES. ENTREPRENEURSHIP BOOTCAMP (SKILLS + INCUBATION PIPELINE). SWEEP BRANDING MASTERCLASS. EDHE-FULBRIGHT WORKSHOP ON EMBEDDING ENTREPRENEURSHIP INTO THE CURRICULUM. STANDARD BANK PITCHING MASTERCLASS. UMPCFERI STUDENTPRENEUR WINS 1ST PLACE AT THE ABSA/YAEI 2025 COMPETITION. UMPCFERI STAKEHOLDER ENGAGEMENT. CFERI WINS ENGAGEMENT TEAM EXCELLENCE AWARDS.' },
        { year: '2026', message: 'HOSTED EDHE ABSA ENTREPRENEURSHIP INNOVARSITY 2026 NATIONAL LUNCH ON 17 APRIL 2026 AT UNIVERSITY OF MPUMALANGA.' }
      ]
    },
    
    // Social Media Links
    socialLinks: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      instagram: { type: String, default: '' }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);
