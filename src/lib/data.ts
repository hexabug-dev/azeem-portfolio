export type CaseStudy = {
  slug: string;
  tags: string[];
  title: string;
  client: string;
  cardImage: string;
  heroImage: string;
  intro: string;
  previewLink?: { label: string; href: string };
  duration: string;
  role: string;
  sections: { heading?: string; body: string[] }[];
  gallery?: string[];
  tools: string[];
  testimonial?: { quote: string; name: string; title: string };
  credits: string[];
  featured: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "prixon-inteface",
    tags: ["Interaction", "Prototyping", "3D Design"],
    title: "Smart Experience for Non-Smart TV Users",
    client: "Prixon UAE",
    cardImage: "/images/NAHig5m7Pq6K5st4lXXqekHgY.jpg",
    heroImage: "/images/UZHhJBJmTjfU4QSb0ajDQ9bUZY.jpg",
    intro:
      "We redesigned the launcher interface for Prixon, a streaming media player that converts regular televisions into smart ones, enabling users to access a vast array of content such as news, movies, music and radio.",
    previewLink: {
      label: "View Full Preview",
      href: "https://drive.google.com/drive/folders/1-M3GegBakDvHIBPikzAv3XKHfiKQAXX2",
    },
    duration: "4 Weeks",
    role: "Lead Interaction Designer",
    sections: [
      {
        heading: "Background",
        body: [
          "Prixon is a cutting-edge streaming media player that can effectively convert traditional TVs into smart devices, enabling users to access a vast array of online content, such as TV shows, movies, music, and radio. By leveraging an internet connection, the player facilitates seamless streaming of content from well-known services like Netflix, DonTV, Amazon Prime Video, Hulu, and YouTube. It also allows installation of custom apps should you have to install one.",
        ],
      },
      {
        heading: "The Design Issues",
        body: [
          "1. Users Found it Technical — We carried out usability tests with 15 people and asked them to verbalize what they felt as they interacted with the initial interface. The sessions revealed that users found the interface for Prixon to be hard in outlook and technical. They felt some buttons were small or out of sight, the navigation challenged their intuition, and some had to have known how the system behaved before they could interact with it better.",
          "Users simply want to watch a show or entertaining movie and should not have to be exposed to a technical-looking screen, thus, a better interface that addressed the realized limitations had to be designed. The prototype was to be simple, easy to navigate, intuitive, accessible and marketable.",
          "2. DonTV Emphasis — Prixon owns DonTV, and they needed to use this medium to bring the app to the face of people as well, so we had to come up with a layout that made DonTV stick out from the set of other applications without being intrusive.",
          "3. Visual Appeal — The UI needed a overhaul, right from the booting screen to the setup pages and the main home launcher. It had to be different from the previous one, but more easy to operate. With product design guidelines from Google's Design-for-TV Foundations Guide and inspirations from LG Smart TV, I sketched some concepts on excalidraw which led me into creating a process checklist: tune the colours, declutter the launcher screen, create an apps gallery, new icons, background for each system apps, and emphasize DonTV.",
        ],
      },
      {
        heading: "Redesigning The Launcher",
        body: [
          "The Native Apps on Home Screen — The 3D Illustrator provided some background illustrations for other native apps that will be pre-installed in the device. These were done on Blender3D. The apps, NETFLIX, HULU, SPOTIFY, PRIME and Playstore came with the device.",
          "Background Transitions for Apps — I designed the home screen to feature apps from the previous UI but with a refreshed look. Each app, when selected, would display its respective background. Additionally, the quick settings icons underwent a redesign and were positioned at the bottom of the screen.",
        ],
      },
      {
        heading: "App Gallery",
        body: [
          "The Application Library — I introduced an app gallery where users could conveniently access and open all installed applications, allowing users to easily navigate through their customized selection of apps for managing and launching applications.",
          "Access to All Apps — Whether users had installed applications individually or customized them according to their preferences, the app gallery simplified the process of app management, ensuring a user-friendly interface for navigation and utilization.",
        ],
      },
      {
        heading: "Emphasizing DonTV",
        body: [
          "A special request by the Prixon Team was to put some emphasis on DonTV (Prixon's product), making it stand out among other apps. To achieve this, two strategies were put in place: default selection of DonTV after startup, and previews of DonTV's four sections (Series, Video-On-Demand, Radio, and LiveTV) presented below the app to captivate and pique the user's interest.",
          "The other apps did not have this same privilege — DonTV's selected state stands in visible contrast to the Amazon Prime app's selected state.",
        ],
      },
      {
        heading: "Other Screens",
        body: [
          "I also designed other screens including the booting animation, language settings, file browser, software update, quick settings dialogue and volume.",
        ],
      },
      {
        heading: "The Impact on Users and Prixon",
        body: [
          "We had the same users test the new prototype by giving them a set of tasks to do, moderated with realistic scenarios like changing the language or checking hotspot connectivity. Most users found the tasks doable within the ideal timeframe and there was positive feedback across all testers about the outlook.",
          "On the side of Prixon, they were satisfied with the new architecture and the emphasis strategy for the DonTV app. They also got positive feedback from retailers and DonTV recorded more viewership than in the previous setup.",
        ],
      },
    ],
    gallery: [
      "/images/0sFplSy75pNDFElfxX6Dd4GR69I.png",
      "/images/3kLKkbs6rp5NVQt9FhPGtFc.png",
      "/images/Xm2LXBitR1YKGnWG2q1OH3wuMA.png",
      "/images/ED54n7NwYjgnAeHrC2JMZJP82XE.png",
      "/images/gBMpfXF2RXjs7vf02G6dXCT7U.png",
      "/images/2DY5F87Rw2IFFENTqE8hbBYeQk.png",
      "/images/ChBo6rYEHlcYeBup98EucggwBFI.png",
      "/images/b3QsGEktGUuDOwkO1JV2uv5heyo.png",
      "/images/pQXyJ976z2O8Fct9hehBmEhvxFk.png",
      "/images/Ok9LkoYDmBizX9GG1JVgC0o6Ws.png",
      "/images/oJAHFMDkzG0ss3aGP6kyeHD9Y.png",
      "/images/Z7uJLQ4OOlof2UKFiqhh8HQUwY.png",
    ],
    tools: ["Figma", "Adobe Photoshop", "Blender"],
    testimonial: {
      quote:
        "We've worked with Azeem's team multiple times, and it has always been a pleasure! His redesign on our interfaces captivated our audience and made them easier to interact with. Azeem also works in a very timely manner, communicates and always ensures that you are fully satisfied with the results!",
      name: "AbdelMajid",
      title: "MD at Prixon.tv",
    },
    credits: [
      "3D Illustration - Olanrewaju Oguniran",
      "Art Direction - Azeem Gbadamosi",
      "Research and Testing - Azeem Gbadamosi & Awwal Adefowope",
      "Design & Prototyping - Azeem Gbadamosi",
    ],
    featured: true,
  },
  {
    slug: "ecitibiz-case-study",
    tags: ["National Identification Number", "Verification", "Contextual Inquiry", "e-Governance"],
    title: "A UX Audit That Won a Government Contract - eCitiBiz",
    client: "Citizenship and Business Department of Nigeria",
    cardImage: "/images/dOyj9FQcxeSHQSVKA7PQoHke6k.jpg",
    heroImage: "/images/dOyj9FQcxeSHQSVKA7PQoHke6k.jpg",
    intro:
      "eCitiBiz (now candb.interior.gov.ng) is the official web portal of the Citizenship & Business Department under Nigeria's Ministry of Interior. It handles an unusually broad scope of government services: citizenship applications, expatriate quota management, business permit processing, marriage certification, and more, serving Nigerian citizens, corporate entities, and expatriates alike. The system behind it is a heavily customised ERP, built to automate end-to-end workflows across multiple account types and user categories.",
    previewLink: {
      label: "View Copy of UX Audit and Proposal",
      href: "https://drive.google.com/drive/folders/1-M3GegBakDvHIBPikzAv3XKHfiKQAXX2",
    },
    duration: "2 months",
    role: "Lead Product Designer",
    sections: [
      {
        heading: "The Problem",
        body: [
          "eCitiBiz is not simply a peripheral government service. Every foreign or local entity seeking to register a business, manage expat quotas, certify a marriage, or apply for citizenship interacts with this platform. The stakes of a poor experience are therefore not just inconvenience, they are systemic.",
          "The platform was recording a disproportionate number of applications stuck in incomplete statuses. Users who had started processes could not finish them, leaving their cases in limbo and creating backlogs for the ministry to resolve manually.",
          "In stakeholder interviews, we learnt many users were turning to third-party agents to complete applications on their behalf. For a platform handling sensitive identity and business data, this agent dependency was not just a usability failure, it was a privacy and security risk. A Google Lighthouse audit confirmed the experience gap: a performance score of 46, an accessibility score of 75, and a best practices score of 67.",
        ],
      },
      {
        heading: "My Role",
        body: [
          "I initiated and led the audit, designed the review framework, and conducted the usability evaluation across the full site. Bolaji co-authored the audit report and proposal. Following the contract award and stakeholder presentation, I led the redesign of the portal, covering the design system, information architecture, user segments, language, visual design, accessibility compliance, and dashboard structure, alongside two junior designers.",
        ],
      },
      {
        heading: "Auditing the Old System",
        body: [
          "My audit was structured across the onboarding journey, information architecture, language, visual design, and the dashboards for each user segment. I identified two critical failure points in the onboarding journey: inconsistent sign-up forms across services, and a broken email verification flow that showed no content after the user clicked their confirmation link.",
          "The content and information architecture lacked hierarchy, using technical or bureaucratic language, with no grouping or headings to help users scan and navigate. The dashboard presented a long flat list of service links with no navigation tabs and no account-level organisation, creating a steep learning curve for corporate users managing expatriate quotas.",
        ],
      },
      {
        heading: "Redesigning eCitiBiz",
        body: [
          "1. Registration — Users faced disorienting, unlabelled sign-up paths and a broken email verification step. Given a technical constraint that ruled out a single unified flow, I redesigned each registration path to be clearly identifiable at every stage, applying Nielsen's principle of Recognition over Recall with clear labelling, breadcrumbs, and tooltips.",
          "2. Language & Content — Content read like it was written for internal government use. I recommended a full content rewrite in plain language, contracted to Esan Faith, added a services glossary, and introduced explanatory subtitles and imagery for confusing terms like 'Special Marriage'.",
          "3. Information Architecture & Navigation — Related content wasn't grouped and pages lacked hierarchy. I grouped services under clear parent categories (e.g. 'Manage Expatriate Quota' and 'Manage PUR') and restructured articles and search results with sections, tables, and accordions.",
          "4. Dashboard & Account Management — The dashboard was a flat list with no sidebar or status visibility. I redesigned it with an organized sidebar, tabbed dashboards per account type, and an account switcher in the header for multi-account holders.",
          "5. Visual Design — Font sizes, contrast, and CTA styling were inconsistent. I standardised typography, colour, spacing, and button design, and redesigned the landing page around a clear headline, prominent primary CTA, and structured service listing.",
        ],
      },
      {
        heading: "Design Constraints",
        body: [
          "Throughout, design decisions were made within the constraints of the existing ERP data architecture. The goal was not to rebuild the system, but to make it significantly more usable without requiring changes to how data was structured or processed on the backend.",
        ],
      },
      {
        heading: "Handoff & Impact",
        body: [
          "I completed the redesign and handed off the system to AnchorDataware, the ministry's technical agency. The redesign is gradually being implemented on the live platform. Formal post-launch tracking was not possible due to a change in government administration in 2024, but internal feedback during and after handoff noted improved navigability and reduced user confusion.",
        ],
      },
    ],
    tools: ["Figma", "Research", "Figjam"],
    credits: [
      "Project Initiative - Dr. Joel Adidi (Director, AnchorDataware Solutions)",
      "Product Manager - Bolaji Abdullahi, PMP, MBA",
      "Research, Evaluation & Design - Olawale Azeem Gbadamosi",
      "Design - Mateen Gbadamosi, George Akpokwu",
    ],
    featured: true,
  },
  {
    slug: "detla-state-igr",
    tags: ["NIN", "Verification", "Contextual Inquiry"],
    title: "Field-First: Designing a Tax System for Market Traders and Artisans",
    client: "Delta State Internal Revenue Service",
    cardImage: "/images/pIcapelQfSS5teiijlFLC7PFnCM.jpg",
    heroImage: "/images/pIcapelQfSS5teiijlFLC7PFnCM.jpg",
    intro:
      "In 2023, Delta State's Internal Revenue Generation (IRG) initiative set out to bring informal sector businesses into the tax net; the market traders, kiosks, artisans, and sole proprietors who form the backbone of local commerce in Nigerian communities. These businesses are economically active and legally obligated for taxes, but structurally distant from the government monitoring systems that reach formal companies.",
    duration: "4 Weeks",
    role: "Lead Interaction Designer",
    sections: [
      {
        heading: "The Problem",
        body: [
          "The core challenge was one of access, in two directions: the state needed a way to reach and register informal businesses with no digital tax presence, and those businesses needed a payment experience that felt familiar and low-friction enough to actually use.",
          "The solution the state pursued was a field-agent model: trained agents stationed across Local Government Areas or operating as mobile agents, equipped with a mobile POS machine and a smart android tablet to register taxpayers and collect payments on the spot. These were the two systems I designed for.",
        ],
      },
      {
        heading: "My Role",
        body: [
          "I designed three interconnected product surfaces based on the PRD: a tablet app for tax profile registration and verification, a POS app with a print module for payment collection, and a single admin dashboard screen for revenue monitoring. Given that this is a government financial system handling NIN data and tax records, the case study focuses on the two primary agent-facing flows.",
        ],
      },
      {
        heading: "Understanding the Users with Contextual Inquiry",
        body: [
          "The field agent needed tools that were fast, reliable in low-connectivity environments, and clear enough to use while standing in a market or roadside kiosk. The informal business owner was not directly using the digital product, but their comfort and trust in the process was critical — many already transact daily through POS agents, a familiar model that the payment flow was deliberately designed around.",
        ],
      },
      {
        heading: "Tablet App — Tax Profile Registration Flow",
        body: [
          "The registration flow was built around Nigeria's National Identification Number (NIN), a reliable identity anchor for the largely undocumented informal sector. The flow ran in three phases: the agent enters the NIN and the system returns pre-filled, non-editable identity details for verification against the physical ID; the system surfaces registered business names under that NIN and checks for an existing tax profile to avoid duplicates; and finally the agent completes tax profile creation, generating a unique Tax ID with visible debt, payment history, and upcoming obligations.",
          "The tablet flow also covered four non-happy paths: NIN not found, identity mismatch on physical ID check, no business found under NIN, and an existing tax profile detected.",
        ],
      },
      {
        heading: "POS App — Payment Collection Flow",
        body: [
          "I kept the payment flow minimal: the agent enters the Tax ID, which pulls up outstanding debt, the taxpayer pays by card or cash, and a receipt prints immediately. Supporting both card and cash was grounded in how informal sector users actually transact — Nigeria has over 5.9 million active POS terminals, and the informal economy runs on the proximity and trust of POS agents rather than banks or ATMs.",
        ],
      },
      {
        heading: "Admin Dashboard",
        body: [
          "Although beyond scope for my aspect of the project, I proposed a dashboard screen giving state administrators visibility into agent activity and revenue performance, broken down by LGA.",
        ],
      },
      {
        heading: "Environment Factors & Technical Considerations",
        body: [
          "The system had to work for agents in environments with variable network connectivity and varying digital literacy, so flows stayed short and sequential with clear state feedback at every step. I also applied an eager-loading pattern to the Tax ID lookup, borrowing from how Google prefetches account data on email entry, to reduce perceived load time at a critical step.",
        ],
      },
      {
        heading: "The Impact",
        body: [
          "In 2023, Delta State Internal Revenue Service generated ₦114 billion against a ₦95 billion target, surpassing projection by over 20%. With the informal sector identified as the focal point for the 2024 target of ₦136 billion, this system was a direct instrument for closing that gap — bringing tax collection to where informal businesses already operate.",
        ],
      },
    ],
    tools: ["Figma", "Research", "Figjam"],
    credits: [
      "Project Initiative - Dr. Joel Adidi (AnchorDataware Solutions)",
      "Product Manager - Bolaji Abdullahi, PMP, MBA",
      "Research & Design - Azeem Gbadamosi",
    ],
    featured: true,
  },
  {
    slug: "anywork-verification",
    tags: ["Verification", "UX Evaluation"],
    title: "Increasing Vendor KYC Completion from 35% to 71% on AnyWorkX",
    client: "AnyworkX Africa",
    cardImage: "/images/XDTFM9Y9JlG7SKESMM5sXAWVE.jpg",
    heroImage: "/images/XDTFM9Y9JlG7SKESMM5sXAWVE.jpg",
    intro:
      "AnyWorkX is an on-demand service marketplace, think Bolt, but for skilled professionals. The platform's value to customers depends entirely on one thing: having a healthy pool of verified, bookable service providers. That's where the problem began.",
    duration: "3 weeks",
    role: "UX Researching",
    sections: [
      {
        heading: "The Problem",
        body: [
          "To be listed and bookable, vendors must complete Tier 1 KYC verification after registration. Following a marketing campaign, admins observed a significant drop-off: out of 1,286 sign-ups, only 452 had completed Tier 1 KYC, a completion rate of 35%. A week later, at 1,560 sign-ups, the rate had only edged up to 39%.",
        ],
      },
      {
        heading: "My Role & Research Goals",
        body: [
          "I led the UX research and recommendations, designing the research plan, running interviews personally, and driving synthesis and design recommendations through to implementation. We set out to understand what was motivating or discouraging KYC completion, where in the flow drop-off happened, and what interventions could move the completion rate — measured by KYC completion rate and time/satisfaction.",
        ],
      },
      {
        heading: "Research Approach",
        body: [
          "I designed a multi-method plan moving from quantitative signal to qualitative depth: recruiting both KYC completers and drop-offs via in-app modals, emails and calls, incentivised with airtime vouchers, then running call sessions asking about onboarding time, difficulty, and clarity. When participants struggled to recall why they dropped off, I adapted with a stimulated recall technique, walking vendors through the flow live over WhatsApp video-sharing while they narrated their experience.",
        ],
      },
      {
        heading: "What We Found",
        body: [
          "Thematic analysis surfaced two root causes: redundant data entry, where vendors were asked to re-enter information already submitted at registration, eroding trust and motivation; and a lack of continuity prompts, with no push notifications or reminders to nudge vendors back if they skipped or exited KYC. A secondary insight: vendors who completed KYC tended to work in digital-native roles, suggesting the flow wasn't meeting less tech-familiar vendors where they were.",
        ],
      },
      {
        heading: "Design Decisions",
        body: [
          "1. Introduce KYC within Onboarding — Identity verification moved from a dismissible standalone Home-screen prompt to a step embedded directly in Personal Information, with a persistent (non-blocking) prompt for anyone who skips.",
          "2. Pre-populate Previous Data — KYC forms were updated to pre-fill data already collected at registration, editable if needed.",
          "3. If skipped, intrude later — Targeted push notifications re-engage vendors who registered but didn't complete KYC after a period of inactivity.",
        ],
      },
      {
        heading: "Testing & Results",
        body: [
          "Post-implementation, I ran a task-driven usability test with 10 participants using a think-aloud protocol; 8 of 10 completed the flow within the 90–120 second target window, with no usability failures identified. Three months after launch, of roughly 9,400 cumulative sign-ups, 6,674 had completed Tier 1 KYC, a completion rate of 71% — more than tripling the verified vendor pool.",
        ],
      },
    ],
    tools: ["Figma", "Research", "Figjam", "Interviews"],
    credits: [
      "Product Manager - Bolaji Abdullahi, PMP, MBA",
      "Research & Design - Azeem Gbadamosi",
      "AnyWorkX Development Team - Led by Samuel O. O. Ohwesi",
    ],
    featured: true,
  },
  {
    slug: "waqtly-product-suite",
    tags: ["Software", "System-level thinking"],
    title: "Waqtly Software Suite: Deploying 7000 tablets for EU and UAE Homes",
    client: "Waqtly",
    cardImage: "/images/hYL53YSdjyUY8mz234U9ci0REDY.jpg",
    heroImage: "/images/hYL53YSdjyUY8mz234U9ci0REDY.jpg",
    intro:
      "Waqtly is a smart home scheduling ecosystem that successfully reached 700 homes in its first 6 months of launch. It is currently scaling its presence across the EU and UAE markets. Its target is the Muslim faithful, a booming market in 2026.",
    duration: undefined as unknown as string,
    role: undefined as unknown as string,
    sections: [
      {
        heading: "Overview",
        body: [
          "Full case study coming soon. I led product design and managed the development of the custom app for the dedicated Waqtly tablet, the remote-control mobile app (currently available on all app stores as Waqt Remote), the admin panel, and the GTM e-commerce platform and AR experience. I also assisted in spearheading the GTM strategy and after-sales processes to ensure a successful international rollout.",
        ],
      },
    ],
    gallery: ["/images/NtOngL28emIXQvq3RDmSH6HtS8.png", "/images/SxsOGYqgzGoGsJPDT874YcmBFzQ.png"],
    tools: ["Figma", "Claude", "Research", "Figjam", "Shopify"],
    credits: [],
    featured: false,
  },
  {
    slug: "tlldt",
    tags: ["3D Visualization", "Government"],
    title: "Tallinn City Digital Twin",
    client: "Tallinn Strategic Management Office",
    cardImage: "/images/Ih0VlXl7ZZpg2d5Q1BXb4i6F4c.jpg",
    heroImage: "/images/Ih0VlXl7ZZpg2d5Q1BXb4i6F4c.jpg",
    intro:
      "The Tallinn City Digital Twin is a high-fidelity virtual replica of the city developed in collaboration with the Tallinn Strategic Management Office (Tallinna Strateegiakeskus). Now officially handed over to the city and still in active development, the platform serves as a primary foundation for smarter, data-driven urban governance.",
    duration: undefined as unknown as string,
    role: undefined as unknown as string,
    sections: [
      {
        heading: "Overview",
        body: [
          "This project provides an interactive 3D map of Tallinn featuring embedded city data and precise mappings of underground infrastructure, including water and electricity networks, for civilian workers such as excavators and city planners. The system incorporates AI-driven monitoring to prioritize and report city faults, and real-time infrastructure maintenance.",
          "Full case study coming soon. I spearheaded the initial phase through foundational research and extensive stakeholder interviews within the city office to align technical requirements with operational needs. My contributions included rigorous industry benchmarking, analysis of utility modeling, and prototyping the interactive interface for frontline civil engineering workflows.",
        ],
      },
    ],
    gallery: [
      "/images/uvVIySXZDGqy1NlgshUOIXH2mc.jpeg",
      "/images/ctASdqeBYCChNFq2sW8gr5y0agg.webp",
      "/images/S7CxWFB70WSXUGgXEJ0hT2uQeo.png",
      "/images/7NscoRqLd0ABCy4A2UROC567qD0.jpeg",
    ],
    tools: ["Figma", "OpenAI", "Research", "Figjam"],
    credits: [],
    featured: false,
  },
];

