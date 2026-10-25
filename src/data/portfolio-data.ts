import {
  ProjectItem,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  BlogPostItem,
  AssistantQAPair,
} from "@/types";

export const CONTACT_INFO = {
  email: "contact.mehedi.dev@gmail.com", // clearly identified professional placeholder
  github: "https://github.com/mehedilabs",
  linkedin: "https://linkedin.com/in/mehedihasan-dev",
  twitter: "https://twitter.com/mehedi_dev",
  location: "Dhaka, Bangladesh (UTC+6)",
  availability: "Available for Full-Time Roles & Consulting",
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-1",
    category: "fullstack",
    featured: true,
    order: 1,
    thumbnail: "/images/projects/distributed-cms.png",
    techStack: ["Next.js 16", "Express.js", "TypeScript", "MongoDB Atlas", "Tailwind CSS"],
    githubUrl: "https://github.com/mehedilabs/mehedi-portfolio",
    liveUrl: "https://mehedi-portfolio.vercel.app",
    en: {
      title: "Enterprise Portfolio & Monorepo CMS",
      slug: "enterprise-portfolio-monorepo-cms",
      tagline: "High-performance bilingual portfolio with decoupled Express REST API",
      description:
        "An architecturally disciplined monorepo hosting a modern Next.js 16 App Router public portfolio and a decoupled Express.js backend. Features full bilingual routing (Bangla and English), strict TypeScript domain modeling, and terminal-inspired dark design system.",
      highlights: [
        "End-to-end type safety between Next.js client and Express REST API",
        "Zero duplicate entity bilingual architecture for English & Bengali localization",
        "Dark terminal-themed design system optimized for sub-360px viewport performance",
        "Microservice-ready Express architecture with MongoDB connection pooling",
      ],
      metrics: "Sub-50ms SSR latency & 100 Lighthouse Performance score",
      caseStudy: {
        overview:
          "Designed to showcase architectural discipline, this project solves content localization and CMS integration without database record duplication.",
        challenge:
          "Traditional internationalization architectures either duplicate database records across locales or rely on fragile client-side string replacement that degrades SEO and initial load performance.",
        solution:
          "Engineered a localized sub-document schema in MongoDB where an entity (Project, Post) houses both English and Bengali translations under single ID references with route fallback cascades.",
        architecture:
          "Next.js App Router for localized dynamic rendering (/en and /bn) paired with an isolated Express backend running clustered connection pools to MongoDB Atlas.",
        results: [
          "Zero layout shifts across Bengali and English typography switches",
          "Comprehensive hreflang alternate SEO tags rendered automatically",
          "Decoupled backend deployment readiness with 100% build type safety",
        ],
      },
    },
    bn: {
      title: "এন্টারপ্রাইজ পোর্টফোলিও ও মনোরেপো সিএমএস",
      slug: "enterprise-portfolio-monorepo-cms",
      tagline: "ডিকাপল্ড Express REST API সহ উচ্চক্ষমতাসম্পন্ন দ্বিভাষিক পোর্টফোলিও",
      description:
        "Next.js 16 App Router এবং Express.js ব্যাকএন্ডের সমন্বয়ে নির্মিত আধুনিক মনোরেপো আর্কিটেকচার। বাংলা ও ইংরেজি ভাষার সম্পূর্ণ সাপোর্ট, টাইপস্ক্রিপ্ট ডোমেন মডেলিং এবং ডার্ক টার্মিনাল ডিজাইন সিস্টেম সমৃদ্ধ।",
      highlights: [
        "Next.js ক্লায়েন্ট এবং Express এপিআই-এর মধ্যে এন্ড-টু-এন্ড টাইপ সেফটি",
        "ডেটাবেজ রেকর্ড ডুপ্লিকেশন ছাড়াই বাংলা ও ইংরেজি ভাষার সমন্বিত আর্কিটেকচার",
        "৩৬০ পিক্সেল মোবাইল স্ক্রিনের জন্য পুরোপুরি অপটিমাইজড টার্মিনাল ডার্ক থিম",
        "MongoDB কানেকশন পুলিং সহ মাইক্রোসার্ভিস উপযোগী ব্যাকএন্ড কাঠামো",
      ],
      metrics: "৫০ মিলিসেকেন্ডের নিচে সার্ভার রেসপন্স ও ১০০ লাইটহাউস স্কোর",
      caseStudy: {
        overview:
          "আর্কিটেকচারাল দক্ষতা প্রদর্শনের লক্ষ্যে তৈরি এই প্ল্যাটফর্মটি ডেটাবেজ ডুপ্লিকেশন ছাড়াই নিখুঁত কনটেন্ট লোকালাইজেশন নিশ্চিত করে।",
        challenge:
          "সাধারণ লোকালাইজেশনে প্রতি ভাষার জন্য আলাদা রেকর্ড সংরক্ষণ করতে হয় অথবা ক্লায়েন্ট-সাইডে অনুবাদ লোড করতে হয়, যা এসইও ও গতি ব্যাহত করে।",
        solution:
          "MongoDB-তে সাব-ডকুমেন্ট আর্কিটেকচার ডিজাইন করা হয়েছে যেখানে প্রতিটি ডকুমেন্টে একইসাথে ইংরেজি ও বাংলা কন্টেন্ট সুবিন্যস্ত থাকে।",
        architecture:
          "Next.js App Router ডায়নামিক রাউটিং (/en এবং /bn) এবং Express ব্যাকএন্ডের সাথে MongoDB Atlas সংযোগের সমন্বয়।",
        results: [
          "বাংলা ও ইংরেজি ফন্টে কোনো লেআউট শিফট ছাড়া স্মুথ রেন্ডারিং",
          "স্বয়ংক্রিয় hreflang অল্টারনেট এসইও ট্যাগ জেনারেশন",
          "ক্লাউড ডেপ্লয়মেন্ট উপযোগী নিরাপদ ও শক্তিশালী কোডবেস",
        ],
      },
    },
  },
  {
    id: "proj-2",
    category: "backend",
    featured: true,
    order: 2,
    thumbnail: "/images/projects/event-stream.png",
    techStack: ["Node.js", "Express.js", "Redis", "MongoDB", "Docker", "RabbitMQ"],
    githubUrl: "https://github.com/mehedilabs/distributed-task-orchestrator",
    liveUrl: "https://orchestrator-demo.mehedi.dev",
    en: {
      title: "Distributed Task Orchestrator & Stream Engine",
      slug: "distributed-task-orchestrator",
      tagline: "Fault-tolerant background job orchestrator with real-time WebSocket telemetry",
      description:
        "A distributed asynchronous task processing pipeline built for heavy computation workloads. Employs Redis pub/sub for priority message queuing, worker concurrency control, and live WebSocket telemetry dashboards.",
      highlights: [
        "Processes 15,000+ jobs/min with automatic backoff and dead-letter queues",
        "Zero-downtime rolling worker deployment via Docker containers",
        "Sub-10ms Redis-backed priority queues with distributed locking",
        "Built-in Prometheus metrics exposition and structured Winston logging",
      ],
      metrics: "15,000+ jobs/min with 99.99% throughput reliability",
      caseStudy: {
        overview:
          "Engineered to resolve distributed concurrency bottlenecks in microservices requiring idempotent job executions.",
        challenge:
          "High concurrency spikes caused race conditions, duplicate processing, and database connection pool exhaustion under sudden traffic loads.",
        solution:
          "Implemented Redis Redlock distributed locking mechanism alongside consumer throttling and exponential backoff retry algorithms.",
        architecture:
          "Cluster of worker nodes subscribed to partitioned queues, reporting state changes to a master coordinator over WebSockets.",
        results: [
          "Eliminated duplicate job executions across all concurrent worker threads",
          "Reduced peak memory consumption by 42% through batch streaming",
          "Achieved complete visibility into asynchronous job pipelines",
        ],
      },
    },
    bn: {
      title: "ডিস্ট্রিবিউটেড টাস্ক অর্কেস্ট্রেটর ও স্ট্রিম ইঞ্জিন",
      slug: "distributed-task-orchestrator",
      tagline: "রিয়েল-টাইম ওয়েবসকেট টেলিমেট্রি সহ ব্যাকগ্রাউন্ড জব প্রসেসিং ইঞ্জিন",
      description:
        "ভারী কম্পিউটেশনাল কাজের জন্য নির্মিত ডিস্ট্রিবিউটেড এসিনক্রোনাস টাস্ক পাইপলাইন। প্রায়োরিটি কিউয়িং, কনকারেন্সি কন্ট্রোল এবং লাইভ ড্যাশবোর্ডের জন্য Redis pub/sub এবং RabbitMQ ব্যবহার করা হয়েছে।",
      highlights: [
        "প্রতি মিনিটে ১৫,০০০+ ব্যাকগ্রাউন্ড জব প্রসেস করার সক্ষমতা",
        "ডকার কন্টেইনারের মাধ্যমে জিরো-ডাউনটাইম রিলিজ ম্যানেজমেন্ট",
        "ডিস্ট্রিবিউটেড লকিং সহ সাব-১০ মিলি-সেকেন্ড রেসপন্স টাইম",
        "প্রমিথিউস মেট্রিক্স ও সেন্ট্রালাইজড লগিং সিস্টেম",
      ],
      metrics: "প্রতি মিনিটে ১৫,০০০+ জব ও ৯৯.৯৯% নির্ভরযোগ্যতা",
      caseStudy: {
        overview:
          "মাইক্রোসার্ভিসের এসিনক্রোনাস কাজগুলোকে নিরবচ্ছিন্নভাবে সমন্বয় করতে এই সিস্টেমটি ডেভেলপ করা হয়েছে।",
        challenge:
          "হঠাৎ ট্রাফিক বৃদ্ধিতে ডেটাবেজ সংযোগে চাপ তৈরি হতো এবং ডুপ্লিকেট টাস্ক এক্সিকিউশনের ঝুঁকি তৈরি হতো।",
        solution:
          "Redis Redlock ডিস্ট্রিবিউটেড লকিং এবং এক্সপোনেনশিয়াল ব্যাকঅফ অ্যালগরিদম বাস্তবায়ন করে সমস্যা সমাধান করা হয়।",
        architecture:
          "পার্টিশন করা কিউতে মাল্টিপল ওয়ার্কার নোড এবং ওয়েবসকেটের মাধ্যমে রিয়েল-টাইম মনিটরিং।",
        results: [
          "কনকারেন্ট ওয়ার্কারে ডুপ্লিকেট কাজের ঝুঁকি ১০০% নির্মূল",
          "মেমরি অপটিমাইজেশনের মাধ্যমে রিসোর্স ব্যবহার ৪২% হ্রাস",
          "ব্যাকগ্রাউন্ড টাস্ক প্রসেসিংয়ে পূর্ণ স্বচ্ছতা ও নিয়ন্ত্রণ প্রতিষ্ঠা",
        ],
      },
    },
  },
  {
    id: "proj-3",
    category: "cloud",
    featured: true,
    order: 3,
    thumbnail: "/images/projects/cloud-api-gateway.png",
    techStack: ["TypeScript", "Express.js", "Docker", "AWS ECS", "Cloudflare", "JWT"],
    githubUrl: "https://github.com/mehedilabs/cloud-native-api-gateway",
    liveUrl: "https://gateway-demo.mehedi.dev",
    en: {
      title: "Cloud-Native API Gateway & Rate Governor",
      slug: "cloud-native-api-gateway",
      tagline: "Edge-aware reverse proxy with token-bucket rate limiting and RBAC",
      description:
        "A resilient reverse proxy and gateway service that unifies multiple downstream microservices behind a single hardened security boundary. Includes token-bucket rate limiting, JWT verification, and response caching.",
      highlights: [
        "Token-bucket rate limiting protecting against DDoS and automated scrapers",
        "Role-based authorization middleware with cryptographically signed tokens",
        "Dynamic routing table configurable via encrypted administrative REST APIs",
        "Integrated response compression and automated ETags for bandwidth reduction",
      ],
      metrics: "Processes 8,000 req/sec at <4ms overhead",
      caseStudy: {
        overview:
          "Acts as the unified traffic controller and authentication gatekeeper for a cluster of 8 internal microservices.",
        challenge:
          "Downstream services were repeatedly reimplementing authentication, rate limiting, and CORS headers with divergent security standards.",
        solution:
          "Centralized all cross-cutting concerns into a zero-allocation TypeScript gateway deployed as an AWS ECS Fargate container cluster.",
        architecture:
          "Cloudflare edge DNS -> AWS Application Load Balancer -> ECS Fargate Gateway -> Internal VPC microservices.",
        results: [
          "Standardized authentication protocols across all internal microservices",
          "Protected downstream databases from traffic spikes with token-bucket throttle",
          "Reduced bandwidth costs by 31% via automated Gzip/Brotli edge negotiation",
        ],
      },
    },
    bn: {
      title: "ক্লাউড-নেটিভ এপিআই গেটওয়ে ও রেট গভর্নর",
      slug: "cloud-native-api-gateway",
      tagline: "টোকেন-বাকেট রেট লিমিটিং ও আরবিএসি সহ এজ-অ্যাওয়ার রিভার্স প্রক্সি",
      description:
        "একাধিক মাইক্রোসার্ভিসকে একক সুরক্ষিত ফ্রন্টের পেছনে একত্রিত করার জন্য নির্মিত গেটওয়ে ও প্রক্সি সার্ভিস। এতে রয়েছে রেট লিমিটিং, জেডব্লিউটি ভেরিফিকেশন এবং রেসপন্স ক্যাশিং সুবিধা।",
      highlights: [
        "ডিডস আক্রমণ ও স্ক্র্যাপিং প্রতিহত করতে টোকেন-বাকেট রেট লিমিটিং",
        "ক্রিপ্টোগ্রাফিক টোকেন ভিত্তিক রোল-বেসড এক্সেস কন্ট্রোল (RBAC)",
        "অ্যাডমিন এপিআই দ্বারা কনফিগারযোগ্য ডায়নামিক রাউটিং টেবিল",
        "ব্যান্ডউইথ খরচ কমাতে স্বয়ংক্রিয় কম্প্রেশন ও ক্যাশিং",
      ],
      metrics: "প্রতি সেকেন্ডে ৮,০০০ রিকোয়েস্ট ও ৪ মিলি-সেকেন্ডের কম ওভারহেড",
      caseStudy: {
        overview:
          "৮টি অভ্যন্তরীণ মাইক্রোসার্ভিসের জন্য ট্রাফিক ও সিকিউরিটি গেটকিপার হিসেবে কাজ করে।",
        challenge:
          "প্রতিটি সার্ভিসে আলাদাভাবে অথেনটিকেশন ও রেট লিমিটিং লেখার ফলে কোডের পুনরাবৃত্তি ও নিরাপত্তার বৈষম্য তৈরি হচ্ছিল।",
        solution:
          "একটি কেন্দ্রীয় TypeScript গেটওয়েতে সমস্ত নিরাপত্তা ও রাউটিং লজিক কেন্দ্রীভূত করা হয়।",
        architecture:
          "Cloudflare Edge -> AWS Load Balancer -> ECS Fargate Gateway -> ইন্টারনাল VPC সার্ভিস।",
        results: [
          "সকল মাইক্রোসার্ভিসে একক ও কঠোর নিরাপত্তা নীতিমালা প্রতিষ্ঠা",
          "হঠাৎ ট্রাফিক স্পাইক থেকে ডেটাবেজ ও ইন্টারনাল সার্ভারকে সুরক্ষা প্রদান",
          "স্বয়ংক্রিয় কম্প্রেশনের মাধ্যমে ৩১% ডেটা ট্রান্সফার খরচ হ্রাস",
        ],
      },
    },
  },
  {
    id: "proj-4",
    category: "fullstack",
    featured: false,
    order: 4,
    thumbnail: "/images/projects/telemetry-dash.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js", "Node.js"],
    githubUrl: "https://github.com/mehedilabs/cloud-telemetry-dashboard",
    liveUrl: "https://telemetry.mehedi.dev",
    en: {
      title: "Real-Time Cloud Telemetry Dashboard",
      slug: "real-time-cloud-telemetry-dashboard",
      tagline: "High-density monitoring interface for server health and memory metrics",
      description:
        "A sleek, dark terminal-inspired observability console displaying live server metrics, memory allocation graphs, error logs, and cluster uptime telemetry.",
      highlights: [
        "Live WebSocket streaming with 60 FPS Canvas chart rendering",
        "Compact responsive UI designed for operations centers and mobile screens",
        "Customizable alert threshold notifications and log stream filtering",
      ],
      metrics: "Sub-second live streaming updates over secure WebSockets",
    },
    bn: {
      title: "রিয়েল-টাইম ক্লাউড টেলিমেট্রি ড্যাশবোর্ড",
      slug: "real-time-cloud-telemetry-dashboard",
      tagline: "সার্ভার স্বাস্থ্য ও মেমরি মেট্রিক্স মনিটরিং কনসোল",
      description:
        "সার্ভারের লাইভ পারফরম্যান্স, মেমরি গ্রাফ এবং এরর লগ প্রদর্শনের জন্য নির্মিত ডার্ক টার্মিনাল অবজারভেবিলিটি ড্যাশবোর্ড।",
      highlights: [
        "৬০ FPS চার্ট রেন্ডারিং সহ লাইভ ওয়েবসকেট স্ট্রিমিং",
        "মোবাইল ও ডেস্কটপ উভয়ের জন্য অপটিমাইজড রেসপনসিভ ইউআই",
        "কাস্টম অ্যালার্ট থ্রেশহোল্ড এবং রিয়েল-টাইম লগ ফিল্টারিং",
      ],
      metrics: "ওয়েবসকেটের মাধ্যমে সাব-সেকেন্ড লাইভ ডেটা আপডেট",
    },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    icon: "Layout",
    en: {
      title: "Frontend Engineering & UI Systems",
      description: "Building fast, accessible, responsive, and type-safe user interfaces.",
    },
    bn: {
      title: "ফ্রন্টএন্ড ইঞ্জিনিয়ারিং ও ইউআই সিস্টেম",
      description: "দ্রুতগতির, অ্যাক্সেসিবল, রেসপনসিভ এবং টাইপ-সেফ ইউজার ইন্টারফেস তৈরি।",
    },
    skills: [
      { name: "Next.js (App Router / SSR)", level: 95, iconName: "Nextjs", highlight: true },
      { name: "React 19 & TypeScript", level: 95, iconName: "React", highlight: true },
      { name: "Tailwind CSS v4 & shadcn/ui", level: 92, iconName: "Tailwind", highlight: true },
      { name: "State Architecture (Zustand/Query)", level: 88, iconName: "Layers" },
      { name: "Web Performance & Core Web Vitals", level: 90, iconName: "Zap" },
      { name: "Responsive & Accessible UI (WCAG)", level: 92, iconName: "Shield" },
    ],
  },
  {
    id: "backend",
    icon: "Server",
    en: {
      title: "Backend Services & Distributed APIs",
      description: "Engineering resilient, high-throughput microservices and RESTful APIs.",
    },
    bn: {
      title: "ব্যাকএন্ড সার্ভিস ও ডিস্ট্রিবিউটেড এপিআই",
      description: "উচ্চ ক্ষমতাসম্পন্ন, স্কেলেবল মাইক্রোসার্ভিস ও এপিআই তৈরি।",
    },
    skills: [
      { name: "Node.js & Express.js (TypeScript)", level: 94, iconName: "Node", highlight: true },
      { name: "RESTful API Architecture", level: 95, iconName: "Globe", highlight: true },
      { name: "Authentication (JWT, RBAC, OAuth)", level: 92, iconName: "Lock", highlight: true },
      { name: "Distributed Caching (Redis)", level: 86, iconName: "Cpu" },
      { name: "Asynchronous Message Queues", level: 84, iconName: "Inbox" },
      { name: "WebSockets & Real-Time Sync", level: 88, iconName: "Activity" },
    ],
  },
  {
    id: "database",
    icon: "Database",
    en: {
      title: "Database Modeling & Data Integrity",
      description: "Designing optimized schemas, query indexing, and caching layers.",
    },
    bn: {
      title: "ডেটাবেজ মডেলিং ও ডেটা নিরাপত্তা",
      description: "অপটিমাইজড স্কিমা ডিজাইন, ইনডেক্সিং এবং ক্যাশিং লেয়ার পরিচালনা।",
    },
    skills: [
      { name: "MongoDB Atlas & Mongoose", level: 92, iconName: "Database", highlight: true },
      { name: "Query Optimization & Aggregation", level: 90, iconName: "Search", highlight: true },
      { name: "PostgreSQL & Relational Schemas", level: 85, iconName: "Table" },
      { name: "Data Sanitization & Validation", level: 94, iconName: "CheckCircle" },
      { name: "Connection Pooling & Sharding", level: 82, iconName: "HardDrive" },
    ],
  },
  {
    id: "cloud",
    icon: "Cloud",
    en: {
      title: "Cloud Infrastructure, DevOps & CI/CD",
      description: "Automating zero-downtime deployments, containerization, and monitoring.",
    },
    bn: {
      title: "ক্লাউড ইনফ্রাস্ট্রাকচার, ডেভঅপ্স ও সিআই/সিডি",
      description: "জিরো-ডাউনটাইম ডিপ্লয়মেন্ট, কন্টেইনারাইজেশন এবং অটোমেশন পাইপলাইন।",
    },
    skills: [
      { name: "Docker & Container Architecture", level: 88, iconName: "Box", highlight: true },
      { name: "CI/CD Pipelines (GitHub Actions)", level: 90, iconName: "GitBranch", highlight: true },
      { name: "Cloud Deployment (AWS, Vercel, VPS)", level: 86, iconName: "CloudUpload" },
      { name: "Cloudinary & Remote Media Storage", level: 92, iconName: "Image" },
      { name: "Linux Server Administration & Nginx", level: 85, iconName: "Terminal" },
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2023 — Present",
    current: true,
    techStack: ["Next.js", "Express.js", "TypeScript", "MongoDB", "Redis", "Docker", "AWS"],
    en: {
      role: "Lead Full-Stack Architect",
      company: "Apex Digital Systems (Placeholder Company)",
      location: "Remote / Dhaka",
      type: "Full-Time",
      description:
        "Spearheading technical architecture and delivery of distributed web platforms and customer-facing portal engines. Mentoring an engineering team of 8 developers.",
      achievements: [
        "Architected and migrated legacy monolith into modern Next.js + Express microservices, improving page load speed by 58%.",
        "Designed bilingual localization strategy supporting multiple languages with zero layout shifts and SEO-first metadata.",
        "Implemented standardized CI/CD pipelines reducing deployment failure rates to near zero.",
      ],
    },
    bn: {
      role: "লিড ফুল-স্ট্যাক আর্কিটেক্ট",
      company: "অ্যাপেক্স ডিজিটাল সিস্টেমস (প্লেসহোল্ডার প্রতিষ্ঠান)",
      location: "রিমোট / ঢাকা",
      type: "ফুল-টাইম",
      description:
        "ডিস্ট্রিবিউটেড ওয়েব প্ল্যাটফর্মের আর্কিটেকচার ডিজাইন এবং ৮ সদস্যের একটি সফটওয়্যার ইঞ্জিনিয়ারিং দলের নেতৃত্ব প্রদান।",
      achievements: [
        "মনোলিথ সিস্টেম থেকে আধুনিক Next.js + Express মাইক্রোসার্ভিসে রূপান্তর, যার ফলে পেজ লোডিং গতি ৫৮% বৃদ্ধি পায়।",
        "কোনো লেআউট শিফট ছাড়া নিখুঁত এসইও বান্ধব দ্বিভাষিক লোকালাইজেশন আর্কিটেকচার বাস্তবায়ন।",
        "স্ট্যান্ডার্ড সিআই/সিডি অটোমেশন চালু করে ডেপ্লয়মেন্ট ত্রুটির হার শূন্যের কোঠায় নামিয়ে আনা।",
      ],
    },
  },
  {
    id: "exp-2",
    period: "2021 — 2023",
    current: false,
    techStack: ["React", "Node.js", "Express", "MongoDB Atlas", "Tailwind CSS", "Jest"],
    en: {
      role: "Senior Software Engineer",
      company: "CloudScale Technologies (Placeholder Company)",
      location: "Dhaka, Bangladesh",
      type: "Full-Time",
      description:
        "Engineered high-concurrency RESTful APIs and interactive SaaS dashboards used by over 60,000 monthly active users.",
      achievements: [
        "Decreased 95th percentile API response times from 340ms to 65ms using query optimization and Redis caching.",
        "Implemented secure JWT authentication with refresh token rotation and granular RBAC permissions.",
        "Authored comprehensive end-to-end and unit test suites achieving 88% test coverage.",
      ],
    },
    bn: {
      role: "সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার",
      company: "ক্লাউডস্কেল টেকনোলজিস (প্লেসহোল্ডার প্রতিষ্ঠান)",
      location: "ঢাকা, বাংলাদেশ",
      type: "ফুল-টাইম",
      description:
        "মাসিক ৬০,০০০-এর বেশি অ্যাক্টিভ ইউজারের জন্য হাই-কনকারেন্সি RESTful API এবং ইন্টারেক্টিভ SaaS ড্যাশবোর্ড তৈরি।",
      achievements: [
        "কুয়েরি অপটিমাইজেশন এবং Redis ক্যাশিংয়ের মাধ্যমে API রেসপন্স টাইম ৩৪০ms থেকে কমিয়ে ৬৫ms-এ নামিয়ে আনা।",
        "রিফ্রেশ টোকেন রোটেশন এবং রোল-বেসড অ্যাক্সেস কন্ট্রোল (RBAC) সহ সুরক্ষিত অথেনটিকেশন ব্যবস্থা তৈরি।",
        "৮৮% কোড কভারেজ নিশ্চিত করে স্বয়ংক্রিয় ইউনিট ও ইন্টিগ্রেশন টেস্ট আর্কিটেকচার গঠন।",
      ],
    },
  },
  {
    id: "exp-3",
    period: "2019 — 2021",
    current: false,
    techStack: ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "CSS3"],
    en: {
      role: "Full-Stack Software Engineer",
      company: "DevCraft Solutions (Placeholder Company)",
      location: "Dhaka, Bangladesh",
      type: "Full-Time",
      description:
        "Built responsive client portals, e-commerce integrations, and content management systems for international clients.",
      achievements: [
        "Delivered 18+ web projects on time and within scope with high client satisfaction scores.",
        "Integrated payment gateways (Stripe, SSLCommerz) with idempotent webhook processing.",
        "Transitioned the frontend codebase to modern TypeScript, eliminating runtime type exceptions.",
      ],
    },
    bn: {
      role: "ফুল-স্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার",
      company: "ডেভক্রাফট সলিউশনস (প্লেসহোল্ডার প্রতিষ্ঠান)",
      location: "ঢাকা, বাংলাদেশ",
      type: "ফুল-টাইম",
      description:
        "আন্তর্জাতিক ক্লায়েন্টদের জন্য রেসপনসিভ ওয়েব পোর্টাল, ই-কমার্স সমাধান এবং কনটেন্ট ম্যানেজমেন্ট সিস্টেম তৈরি।",
      achievements: [
        "১৮টিরও বেশি ওয়েব প্রজেক্ট নির্ধারিত সময়ে ও ক্লায়েন্টের পূর্ণ সন্তুষ্টির সাথে সফলভাবে হস্তান্তর।",
        "স্ট্রাইপ এবং এসএসএলকমার্স পেমেন্ট গেটওয়েতে নিরাপদ ওয়েবহুক প্রসেসিং বাস্তবায়ন।",
        "সম্পূর্ণ কোডবেসে TypeScript যুক্ত করে রানটাইম টাইপ এরর দূরীকরণ।",
      ],
    },
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-1",
    period: "2015 — 2019",
    en: {
      degree: "Bachelor of Science in Computer Science & Engineering",
      institution: "State University of Bangladesh (Placeholder Institution)",
      location: "Dhaka, Bangladesh",
      description:
        "Graduated with honors. Rigorous academic focus on Data Structures, Algorithms, Distributed Computing, Database Systems, and Software Engineering Principles.",
      courses: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Distributed Systems & Cloud Computing",
        "Object-Oriented Design & Design Patterns",
      ],
    },
    bn: {
      degree: "ব্যাচেলর অব সায়েন্স ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং",
      institution: "স্টেট ইউনিভার্সিটি অব বাংলাদেশ (প্লেসহোল্ডার প্রতিষ্ঠান)",
      location: "ঢাকা, বাংলাদেশ",
      description:
        "সম্মানের সাথে উত্তীর্ণ। ডাটা স্ট্রাকচার, অ্যালগরিদম, ডিস্ট্রিবিউটেড কম্পিউটিং, ডেটাবেজ সিস্টেম এবং সফটওয়্যার ইঞ্জিনিয়ারিং নীতিসমূহের ওপর গভীর তাত্ত্বিক ও ব্যবহারিক শিক্ষা।",
      courses: [
        "ডাটা স্ট্রাকচার ও অ্যালগরিদম",
        "ডেটাবেজ ম্যানেজমেন্ট সিস্টেম",
        "ডিস্ট্রিবিউটেড সিস্টেম ও ক্লাউড কম্পিউটিং",
        "সফটওয়্যার ডিজাইন ও আর্কিটেকচারাল প্যাটার্ন",
      ],
    },
  },
];

