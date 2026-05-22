import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSlides, getPartners } from '../services/api';
import '../styles/programs.css';

const Programs = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedSectionProgram, setSelectedSectionProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showSubProgramModal, setShowSubProgramModal] = useState(false);
  const [selectedSubProgram, setSelectedSubProgram] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [slides, setSlides] = useState([]);
  const [partners, setPartners] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const location = useLocation();

  // Load program section slideshow
  useEffect(() => {
    const loadSlides = async () => {
      try {
        const { data } = await getSlides('programs');
        setSlides(data || []);
      } catch (error) {
        console.error('Unable to load program slides', error);
      }
    };
    loadSlides();
  }, []);

  // Load partners from API
  useEffect(() => {
    const loadPartners = async () => {
      try {
        const resp = await getPartners();
        const data = resp?.data;
        // Normalize response to an array if backend wraps or returns object/errors
        if (Array.isArray(data)) {
          setPartners(data);
        } else if (Array.isArray(data?.partners)) {
          setPartners(data.partners);
        } else {
          setPartners([]);
          if (data && typeof data === 'object') {
            console.warn('Unexpected partners response shape:', data);
          }
        }
      } catch (error) {
        console.error('Unable to load partners', error);
        setPartners([]);
      }
    };
    loadPartners();
  }, []);

  useEffect(() => {
    if (!slides.length) return undefined;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // Toggle dropdown
  const toggleDropdown = (sectionId) => {
    if (openDropdown === sectionId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(sectionId);
    }
  };

  const goPrevSlide = () => {
    if (!slides.length) return;
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNextSlide = () => {
    if (!slides.length) return;
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  // Program Categories/Sections with detailed programs
  const programCategories = [
    {
      id: 'incubation-programs',
      title: 'Incubation Programs',
      icon: '',
      color: '#5b60ae',
      description: 'Comprehensive support for startups at every stage',
      programs: [
        { 
          id: 'renting-facilities',
          name: 'Renting Facilities', 
          description: 'Access to affordable workspace and facilities for your startup.',
          fullDetails: 'State-of-the-art facilities including co-working spaces, meeting rooms, and specialized equipment available at subsidized rates for student entrepreneurs. Located at the UMPCFERI hub on Mbombela Campus.',
          benefits: ['Affordable rates', 'Flexible terms', 'Access to equipment', 'Networking opportunities'],
          contact: 'cferi_bdo@ump.ac.za'
        },
        { 
          id: 'industry-development',
          name: 'Mentorship', 
          description: 'Industry-specific mentorship and networking opportunities.',
          fullDetails: 'Connect with industry experts, attend sector-specific workshops, and gain insights into market trends. Program includes mentorship from established professionals in your field.',
          benefits: ['Industry mentors', 'Sector workshops', 'Market insights', 'Professional network'],
          contact: 'cferi_bdo@ump.ac.za'
        },
        { 
          id: 'industry-development',
          name: 'Business Compliance Planning & Registration', 
          description: 'Industry-specific mentorship and networking opportunities.',
          fullDetails: 'Connect with industry experts, attend sector-specific workshops, and gain insights into market trends. Program includes mentorship from established professionals in your field.',
          benefits: ['Industry mentors', 'Sector workshops', 'Market insights', 'Professional network'],
          contact: 'cferi_bdo@ump.ac.za'
        },
        { 
          id: 'business-plan',
          name: 'Business Plan Development', 
          description: 'Expert guidance in creating comprehensive business plans.',
          fullDetails: 'One-on-one coaching to develop a robust business plan that attracts investors. Covers market analysis, financial projections, and operational strategies.',
          benefits: ['Expert coaches', 'Investor-ready plans', 'Financial modeling', 'Market research support'],
          contact: 'cferi_bdo@ump.ac.za'
        },
        { 
          id: 'record-keeping',
          name: 'Coaching onRecord Keeping & Accounting', 
          description: 'Training in financial management and bookkeeping.',
          fullDetails: 'Workshops and training sessions on financial literacy, bookkeeping, tax compliance, and using accounting software for small businesses.',
          benefits: ['Financial literacy', 'Bookkeeping skills', 'Tax compliance', 'Software training'],
          contact: 'cferi_bdo@ump.ac.za'
        },
        { 
          id: 'market-strategy',
          name: 'Coaching on Market Strategy Development', 
          description: 'Strategic guidance on market positioning and growth.',
          fullDetails: 'Develop effective market entry and growth strategies. Learn about customer acquisition, branding, pricing strategies, and competitive analysis.',
          benefits: ['Market positioning', 'Growth strategies', 'Customer acquisition', 'Competitive analysis'],
          contact: 'cferi_bdo@ump.ac.za'
        }
      ]
    },
    {
      id: 'Student funding-competitions',
      title: 'Entrepreneurship Development Programs',
      icon: '',
      color: '#cd3131',
      description: 'Opportunities to win funding and recognition for your ideas',
      programs: [
      /*  { 
          id: 'Embedding Entreneurship',
          name: 'Embedding Entreneurship into the curriculum', 
          description: 'Annual gathering for students to showcase innovative ideas.',
          fullDetails: 'A platform for students to present their innovative projects and business ideas to a panel of judges, industry experts, and potential investors.',
          benefits: ['Showcase ideas', 'Expert feedback', 'Investment opportunities', 'Peer learning'],
          contact: 'indaba@umpcferi.ac.za',
          deadline: 'September 2025'
        },*/
        { 
          id: 'staff-capacity',
          name: 'Staff Entrepreneurship Capacity Building', 
          description: 'Programs to equip staff with entrepreneurial skills.',
          fullDetails: 'Workshops and training sessions designed to help university staff develop entrepreneurial mindsets and skills, enabling them to better support student entrepreneurs.',
          benefits: ['Skill development', 'Mentor training', 'Curriculum integration', 'Research opportunities'],
          contact: 'cferi_bdo@ump.ac.za'
        },
         { 
          id: 'UNIIC',
          name: 'UNIIC', 
          description: 'Programs to equip staff with entrepreneurial skills.',
          fullDetails: 'Workshops and training sessions designed to help university staff develop entrepreneurial mindsets and skills, enabling them to better support student entrepreneurs.',
          benefits: ['Skill development', 'Mentor training', 'Curriculum integration', 'Research opportunities'],
          contact: 'cferi_bdo@ump.ac.za'
        },
        // EDHE Programme with Student Indaba INSIDE it
        { 
          id: 'edhe-programme',
          name: 'EDHE Programme', 
          description: 'Entrepreneurship Development in Higher Education - National Platform',
          fullDetails: `The EDHE Programme is people-focused. It is intended to develop the entrepreneurial capacity of students, academics and leaders. The intention is for students to be more successful in terms of becoming economically active during and after their tertiary education. Entrepreneurial activity during their studies could enable students to generate an additional income and fast-track the process of becoming economically active. Upon graduation, students would be able to consider entrepreneurship as a career, either as a first choice, or as an alternative, especially if they have difficulty in finding employment.`,
          
          fullDescription: `Background on the EDHE Programme

Within the context of graduate and youth unemployment, the resources available at universities, the national drive for SMEs and the need for third-stream income at universities, the imperative to drive student and graduate entrepreneurship has been growing steadily. In response, a platform for Entrepreneurship Development in Higher Education (EDHE) was established at the end of 2016 from within the University Education Branch of the Department Higher Education and Training. The EDHE Programme has since been included in the University Capacity Development Programme (UCDP) of the Department Higher Education and Training.

The goals of the EDHE Programme are:

• Student entrepreneurship, i.e. mobilising the national student and graduate resource to create successful enterprises that will ultimately lead to both wealth and job creation.
• Entrepreneurship development in academia, i.e. support academics in instilling an entrepreneurial mindset within all students and graduates through the offering of relevant knowledge, transferral of practical skills and the application of business principles, not only to a specific discipline, but across disciplines.
• Developing entrepreneurial universities, i.e. creating a conducive environment that will enable universities to adapt strategically and embark on projects whereby third-stream income can be generated through innovative business ideas.

The EDHE Programme is people-focused. It is intended to develop the entrepreneurial capacity of students, academics and leaders. The intention is for students to be more successful in terms of becoming economically active during and after their tertiary education. Entrepreneurial activity during their studies could enable students to generate an additional income and fast-track the process of becoming economically active. Upon graduation, students would be able to consider entrepreneurship as a career, either as a first choice, or as an alternative, especially if they have difficulty in finding employment.

The people-focused nature of the EDHE Programme extends to developing the capacity of academics and support professionals to deliver informed and relevant services in terms of entrepreneurship education. This would include equipping academics across disciplines to encourage an entrepreneurial mindset and culture, as well as subject-specific entrepreneurship education, delivered with confidence.

The EDHE Programme is positioned to make entrepreneurship education and training accessible for all students across disciplines. This is a much-needed intervention that would better equip students to successfully participate in the economy upon graduation, regardless of whether they are employed or not.

The EDHE Programme, through driving entrepreneurship development in academia, is intended to optimise existing entrepreneurship research and encourage contextually relevant new research. This would include drawing together existing research on the broader topic of entrepreneurship development, but also specifically on the topic of entrepreneurial universities. Entrepreneurship research would be made available to university stakeholders, students and other stakeholders through a centralised online repository of information.

The UCDP emphasises an increasing focus on curriculum development initiatives that examine new and alternative contents and pedagogies which are relevant to the South African context. In terms of driving the entrepreneurship development agenda through the curriculum, the EDHE Programme is aimed at embedding entrepreneurship in the curriculum, through flexible curriculum pathways, across disciplines. In the spirit of the UCDP, the intention is for entrepreneurship in the curriculum to be relevant to the local context in order to support the ability of graduates to participate meaningfully in society and in the world of work.

In essence, student development, staff development and curriculum development are interlinked in terms of the EDHE Programme. High quality entrepreneurship programmes would benefit both staff and students. Better equipped and skilled staff would contribute to student entrepreneurship and more relevant academic programmes and research. Similarly, as students expand their entrepreneurship skillsets, staff would be motivated to invest in their own development and academic programmes.

The EDHE Programme spans across institutional and regional boundaries. It is aimed at addressing entrepreneurship development needs at individual institutions, while drawing together regional resources and efforts to the benefit of stakeholders on a national level.

This is a large and complex endeavour that requires multiple focus areas and much time. The good news is that most universities are already taking ownership of the problem and implementing initiatives. Add to this the fact that universities have access to their own resources, and it is clear that the main role the EDHE Programme is to provide strategic focus, create enabling environments, collaboration, partnering and unlocking what is existing.`,
          
          goals: [
            'Student entrepreneurship: mobilising the national student and graduate resource to create successful enterprises that will ultimately lead to both wealth and job creation',
            'Entrepreneurship development in academia: support academics in instilling an entrepreneurial mindset within all students and graduates through the offering of relevant knowledge, transferral of practical skills and the application of business principles, not only to a specific discipline, but across disciplines',
            'Developing entrepreneurial universities: creating a conducive environment that will enable universities to adapt strategically and embark on projects whereby third-stream income can be generated through innovative business ideas'
          ],
          
          benefits: [
            'Develop entrepreneurial capacity of students, academics and leaders',
            'Enable students to generate additional income during their studies',
            'Fast-track the process of becoming economically active',
            'Consider entrepreneurship as a career option upon graduation',
            'Access to entrepreneurship education and training across disciplines',
            'Connect with a national network of entrepreneurship stakeholders'
          ],
          
          // ADDED: Student Indaba as a sub-program inside EDHE
          subPrograms: [
            {
              id: 'student-indaba',
              name: 'Student Indaba',
              description: 'Annual gathering for students to showcase innovative ideas',
              fullDetails: 'A platform for students to present their innovative projects and business ideas to a panel of judges, industry experts, and potential investors.',
              fullDescription: `The Student Indaba is a premier annual event organized by Entrepreneurship Development in Higher Education (EDHE) that brings together student entrepreneurs from universities across South Africa.

Key Features:
• Student entrepreneurs showcase their innovative business ideas
• Pitch competitions with cash prizes
• Networking opportunities with industry experts and potential investors
• Workshops and masterclasses on entrepreneurship skills
• Exhibition space for student businesses to display their products and services

The Indaba serves as a platform for students to gain exposure, receive feedback from experts, and connect with like-minded entrepreneurs from other institutions.`,
              benefits: [
                'Showcase your business idea to a national audience',
                'Network with student entrepreneurs from other universities',
                'Learn from successful entrepreneurs and industry experts',
                'Opportunity to win cash prizes and recognition',
                'Access to mentorship and funding opportunities'
              ],
              eligibility: [
                'Currently enrolled university students',
                'Open to all disciplines and faculties',
                'Must have a business idea or existing startup'
              ],
              contact: 'indaba@edhe.co.za',
              deadline: 'September 2025'
            }
          ],
          
          contactInfo: {
            website: 'https://edhe.co.za/',
            contact: 'https://edhe.co.za/contact/',
            social: {
              facebook: 'https://www.facebook.com/EDHEentrepreneurship',
              twitter: 'https://x.com/EDHEOffical',
              instagram: 'https://www.instagram.com/edheentrepreneurship/',
              linkedin: 'https://www.linkedin.com/company/entrepreneurship-development-in-higher-education-edhe/?viewAsMember=true',
              sweepLinkedin: 'https://www.linkedin.com/showcase/student-women-economic-empowerment-programme-sweep/?viewAsMember=true',
              youtube: 'https://www.youtube.com/@entrepreneurshipdevelopmen6394'
            }
          },
          
          contact: 'info@edhe.co.za'
        }
      ],
      // Add dropdown for student chapters under funding competitions
      hasDropdown: true,
      dropdownTitle: 'CFERI Student Chapters',
      dropdownIcon: '',
      dropdownColor: '#ff9d00'
    },
    {
      id: 'research-activities',
      title: 'Research Activities',
      icon: '',
      color: '#ff9d00',
      description: 'Cutting-edge research in entrepreneurship and innovation',
      programs: [
        { 
          id: 'entrepreneurship-research',
          name: 'Research in Entrepreneurship Development', 
          description: 'An emerging hub for high-impact research in entrepreneurship, innovation, and inclusive economic development.',
          fullDetails: `The University of Mpumalanga Centre for Entrepreneurship Rapid Incubator (CFERI) is an emerging hub for high-impact research in entrepreneurship, innovation, and inclusive economic development. Within a short period, the Centre has demonstrated rapid growth in research output, with increasing publications, a strong pipeline of ongoing studies, and international recognition through conference participation and awards.\n\nCFERI’s research focuses on delivering practical, evidence-based insights to address key development challenges, including unemployment, small-business sustainability, and economic transformation. By integrating entrepreneurship with economic and innovation analysis, the Centre produces research that is both academically rigorous and directly relevant to policy and practice.`,
          benefits: ['Research grants', 'Publications', 'Conference presentations', 'Policy influence'],
          contact: 'cferi_bdo@ump.ac.za'
        },
        { 
          id: 'consultancy',
          name: 'Research Consultancy', 
          description: 'Tailored research consultancy services for government, private sector organisations, and development partners.',
          fullDetails: `CFERI provides research consultancy services tailored to the needs of government, private sector organisations, and development partners. The Centre specialises in policy analysis, programme evaluation, and impact assessment across entrepreneurial ecosystems, SME development, and innovation-led growth.\n\nWith a strong interdisciplinary foundation, CFERI delivers data-driven, context-specific solutions that support strategic decision-making and measurable development outcomes.`,
          benefits: ['Expert advice', 'Custom solutions', 'Industry insights', 'Strategic planning'],
          contact: 'cferi_bdo@ump.ac.za'
        },
        { 
          id: 'Advocacy',
          name: 'Policy Advocacy', 
          description: 'Contributing to policy development through research-driven advocacy.',
          fullDetails: `CFERI actively contributes to policy development through research-driven advocacy. The Centre works with stakeholders to shape policies that strengthen entrepreneurial ecosystems, support emerging enterprises, and promote inclusive economic growth.\n\nIts policy engagement is grounded in empirical research and aligned with national and regional development priorities.`,
          benefits: ['Policy development', 'Stakeholder engagement', 'Inclusive growth', 'Ecosystem strengthening'],
          contact: 'cferi_bdo@ump.ac.za'
        },
        { 
          id: 'publications',
          name: 'Research Publications', 
          description: 'Growing portfolio of peer-reviewed publications and conference outputs.',
          fullDetails: `CFERI has a growing portfolio of peer-reviewed publications and conference outputs that contribute to academic scholarship and inform policy discussions. The Centre’s work continues to gain visibility both locally and internationally, reinforcing its position as a credible research partner in entrepreneurship and development.`,
          benefits: ['Academic recognition', 'Knowledge sharing', 'Industry impact', 'Author opportunities'],
          contact: 'cferi_bdo@ump.ac.za'
        },
        {
          id: 'partner-cferi',
          name: 'Partner with CFERI',
          description: 'Collaboration opportunities with government institutions, industry partners, and development agencies.',
          fullDetails: `CFERI welcomes collaboration with government institutions, industry partners, development agencies, and academic institutions. Through research, consultancy, and policy engagement, the Centre offers a platform for generating knowledge, shaping policy, and driving sustainable economic impact.`,
          benefits: ['Generating knowledge', 'Shaping policy', 'Sustainable impact', 'Strategic collaboration'],
          contact: 'cferi_bdo@ump.ac.za'
        }
      ]
    }
  ];

  // Student chapters data (for dropdown)
  const studentChapters = [
    { 
      id: 'sweep',
      name: 'SWEEP', 
      image: '/images/sweep.png',
      description: 'Student Women Economic Empowerment Programme',
      fullDetails: `SWEEP is a sisterhood for economic participation aimed at promoting the economic empowerment of student women. It provides skills and opportunities interventions and seeks to address the barriers to entrepreneurship faced by student women, particularly in the context of gender-based violence. SWEEP envisions becoming a transformational empowerment community of women equipped for economic participation through entrepreneurial activity.

SWEEP aims to break the cycle of dependency and vulnerability by fostering entrepreneurship and economic empowerment in order to enable student women to build sustainable livelihoods and contribute to the economic growth and development of their communities. Through increased economic participation, student women can gain agency, make informed decisions, and exercise greater control over their lives. They can pursue education, career advancement, and personal aspirations, thereby challenging traditional gender roles and norms.

In the context of gender-based violence and unemployment in South Africa, the initiative strives to create a transformative impact on student women's lives by giving them access to opportunities and skills-development activities that enhance employability, professionalism, entrepreneurship, resilience and self-sustainability. The programme aims to do this by enhancing student women's academic education and plugging them into a professional 'sisterhood.'`,
      
      fullDescription: `In a world where gender equality and women's empowerment are increasingly recognised as crucial for social progress and sustainable development, it is imperative to focus on empowering young women to reach their full potential. The Student Women Economic Empowerment Programme (SWEEP) stands as a testament to this vision, aiming to uplift and support female students in their pursuit of economic independence, professional growth, and leadership.

SWEEP addresses the lack of representation of student women in business and entrepreneurship by providing skills and opportunities for economic participation. Unemployment is a significant issue, and many student women face the risk of joblessness even after graduating. Additionally, financial dependency often forces them to stay in abusive relationships. SWEEP aims to tackle these problems by offering practical skills and opportunities, supported by academic knowledge, to help student women participate in the economy through entrepreneurial activities and professional employability skills. SWEEP's primary goal is to increase the number of student women who are equipped for economic participation through entrepreneurship or employment opportunities. The programme supports them in creating a stable socio-economic environment by starting and growing their businesses or developing their employability skills. By recognizing the potential of student women to become entrepreneurs or employed professionals, SWEEP provides the necessary skills and resources to help them succeed. This empowerment boosts their confidence, enabling them to contribute to the economy and achieve financial independence.

The rationale for the SWEEP initiative is based on the understanding that student women who generate income are less vulnerable and have more options for personal and professional growth. By promoting economic participation, SWEEP aims to create a stable socio-economic environment for student women, enabling them to support themselves and their families without having to rely on an abusive partner or face economic hardships. Increased participation of student women equipped for economic participation through entrepreneurial activity will contribute to their overall economic empowerment, leading to enhanced self-esteem, financial independence, and improved quality of life.`,
      
      objectives: [
        'Expand Institutional Participation: Through the development of contextualised content, resources, and guidance, SWEEP strives to increase the establishment of new SWEEP chapters across institutions, creating a wider network of student women empowered through entrepreneurship and leadership opportunities.',
        'Increase Entrepreneurship Awareness: Increased awareness of entrepreneurship as a viable economic pathway for female university students and a greater understanding of gender equality and related challenges that hinder female student participation in economic sectors.',
        'Enhance entrepreneurship and resilience skills among student women: SWEEP endeavours to enhance the entrepreneurship skills of student women, enabling them to develop innovative business ideas, effectively manage their ventures, and navigate the challenges of starting and growing businesses. The programme aims to foster a strong entrepreneurial mindset and skill set among student women by providing training, mentorship, and networking opportunities. The programme also aims to enhance student women\'s mental and emotional resilience, enabling them to pursue opportunities confidently and navigate the challenges of starting and growing a business.',
        'Increase access to finance and business development services for student women: SWEEP recognises the importance of access to finance and business development services for student women\'s entrepreneurial endeavours. The Programme aims to facilitate increased access to financial resources, grants, loans, and business support services, enabling student women to start and expand their businesses. By reducing barriers to capital and providing guidance on business development, SWEEP seeks to enhance student women\'s entrepreneurial success.',
        'Increase participation of student women in a supportive community of women entrepreneurs: SWEEP strives to create a supportive community of student women entrepreneurs. By facilitating networking events, mentorship programmes, and knowledge sharing platforms, the programme aims to foster collaboration, peer learning, and mutual support among student women. This community will contribute to the growth, resilience, and success of student women in their entrepreneurial pursuits.',
        'Increase economic participation of student women: SWEEP aims to empower student women to actively engage in economic activities, whether through entrepreneurship, employment, or other forms of economic participation. By equipping them with the necessary skills, resources, and support, the Programme seeks to increase the number of student women who are economically active and contributing to the economy.',
        'Reduce dependability and vulnerability of student women: SWEEP acknowledges the connection between economic empowerment and reduced vulnerability to gender-based violence. By providing psychosocial support, education on gender-based violence prevention, and access to resources, the Programme aims to reduce the risk and impact of gender-based violence on student women\'s lives. This includes fostering a supportive environment that empowers student women to assert their rights and seek help when needed.'
      ],
      
      chapterObjectives: [
        'Enhance Entrepreneurship Skills and Knowledge: To provide female university students with access to mentorship, training, and capacity-building workshops that enhance their entrepreneurial, professional, resilience, and survival skills. Activities include: providing/facilitating training and capacity-building programmes that enhance entrepreneurial skills, financial literacy, leadership, and personal development; facilitating workshops on psychosocial support, addressing the challenges of gender-based violence and fostering mental and emotional resilience; facilitating a mentorship programme connecting student women with experienced professionals (partners) who provide one-on-one business guidance, industry insights, and leadership development.',
        'Increase Entrepreneurship Awareness: To enhance awareness of entrepreneurship and entrepreneurial activities as viable means of economic participation among female university students. Activities include conducting awareness-raising activities to promote entrepreneurship, promoting gender equality, challenging societal norms, and eliminating gender-based discrimination and bias in economic sectors.',
        'Promote Women\'s Participation in Entrepreneurship: To promote and support the participation of female university students in entrepreneurship-related activities. Activities include: Offering access to financial resources, grants, and scholarships specifically designed to support student women\'s entrepreneurial ventures and educational pursuits; integrating SWEEP participation into EDHE events such as the Student Entrepreneurship Week (SEW) and the EDHE Entrepreneurship Intervarsity; encouraging female students to compete, network, and showcase their entrepreneurial ideas.',
        'Foster a sense of community and support among and for student women: To grow the female university student support network, encouraging networking, collaboration, and the sharing of knowledge, resources, opportunities and expertise. Activities include: Showcase the platform/ website/ community; engage on/ contribute to the platform/ website/ community; facilitate networking events, conferences, dialogues, webinars and forums where student women can exchange ideas, collaborate on projects, and engage with successful entrepreneurs and industry leaders; explore and establish partnerships/ collaborations to support student women entrepreneurs through access to resources, mentorship, and employment/ entrepreneurship opportunities for student women.',
        'Expand Institutional Participation: To increase the number of SWEEP chapters and student participation across South African universities. Activities include: recruiting SWEEP chapter members and supporting and engaging with SWEEP chapters at other universities.'
      ],
      
      workshops: 'In our quest to develop and empower capacity building workshops remain a critical element in driving objectives of the EDHE strategy. The year 2024 saw several workshops including a three-day SWEEP workshop designed around three key themes that are not only aligned with the SWEEP vision and mission–but fundamental to competencies required from graduates in the world of work and/or (social) entrepreneurship. The selected methodology for the program design was based on cognitive and social theory principles in education. The student women were encouraged to be inspired by observing and listening to the speakers, discussing key points in their respective groups, applying the knowledge to the given task, and presenting their findings in plenary sessions.',
      
      constitution: `To the SWEEP Community, we are pleased to introduce the SWEEP Constitution Draft, a foundational document designed to guide each SWEEP Chapter in creating a constitution tailored to your specific university's society processes and procedures.

The SWEEP Constitution Draft serves as a flexible framework, offering guidelines and principles that chapters can adapt to their unique needs. It is not a one-size-fits-all document; rather, it is a resource intended to assist you in crafting a constitution that aligns with your university's culture, regulations, and the specific goals of your SWEEP Chapter.

This draft document outlines the essential elements to consider when creating your chapter's constitution. It covers areas such as the chapter's mission, objectives, leadership structure, membership requirements, and decision-making processes. It is our hope that by providing this framework, we can streamline the process of constitution drafting and help you focus on the core mission of empowering female students within your university.

Remember that the SWEEP Constitution Draft is a starting point and a source of inspiration. Feel free to adapt, modify, and expand upon the content to ensure that it best suits your chapter's unique needs and aspirations. We encourage you to engage with your chapter members, incorporate their ideas, and create a constitution that empowers you to realize your shared vision of promoting women's economic empowerment.

Thank you for your commitment to the SWEEP program, and we look forward to seeing the incredible impact your unique SWEEP Chapter will make on your campus and in the lives of female students.`,
      
      externalLink: 'https://edhe.co.za/sweep-2025/',
      
      benefits: [
        'Specialized business management training',
        'One-on-one mentorship with successful women leaders',
        'Access to women-focused funding opportunities',
        'Networking events and peer support groups',
        'Market linkages and exhibition opportunities',
        'Childcare support during program sessions'
      ],
      
      eligibility: [
        'Female university students',
        'Currently enrolled at UMP or partner institutions',
        'Commitment to personal and professional development',
        'Willingness to participate in workshops and mentorship',
        'Open to all faculties and academic levels'
      ],
      
      partners: ['Old Mutual', 'ABSA', 'Women in Business Association', 'SEDA', 'EDHE'],
      contact: 'cferi_bdo@ump.ac.za',
      social: {
        tiktok: 'https://www.tiktok.com/@umpsweep.chapter'
      },
      applicationDeadline: 'Rolling applications',
      nextCohort: 'Ongoing'
    },
    { 
      id: 'cop',
      name: 'COP', 
      description: 'Student Community of Practice',
      fullDetails: 'A collaborative community where students share knowledge, best practices, and learn from each other\'s entrepreneurial journeys. The Community of Practice (COP) brings together students with shared interests in entrepreneurship to exchange ideas, collaborate on projects, and support each other\'s growth.',
      benefits: [
        'Peer learning and knowledge sharing',
        'Collaborative projects and initiatives',
        'Regular workshops and meetups',
        'Access to resources and templates',
        'Networking with like-minded students'
      ],
      eligibility: [
        'All UMP students interested in entrepreneurship',
        'Open to all faculties and academic levels',
        'Commitment to active participation'
      ],
      contact: 'cferi_bdo@ump.ac.za'
    },
    { 
      id: 'sabya',
      name: 'SABYA', 
      image: '/images/sabya.jpeg',
      description: 'South African BRICS Youth Association',
      fullDetails: `The South African BRICS Youth Association (SABYA) is a non-profit organisation founded in 2018, with the vision to be the leading voice of Youth within BRICS+ and Advocate for their rights and interests in the decision making processes.

The South African BRICS Youth Association (SABYA) is a non-profit organisation founded in 2018, with the vision to be the leading voice of Youth within BRICS+ and Advocate for their rights and interests in the decision making processes.`,
      
      fullDescription: `The South African BRICS Youth Association (SABYA) is committed to amplifying the voice of young people in decision-making spaces. The UMPCFERI SABYA Chapter is a dynamic platform for young scholars, researchers, innovators and future change-makers ready to make meaningful impact within BRICS+ and beyond.

This is more than just a chapter, it's a community of driven students connecting academic excellence with entrepreneurship, innovation and community development. If you're ready to grow your research profile, expand your network and contribute to real solutions that matter, this is your sign to get involved.`,
      
      whoShouldJoin: [
        'Honours, Master\'s & PhD students',
        'Final-year undergraduates with research interests',
        'Students in entrepreneurship, development, economics, agriculture, business & social innovation',
        'Students passionate about entrepreneurship, development, economics, agriculture, business & social innovation'
      ],
      
      whyJoin: [
        'Research mentorship & peer support',
        'Writing, methods & proposal clinics',
        'Writing, methodology & proposal development clinics',
        'Research-to-enterprise opportunities',
        'Conferences, publications & innovation projects',
        'Network with academics, entrepreneurs & industry',
        'Networking with academics, entrepreneurs & industry leaders'
      ],
      
      whatWeDo: [
        'Research seminars & workshops',
        'Research seminars & interactive workshops',
        'Collaborative research & publications',
        'Applied and community-engaged research',
        'Applied and community-engaged research initiatives'
      ],
      
      objectives: [
        'To be the leading voice of Youth within BRICS+',
        'To Advocate for youth rights and interests in decision making processes',
        'To connect academic work with entrepreneurship, innovation, and community development',
        'To provide research mentorship and peer support',
        'To create research-to-enterprise opportunities'
      ],
      
      benefits: [
        'Research mentorship & peer support',
        'Writing, methods & proposal clinics',
        'Research-to-enterprise opportunities',
        'Conferences, publications & innovation projects',
        'Network with academics, entrepreneurs & industry',
        'Writing, methodology & proposal development clinics',
        'Networking with academics, entrepreneurs & industry leaders'
      ],
      
      eligibility: [
        'Honours, Master\'s & PhD students',
        'Final-year undergraduates with research interests',
        'Students in entrepreneurship, development, economics, agriculture, business & social innovation',
        'Students passionate about entrepreneurship, development, economics, agriculture, business & social innovation'
      ],
      
      partners: ['BRICS+', 'UMPCFERI', 'SABYA National'],
      contact: 'cferi_bdo@ump.ac.za',
      social: {
        instagram: 'https://www.instagram.com/umpcferi_sabya_chapter'
      },
      applicationDeadline: 'Rolling applications',
      nextCohort: 'Ongoing'
    },
    { 
      id: 'hult',
      name: 'HULT Prize', 
      image: '/images/hultprize.png',
      description: 'Global Student Entrepreneurship Competition',
      eventReport: {
        title: 'UMP HULTPRIZE LOCAL COMPETITION EVENT REPORT - 24 FEBRUARY 2026',
        sections: [
          {
            heading: 'INTRODUCTION',
            content: `The HultPrize UMP Local Competition, held on the 24th of February 2026 at the University of Mpumalanga (UMP), formed part of the global Hult Prize Foundation movement, which empowers university students to develop innovative social enterprises that address pressing global challenges. The competition provided a dynamic platform for young entrepreneurs to showcase transformative business ideas aligned with this year's global challenge theme.

The purpose of hosting the HultPrize Local Competition at UMP was to inspire and mobilise students to become agents of change within their communities and beyond. The event aimed to cultivate an entrepreneurial mindset among students, encouraging them to design sustainable, impact-driven business solutions that contribute to social, economic, and environmental development.`
          },
          {
            heading: 'EXPECTED OUTCOMES',
            content: `The Hult Prize UMP Local Competition held on 24 February 2026 was designed not only to identify a winning team but also to create long-term impact within the University of Mpumalanga entrepreneurial ecosystem.

The anticipated outcomes of the event include the following:
• Participation in the Bootcamp is expected to equip Eco-Polish with advanced mentorship, business model refinement, pitch enhancement skills, and strategic guidance to strengthen their competitiveness at national level.
• The success of Eco-Polish, along with strong performances by RitaVita Naturals (Second Runner-Up) and SM Vision Works (Third Runner-Up), is anticipated to raise awareness and inspire broader student participation in future entrepreneurial initiatives.
• The competition is expected to foster a culture of innovation, leadership, collaboration, and problem-solving among students, encouraging more impact-driven ventures in the future.
• Awarding tokens of appreciation to the top three teams is anticipated to motivate continued commitment, resilience, and growth among participants, reinforcing the value of their efforts.
• Through participation in the broader Hult Prize Foundation movement, the event is expected to contribute to developing socially responsible entrepreneurs who create sustainable solutions aligned with global development priorities.

Overall, the anticipated outcomes extend beyond competition day, aiming to position UMP as a hub for innovative, socially conscious entrepreneurship while empowering Eco-Polish to compete confidently at the National Competition stage.`
          },
          {
            heading: 'OBJECTIVES',
            content: `The following objectives were outlined as the most suitable for the HultPrize UMP Local Competition event:
• Provide students with an opportunity to pitch innovative social enterprise ideas.
• Promote entrepreneurship and innovation on campus.
• Encourage solutions that align with the United Nations Sustainable Development Goals (SDGs).
• Select the most outstanding team to represent UMP at the next stage of the Hult Prize competition.
• Foster collaboration, leadership, and problem-solving skills among participants.`
          },
          {
            heading: 'PLANNING AND LOGISTICS',
            content: `The event was meticulously planned by the UMP CFERI team, which included Director, Business Development Officer, Administrators, Interns, HultPrize organizing representatives (Executive members).

Key logistical considerations were organized as follows:
Venue: Building 12, Lecture Hall
Date and Time: 24TH February 2026, from 08h00-16h00

Program Overview:
• The Program Director of the event was Ms. Caroline Seitshiro (Business Development Intern- CFERI).
• The attendance register was facilitated by Ms. Thembelihle Kunene (HultPrize UMP Marketing Officer).
• Opening and welcoming was done by Mr. Tsumbedzo Ramadi Madzivhandila (HultPrize UMP Campus Director).
• Start-ups owners were the first ones to take on the stage.
• Keynote addresses were made by Mr. Given Risenga (Standard Bank Representative), Ms. Confidence Ndlovu (Introducing the Judges), and Mr. Siyabonga Jele and Mr. Innocent Masilela (Inspiration from studentpreneurs).
• Vote of thanks was done by Ms. Kholofelo Makhubupetsi.`
          },
          {
            heading: 'TARGET GROUP',
            content: `The event specifically targeted students who are interested in businesses and start-up owners, with an expected turnout of 100 attendees. The following Eleven (11) Start-ups made it through for the presentations namely: MyUMP (1 presenter), SAYECO (2 presenters), Vertixcel Farms (1 presenter), Eco-Polish (1 Presenter), RitaVita Naturals(2 presenters), Renova Blessed (1 presenter), Campustyle (1 presenter), SM Vision works (2 presenters), Seluleko Consulting (1 presenter), Campusknit Studio (1 presenter), and Beauty Face (1 presenter) giving the total of 14 presenters.`
          },
          {
            heading: 'IMPLEMENTATION',
            content: `The event's successful implementation was made possible through the collaborative efforts of the UMP CFERI team, including:
• HultPrize UMP Organizing Team: Coordinated the event's activities, marking the attendance register, served as ushers, start-ups registrations and ensured that all logistics required are received and utilized.
• UMP CFERI Staff: Assisted in approving the proposal to host local competition, providing refreshments and the venue. Additionally, they assisted in providing the photographer, inviting external stakeholders for motivational engagement, securing judges and providing token of appreciation to the top 3 presenters.
• Photographer: was responsible for capturing all the presentations and making sure that there's visibility for all the audience.
• Logistical Support: Included the setup of sound systems, tables, chairs, presentations' equipment, microphones, and refreshment stations. Water dispensers were also available throughout the event to ensure the comfort of attendees.
• IT Agents: to display PowerPoint presentations and technical support in all activities.`
          },
          {
            heading: 'MARKETING STRATEGY',
            content: `The marketing strategy for the HultPrize UMP local competition event was fully done by all involved stakeholders (UMP CFERI staff members, and HultPrize organizing team) and poster by Mr. Tsumbedzo Ramadi Madzivhandila (HultPrize UMP Campus Director) which was then circulated in all social media platforms.`
          },
          {
            heading: 'BUDGET',
            content: `The UMP CFERI division provided a budget for refreshments and other logistic resources required for event to actively take place. The budget did cover for refreshments and gifts for the top 3 presenters.`
          },
          {
            heading: 'CONCLUSION AND OUTCOMES',
            content: `The Hult Prize UMP Local Competition held on 24th February 2026 concluded on a high note, showcasing the exceptional creativity, innovation, and entrepreneurial spirit of students at the University of Mpumalanga. The event successfully achieved its purpose of identifying and empowering student-led social enterprises with the potential to create meaningful and sustainable impact within communities.

After a competitive pitching session and careful deliberation by the judging panel, the top three teams were announced as follows:
• Winner: Eco-Polish
• Second Runner-Up: RitaVita Naturals
• Third Runner-Up: SM Vision Works

The winning team, Eco-Polish Startup, distinguished itself through a compelling presentation, innovative solution, and strong alignment with sustainable development principles. As a result, Eco-Polish was officially selected to represent UMP Hult Prize at the next stage of the competition.

All three top teams received tokens of appreciation in recognition of their outstanding effort, commitment, and entrepreneurial excellence. Their participation reflected not only the depth of talent at UMP CFERI but also the growing culture of social innovation on campus.

An important announcement was also made regarding the upcoming Bootcamp and National Competition, which will be hosted on the 27th–28th of March 2026 in Cape Town. The Bootcamp will provide teams with mentorship, refinement opportunities, and strategic guidance to strengthen their business models before competing at national level.

In conclusion, the HultPrize UMP Local Competition 2026 was a resounding success. It strengthened entrepreneurial engagement among students, fostered collaboration and leadership, and positioned Eco-Polish Startup to proudly carry the UMP flag at the National Competition. The event reaffirmed the University of Mpumalanga's commitment to nurturing innovative leaders capable of transforming ideas into impactful enterprises.`
          },
          {
            heading: 'REPORT ON THE RECENT PROGRAMS',
            content: `The Centre for Entrepreneurship Rapid Incubator (UMPCFERI) successfully hosted the Hult Prize UMP Local Competition for the first time on 24 February 2026 as part of the global Hult Prize Foundation movement, which challenges university students to develop viable and profitable social enterprises that address pressing societal needs while generating sustainable economic output. The primary purpose of the event was to cultivate an entrepreneurial mindset among students, stimulate innovation, and empower young leaders to design sustainable, impact-driven solutions aligned with global development priorities.

The competition attracted high-potential student entrepreneurs [14 presenters] and demonstrated UMP's commitment to producing graduates who are not only job seekers but also job creators, capable of contributing to socio-economic transformation.
Eco-Polish [2nd year student, producing polish from plastic] emerged as the overall winner chosen by the adjudicators, with Rita Vita Naturals [Ph.D. working on commercialising her research on wild fruit functional foods] and SM Vision Works [2nd year BICT student creating software for the education and agricultural sectors] as second and third runners-up respectively.

Notably, the national organisers subsequently invited an additional UMP start-up [Rita Vita Naturals] to the National Bootcamp and Competition in Cape Town, acknowledging that the University hosts more than one high-potential venture, although only one representative was initially expected.
UMPCFERI has requested that a single team member attend in order to contain institutional costs at this stage. Should the selected student entrepreneurs progress, they will advance to the Global Accelerator stage for bootcamps and compete with leading ventures worldwide.
In addition, a formal nomination has been received for the Hult Prize Coordinator of the Year, recognising the UMPCFERI's sustained contribution and support to entrepreneurship development on campus. Standard Bank officials were also present to provide support and present opportunities for entrepreneurs.`
          },
          {
            heading: 'TIA-YAEI YOUTH ENTREPRENEURSHIP CHALLENGE – 12 MARCH',
            content: `The Young African Entrepreneurs Institute (YAEI) requested the University of Mpumalanga Centre for Entrepreneurship Rapid Incubator (UMPCFERI) to co-host the Technology Innovation Agency (TIA) Youth Technology Innovation Provincial Competition held this Thursday as part of the build-up to the National South African Innovation Week (SAIW) 2026. UMPCFERI provided the venue, coordinated entrepreneur recruitment, secured a judge (Dr. Siyabonga Mgoduka), and supported programme delivery through a Program Director and Time Keeper, while YAEI covered all catering costs. The competition attracted 28 registered contestants comprising studentpreneurs, alumni, and community MSMEs. Following rigorous adjudication, ten innovators were selected to represent Mpumalanga at the national stage, including a current UMP studentpreneur, a UMP alumnus, and a community MSME previously supported by UMPCFERI.

The results demonstrate a strong pipeline of innovation supported by the Centre, with three of the top ten having previously participated in the Hult Prize competition, two alumni entrepreneurs, and two incubated community SMMEs among the finalists—evidence of sustained progression through entrepreneurship support programmes. The next step is confirmation by TIA and YAEI of the dates for the National South African Innovation Week, where all ten winners will be transported and accommodated with expenses covered. At the national level, participants will compete for significant funding opportunities to develop prototypes, advance technological innovations, and support business scale-up. This outcome positions UMP through UMPCFERI as key contributors to regional innovation development while expanding opportunities for student and community entrepreneurs to access national platforms and resources.`
          },
          {
            heading: 'UGO INITIATIVE AND PROPOSED CUSTODIANSHIP BY UMPCFERI – 13 MARCH',
            content: `Following the recent meeting with UGO student representatives, a formal request has been made for UMPCFERI to serve as the primary institutional custodian of the UGO Initiative at UMP. This role would enable the Centre to coordinate and expand access to international leadership and exchange opportunities for UMP students, particularly those demonstrating strong interest in sustainable development, entrepreneurship, and societal impact. The programme offers substantial benefits, including leadership and professional development, exposure to global networks, and collaboration with peers across Africa. Importantly, UGO covers major participation costs, including local and international travel, accommodation, and related expenses. Previous cohorts reportedly received funded travel, passport support, and subsistence allowances.

The fellowship spans 90 days, comprising 83 days of structured virtual leadership and skills development, followed by a 7-day inter-country immersion programme, and concludes with a Fellowship Summit and formal induction into the UGO Alumni Network. The curriculum aligns closely with UMP's strategic priorities and UMPCFERI's mandate, covering modules on 1. Ethical Leadership, 2. Sustainability and Environmental Stewardship, 3. Social Entrepreneurship and Green Economy Innovation, 4. Technology and Systems Thinking, 5. Community Development and Pan-African Collaboration, and 6. Diplomatic Protocol and International Etiquette delivered in partnership with the Department of International Relations and Cooperation (DIRCO). The programme is designed to develop globally competent, ethically grounded young leaders capable of driving sustainable solutions within their communities and beyond.

To ensure successful participation and programme completion, UMPCFERI proposes prioritising nominations from CFERI interns in the initial intake, subject to travel readiness and demonstrated commitment to the full training cycle. This approach will allow the Centre to pilot coordination mechanisms while supporting high-potential students who can effectively represent UMP internationally. The UGO team has also shared a sample Memorandum of Understanding previously signed with another university for institutional review and guidance on formalising the partnership.`
          },
          {
            heading: 'BRIEF ACHIEVEMENT REPORT - OCTOBER – DECEMBER 2025',
            content: `**Strategic Area 1: Governance, Strategic Leadership, And Management**

**Key Achievements:**

1. **SEDFA Grant Compliance and Performance Management**
UMPCFERI received formal confirmation of a 91% performance rating from SEDFA based on Q2 KPI verification, with Q3 verification successfully submitted and internally audited.
Impact: The Centre qualified for a full tranche payment and demonstrated strong governance, compliance, and impact accountability systems.

2. **Effective Governance Structures and Meetings**
The Centre convened its Advisory Strategic Planning session, Board meeting, staff monthly meetings, and multiple strategic engagements with internal and external stakeholders.
Impact: These structures strengthened strategic oversight, ensured alignment with institutional priorities, and enhanced decision-making effectiveness.

3. **Market Exhibition Day, Stakeholder Engagement Session, and SWEEP Conversations [27 October 2025]**
On 27 October 2025, the University of Mpumalanga Centre for Entrepreneurship and Rapid Incubator (UMPCFERI) hosted an event that included a Stakeholder Engagement Session, Market Day Exhibition, and SWEEP Conversations. This event aimed to introduce the new Vice-Chancellor, Professor Thenjiwe Meyiwa, to strategic partners and strengthen collaborations. Key discussions highlighted the presentation of an award-winning, innovative cassava and peanut project, emphasizing the potential for local economic impact and agro-processing. The Vice-Chancellor motivated partners to rethink their roles as co-creators of transformation. The Market Day Exhibition showcased over 20 student and community SMME entrepreneurs, providing them with visibility and learning opportunities from one another. Overall, the event reinforced UMPCFERI's commitment to fostering inclusive entrepreneurship and community empowerment through collaboration and innovation.

The Vice-Chancellor's involvement in an exhibition significantly enhanced support for student entrepreneurs by engaging directly with them, which demonstrated the university's commitment to their entrepreneurial pursuits. This hands-on approach enabled university leadership to gain a deeper understanding of the challenges faced by student-led businesses, facilitating the development of targeted support initiatives. The exhibition created a networking environment for student entrepreneurs, promoting collaboration, sustainability, and adaptability. Additionally, the SWEEP Conversations played a crucial role in advancing gender equity in entrepreneurship, serving as a platform for dialogue between male and female entrepreneurs. These discussions highlighted systemic barriers that hinder women's participation, emphasizing the need for mentorship and increased policy awareness. Overall, the events reflected the University of Mpumalanga's dedication to inclusivity and empowerment for sustainable economic growth.

**Strategic Area 2: Research And Knowledge Generation**

**Key Achievements:**

4. **Applied Entrepreneurship Research and Knowledge Production**
The BIWA 2nd International Conference on Business Innovation and Incubation highlighted the critical role universities play in driving entrepreneurial ecosystems through contextualized incubation, research commercialization, and community-rooted innovation. A key highlight for UMP was the presentation of the paper "Investigating the Efficacy of University-Led Business Incubators on Graduate Unemployment" by Mrs. Melody Chiume and Ms. Lethabo Maponya. The session generated strong engagement and valuable feedback, and the study was commended for its practical relevance, policy implications, and academic contribution. Importantly, the paper has been accepted for journal publication, pending reviewers' comments—an achievement that elevates UMP CFERI's research profile and affirms its growing influence in incubation scholarship. Reviewers and participants strongly encouraged the continuation of this research trajectory, recommending deeper exploration into university incubators' role in commercializing institutional intellectual property and strengthening incubation models that link innovation to national economic development
Impact: This strengthened UMP's contribution to national and international entrepreneurship scholarship and reinforced evidence-based incubation practice. Academic article on University-Led Business Incubation scheduled for publication on the 14th of January 2026.

5. **ASIP Conference 2025**
The University of Mpumalanga (UMP), through the Centre for Entrepreneurship and Rapid Incubation (CFERI), successfully participated in the Asian Society of Innovation and Policy (ASIP) Conference 2025 held on 4–5 December 2025 at the Cambodia University of Technology (CamTech) in Phnom Penh, Cambodia. The conference brought together policymakers, academics, and industry leaders from Asia and Africa to engage on digital innovation, governance, entrepreneurship, and innovation policy. UMP made notable academic contributions through paper presentations by its postgraduate researchers, strengthening the institution's visibility within the Asia–Africa innovation ecosystem. A significant highlight of the conference was the paper authored by Prof. Kanayo Ogujiuba and presented by Ms. Lethabo Maponya, titled "Governance, Digital Innovation, and Entrepreneurship in South Africa: Navigating the Fourth Industrial Revolution," which was awarded 1st Place for Best Paper, accompanied by a USD 300 prize. This achievement underscores UMP's growing research excellence and CFERI's strategic role in advancing policy-oriented scholarship, global collaboration, and innovation-led entrepreneurship discourse.

6. **Research-Based Studentpreneurship Development**
Three postgraduate studentpreneurs proceeded to the National EDHE final competitions, where they won a laptop together with all participants:
6.1. Ms. Sinorita Chauke (PhD Candidate)[ Supervised by Dr. Thepiso Ndlovu] – Founder of RitaVita Naturals
• Inspired by her Master's research, Nutraceutical Properties of Wild Fruits in Mpumalanga, Sinorita identified the underutilization of indigenous fruits rich in minerals like calcium, iron, and zinc.
• Through CFERI incubation, she transformed her idea into RitaVita Naturals, a health-focused enterprise that promotes nutritional wellness through locally sourced fruit products.
6.2. Ms. Noluthando Kubhayi – Master of Arts Student & Entrepreneur
Master of Arts (Sociology) student at the University of Mpumalanga
Research topic: "Investigating the Implications of Synthetic Hair on Black South African Women: A Case Study of Unemployed Black Women in Mangweni Village, Mpumalanga."
Supervisor: Dr. Mhandu | Co-supervisor: Dr. Sokani
Integrated her research focus into her business, Anami Beauty, to align academic and entrepreneurial goals
Actively involved in CFERI academic research, business modelling, and entrepreneurship competitions
Transformed her hair business into a social enterprise addressing community impact and self-image
Developed and currently selling a colouring book that promotes natural hair appreciation among young girls and boys
6.3. Ms. Zoleka Mkhize (Master's Candidate) – Founder of Greenactive
• Developed Green active after her Honours research "Evaluating Factors Affecting Youth Participation in Agricultural Cooperatives in Mbombela."
• Refined her entrepreneurial and public speaking skills through CFERI mentorship, bootcamps, and the EDHE Intervarsity Competition, advancing to the regional level.
• Her Master's study on "Impacts of Land Abandonment and Revitalisation Programs on Smallholder Farmer Welfare in Mbhashe" builds on her passion for agricultural revitalisation.
Through Green Active, Ms. Zoleka aims to create technology-driven tools that empower smallholder farmers and promote community-centered agriculture and food security.
These studentpreneurs, with academic research-based business ideas, were supported in developing research-driven business concepts. Notably, one student won a regional competition, two presented at regional rounds, and one advanced to the national finals.

Impact: This advanced the commercialisation of research outputs and reinforced UMP's innovation pipeline.

7. **Policy Research and Advisory Contribution**
UMPCFERI co-hosted consultative engagements informing the Mpumalanga Informal Sector Policy, integrating insights from municipalities and informal traders. Presented the draft Policy on the 11th of December 2025 and have edited it to be shared with a stakeholder before sending it to the DEDT.

Impact: The Centre is contributing to positioning UMP as a strong influence in the development of inclusive policies and strengthening its role as a provincial thought leader in entrepreneurship and informal economy development.

**Strategic Area 3: Teaching And Learning**

**Key Achievements:**

8. **Entrepreneurship Skills Development Programmes**
UMPCFERI delivered multiple structured interventions, including weekly business pitching and coaching sessions for studentpreneurs and community SMMEs. Notably, the 4-week Standard Bank Financial Literacy program. The Standard Bank Enterprise Banking Programme: Wallet Wise is a four-week, free financial literacy training initiative designed to empower historically disadvantaged entrepreneurs in Mbombela. Scheduled from October 16 to November 6, 2025, the program comprises weekly sessions that cover essential financial skills, including income statements, taxation, costing, and budgeting, culminating in a graduation ceremony with prizes and potential funding opportunities for participants. Key stakeholders include Standard Bank and UMPCFERI, facilitating an inclusive learning platform for aspiring MSME owners and student entrepreneurs. Participants, categorized into incubators and accelerators, learned practical business management skills and received recognition and awards for their businesses.

Impact: Participants improved their investor readiness, communication skills, and business model clarity, contributing to increased competition success and enhanced funding preparedness.

9. **Short Learning Programme (SLP) Development**
A dedicated writing retreat resulted in completed draft documentation for Entrepreneurship Development and Innovation Programmes and Entrepreneurship Skills Training SLPs.
Impact: These programmes enhance structured entrepreneurship education and support institutional income generation and skills certification.

10. **Entrepreneurial Planning Institute- Financial Literacy Training**
Six studentpreneurs and SMMEs completed the LearnBiz Financial Literacy Accelerator Programme,
Impact: Participants reported improved financial management, increased revenue growth, and enhanced expenditure tracking, thereby strengthening business sustainability.

**Strategic Area 4: Planning And Institutional Support**

**Key Achievements:**

11. **Incubation Infrastructure Utilisation**
Three studentpreneurs utilised private offices, while over 20 consistently accessed shared co-working spaces.
Impact: This enabled business operations, collaboration, and professionalisation, while highlighting demand for expanded infrastructure.

12. **Commercial Progress of Incubated Enterprises**
Resident studentpreneurs secured vendor status, corporate clients, international training opportunities, and revenue-generating contracts.

Impact: These outcomes demonstrate the commercial viability of incubated businesses and the effectiveness of UMPCFERI's support systems.

**Strategic Area 5: Quality Student Experience**

**Key Achievements:**

13. **Market Exhibition Day and Stakeholder Engagement**
UMPCFERI hosted a Market Exhibition Day and Stakeholder Engagement Session attended by the Vice-Chancellor and key partners.
Impact: Studentpreneurs gained visibility, confidence, and direct institutional support, strengthening their entrepreneurial identity.

14. **SWEEP Conversations and Annual Conference**
The SWEEP Annual Conference and Siyabuswa engagement celebrated women in leadership and entrepreneurship, attracting over 100 participants.
The 2025 UMPCFERI SWEEP Annual Conference, themed "Celebrating Women in Leadership," took place on November 7, 2025, at the University of Mpumalanga, attracting over 100 attendees, including students, staff, and external stakeholders. The conference celebrated women's leadership and aimed to empower young women while reflecting on the SWEEP Chapter's journey from 2022 to 2025. The welcoming address by Prof. Dhavhana Maselesele emphasized the university's commitment to prioritizing student leadership and development. The keynote by Ms. Ntsiki Mkhize focused on ethical leadership and the transformative impact of SWEEP in enhancing women's involvement in entrepreneurship. She stressed the importance of collaboration among various stakeholders to foster inclusive growth. The conference included a panel discussion featuring successful SWEEP members, who shared their entrepreneurial journeys, highlighting resilience and the support received from the SWEEP program. Additionally, a presentation showcased the SWEEP Chapter's milestones and achievements, reinforcing its role in empowering young women at the university.
The presentation detailed the positive impact of UMP SWEEP in empowering young women through confidence-building, academic improvement, and the development of leadership skills, while also promoting entrepreneurship. Emphasizing the organization's role in fostering a supportive sisterhood and aligning student development with national economic priorities, students reflected on the significant progress made over the past three years. The event featured a Recognition Awards Ceremony honouring mentors and top female student entrepreneurs, acknowledging their contributions to entrepreneurship and leadership within the UMP community. The conference achieved strong attendance, enhanced institutional visibility for UMP SWEEP, and emphasized the importance of collaboration among various organizations. Key recommendations moving forward include establishing a structured mentorship program for budding entrepreneurs.

Impact: These initiatives advanced gender equity, leadership development, and inclusive entrepreneurship among women students.

15. **Siyabuswa- Student Women Entrepreneurship Event**
UMPCFERI celebrated strength, sisterhood, and success during the UMP SWEEP Unfold End-of-Year Function held at the Siyabuswa campus on November 14. This event highlighted the achievements of women and emphasized the importance of mutual support within the community. It served as a powerful reminder of what can be accomplished when women uplift one another. The day was marked by recognition of the contributions of various individuals, including Ms. Confidence Ndlovu, Ms. Cynthia Moshaba, Mr. Asheley Malebe, and Ms. Bongiwe Nkosi, who played significant roles in making 2025 an unforgettable year for the Siyabuswa student women and staff.

**Strategic Area 6: Engagement And Partnerships**

**Key Achievements:**

16. **National and International Partnerships Strengthened**
Active collaborations were sustained with SEDFA, EDHE, Standard Bank, ABSA, YAEI, Eskom, UNIIC, and international universities.

17. **EDHE recognised UMPCFERI as one of the top 7 Entrepreneurship Champion teams in the country, championing entrepreneurship at the University.**

Impact: These partnerships expanded access to funding, platforms, mentorship, and global exposure for studentpreneurs.

18. **International Competitions and Recognition**
UMPCFERI studentpreneurs secured first place at the Intra-Africa 2063 Competition in Egypt and recognition at UNIIC platforms. The UMPCFERI team secured position 6 out of 14 for a business idea and first place for the Best Paper award, earning $US300.
Impact: This enhanced UMP's global visibility and demonstrated the competitiveness of its entrepreneurship ecosystem.

**Key Achievements Summary:**
1. UMPCFERI Team wins 1st place in the Intra-Africa Egypt Competition
2. 2 studentpreneurs proceed to the EDHE National competitions, 1 won 25,000 as 1st place under Existing Business Tech.
3. Studentpreneur 1st Year Mr. Sandile Mzimba wins 30,000 at the Sustainable Development Solutions Network,
4. Mr. Sandile Mzimba won as the top ABSA YAEI entrepreneur at the National Youth Entrepreneurship tour. 4 more students and community SMMEs were part of the Top 10 Nationally. 5 studentpreneurs within the top 10 and 3 community SMMEs.
5. Community SMME and alumni awarded prizes at the Standard Bank Financial Literacy pitching Contest
6. Studentpreneurs and Community SMMEs win top 3 places at the Charged-up Africa Network competition

**Strategic Area 7: Financial Sustainability**

**Key Achievements:**

19. **Achievement of Key Impact Indicators**
By the end of Q3, UMPCFERI had achieved or exceeded most of its annual SEDFA targets, including the number of MSMEs supported, jobs created, jobs sustained, and turnover growth.
Impact: SEDFA shall pay the full grant for the CFERI SEDFA Grant Cost Code.
This confirms efficient resource utilisation and strong return on public funding investment.

20. **Readiness for Graduation and Exit Audits**
Although no graduations were scheduled for Q3, systems are in place for graduation audits in Q4, as incubation agreements are set to conclude in March 2026.
Impact: This ensures compliance with incubation lifecycle requirements and accurate reporting of impacts.

**Strategic Area 8: Human Resources**

**Key Achievements:**

21. **Capacity Building and Staff Development**
Staff participated in national and international conferences, benchmarking visits, and curriculum development activities.
Impact: This enhanced institutional capability, staff expertise, and programme quality.

**Overall Quarter Impact**
Institutional and Ecosystem Impact
UMPCFERI exceeded key performance indicators, achieved national and international recognition, strengthened internal and external partnerships, and expanded entrepreneurship education and research outputs.
Impact: The Centre continues to position the University of Mpumalanga as a leading hub for entrepreneurship, innovation, and inclusive economic development.`
          }
        ],
        authors: ['Tsumbedzo Ramadi-Madzivhandila', 'Caroline Seitshiro'],
        contactDetails: ['076 405 5974', '071 165 8591'],
        campus: 'Mbombela campus',
        division: 'UMPCFERI',
        eventDate: '24 FEBRUARY 2026',
        submissionDate: '03 MARCH 2026',
        socialLinks: {
          linkedin: 'https://www.linkedin.com/in/ump-centre-for-entrepreneurship-0256bb282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
          facebook: 'https://www.facebook.com/ump.sweep.chapter?mibextid=JroKGi',
          instagram: 'https://www.instagram.com/ump_sweep_chapter?igsh=MTJnNG9mM20xZGF6ZQ==',
          cferiInstagram: 'https://www.instagram.com/umpcferi?igsh=YzAwZjE1ZTI0Zg==',
          hultPrizeActivity: 'https://www.linkedin.com/posts/hultprize-ump-457aa03a2_hultprize-hultprizeump-entrepreneurship-activity-7439302210296913920-w0Ru?utm_source=share&utm_medium=member_android&rcm=ACoAAGLCxIMBfZbwbKK8WN543qOapRkxcHhax2M',
          eventFacebook: 'https://www.facebook.com/share/p/1DLRN6zwc6/',
          eventInstagram: 'https://www.instagram.com/p/DV8o3uNDB1I/?igsh=MWp6eTl1bHR1NGJ3NQ==',
          tiktok: 'https://vt.tiktok.com/ZSu9D8Jqf/'
        }
      }
    }
  ];

  // partners are fetched from the backend

  const openSectionProgramModal = (program) => {
    setSelectedSectionProgram(program);
    setShowSectionModal(true);
    document.body.style.overflow = 'hidden';
  };

  const openSubProgramModal = (subProgram) => {
    setSelectedSubProgram(subProgram);
    setShowSubProgramModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setShowSectionModal(false);
    setShowSubProgramModal(false);
    setSelectedProgram(null);
    setSelectedSectionProgram(null);
    setSelectedSubProgram(null);
    document.body.style.overflow = 'auto';
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="programs-page">
      {/* Hero Section */}
      <section className="programs-hero">
        {slides.length > 0 && (
          <div className="programs-hero-slideshow">
            {slides.map((slide, index) => (
              <div
                key={slide._id}
                className={`program-slide ${index === activeSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="program-slide-overlay" />
              </div>
            ))}
            <button type="button" className="hero-slide-nav prev" onClick={goPrevSlide} aria-label="Previous slide">‹</button>
            <button type="button" className="hero-slide-nav next" onClick={goNextSlide} aria-label="Next slide">›</button>
          </div>
        )}
        <div className="programs-hero-overlay"></div>
        <div className="programs-hero-content">
          <h1 className="programs-hero-title">Our Programs</h1>
          <p className="programs-hero-subtitle">
            Discover comprehensive programs designed to nurture entrepreneurs at every stage of their journey
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <div className="programs-quick-nav">
        <div className="container">
          <div className="quick-nav-links">
            {programCategories.map(category => (
              <button 
                key={category.id}
                className="quick-nav-btn"
                onClick={() => scrollToSection(category.id)}
                style={{ '--hover-color': category.color }}
              >
                <span className="nav-icon">{category.icon}</span>
                <span>{category.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Program Categories with Clickable Cards */}
      <div className="programs-container">
        {programCategories.map(category => (
          <section key={category.id} id={category.id} className="program-category-section">
            <div className="category-header">
              <div className="category-icon" style={{ backgroundColor: category.color }}>
                {category.icon}
              </div>
              <div className="category-title-wrapper">
                <h2 className="category-title">{category.title}</h2>
                <p className="category-description">{category.description}</p>
              </div>
            </div>
            
            {/* Regular program cards */}
            <div className="category-programs-grid">
              {category.programs.map((program, index) => (
                <div 
                  key={program.id} 
                  className="category-program-card"
                  onClick={() => openSectionProgramModal(program)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="program-card-header" style={{ backgroundColor: category.color }}>
                    <span className="program-icon-small">{category.icon}</span>
                  </div>
                  <div className="program-card-body">
                    <h3>{program.name}</h3>
                    <p className="program-description">{program.description}</p>
                    <div className="program-card-footer">
                      <span className="learn-more-btn">
                        Learn More <i className="fas fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dropdown for Student Chapters (inside Funding Competitions) */}
            {category.hasDropdown && (
              <div className="dropdown-section">
                <button 
                  className={`dropdown-toggle-btn ${openDropdown === category.id ? 'active' : ''}`}
                  onClick={() => toggleDropdown(category.id)}
                  style={{ borderColor: category.dropdownColor }}
                >
                  <span>
                    <span className="dropdown-icon">{category.dropdownIcon}</span>
                    {category.dropdownTitle}
                  </span>
                  <i className={`fas fa-chevron-${openDropdown === category.id ? 'up' : 'down'}`}></i>
                </button>
                
                {openDropdown === category.id && (
                  <div className="dropdown-content">
                    {studentChapters.map((chapter, index) => (
                      <div 
                        key={chapter.id}
                        className="dropdown-item"
                        onClick={() => openSectionProgramModal(chapter)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="dropdown-item-icon" style={{ backgroundColor: category.dropdownColor }}>
                          {chapter.image ? (
                            <img src={chapter.image} alt={chapter.name} className="chapter-logo" />
                          ) : (
                            chapter.id === 'sweep' ? '👭' : chapter.id === 'cop' ? '👥' : chapter.id === 'sabya' ? '🌍' : '🏆'
                          )}
                        </div>
                        <div className="dropdown-item-content">
                          <h4>{chapter.name}</h4>
                          <p>{chapter.description}</p>
                        </div>
                        <i className="fas fa-chevron-right"></i>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        ))}

        {/* Partners Section */}
        <section className="partners-section">
          <div className="section-header">
            <h2 className="section-title">Our Partners</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">Collaborating with industry leaders to support student entrepreneurs</p>
          </div>
          
          <div className="partners-grid">
            {(Array.isArray(partners) ? partners : []).map((partner, index) => (
              <div key={partner?._id || index} className="partner-card">
                <div className="partner-logo">
                  {partner.logo ? (
                    // If logo is a local upload path or full URL, show image
                    (partner.logo.startsWith('/uploads/') || partner.logo.startsWith('http')) ? (
                      <img src={partner.logo} alt={partner.name} />
                    ) : (
                      partner.logo
                    )
                  ) : (
                    partner.name?.charAt(0) || 'P'
                  )}
                </div>
                <h3>{partner.name}</h3>
                <p>{partner.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modal for Section Programs */}
      {showSectionModal && selectedSectionProgram && (
        <div className="program-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-header" style={{ borderColor: '#ff8c00' }}>
              <div className="modal-icon" style={{ backgroundColor: '#ff8c00' }}>
                {selectedSectionProgram.image ? (
                  <img src={selectedSectionProgram.image} alt={selectedSectionProgram.name} className="modal-logo" />
                ) : (
                  selectedSectionProgram.id === 'sweep' ? '👭' : 
                  selectedSectionProgram.id === 'cop' ? '👥' : 
                  selectedSectionProgram.id === 'sabya' ? '🌍' : 
                  selectedSectionProgram.id === 'hult' ? '🏆' :
                  selectedSectionProgram.id === 'edhe-programme' ? '🎓' : '📋'
                )}
              </div>
              <div className="modal-title">
                <h2>{selectedSectionProgram.name}</h2>
                <p>{selectedSectionProgram.description}</p>
              </div>
            </div>

            <div className="modal-body">
              {/* Full Details */}
              <div className="modal-section">
                <h3>Program Details</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{selectedSectionProgram.fullDetails || selectedSectionProgram.description}</p>
              </div>

              {/* Full Description (if exists) */}
              {selectedSectionProgram.fullDescription && (
                <div className="modal-section">
                  <h3>About {selectedSectionProgram.name}</h3>
                  <p style={{ whiteSpace: 'pre-line' }}>{selectedSectionProgram.fullDescription}</p>
                </div>
              )}

              {/* Goals (for EDHE Programme) */}
              {selectedSectionProgram.goals && (
                <div className="modal-section">
                  <h3>Program Goals</h3>
                  <ul className="modal-list">
                    {selectedSectionProgram.goals.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ADDED: Sub-programs section (for Student Indaba inside EDHE) */}
              {selectedSectionProgram.subPrograms && selectedSectionProgram.subPrograms.length > 0 && (
                <div className="modal-section">
                  <h3>Related Programs</h3>
                  <div className="sub-programs-list">
                    {selectedSectionProgram.subPrograms.map((subProgram) => (
                      <div 
                        key={subProgram.id}
                        className="sub-program-item"
                        onClick={() => openSubProgramModal(subProgram)}
                      >
                        <div className="sub-program-icon">📅</div>
                        <div className="sub-program-content">
                          <h4>{subProgram.name}</h4>
                          <p>{subProgram.description}</p>
                          <span className="click-hint">Click to learn more <i className="fas fa-arrow-right"></i></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Info (for EDHE Programme) */}
              {selectedSectionProgram.contactInfo && (
                <div className="modal-section">
                  <h3>Contact Information</h3>
                  {selectedSectionProgram.contactInfo.website && (
                    <p><i className="fas fa-globe"></i> <a href={selectedSectionProgram.contactInfo.website} target="_blank" rel="noopener noreferrer" style={{ color: '#e31b23' }}>{selectedSectionProgram.contactInfo.website}</a></p>
                  )}
                  {selectedSectionProgram.contactInfo.contact && (
                    <p><i className="fas fa-envelope"></i> <a href={selectedSectionProgram.contactInfo.contact} target="_blank" rel="noopener noreferrer" style={{ color: '#e31b23' }}>Contact Page</a></p>
                  )}
                </div>
              )}

              {/* Social Media for EDHE Programme */}
              {selectedSectionProgram.contactInfo?.social && (
                <div className="modal-section">
                  <h3>Connect on Social Media</h3>
                  <div className="program-social-links" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selectedSectionProgram.contactInfo.social.facebook && (
                      <a href={selectedSectionProgram.contactInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="social-link-prog" style={{ background: '#1877f2', color: 'white' }}>
                        <i className="fab fa-facebook-f"></i> Facebook
                      </a>
                    )}
                    {selectedSectionProgram.contactInfo.social.twitter && (
                      <a href={selectedSectionProgram.contactInfo.social.twitter} target="_blank" rel="noopener noreferrer" className="social-link-prog" style={{ background: '#1da1f2', color: 'white' }}>
                        <i className="fab fa-twitter"></i> Twitter
                      </a>
                    )}
                    {selectedSectionProgram.contactInfo.social.instagram && (
                      <a href={selectedSectionProgram.contactInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="social-link-prog" style={{ background: '#e4405f', color: 'white' }}>
                        <i className="fab fa-instagram"></i> Instagram
                      </a>
                    )}
                    {selectedSectionProgram.contactInfo.social.linkedin && (
                      <a href={selectedSectionProgram.contactInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link-prog" style={{ background: '#0077b5', color: 'white' }}>
                        <i className="fab fa-linkedin-in"></i> LinkedIn
                      </a>
                    )}
                    {selectedSectionProgram.contactInfo.social.youtube && (
                      <a href={selectedSectionProgram.contactInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="social-link-prog" style={{ background: '#ff0000', color: 'white' }}>
                        <i className="fab fa-youtube"></i> YouTube
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Who Should Join (for SABYA) */}
              {selectedSectionProgram.whoShouldJoin && (
                <div className="modal-section">
                  <h3>Who Should Join?</h3>
                  <ul className="modal-list">
                    {selectedSectionProgram.whoShouldJoin.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Why Join (for SABYA) */}
              {selectedSectionProgram.whyJoin && (
                <div className="modal-section">
                  <h3>Why Join?</h3>
                  <ul className="modal-list">
                    {[...new Set(selectedSectionProgram.whyJoin)].map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What We Do (for SABYA) */}
              {selectedSectionProgram.whatWeDo && (
                <div className="modal-section">
                  <h3>What We Do</h3>
                  <ul className="modal-list">
                    {[...new Set(selectedSectionProgram.whatWeDo)].map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Objectives (for SWEEP & SABYA) */}
              {selectedSectionProgram.objectives && selectedSectionProgram.id !== 'hult' && (
                <div className="modal-section">
                  <h3>Key Objectives</h3>
                  <ul className="modal-list">
                    {selectedSectionProgram.objectives.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Chapter Objectives (for SWEEP) */}
              {selectedSectionProgram.chapterObjectives && (
                <div className="modal-section">
                  <h3>SWEEP University Chapters</h3>
                  <ul className="modal-list">
                    {selectedSectionProgram.chapterObjectives.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Workshops (for SWEEP) */}
              {selectedSectionProgram.workshops && (
                <div className="modal-section">
                  <h3>SWEEP Capacity Building Workshops</h3>
                  <p>{selectedSectionProgram.workshops}</p>
                </div>
              )}

              {/* Constitution (for SWEEP) */}
              {selectedSectionProgram.constitution && (
                <div className="modal-section">
                  <h3>The SWEEP Constitution</h3>
                  <p style={{ whiteSpace: 'pre-line' }}>{selectedSectionProgram.constitution}</p>
                </div>
              )}

              {/* Event Report (for HULT) */}
              {selectedSectionProgram.eventReport && (
                <div className="modal-section">
                  <h3>{selectedSectionProgram.eventReport.title}</h3>
                  {selectedSectionProgram.eventReport.sections.map((section, index) => (
                    <div key={index} style={{ marginBottom: '2rem' }}>
                      <h4 style={{ color: '#e31b23', marginBottom: '1rem', borderBottom: '2px solid #e31b23', paddingBottom: '0.5rem' }}>
                        {section.heading}
                      </h4>
                      <div style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                        {section.content}
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <h4 style={{ color: '#242753', marginBottom: '1rem' }}>Report Details</h4>
                    <p><strong>Written by:</strong> {selectedSectionProgram.eventReport.authors.join(', ')}</p>
                    <p><strong>Contact:</strong> {selectedSectionProgram.eventReport.contactDetails.join(', ')}</p>
                    <p><strong>Campus:</strong> {selectedSectionProgram.eventReport.campus}</p>
                    <p><strong>Division:</strong> {selectedSectionProgram.eventReport.division}</p>
                    <p><strong>Event Date:</strong> {selectedSectionProgram.eventReport.eventDate}</p>
                    <p><strong>Submission Date:</strong> {selectedSectionProgram.eventReport.submissionDate}</p>
                  </div>
                  {selectedSectionProgram.eventReport.socialLinks && (
                    <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
                      <h4 style={{ color: '#242753', marginBottom: '1rem' }}>Connect with UMPCFERI</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                        <a href={selectedSectionProgram.eventReport.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', textDecoration: 'none', fontSize: '24px' }} title="LinkedIn">
                          <i className="fab fa-linkedin"></i>
                        </a>
                        <a href={selectedSectionProgram.eventReport.socialLinks.facebook} target="_blank" rel="noopener noreferrer" style={{ color: '#1877f2', textDecoration: 'none', fontSize: '24px' }} title="Facebook (SWEEP)">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href={selectedSectionProgram.eventReport.socialLinks.instagram} target="_blank" rel="noopener noreferrer" style={{ color: '#e4405f', textDecoration: 'none', fontSize: '24px' }} title="Instagram (SWEEP)">
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a href={selectedSectionProgram.eventReport.socialLinks.cferiInstagram} target="_blank" rel="noopener noreferrer" style={{ color: '#e4405f', textDecoration: 'none', fontSize: '24px' }} title="Instagram (CFERI)">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </div>
                      <h4 style={{ color: '#242753', marginTop: '1.5rem', marginBottom: '1rem' }}>Hult Prize Event Links</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                        <a href={selectedSectionProgram.eventReport.socialLinks.hultPrizeActivity} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', textDecoration: 'none', fontSize: '24px' }} title="LinkedIn Activity">
                          <i className="fab fa-linkedin"></i>
                        </a>
                        <a href={selectedSectionProgram.eventReport.socialLinks.eventFacebook} target="_blank" rel="noopener noreferrer" style={{ color: '#1877f2', textDecoration: 'none', fontSize: '24px' }} title="Facebook Post">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href={selectedSectionProgram.eventReport.socialLinks.eventInstagram} target="_blank" rel="noopener noreferrer" style={{ color: '#e4405f', textDecoration: 'none', fontSize: '24px' }} title="Instagram Post">
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a href={selectedSectionProgram.eventReport.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: 'none', fontSize: '24px' }} title="TikTok Video">
                          <i className="fab fa-tiktok"></i>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Benefits */}
              {selectedSectionProgram.benefits && selectedSectionProgram.id !== 'hult' && (
                <div className="modal-section">
                  <h3>Benefits</h3>
                  <ul className="modal-list">
                    {selectedSectionProgram.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Eligibility */}
              {selectedSectionProgram.eligibility && selectedSectionProgram.id !== 'hult' && (
                <div className="modal-section">
                  <h3>Eligibility Criteria</h3>
                  <ul className="modal-list">
                    {selectedSectionProgram.eligibility.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prizes (for EDHE Competition) */}
              {selectedSectionProgram.prizes && (
                <div className="modal-section">
                  <h3>Prizes</h3>
                  <ul className="modal-list">
                    {selectedSectionProgram.prizes.map((prize, index) => (
                      <li key={index}>{prize}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact and Deadline */}
              <div className="modal-details-grid">
                {selectedSectionProgram.contact && (
                  <div className="detail-item">
                    <i className="far fa-envelope"></i>
                    <div>
                      <strong>Contact</strong>
                      <p>{selectedSectionProgram.contact}</p>
                    </div>
                  </div>
                )}
                {selectedSectionProgram.deadline && (
                  <div className="detail-item">
                    <i className="far fa-calendar-alt"></i>
                    <div>
                      <strong>Deadline</strong>
                      <p>{selectedSectionProgram.deadline}</p>
                    </div>
                  </div>
                )}
                {selectedSectionProgram.applicationDeadline && (
                  <div className="detail-item">
                    <i className="far fa-calendar-alt"></i>
                    <div>
                      <strong>Deadline</strong>
                      <p>{selectedSectionProgram.applicationDeadline}</p>
                    </div>
                  </div>
                )}
                {selectedSectionProgram.nextCohort && (
                  <div className="detail-item">
                    <i className="far fa-clock"></i>
                    <div>
                      <strong>Next Cohort</strong>
                      <p>{selectedSectionProgram.nextCohort}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Media (for regular programs) */}
              {selectedSectionProgram.social && !selectedSectionProgram.contactInfo && (
                <div className="modal-section">
                  <h3>Connect on Social Media</h3>
                  <div className="program-social-links">
                    {selectedSectionProgram.social.instagram && (
                      <a 
                        href={selectedSectionProgram.social.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-link-prog instagram"
                      >
                        <i className="fab fa-instagram"></i> Follow on Instagram
                      </a>
                    )}
                    {selectedSectionProgram.social.tiktok && (
                      <a 
                        href={selectedSectionProgram.social.tiktok} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-link-prog tiktok"
                      >
                        <i className="fab fa-tiktok"></i> Follow on TikTok
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* External Link (for SWEEP) */}
              {selectedSectionProgram.externalLink && (
                <div className="modal-section">
                  <h3>Learn More</h3>
                  <a 
                    href={selectedSectionProgram.externalLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="external-link-btn"
                    style={{ backgroundColor: '#9c27b0' }}
                  >
                    Visit EDHE SWEEP Website <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              )}

              {/* Partners */}
              {selectedSectionProgram.partners && (
                <div className="modal-section">
                  <h3>Partners</h3>
                  <div className="partners-list">
                    {selectedSectionProgram.partners.map((partner, index) => (
                      <span key={index} className="partner-tag">{partner}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Sub Programs (Student Indaba) */}
      {showSubProgramModal && selectedSubProgram && (
        <div className="program-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-header" style={{ borderColor: '#e31b23' }}>
              <div className="modal-icon" style={{ backgroundColor: '#e31b23' }}>
                📅
              </div>
              <div className="modal-title">
                <h2>{selectedSubProgram.name}</h2>
                <p>{selectedSubProgram.description}</p>
              </div>
            </div>

            <div className="modal-body">
              {/* Full Details */}
              <div className="modal-section">
                <h3>Program Details</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{selectedSubProgram.fullDetails}</p>
              </div>

              {/* Full Description */}
              {selectedSubProgram.fullDescription && (
                <div className="modal-section">
                  <h3>About {selectedSubProgram.name}</h3>
                  <p style={{ whiteSpace: 'pre-line' }}>{selectedSubProgram.fullDescription}</p>
                </div>
              )}

              {/* Benefits */}
              {selectedSubProgram.benefits && (
                <div className="modal-section">
                  <h3>Benefits</h3>
                  <ul className="modal-list">
                    {selectedSubProgram.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Eligibility */}
              {selectedSubProgram.eligibility && (
                <div className="modal-section">
                  <h3>Eligibility Criteria</h3>
                  <ul className="modal-list">
                    {selectedSubProgram.eligibility.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact and Deadline */}
              <div className="modal-details-grid">
                {selectedSubProgram.contact && (
                  <div className="detail-item">
                    <i className="far fa-envelope"></i>
                    <div>
                      <strong>Contact</strong>
                      <p>{selectedSubProgram.contact}</p>
                    </div>
                  </div>
                )}
                {selectedSubProgram.deadline && (
                  <div className="detail-item">
                    <i className="far fa-calendar-alt"></i>
                    <div>
                      <strong>Deadline</strong>
                      <p>{selectedSubProgram.deadline}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Programs;