export const playgroundProjects = [
  { title: "Riya & Friends - Kids Storybook", client: "", image: "/images/s49AfbHYUq5Lg6YfFFK8nNpVooE.jpg" },
  { title: "Prince Safri", client: "", image: "/images/gHs2sNAqREUJQj3K763cJkGy8GM.jpg" },
  { title: "AI Saturdays - An AI & ML Cohort", client: "Branding and Visual Identity", image: "/images/pIA4e1PRhSR9W6Z7b6me0EBxRc.jpg" },
  { title: "3D Video Direction for AUMI Cryptocurrency", client: "AutoMatic Yield Farming", image: "/images/mVX6j90gWujWhJ1guH3RTrBZDek.png" },
];

export const testimonials = [
  {
    quote:
      "I have been working with Azeem since 2018 and I have never had any course to stop working with him.",
    name: "Bolaji Bayo-Tijani",
    title: "Executive Director, X-agon Digital Solutions",
  },
  {
    quote:
      "I worked with Azeem on several brand identity and designs. His creativity, professionalism and work ethic stand out.",
    name: "Femi Anthony",
    title: "Lead, Digital Communications & Strategy, 7even Interactive",
  },
  {
    quote:
      "We've worked with Azeem's team multiple times, and it has always been a pleasure! His redesign on our interfaces captivated our audience and made them easier to interact with.",
    name: "Majito",
    title: "MD at Prixon.tv",
  },
  {
    quote:
      "AbdulAzeem is a manager who is able to read and interact with each team member without conflict. His leadership stands out.",
    name: "Mateen Gbadamosi",
    title: "Frontend Developer, TAZ Creative",
  },
];