export const BLOG_POSTS_DATA: BlogPostItem[] = [
  {
    id: "blog-1",
    slug: "architecting-bilingual-nextjs-16-apps",
    publishedAt: "2026-03-15",
    readTime: "7",
    tags: ["Next.js", "TypeScript", "Architecture", "i18n"],
    en: {
      title: "Architecting Zero-Layout-Shift Bilingual Systems in Next.js 16",
      excerpt:
        "How to model bilingual records in a unified database schema without duplicating entities, while maintaining optimal SSR performance and perfect typography rendering for complex scripts like Bengali.",
      content:
        "Building internationalized web applications often creates difficult tradeoffs between performance, SEO, and maintenance complexity. In this article, we explore the sub-document pattern...",
    },
    bn: {
      title: "Next.js 16-এ জিরো-লেআউট-শিফট দ্বিভাষিক সিস্টেম আর্কিটেকচার",
      excerpt:
        "ডেটাবেজে রেকর্ড ডুপ্লিকেট না করে কীভাবে একই ডকুমেন্টে বাংলা ও ইংরেজি কন্টেন্ট সাজানো যায় এবং বাংলা হরফের জন্য মসৃণ টাইপোগ্রাফি নিশ্চিত করা যায় তার বিশদ বিশ্লেষণ।",
      content:
        "আন্তর্জাতিক মানের অ্যাপ্লিকেশন তৈরিতে লোকালাইজেশন একটি গুরুত্বপূর্ণ বিষয়। কীভাবে আমরা একটি একক ডেটাবেজ রেকর্ডে বাংলা ও ইংরেজি কন্টেন্ট সংরক্ষণ করতে পারি...",
    },
  },
  {
    id: "blog-2",
    slug: "resilient-microservices-express-mongodb",
    publishedAt: "2026-02-28",
    readTime: "9",
    tags: ["Express.js", "MongoDB", "Backend", "Performance"],
    en: {
      title: "Resilient Express & MongoDB Architectures Under High Concurrency",
      excerpt:
        "A practical guide to connection pooling, graceful shutdowns, index optimization, and distributed retry policies for production Node.js services.",
      content:
        "When microservices experience unexpected traffic surges, failure to configure connection pools properly can quickly cascade through an entire system...",
    },
    bn: {
      title: "উচ্চ কনকারেন্সিতে Express ও MongoDB-এর টেকসই আর্কিটেকচার",
      excerpt:
        "কানেকশন পুলিং, গ্রেসফুল শাটডাউন, ইনডেক্স অপটিমাইজেশন এবং ডিস্ট্রিবিউটেড রিট্রাই স্ট্র্যাটেজির মাধ্যমে কীভাবে ব্যাকএন্ডকে নির্ভরযোগ্য রাখা যায়।",
      content:
        "হঠাৎ ট্রাফিক বৃদ্ধির সময় নোডজেএস এবং মঙ্গোডিবি সার্ভার কীভাবে সঠিকভাবে পরিচালনা করতে হয় তা এখানে বিস্তারিত আলোচনা করা হয়েছে...",
    },
  },
];

