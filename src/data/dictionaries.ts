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
    journeyTitle: string;
    journeyText: string;
    educationTitle: string;
    educationText: string;
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
    allCompetencies: string;
    levelProduction: string;
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
    viewDetails: string;
    seeAll: string;
    backToProjects: string;
    backToHome: string;
    allProjectsTitle: string;
    allProjectsSubtitle: string;
    keyHighlights: string;
    keyFeatures: string;
    futureRoadmap: string;
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
    roadmapTitle: string;
  };
  videoShowcase: {
    sectionTag: string;
    title: string;
    subtitle: string;
    videoTitle: string;
    videoDesc: string;
    watchDemo: string;
    closeDemo: string;
    duration: string;
    category: string;
    placeholderNotice: string;
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
      badge: "Available for Projects & Opportunities",
      greeting: "Hello, I'm",
      name: "Mehedi Hasan",
      title: "Full-Stack Developer",
      summary:
        "I build clean, responsive, and user-friendly web applications. Passionate about solving problems and creating useful digital products with modern technologies.",
      ctaPrimary: "View Projects",
      ctaSecondary: "Get in Touch",
      ctaResume: "Resume",
      terminalTab: "status",
      command: "mehedi --status",
      outputLines: [
        "● Role: Full-Stack Developer",
        "● Stack: React, Next.js, Node.js, TypeScript, MongoDB",
        "✔ Status: Available for new opportunities",
      ],
      yearsExp: "Full-Stack",
      projectsDelivered: "Production",
      uptime: "Web & APIs",
    },
    about: {
      sectionTag: "About Me",
      title: "About Me",
      subtitle: "A brief introduction to who I am and what I build.",
      bioParagraph1:
        "I am Mehedi Hasan, a Full-Stack Developer passionate about crafting clean, reliable, and user-friendly web applications.",
      bioParagraph2:
        "I work primarily with modern web technologies including React, Next.js, TypeScript, Node.js, Express, and MongoDB. From responsive and accessible user interfaces to well-structured backend APIs and databases, I focus on building software that is clean and maintainable.",
      bioParagraph3:
        "I enjoy learning new tools, refining my skills, and collaborating to build digital products that offer genuine value and a seamless user experience.",
      journeyTitle: "My Background",
      journeyText:
        "With a strong foundation in modern web development, I enjoy creating intuitive applications that solve real-world problems.",
      educationTitle: "Education",
      educationText:
        "Computer Science & Engineering background with continuous hands-on learning in modern web technologies.",
      principlesTitle: "How I Work",
      principles: [
        {
          title: "Clean Code",
          description: "Writing readable, maintainable, and well-organized code.",
        },
        {
          title: "User-Centered",
          description: "Designing fast, accessible, and intuitive user experiences.",
        },
        {
          title: "Reliable Systems",
          description: "Building resilient APIs and dependable database schemas.",
        },
        {
          title: "Continuous Learning",
          description: "Constantly expanding skills and adapting to modern industry standards.",
        },
      ],
    },
    skills: {
      sectionTag: "Skills & Technologies",
      title: "Technologies I Work With",
      subtitle: "A clean overview of the tools, frameworks, and technologies I use to build web applications.",
      proficiencyLegend: "Verified Technologies",
      allCompetencies: "All Technologies",
      levelProduction: "Proficient",
      categories: {
        frontend: "Frontend",
        backend: "Backend & Database",
        architecture: "Cloud & DevOps",
        database: "Database",
        tools: "Tools",
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
      sectionTag: "05. FEATURED_PROJECTS",
      title: "Featured Projects",
      subtitle: "A selection of full-stack applications, robust backend services, and web systems I have designed and built.",
      filterAll: "All Projects",
      filterFullstack: "Full-Stack",
      filterBackend: "Backend",
      filterCloud: "Cloud & DevOps",
      viewLive: "Live Demo",
      viewCode: "Source Code",
      viewDetails: "Details",
      seeAll: "View All Projects",
      backToProjects: "Back to Projects",
      backToHome: "Back to Home",
      allProjectsTitle: "All Projects",
      allProjectsSubtitle: "A complete collection of web applications, distributed APIs, and developer tools I have built.",
      keyHighlights: "Key Features:",
      keyFeatures: "Key Features",
      futureRoadmap: "Future Roadmap:",
      emptyState: "No projects found.",
    },
    caseStudy: {
      modalTitle: "System Architecture Case Study",
      close: "Close Deep-Dive",
      overview: "System Overview",
      challenge: "The Architectural Challenge",
      solution: "Engineering Solution",
      architecture: "System Design & Data Flow",
      results: "Measurable Impact & Metrics",
      roadmapTitle: "Future Architectural Roadmap",
    },
    videoShowcase: {
      sectionTag: "04. SYSTEM_DEMO",
      title: "Architecture Walkthrough & Development Solutions",
      subtitle: "Deep-dive video walkthroughs exploring system design, code structure, and live deployment workflows.",
      videoTitle: "Full-Stack System Architecture & Monorepo Walkthrough",
      videoDesc: "A guided architectural walkthrough of the monorepo design, decoupled Express REST backend, bilingual Next.js routing, and containerized deployment.",
      watchDemo: "Watch System Walkthrough",
      closeDemo: "Close Video Player",
      duration: "12:40",
      category: "Full-Stack Systems Architecture",
      placeholderNotice: "Architecture video recording in production. Video player and media player container configured for Phase 2 Cloudinary integration.",
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
      badge: "নতুন প্রজেক্ট ও কাজের জন্য প্রস্তুত",
      greeting: "হ্যালো, আমি",
      name: "মেহেদী হাসান",
      title: "ফুল-স্ট্যাক ডেভেলপার",
      summary:
        "আমি আধুনিক ওয়েব প্রযুক্তি ব্যবহার করে পরিচ্ছন্ন, রেসপনসিভ এবং ব্যবহারকারী-বান্ধব ওয়েব অ্যাপ্লিকেশন তৈরি করি। বাস্তব সমস্যার সমাধান ও কার্যকর ডিজিটাল পণ্য নির্মাণে আগ্রহী।",
      ctaPrimary: "প্রজেক্টসমূহ দেখুন",
      ctaSecondary: "যোগাযোগ করুন",
      ctaResume: "রিজিউমে",
      terminalTab: "স্ট্যাটাস",
      command: "mehedi --status",
      outputLines: [
        "● পদবী: ফুল-স্ট্যাক ডেভেলপার",
        "● স্ট্যাক: React, Next.js, Node.js, TypeScript, MongoDB",
        "✔ স্ট্যাটাস: নতুন কাজের জন্য প্রস্তুত",
      ],
      yearsExp: "ফুল-স্ট্যাক",
      projectsDelivered: "প্রোডাকশন",
      uptime: "ওয়েব ও এপিআই",
    },
    about: {
      sectionTag: "আমার সম্পর্কে",
      title: "আমার সম্পর্কে",
      subtitle: "আমার কাজের ক্ষেত্র এবং ব্যাকগ্রাউন্ডের একটি সংক্ষিপ্ত পরিচিতি।",
      bioParagraph1:
        "আমি মেহেদী হাসান, একজন ফুল-স্ট্যাক ডেভেলপার। আমি পরিচ্ছন্ন, আধুনিক ও ব্যবহারকারী-বান্ধব ওয়েব অ্যাপ্লিকেশন তৈরি করতে ভালোবাসি।",
      bioParagraph2:
        "আমার প্রধান প্রযুক্তিগুলোর মধ্যে রয়েছে React, Next.js, TypeScript, Node.js, Express এবং MongoDB। রেসপনসিভ ইউজার ইন্টারফেস থেকে শুরু করে ব্যাকএন্ড এপিআই ও ডেটাবেজ—সব ক্ষেত্রেই পরিচ্ছন্ন কোড লেখায় আমার মনোযোগ।",
      bioParagraph3:
        "আমি নিয়মিত নতুন প্রযুক্তি শিখতে এবং নিজের দক্ষতাকে উন্নত করতে পছন্দ করি, যাতে ব্যবহারকারীর জন্য চমৎকার ডিজিটাল অভিজ্ঞতা তৈরি করা যায়।",
      journeyTitle: "আমার ব্যাকগ্রাউন্ড",
      journeyText:
        "ওয়েব ডেভেলপমেন্টের আধুনিক প্রযুক্তির ওপর ভিত্তি করে আমি ব্যবহারিক সমস্যার সমাধানে কাজ করি।",
      educationTitle: "শিক্ষা",
      educationText:
        "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং ব্যাকগ্রাউন্ড এবং আধুনিক ওয়েব প্রযুক্তিতে নিয়মিত কাজ করার অভিজ্ঞতা।",
      principlesTitle: "আমার কাজের নীতি",
      principles: [
        {
          title: "পরিচ্ছন্ন কোড",
          description: "সহজে পড়া ও রক্ষণাবেক্ষণযোগ্য কোড তৈরি।",
        },
        {
          title: "ব্যবহারকারী-কেন্দ্রিক",
          description: "দ্রুতগতির, অ্যাক্সেসিবল এবং স্বজ্ঞাত ইউজার ইন্টারফেস।",
        },
        {
          title: "নির্ভরযোগ্য সিস্টেম",
          description: "কার্যকর ব্যাকএন্ড ও নিরাপদ ডেটাবেজ ম্যানেজমেন্ট।",
        },
        {
          title: "ধারাবাহিক শিক্ষা",
          description: "আধুনিক প্রযুক্তির সাথে তাল মিলিয়ে দক্ষতা বৃদ্ধি।",
        },
      ],
    },
    skills: {
      sectionTag: "দক্ষতা ও প্রযুক্তি",
      title: "আমার ব্যবহৃত প্রযুক্তিসমূহ",
      subtitle: "ওয়েব অ্যাপ্লিকেশন তৈরিতে আমি যেসব ফ্রেমওয়ার্ক ও টুলস ব্যবহার করি।",
      proficiencyLegend: "প্রমাণিত প্রযুক্তি",
      allCompetencies: "সকল প্রযুক্তি",
      levelProduction: "দক্ষ",
      categories: {
        frontend: "ফ্রন্টএন্ড",
        backend: "ব্যাকএন্ড ও ডেটাবেজ",
        architecture: "ক্লাউড ও ডেভঅপ্স",
        database: "ডেটাবেজ",
        tools: "টুলস",
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
      sectionTag: "০৫. ফিচার্ড প্রজেক্ট",
      title: "ফিচার্ড প্রজেক্টসমূহ",
      subtitle: "আমার ডিজাইন এবং ডেভেলপ করা ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন ও ব্যাকএন্ড সার্ভিসের কিছু উল্লেখযোগ্য কাজ।",
      filterAll: "সকল প্রজেক্ট",
      filterFullstack: "ফুল-স্ট্যাক",
      filterBackend: "ব্যাকএন্ড",
      filterCloud: "ক্লাউড ও ডেভঅপ্স",
      viewLive: "লাইভ ডেমো",
      viewCode: "সোর্স কোড",
      viewDetails: "বিস্তারিত",
      seeAll: "সকল প্রজেক্ট দেখুন",
      backToProjects: "প্রজেক্টসে ফিরুন",
      backToHome: "হোমে ফিরুন",
      allProjectsTitle: "সকল প্রজেক্ট",
      allProjectsSubtitle: "আমার তৈরি করা ওয়েব অ্যাপ্লিকেশন, এপিআই এবং সিস্টেমের সম্পূর্ণ তালিকা।",
      keyHighlights: "মূল বৈশিষ্ট্যসমূহ:",
      keyFeatures: "মূল বৈশিষ্ট্যসমূহ",
      futureRoadmap: "ভবিষ্যত পরিকল্পনা:",
      emptyState: "কোনো প্রজেক্ট পাওয়া যায়নি।",
    },
    caseStudy: {
      modalTitle: "সিস্টেম আর্কিটেকচার কেস স্টাডি",
      close: "বন্ধ করুন",
      overview: "সিস্টেমের সারসংক্ষেপ",
      challenge: "আর্কিটেকচারাল চ্যালেঞ্জ",
      solution: "ইঞ্জিনিয়ারিং সমাধান",
      architecture: "সিস্টেম ডিজাইন ও ডেটা ফ্লো",
      results: "পরিমাপযোগ্য ফলাফল ও মেট্রিক্স",
      roadmapTitle: "ভবিষ্যৎ আর্কিটেকচারাল রোডম্যাপ",
    },
    videoShowcase: {
      sectionTag: "০৪. সিস্টেম ডেমো",
      title: "আর্কিটেকচার ওয়াকথ্রু ও ডেভেলপমেন্ট সল্যুশন",
      subtitle: "সিস্টেম ডিজাইন, কোড স্ট্রাকচার এবং লাইভ ডেপ্লয়মেন্টের বিশদ ভিডিও ডেমো।",
      videoTitle: "ফুল-স্ট্যাক সিস্টেম আর্কিটেকচার ও মনোরেপো ওয়াকথ্রু",
      videoDesc: "মনোরেপো ডিজাইন, ডিকাপল্ড Express ব্যাকএন্ড, দ্বিভাষিক Next.js রাউটিং এবং ডকার ডেপ্লয়মেন্টের সম্পূর্ণ নির্দেশনা।",
      watchDemo: "সিস্টেম ডেমো দেখুন",
      closeDemo: "ভিডিও বন্ধ করুন",
      duration: "১২:৪০",
      category: "ফুল-স্ট্যাক সিস্টেম আর্কিটেকচার",
      placeholderNotice: "আর্কিটেকচার ভিডিও তৈরির কাজ চলছে। ফেজ ২ ক্লাউডিনারি ইন্টিগ্রেশনের জন্য প্লেয়ার প্রস্তুত।",
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