export const blogPosts = [
  {
    slug: "The-Future-of-UX",
    date: "Aug 2023",
    author: "Azeem Gbadamosi",
    title: "The Future of UX: Embracing AI and Machine Learning",
    excerpt:
      "In the ever-evolving landscape of technology, AI and machine learning have emerged as pivotal elements in shaping the future of UI/UX design.",
    content: [
      "In the realm of technology, artificial intelligence (AI) and machine learning have emerged as game-changers, particularly in the field of UI/UX design. The integration of these advanced technologies is reshaping how we approach design, offering new possibilities and challenges. This post aims to explore how AI and machine learning are influencing the field of UI/UX, bringing a new dimension to user experiences and interfaces.",
      "AI as a Tool for Enhanced User Experience — AI's role in UI/UX design transcends mere automation. It is about leveraging the power of data-driven insights to create designs that are not only visually appealing but also highly functional. Machine learning algorithms can analyze vast amounts of user data, providing insights into user behavior, preferences, and interactions. AI, therefore, is not just a tool but a partner in the design process, pushing the boundaries of what's possible.",
      "Challenges and Opportunities — While the integration of AI in UI/UX design presents numerous opportunities, it also comes with its set of challenges. One of the primary concerns is the ethical implications of using user data. Designers must navigate the fine line between personalization and privacy, ensuring that user data is used responsibly.",
      "Designing with AI: Practical Applications — One of the most significant applications of AI in UI/UX design is real-time personalization. By analyzing user interactions and behaviors, AI can tailor user experiences in real time, making them more relevant and engaging. Predictive analysis can also help designers anticipate user needs and preferences.",
      "Enhancing User Interfaces with AI — AI can play a crucial role in enhancing the functionality and aesthetics of user interfaces, from intelligent layout adjustments to dynamic content presentation, ensuring a seamless experience across devices.",
      "Staying Ahead of the Curve — As AI continues to evolve, staying ahead of the curve is essential for UI/UX designers, continuously exploring new ways to integrate AI into design processes.",
      "Ethical Considerations and User-Centric Approach — As we embrace AI in UI/UX design, ensuring user privacy, security, and a user-centric approach should remain at the forefront of AI-driven design.",
      "In conclusion, the integration of AI and machine learning in UI/UX design marks a significant shift in how we approach user experiences, offering opportunities for personalization, efficiency, and innovation, balanced with a responsible and ethical approach to data usage.",
    ],
  },
  {
    slug: "designing-for-accessibility",
    date: "Mar 2024",
    author: "Azeem Gbadamosi",
    title: "Designing for Accessibility: A UI/UX Designer's Guide",
    excerpt:
      "Accessibility in design is not just a trend or a regulatory checkbox; it's a fundamental aspect of creating inclusive digital experiences.",
    content: [
      "Accessibility in design is not just a trend or a regulatory checkbox; it's a fundamental aspect of creating inclusive digital experiences that work for everyone, regardless of ability.",
    ],
  },
  {
    slug: "minimalism-in-ui-design",
    date: "Feb 2023",
    author: "Azeem Gbadamosi",
    title: "Minimalism in UI Design: More Than Just Aesthetics",
    excerpt:
      "The minimalist approach in UI design is often celebrated for its clean lines and uncluttered spaces, but it embodies much more than just a visual style.",
    content: [
      "The minimalist approach in UI design is often celebrated for its clean lines and uncluttered spaces, but it embodies much more than just a visual style — it's a philosophy of prioritising clarity and purpose.",
    ],
  },
];

export const socialLinks = {
  instagram: "https://www.instagram.com/theabdulazeem.creative/",
  behance: "https://www.behance.net/firstazeem",
  linkedin: "https://www.linkedin.com/in/firstazeem/",
};