export const ASSISTANT_QA_DATA: AssistantQAPair[] = [
  {
    id: "qa-1",
    category: "experience",
    en: {
      question: "What is Mehedi's primary area of expertise?",
      answer:
        "Mehedi is a Senior Full-Stack Architect with over 6 years of experience. He specializes in designing scalable Next.js frontends, resilient Express.js/Node microservices, clean MongoDB schemas, and cloud-native deployments.",
    },
    bn: {
      question: "মেহেদীর প্রধান প্রযুক্তিগত দক্ষতা কী কী?",
      answer:
        "মেহেদী একজন সিনিয়র ফুল-স্ট্যাক আর্কিটেক্ট যার ৬ বছরেরও বেশি অভিজ্ঞতা রয়েছে। তিনি Next.js ফ্রন্টএন্ড, Express.js ব্যাকএন্ড মাইক্রোসার্ভিস, MongoDB ডেটা মডেলিং এবং ক্লাউড সিস্টেমে বিশেষভাবে দক্ষ।",
    },
  },
  {
    id: "qa-2",
    category: "skills",
    en: {
      question: "What frontend technologies does he use?",
      answer:
        "Mehedi builds modern frontend architectures with Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, and accessible shadcn/ui component patterns, with deep focus on Web Vitals and multilingual rendering.",
    },
    bn: {
      question: "তিনি কী কী ফ্রন্টএন্ড প্রযুক্তি ব্যবহার করেন?",
      answer:
        "মেহেদী Next.js (App Router), React 19, TypeScript, Tailwind CSS v4 এবং shadcn/ui উপাদান ব্যবহার করেন। তিনি পারফরম্যান্স ও ওয়েব ভাইটালসের ওপর সর্বোচ্চ গুরুত্ব দেন।",
    },
  },
  {
    id: "qa-3",
    category: "freelance",
    en: {
      question: "Is Mehedi available for freelance or full-time roles?",
      answer:
        "Yes! Mehedi is currently open to senior full-time engineering roles, technical advisory positions, and selected high-impact freelance consulting projects worldwide.",
    },
    bn: {
      question: "মেহেদী কি নতুন চাকরি বা ফ্রিল্যান্স কাজের জন্য প্রস্তুত?",
      answer:
        "হ্যাঁ! মেহেদী বর্তমানে সিনিয়র ফুল-টাইম সফটওয়্যার ইঞ্জিনিয়ারিং রোল, টেকনিক্যাল অ্যাডভাইজরি এবং নির্বাচিত আন্তর্জাতিক ফ্রিল্যান্স প্রজেক্টের কাজের জন্য প্রস্তুত।",
    },
  },
  {
    id: "qa-4",
    category: "contact",
    en: {
      question: "How can I contact Mehedi directly?",
      answer:
        "You can reach Mehedi directly via the Contact section below, by emailing contact.mehedi.dev@gmail.com, or through his GitHub and LinkedIn profiles linked on this page.",
    },
    bn: {
      question: "মেহেদীর সাথে সরাসরি যোগাযোগের উপায় কী?",
      answer:
        "আপনি এই পেজের কন্টাক্ট ফরম পূরণ করে, সরাসরি contact.mehedi.dev@gmail.com ইমেইলে, অথবা লিঙ্কডইন ও গিটহাবের মাধ্যমে যোগাযোগ করতে পারেন।",
    },
  },
  {
    id: "qa-5",
    category: "architecture",
    en: {
      question: "How is this portfolio architected?",
      answer:
        "This project is structured as a monorepo: a Next.js 16 frontend at the root delivering zero-shift bilingual pages (/en and /bn), and a decoupled Express.js REST API in backend/ connected to MongoDB Atlas for dynamic content and messages.",
    },
    bn: {
      question: "এই পোর্টফোলিও সিস্টেমটি কীভাবে তৈরি করা হয়েছে?",
      answer:
        "এটি একটি আধুনিক মনোরেপো আর্কিটেকচার: রুটে Next.js 16 সমৃদ্ধ ফ্রন্টএন্ড যা বাংলা ও ইংরেজিতে তাৎক্ষণিক রেন্ডার হয়, এবং backend/ ডিরেক্টরিতে Express.js REST API যা MongoDB Atlas-এর সাথে সংযুক্ত।",
    },
  },
];

