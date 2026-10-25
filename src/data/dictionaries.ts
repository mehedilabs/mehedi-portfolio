import { Locale } from "@/types";

export interface Dictionary {
  site: {
    name: string;
    role: string;
    tagline: string;
    location: string;
    availability: string;
    statusText: string;
  };
  nav: {
    about: string;
    skills: string;
    experience: string;
    education: string;
    projects: string;
    caseStudies: string;
    blog: string;
    contact: string;
    resume: string;
  };
  hero: {
    badge: string;
    greeting: string;
    name: string;
    title: string;
    summary: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaResume: string;
    terminalTab: string;
    command: string;
    outputLines: string[];
    yearsExp: string;
    projectsDelivered: string;
    uptime: string;
  };
  about: {
    sectionTag: string;
    title: string;
    subtitle: string;
    bioParagraph1: string;
    bioParagraph2: string;
    bioParagraph3: string;
    principlesTitle: string;
    principles: {
      title: string;
      description: string;
    }[];
  };
  skills: {
    sectionTag: string;
    title: string;
    subtitle: string;
    proficiencyLegend: string;
    categories: {
      frontend: string;
      backend: string;
      architecture: string;
      database: string;
      tools: string;
    };
  };
  experience: {
    sectionTag: string;
    title: string;
    subtitle: string;
    present: string;
    responsibilitiesLabel: string;
    technologiesUsed: string;
  };
  education: {
    sectionTag: string;
    title: string;
    subtitle: string;
    coursesLabel: string;
  };
  projects: {
    sectionTag: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterFullstack: string;
    filterBackend: string;
    filterCloud: string;
    viewLive: string;
    viewCode: string;
    readCaseStudy: string;
    caseStudyTag: string;
    keyHighlights: string;
    emptyState: string;
  };
  caseStudy: {
    modalTitle: string;
    close: string;
    overview: string;
    challenge: string;
    solution: string;
    architecture: string;
    results: string;
  };
  blog: {
    sectionTag: string;
    title: string;
    subtitle: string;
    readTime: string;
    readArticle: string;
    comingSoon: string;
  };
  contact: {
    sectionTag: string;
    title: string;
    subtitle: string;
    availabilityStatus: string;
    availabilityNote: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      inquiryTypeLabel: string;
      inquiryTypes: {
        job: string;
        freelance: string;
        consulting: string;
        other: string;
      };
      messageLabel: string;
      messagePlaceholder: string;
      submitButton: string;
      submittingButton: string;
      successMessage: string;
      errorMessage: string;
      backendNote: string;
    };
    directTitle: string;
    emailTitle: string;
    githubTitle: string;
    linkedinTitle: string;
    locationTitle: string;
  };
  assistant: {
    headerTitle: string;
    headerSubtitle: string;
    statusOnline: string;
    welcomeMessage: string;
    inputPlaceholder: string;
    sendButton: string;
    quickPromptsLabel: string;
    disclaimer: string;
    badge: string;
  };
  footer: {
    rights: string;
    builtWith: string;
    backToTop: string;
    sourceCode: string;
  };
  common: {
    placeholderNotice: string;
    loading: string;
    error: string;
    allRightsReserved: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    site: {
      name: "Mehedi Hasan",
      role: "Senior Full-Stack Architect & Engineer",
      tagline: "Architecting high-performance web systems and resilient cloud-native architectures.",
      location: "Dhaka, Bangladesh (Available Worldwide)",
      availability: "Available for Senior Roles & High-Impact Consulting",
      statusText: "System operational — accepting new inquiries",
    },
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      education: "Education",
      projects: "Projects",
      caseStudies: "Case Studies",
      blog: "Blog",
      contact: "Contact",
      resume: "Resume",
    },
    hero: {
      badge: "Full-Stack Architect & Production Engineer",
      greeting: "Hello, world! I am",
      name: "Mehedi Hasan",
      title: "Building Resilient, Scalable & High-Impact Web Systems.",
      summary:
        "Senior Software Engineer specializing in modern Next.js ecosystem, distributed Express/Node microservices, clean MongoDB schemas, and cloud deployments. Passionate about developer ergonomics, type safety, and micro-frontend architectures.",
      ctaPrimary: "Explore Projects",
      ctaSecondary: "Discuss a Project",
      ctaResume: "View Resume",
      terminalTab: "bash ~ mehedi@production-node",
      command: "mehedi --status --tech-stack --availability",
      outputLines: [
        "● Role: Senior Full-Stack Architect & Engineer",
        "● Core: Next.js (App Router), Express.js, TypeScript, MongoDB",
        "● Focus: High throughput, distributed caching, bilingual UX",
        "✔ Status: System Healthy, Open for Opportunities",
      ],
      yearsExp: "6+ Years",
      projectsDelivered: "40+ Systems",
      uptime: "99.98% SLA",
    },
    about: {
      sectionTag: "01. ARCHITECT_PROFILE",
      title: "Engineering with Depth, Speed, and Reliability",
      subtitle: "A pragmatic perspective on building software that scales and endures.",
      bioParagraph1:
        "I am Mehedi Hasan, a full-stack engineer and software architect with over 6 years of experience designing, delivering, and scaling web applications for startups and enterprise clients worldwide.",
      bioParagraph2:
        "My work bridges user experience and backend resilience. Whether designing distributed APIs with Express and MongoDB, engineering type-safe Next.js frontends, or tuning rendering performance, I focus on predictable maintainability and production robustness.",
      bioParagraph3:
        "I believe that great software starts with clean system boundaries, continuous testing, transparent observability, and thoughtful developer experience.",
      principlesTitle: "Engineering Philosophy",
      principles: [
        {
          title: "Architecture Before Code",
          description: "Solid domain modeling and API contracts eliminate entire categories of production issues before they happen.",
        },
        {
          title: "End-to-End Type Safety",
          description: "Strict TypeScript across client and server boundaries provides fear-free refactoring and living documentation.",
        },
        {
          title: "Performance by Design",
          description: "Optimizing bundle sizes, database query indexes, and caching strategies as first-class architectural constraints.",
        },
        {
          title: "Accessible & International",
          description: "Inclusive design from the first commit, with native bilingual support and accessible semantic HTML.",
        },
      ],
    },
    skills: {
      sectionTag: "02. CORE_COMPETENCIES",
      title: "Technical Stack & Engineering Toolbox",
      subtitle: "A balanced toolkit cultivated through production challenges and real-world workloads.",
      proficiencyLegend: "Proficiency Index (Production Experience)",
      categories: {
        frontend: "Frontend & UI Systems",
        backend: "Backend & Distributed APIs",
        architecture: "Cloud, DevOps & CI/CD",
        database: "Data Modeling & Storage",
        tools: "Tooling & Quality Assurance",
      },
    },
    experience: {
      sectionTag: "03. CAREER_TRAJECTORY",
      title: "Professional Experience & Impact",
      subtitle: "A timeline of delivering production-grade software and scaling technical teams.",
      present: "Present",
      responsibilitiesLabel: "Key Contributions & Impact:",
      technologiesUsed: "Stack:",
    },
    education: {
      sectionTag: "04. ACADEMICS_AND_CERTS",
      title: "Education & Professional Credentials",
      subtitle: "Foundational computer science theory paired with ongoing industry certifications.",
      coursesLabel: "Key Focus Areas:",
    },
    projects: {
      sectionTag: "05. FEATURED_WORK",
      title: "Engineered Systems & Case Studies",
      subtitle: "Selected production architectures, open-source repositories, and high-impact applications.",
      filterAll: "All Systems",
      filterFullstack: "Full-Stack Web",
      filterBackend: "APIs & Services",
      filterCloud: "Cloud & DevOps",
      viewLive: "Live Demo",
      viewCode: "Source Code",
      readCaseStudy: "Architecture Deep-Dive",
      caseStudyTag: "Case Study Available",
      keyHighlights: "Key Architecture Highlights:",
      emptyState: "No projects found matching the selected filter criteria.",
    },
    caseStudy: {
      modalTitle: "System Architecture Case Study",
      close: "Close Deep-Dive",
      overview: "System Overview",
      challenge: "The Architectural Challenge",
      solution: "Engineering Solution",
      architecture: "System Design & Data Flow",
      results: "Measurable Impact & Metrics",
    },
    blog: {
      sectionTag: "06. TECHNICAL_INSIGHTS",
      title: "Engineering Journal & Articles",
      subtitle: "Notes on distributed systems, frontend architecture, Next.js optimization, and software craftsmanship.",
      readTime: "min read",
      readArticle: "Read Article",
      comingSoon: "Technical publishing engine configured — first deep-dives arriving soon.",
    },
    contact: {
      sectionTag: "07. INITIATE_COMMUNICATION",
      title: "Let's Build Something Exceptional",
      subtitle: "Interested in hiring me for a senior full-time role, consulting, or an ambitious freelance build? Send a message.",
      availabilityStatus: "Open for Opportunities",
      availabilityNote: "Currently accepting technical leadership inquiries and selected freelance projects.",
      form: {
        nameLabel: "Your Name",
        namePlaceholder: "e.g. Alex Morgan",
        emailLabel: "Work Email",
        emailPlaceholder: "alex@company.com",
        subjectLabel: "Subject",
        subjectPlaceholder: "Project inquiry / Senior Engineer opportunity",
        inquiryTypeLabel: "Inquiry Type",
        inquiryTypes: {
          job: "Full-Time Opportunity",
          freelance: "Freelance Project",
          consulting: "Technical Consulting",
          other: "General Discussion",
        },
        messageLabel: "Project Details & Timeline",
        messagePlaceholder: "Briefly describe your objectives, architecture requirements, and anticipated timeline...",
        submitButton: "Send Inquiry",
        submittingButton: "Encrypting & Sending...",
        successMessage: "Thank you! Your message has been staged. In full production, this dispatches directly to the Express API.",
        errorMessage: "Failed to dispatch message. Please try again or reach out directly via email.",
        backendNote: "Connected to Express.js backend API architecture (/api/messages).",
      },
      directTitle: "Direct Channels",
      emailTitle: "Primary Email",
      githubTitle: "GitHub Workspace",
      linkedinTitle: "LinkedIn Profile",
      locationTitle: "Location & Timezone",
    },
    assistant: {
      headerTitle: "Mehedi Assistant",
      headerSubtitle: "Interactive Portfolio Q&A",
      statusOnline: "Terminal Agent Ready",
      welcomeMessage: "Greetings! I am Mehedi's interactive portfolio assistant. Ask me about his architecture background, technical stack, or availability.",
      inputPlaceholder: "Ask a question about Mehedi's work...",
      sendButton: "Ask",
      quickPromptsLabel: "Suggested Queries:",
      disclaimer: "Pre-trained on verified portfolio data. Database-driven assistant engine activated.",
      badge: "AI Assistant",
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Engineered with Next.js 16, TypeScript, Tailwind CSS, and Express API.",
      backToTop: "Return to Top",
      sourceCode: "GitHub Repository",
    },
    common: {
      placeholderNotice: "Production placeholder data — customizable via Phase 2 Admin CMS.",
      loading: "Loading system data...",
      error: "An error occurred while loading this section.",
      allRightsReserved: "Mehedi Hasan. Code licensed under MIT.",
    },
  },
  bn: {
    site: {
      name: "মেহেদী হাসান",
      role: "সিনিয়র ফুল-স্ট্যাক আর্কিটেক্ট ও সফটওয়্যার ইঞ্জিনিয়ার",
      tagline: "উচ্চ ক্ষমতাসম্পন্ন ওয়েব সিস্টেম এবং নির্ভরযোগ্য ক্লাউড আর্কিটেকচার নির্মাতা।",
      location: "ঢাকা, বাংলাদেশ (বিশ্বব্যাপী রিমোট কাজের জন্য উন্মুক্ত)",
      availability: "সিনিয়র রোল ও হাই-ইমপ্যাক্ট কনসাল্টিংয়ের জন্য প্রস্তুত",
      statusText: "সিস্টেম সক্রিয় — নতুন কাজের প্রস্তাব গ্রহণ করা হচ্ছে",
    },
    nav: {
      about: "পরিচিতি",
      skills: "দক্ষতা",
      experience: "অভিজ্ঞতা",
      education: "শিক্ষা",
      projects: "প্রকল্প",
      caseStudies: "কেস স্টাডি",
      blog: "ব্লগ",
      contact: "যোগাযোগ",
      resume: "রিজিউমে",
    },
    hero: {
      badge: "ফুল-স্ট্যাক আর্কিটেক্ট ও প্রোডাকশন ইঞ্জিনিয়ার",
      greeting: "হ্যালো, স্বাগতম! আমি",
      name: "মেহেদী হাসান",
      title: "নির্ভরযোগ্য, স্কেলেবল এবং আধুনিক ওয়েব আর্কিটেকচার নির্মাণ।",
      summary:
        "মডার্ন Next.js ইকোসিস্টেম, ডিস্ট্রিবিউটেড Express/Node মাইক্রোসার্ভিস, ক্লিন MongoDB স্কিমা এবং ক্লাউড ডেপ্লয়মেন্ট বিশেষজ্ঞ সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার। ডেভেলপার অভিজ্ঞতা, টাইপ সেফটি এবং আর্কিটেকচারাল দৃঢ়তায় বিশ্বাসী।",
      ctaPrimary: "প্রকল্পসমূহ দেখুন",
      ctaSecondary: "প্রজেক্ট নিয়ে কথা বলুন",
      ctaResume: "রিজিউমে ডাউনলোড",
      terminalTab: "bash ~ mehedi@production-node",
      command: "mehedi --status --tech-stack --availability",
      outputLines: [
        "● পদবী: সিনিয়র ফুল-স্ট্যাক আর্কিটেক্ট ও ইঞ্জিনিয়ার",
        "● মূল স্ট্যাক: Next.js (App Router), Express.js, TypeScript, MongoDB",
        "● লক্ষ্য: উচ্চ পারফরম্যান্স, ডিস্ট্রিবিউটেড ক্যাশিং, দ্বিভাষিক ইউএক্স",
        "✔ স্ট্যাটাস: সিস্টেম সক্রিয়, নতুন কাজের জন্য প্রস্তুত",
      ],
      yearsExp: "৬+ বছর",
      projectsDelivered: "৪০+ সিস্টেম",
      uptime: "৯৯.৯৮% এসএলএ",
    },
    about: {
      sectionTag: "০১. আর্কিটেক্ট প্রোফাইল",
      title: "গভীরতা, গতি ও নির্ভরযোগ্যতার সমন্বয়ে সফটওয়্যার নির্মাণ",
      subtitle: "স্কেলেবল ও টেকসই সফটওয়্যার আর্কিটেকচারের একটি বাস্তবমুখী দৃষ্টিভঙ্গি।",
      bioParagraph1:
        "আমি মেহেদী হাসান, ৬ বছরেরও বেশি সময় ধরে আন্তর্জাতিক ক্লায়েন্ট ও স্টার্টআপদের জন্য উচ্চমানের ওয়েব অ্যাপ্লিকেশন ও সিস্টেম ডিজাইন করে আসছি।",
      bioParagraph2:
        "আমার কাজের মূল ভিত্তি হলো চমৎকার ইউজার এক্সপেরিয়েন্স এবং ব্যাকএন্ডের মজবুত কাঠামোর সংযোগ স্থাপন করা। Express ও MongoDB দিয়ে মাইক্রোসার্ভিস ডিজাইন থেকে শুরু করে Next.js ফ্রন্টএন্ড অপটিমাইজেশন—সবকিছুতেই আমি কোডের স্বচ্ছতা ও নির্ভরযোগ্যতায় জোর দিই।",
      bioParagraph3:
        "আমি বিশ্বাস করি দীর্ঘমেয়াদী সফল সফটওয়্যার নির্ভর করে পরিষ্কার সিস্টেম বাউন্ডারি, স্বয়ংক্রিয় টেস্টিং এবং চমৎকার ডেভেলপার অভিজ্ঞতার ওপর।",
      principlesTitle: "আমার ইঞ্জিনিয়ারিং দর্শন",
      principles: [
        {
          title: "কোড লেখার পূর্বে আর্কিটেকচার",
          description: "সঠিক ডোমেইন মডেলিং ও সুস্পষ্ট এপিআই ডিজাইন প্রোডাকশনের জটিল সমস্যাসমূহ শুরুতেই দূর করে।",
        },
        {
          title: "এন্ড-টু-এন্ড টাইপ সেফটি",
          description: "ক্লায়েন্ট এবং সার্ভারে কঠোর TypeScript ব্যবহারের ফলে নির্ভুল রিফ্যাক্টরিং ও নির্ভরযোগ্যতা নিশ্চিত হয়।",
        },
        {
          title: "ডিজাইন থেকেই পারফরম্যান্স",
          description: "বান্ডল সাইজ নিয়ন্ত্রণ, ডেটাবেজ ইনডেক্সিং এবং ক্যাশিং কৌশলকে প্রাথমিক শর্ত হিসেবে গণ্য করা।",
        },
        {
          title: "অ্যাক্সেসিবল ও দ্বিভাষিক সমাধান",
          description: "সবার জন্য উন্মুক্ত ডিজাইন এবং প্রথম দিন থেকেই আন্তর্জাতিক মানের বহুভাষিক সাপোর্ট।",
        },
      ],
    },
    skills: {
      sectionTag: "০২. মূল দক্ষতা",
      title: "প্রযুক্তিগত দক্ষতা ও ইঞ্জিনিয়ারিং টুলবক্স",
      subtitle: "প্রোডাকশন পরিবেশের চ্যালেঞ্জ মোকাবেলায় গড়ে তোলা আধুনিক টুলসেট।",
      proficiencyLegend: "দক্ষতার সূচক (প্রোডাকশন অভিজ্ঞতা)",
      categories: {
        frontend: "ফ্রন্টএন্ড ও ইউআই সিস্টেম",
        backend: "ব্যাকএন্ড ও ডিস্ট্রিবিউটেড এপিআই",
        architecture: "ক্লাউড, ডেভঅপ্স ও সিআই/সিডি",
        database: "ডেটাবেজ ও ডেটা মডেলিং",
        tools: "টুলিং ও কোয়ালিটি নিশ্চিতকরণ",
      },
    },
    experience: {
      sectionTag: "০৩. কর্মঅভিজ্ঞতা",
      title: "পেশাগত অভিজ্ঞতা ও সাফল্য",
      subtitle: "বাস্তব কর্মক্ষেত্রে জটিল প্রযুক্তিগত সমস্যার সমাধান এবং দল পরিচালনার অভিজ্ঞতা।",
      present: "বর্তমান",
      responsibilitiesLabel: "প্রধান অবদান ও ফলাফল:",
      technologiesUsed: "ব্যবহৃত প্রযুক্তি:",
    },
    education: {
      sectionTag: "০৪. শিক্ষা ও সার্টিফিকেট",
      title: "শিক্ষাগত যোগ্যতা ও পেশাদার সনদ",
      subtitle: "কম্পিউটার সায়েন্সের তাত্ত্বিক ভিত্তি এবং নিয়মিত আধুনিক প্রযুক্তি সনদ।",
      coursesLabel: "মূল পাঠ্য বিষয়সমূহ:",
    },
    projects: {
      sectionTag: "০৫. নির্বাচিত কাজ",
      title: "বাস্তবায়িত সিস্টেম ও কেস স্টাডি",
      subtitle: "বাস্তব প্রোডাকশন আর্কিটেকচার, ওপেন সোর্স প্রজেক্ট এবং উচ্চ কার্যক্ষমতাসম্পন্ন প্ল্যাটফর্ম।",
      filterAll: "সকল প্রকল্প",
      filterFullstack: "ফুল-স্ট্যাক ওয়েব",
      filterBackend: "এপিআই ও মাইক্রোসার্ভিস",
      filterCloud: "ক্লাউড ও ডেভঅপ্স",
      viewLive: "লাইভ ডেমো",
      viewCode: "সোর্স কোড",
      readCaseStudy: "আর্কিটেকচার কেস স্টাডি",
      caseStudyTag: "কেস স্টাডি যুক্ত আছে",
      keyHighlights: "মূল আর্কিটেকচারাল বৈশিষ্ট্য:",
      emptyState: "এই ক্যাটাগরিতে কোনো প্রকল্প পাওয়া যায়নি।",
    },
    caseStudy: {
      modalTitle: "সিস্টেম আর্কিটেকচার কেস স্টাডি",
      close: "বন্ধ করুন",
      overview: "সিস্টেমের সারসংক্ষেপ",
      challenge: "আর্কিটেকচারাল চ্যালেঞ্জ",
      solution: "ইঞ্জিনিয়ারিং সমাধান",
      architecture: "সিস্টেম ডিজাইন ও ডেটা ফ্লো",
      results: "পরিমাপযোগ্য ফলাফল ও মেট্রিক্স",
    },
    blog: {
      sectionTag: "০৬. প্রযুক্তিগত অন্তর্দৃষ্টি",
      title: "ইঞ্জিনিয়ারিং জার্নাল ও নিবন্ধ",
      subtitle: "ডিস্ট্রিবিউটেড সিস্টেম, ফ্রন্টএন্ড আর্কিটেকচার, Next.js অপটিমাইজেশন এবং ক্লিন কোড নিয়ে বিশ্লেষণ।",
      readTime: "মিনিট পাঠ",
      readArticle: "নিবন্ধ পড়ুন",
      comingSoon: "ব্লগ ইঞ্জিন কনফিগার করা হয়েছে — শীঘ্রই প্রথম গভীর প্রযুক্তিগত নিবন্ধ যুক্ত হবে।",
    },
    contact: {
      sectionTag: "০৭. যোগাযোগ স্থাপন",
      title: "আসুন একসাথে অসাধারণ কিছু তৈরি করি",
      subtitle: "সিনিয়র ফুল-টাইম ভূমিকা, কনসাল্টিং বা ফ্রিল্যান্স প্রজেক্টের জন্য যোগাযোগ করতে মেসেজ পাঠান।",
      availabilityStatus: "কাজের জন্য প্রস্তুত",
      availabilityNote: "বর্তমানে টেকনিক্যাল লিডারশিপ ও নির্বাচিত ফ্রিল্যান্স প্রজেক্টের প্রস্তাব গ্রহণ করছি।",
      form: {
        nameLabel: "আপনার নাম",
        namePlaceholder: "যেমন: আব্দুল্লাহ আল মামুন",
        emailLabel: "ইমেইল ঠিকানা",
        emailPlaceholder: "mamun@company.com",
        subjectLabel: "বিষয়",
        subjectPlaceholder: "প্রজেক্ট সম্পর্কিত আলোচনা / ফুল-টাইম সুযোগ",
        inquiryTypeLabel: "যোগাযোগের ধরন",
        inquiryTypes: {
          job: "ফুল-টাইম চাকরি",
          freelance: "ফ্রিল্যান্স প্রজেক্ট",
          consulting: "প্রযুক্তিগত পরামর্শ",
          other: "সাধারণ আলোচনা",
        },
        messageLabel: "প্রজেক্টের বিবরণ ও সময়সীমা",
        messagePlaceholder: "আপনার কাজের উদ্দেশ্য, প্রযুক্তিগত প্রয়োজনীয়তা এবং আনুমানিক সময়সীমা লিখুন...",
        submitButton: "বার্তা পাঠান",
        submittingButton: "বার্তা পাঠানো হচ্ছে...",
        successMessage: "ধন্যবাদ! আপনার বার্তাটি গ্রহণ করা হয়েছে। পূর্ণ প্রোডাকশনে এটি সরাসরি Express API-তে যুক্ত হবে।",
        errorMessage: "বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা সরাসরি ইমেইলে যোগাযোগ করুন।",
        backendNote: "Express.js ব্যাকএন্ড এপিআই কাঠামোর সাথে সংযুক্ত (/api/messages)।",
      },
      directTitle: "সরাসরি যোগাযোগের মাধ্যম",
      emailTitle: "প্রাথমিক ইমেইল",
      githubTitle: "গিটহাব প্রোফাইল",
      linkedinTitle: "লিংকডইন প্রোফাইল",
      locationTitle: "অবস্থান ও টাইমজোন",
    },
    assistant: {
      headerTitle: "মেহেদী অ্যাসিস্ট্যান্ট",
      headerSubtitle: "ইন্টারেক্টিভ পোর্টফোলিও প্রশ্নোত্তর",
      statusOnline: "টার্মিনাল এজেন্ট প্রস্তুত",
      welcomeMessage: "স্বাগতম! আমি মেহেদীর পোর্টফোলিও সহকারী। তার অভিজ্ঞতা, প্রযুক্তিগত স্ট্যাক বা কাজের সুযোগ সম্পর্কে জানতে প্রশ্ন করুন।",
      inputPlaceholder: "মেহেদীর কাজ সম্পর্কে একটি প্রশ্ন লিখুন...",
      sendButton: "জিজ্ঞাসা",
      quickPromptsLabel: "জনপ্রিয় প্রশ্নসমূহ:",
      disclaimer: "ভেরিফায়েড পোর্টফোলিও তথ্যের ওপর ভিত্তি করে প্রস্তুত। ডেটাবেজ চালিত অ্যাসিস্ট্যান্ট সক্রিয়।",
      badge: "এআই সহকারী",
    },
    footer: {
      rights: "সর্বস্বত্ব সংরক্ষিত।",
      builtWith: "Next.js 16, TypeScript, Tailwind CSS, এবং Express API দ্বারা নির্মিত।",
      backToTop: "উপরে ফিরে যান",
      sourceCode: "গিটহাব রিপোজিটরি",
    },
    common: {
      placeholderNotice: "প্রোডাকশন প্লেসহোল্ডার ডেটা — ফেজ ২ অ্যাডমিন সিএমএস দ্বারা পরিবর্তনযোগ্য।",
      loading: "তথ্য লোড হচ্ছে...",
      error: "এই অংশটি লোড করতে একটি ত্রুটি হয়েছে।",
      allRightsReserved: "মেহেদী হাসান। কোড এমআইটি লাইসেন্সের আওতাভুক্ত।",
    },
  },
};
