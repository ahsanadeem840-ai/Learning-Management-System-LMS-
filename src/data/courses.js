export const coursesData = [
  {
    id: "nextjs15",
    title: "Next.js 15 Masterclass: App Router & Server Actions",
    subtitle: "Build production-ready, SEO-optimized, and hyper-fast web applications using Next.js 15, React 19, and Server Actions.",
    instructor: "Alex Rivers",
    instructorTitle: "Senior Web Engineer & Next.js Core Contributor",
    instructorBio: "Alex is a software engineer with over 10 years of experience building scalable applications. He has contributed to Next.js and teaches thousands of students worldwide.",
    rating: 4.9,
    reviews: 1240,
    price: "$89.00",
    category: "Development",
    duration: "24h 45m",
    lessonsCount: 20,
    level: "Intermediate",
    tag: "Bestseller",
    tagBg: "bg-indigo-600 text-white",
    description: "Go from beginner to advanced with Next.js 15. This course covers everything you need to know, including the brand new App Router, React Server Components (RSC), Client Components, Server Actions, Route Handlers, middleware, caching, deployment, and performance optimization.",
    outcomes: [
      "Master the new Next.js 15 App Router architecture",
      "Implement secure React Server Actions for data mutations",
      "Understand hydration, Server Components, and client-side interactivity",
      "Deploy scalable Next.js apps to Vercel and AWS",
      "Optimize SEO, metadata, images, and Core Web Vitals"
    ],
    syllabus: [
      {
        title: "Module 1: Introduction & Environment Setup",
        duration: "2h 15m",
        lessons: [
          { title: "Course Introduction & Syllabus Overview", duration: "12:30", isPreview: true },
          { title: "Setting up the Development Environment", duration: "18:45", isPreview: true },
          { title: "Understanding Next.js vs React scaffolding", duration: "22:15" },
          { title: "Module 1 Quiz & Assessment", duration: "15:00" }
        ]
      },
      {
        title: "Module 2: The New App Router & Layout System",
        duration: "5h 30m",
        lessons: [
          { title: "Routing Conventions: Folder-based Routing", duration: "25:40", isPreview: true },
          { title: "Defining Layouts, Templates, and Root Pages", duration: "32:10" },
          { title: "Understanding Nested Layouts & Shared States", duration: "28:15" },
          { title: "Error Handling & Custom Loading States", duration: "19:50" }
        ]
      },
      {
        title: "Module 3: Server vs Client Components",
        duration: "6h 40m",
        lessons: [
          { title: "Introduction to React Server Components (RSC)", duration: "35:20" },
          { title: "Interactivity with Client Components ('use client')", duration: "28:10" },
          { title: "Component Composition Patterns & Best Practices", duration: "42:30" },
          { title: "Data Fetching in Server Components", duration: "31:40" }
        ]
      },
      {
        title: "Module 4: Server Actions & Data Mutations",
        duration: "10h 20m",
        lessons: [
          { title: "Understanding Server Actions & Form Actions", duration: "45:10" },
          { title: "Optimistic Updates & useTransition", duration: "38:25" },
          { title: "Form Validation with Zod & Server Actions", duration: "52:40" },
          { title: "Revalidation and Caching Strategies", duration: "28:50" }
        ]
      }
    ]
  },
  {
    id: "introai",
    title: "Intro to AI: Deep Neural Networks from Scratch",
    subtitle: "An intuitive mathematical and practical introduction to Deep Learning. Build, train, and deploy neural networks.",
    instructor: "Dr. Sarah Chen",
    instructorTitle: "AI Researcher & Professor at Stanford",
    instructorBio: "Dr. Chen is a leading expert in Artificial Intelligence and Neural Computing. She specializes in training deep convolutional networks and neural architectures.",
    rating: 4.8,
    reviews: 840,
    price: "$119.00",
    category: "Data Science & AI",
    duration: "18h 30m",
    lessonsCount: 25,
    level: "Advanced",
    tag: "New",
    tagBg: "bg-pink-600 text-white",
    description: "Demystify Deep Learning. Instead of just importing libraries, you will write backpropagation algorithms, activation functions, and optimization routines from scratch in pure Python, then transition to frameworks like PyTorch.",
    outcomes: [
      "Explain the mathematical foundation of gradient descent",
      "Write multi-layer perceptrons from scratch in Python",
      "Implement Backpropagation and Activation Functions (ReLU, Softmax)",
      "Train networks for image classification and text generation",
      "Deploy machine learning endpoints using FastAPI and Docker"
    ],
    syllabus: [
      {
        title: "Module 1: Mathematics for Neural Computing",
        duration: "4h 10m",
        lessons: [
          { title: "Linear Algebra Refresher: Tensors & Dot Products", duration: "45:30", isPreview: true },
          { title: "Calculus & Partial Derivatives Demystified", duration: "55:10", isPreview: true },
          { title: "Probability & Cross-Entropy Loss Functions", duration: "32:45" }
        ]
      },
      {
        title: "Module 2: Building a Perceptron from Scratch",
        duration: "5h 20m",
        lessons: [
          { title: "Structure of a Artificial Neuron", duration: "38:40", isPreview: true },
          { title: "Writing the Forward Pass Algorithm", duration: "42:15" },
          { title: "Activation Functions: Sigmoid & ReLU", duration: "30:50" },
          { title: "Gradient Descent Optimization Visualized", duration: "48:20" }
        ]
      },
      {
        title: "Module 3: Backpropagation & Deep Networks",
        duration: "9h 00m",
        lessons: [
          { title: "The Chain Rule & Backpropagation Derivation", duration: "62:10" },
          { title: "Coding Backpropagation in Pure NumPy", duration: "75:30" },
          { title: "Dealing with Vanishing and Exploding Gradients", duration: "45:10" }
        ]
      }
    ]
  },
  {
    id: "uiuxfigma",
    title: "UI/UX Design Systems with Figma: Scalable & Modern",
    subtitle: "Learn the workflow professionals use to build design systems, interactive prototypes, and gorgeous user interfaces.",
    instructor: "Marcus Vance",
    instructorTitle: "Lead UX Architect & Design consultant",
    instructorBio: "Marcus has crafted design identities for tech giants and startups. He believes in functional design, strict grids, and scalable modular design systems.",
    rating: 4.7,
    reviews: 910,
    price: "$79.00",
    category: "Design",
    duration: "15h 20m",
    lessonsCount: 20,
    level: "Beginner",
    description: "Bridge the gap between design and development. This course focuses on building unified component design libraries in Figma, using auto layouts, variables, nested instances, and creating fluid responsive mockups.",
    outcomes: [
      "Build a complete typography and color token system",
      "Master Figma Auto-Layout 5.0 for fully fluid responsive cards",
      "Configure component properties, variables, and modes",
      "Create high-fidelity interactive animations and prototype flows",
      "Collaborate effectively and hand off code-ready specs to dev teams"
    ],
    syllabus: [
      {
        title: "Module 1: Principles of Modern UI/UX Design",
        duration: "3h 10m",
        lessons: [
          { title: "Visual Hierarchy, Alignment, & Spacing", duration: "25:40", isPreview: true },
          { title: "Typography Hierarchies & HSL Color Palettes", duration: "38:15", isPreview: true },
          { title: "Understanding Cognitive Load & Usability Rules", duration: "32:45" }
        ]
      },
      {
        title: "Module 2: Figma Power User Fundamentals",
        duration: "4h 30m",
        lessons: [
          { title: "Figma Interface Navigation & Key Shortcuts", duration: "28:10", isPreview: true },
          { title: "Mastering Auto-Layout: Flex Direction & Spacing", duration: "45:30" },
          { title: "Grid Systems: 8pt Column Grid Setup", duration: "32:40" }
        ]
      },
      {
        title: "Module 3: Design Tokens & Reusable Component Systems",
        duration: "7h 40m",
        lessons: [
          { title: "Creating Colors, Effects, and Text Styles", duration: "42:10" },
          { title: "Building Modular Buttons, Inputs, & Dropdowns", duration: "55:30" },
          { title: "Nested Component Assemblies & Variants", duration: "62:10" }
        ]
      }
    ]
  },
  {
    id: "growthmarketing",
    title: "Growth Hacking: Modern SEO & Social Media Marketing",
    subtitle: "Acquire users, build high-converting landing pages, and scale organic channels using cutting-edge growth frameworks.",
    instructor: "Jane Doe",
    instructorTitle: "Growth Lead & Marketing Specialist",
    instructorBio: "Jane has managed multi-million dollar advertising budgets and built organic growth engines that acquire millions of active monthly users.",
    rating: 4.6,
    reviews: 190,
    price: "Free",
    category: "Marketing",
    duration: "8h 15m",
    lessonsCount: 14,
    level: "Beginner",
    tag: "Popular",
    tagBg: "bg-emerald-600 text-white",
    description: "Learn how modern growth hackers scale products. Ditch outdated textbook strategies and dive into viral loops, SEO authority building, conversion rate optimization (CRO), and building data analytics pipelines.",
    outcomes: [
      "Understand the AARRR (Pirate) Funnel framework",
      "Perform expert keyword research and on-page/off-page SEO",
      "Design and split-test landing pages for maximum conversions",
      "Setup automated email flows and social media viral strategies",
      "Analyze analytics logs to track CAC and Lifetime Value (LTV)"
    ],
    syllabus: [
      {
        title: "Module 1: The Growth Hacking Mindset",
        duration: "2h 00m",
        lessons: [
          { title: "Traditional Marketing vs Growth Hacking", duration: "22:15", isPreview: true },
          { title: "The Pirate Funnel: Acquisition to Referral", duration: "38:45", isPreview: true },
          { title: "Setting KPIs & Metrics Pipelines", duration: "18:20" }
        ]
      },
      {
        title: "Module 2: High-Performance SEO Authority",
        duration: "3h 15m",
        lessons: [
          { title: "How Search Engines Work: Crawling & Indexing", duration: "28:10", isPreview: true },
          { title: "Keyword Search Volume & Competitor Audits", duration: "42:50" },
          { title: "On-Page SEO Copywriting & Technical Tuning", duration: "34:20" }
        ]
      },
      {
        title: "Module 3: Conversion Rate Optimization (CRO)",
        duration: "3h 00m",
        lessons: [
          { title: "Design Patterns of High-Converting Headers", duration: "32:10" },
          { title: "A/B Testing: Copy, Buttons, & Layouts", duration: "25:40" },
          { title: "Tuning the User Signup Experience Flows", duration: "32:10" }
        ]
      }
    ]
  },
  {
    id: "tailwindcssv4",
    title: "Tailwind CSS v4 in Depth: From Utility to Production",
    subtitle: "Deep dive into the latest Tailwind CSS v4 features. Build fast, custom, and responsive layouts without leaving your HTML.",
    instructor: "Brad Traversy",
    instructorTitle: "Full Stack Developer & Technical Educator",
    instructorBio: "Brad has built a massive community online through his clear, hands-on development tutorials. He simplifies complex concepts for over 2 million students.",
    rating: 4.9,
    reviews: 320,
    price: "$49.00",
    category: "Development",
    duration: "12h 45m",
    lessonsCount: 18,
    level: "Beginner",
    tag: "Hot",
    tagBg: "bg-indigo-600 text-white",
    description: "Master the utility-first workflow using the brand new Tailwind CSS v4 compiler. Learn about custom color configurations, the new CSS-first configuration parser, CSS variable bindings, transitions, and hover state optimizations.",
    outcomes: [
      "Understand the speed and optimization improvements in Tailwind v4",
      "Configure custom theme grids, fonts, and dark mode tokens",
      "Build complex responsive layouts with zero custom CSS files",
      "Implement animations, custom scrollbars, and backdrop blurs",
      "Use plugins and direct compiler optimizations to trim bundle sizes"
    ],
    syllabus: [
      {
        title: "Module 1: Tailwind CSS v4 Architecture",
        duration: "2h 45m",
        lessons: [
          { title: "What's New in Tailwind v4?", duration: "18:15", isPreview: true },
          { title: "Understanding the New CSS-First Config Engine", duration: "32:45", isPreview: true },
          { title: "Installing Tailwind in Next.js & Vite projects", duration: "24:10" }
        ]
      },
      {
        title: "Module 2: Layout & Grid Masterclass",
        duration: "4h 30m",
        lessons: [
          { title: "Box Model, Flexbox, & CSS Grid Utilities", duration: "35:10", isPreview: true },
          { title: "Building a Fluid Responsive Core Dashboard Grid", duration: "48:30" },
          { title: "Responsive Breakpoints & Device Optimizations", duration: "32:10" }
        ]
      },
      {
        title: "Module 3: Styling Transitions, Filters, & Dark Mode",
        duration: "5h 30m",
        lessons: [
          { title: "Implementing Glassmorphic Cards & Backdrop-Blur", duration: "42:10" },
          { title: "Animating Micro-Interactions on Button Hover", duration: "38:40" },
          { title: "Configuring CSS Variable-based Dark Mode", duration: "45:30" }
        ]
      }
    ]
  },
  {
    id: "reactnative",
    title: "React Native: Build Native Mobile Apps with JavaScript",
    subtitle: "Create cross-platform iOS and Android apps using your React and JavaScript skills with Expo and React Native.",
    instructor: "Maximilian Schwarz",
    instructorTitle: "Founder of Academind & Best-Selling Instructor",
    instructorBio: "Maximilian is a self-taught programmer who has taught millions how to code. He focuses on practical, real-world examples and deep dives.",
    rating: 4.8,
    reviews: 670,
    price: "$99.00",
    category: "Development",
    duration: "30h 10m",
    lessonsCount: 32,
    level: "Intermediate",
    description: "Write once, run anywhere. Learn to build high-performance native iOS and Android mobile apps using React, Expo CLI, native navigation packages, storage managers, and accessing physical device components.",
    outcomes: [
      "Build native apps for iOS and Android using React Native & Expo",
      "Design flexible layouts using Flexbox layout modules",
      "Implement nested stack, tab, and drawer navigations",
      "Access device features like Camera, Location, and Image Library",
      "State management using Redux Toolkit and AsyncStorage"
    ],
    syllabus: [
      {
        title: "Module 1: Getting Started with React Native & Expo",
        duration: "4h 15m",
        lessons: [
          { title: "React Native Architecture vs Web React", duration: "25:10", isPreview: true },
          { title: "Installing Expo CLI & Physical Device Syncing", duration: "38:40", isPreview: true },
          { title: "Creating Your First Native App Layout View", duration: "42:15" }
        ]
      },
      {
        title: "Module 2: Stylings & Responsive Layout Views",
        duration: "6h 30m",
        lessons: [
          { title: "Mobile UI Layouts using Native Flexbox Grid", duration: "38:10", isPreview: true },
          { title: "Handling Device Screen Sizes & Dimensions APIs", duration: "45:30" },
          { title: "Styling Text, Images, and Interactive Pressables", duration: "32:45" }
        ]
      },
      {
        title: "Module 3: Advanced Mobile Navigation Routing",
        duration: "8h 45m",
        lessons: [
          { title: "Stack Navigation: Moving Between Dynamic Screen Cards", duration: "45:10" },
          { title: "Configuring Bottom Tabs & Custom Overlay Tab Bars", duration: "52:30" },
          { title: "Passing Parameters & Data State between Screens", duration: "42:10" }
        ]
      }
    ]
  },
  {
    id: "productman",
    title: "Product Management: From Strategy to Product Launch",
    subtitle: "Master product strategy, wireframing, agile development, and telemetry analytics to build products users love.",
    instructor: "Sarah Jenkins",
    instructorTitle: "Former Principal PM at Google & Slack",
    instructorBio: "Sarah is a product veteran with over 15 years of experience leading cross-functional engineering and design teams to build world-class products.",
    rating: 4.5,
    reviews: 145,
    price: "$69.00",
    category: "Marketing",
    duration: "10h 30m",
    lessonsCount: 12,
    level: "Intermediate",
    description: "Learn how to operate as a modern Product Manager. This course guides you through finding product-market fit, conducting user research interviews, writing PRDs, wireframing features, and driving agile development sprints.",
    outcomes: [
      "Formulate a scalable product roadmap and market strategy",
      "Write comprehensive Product Requirement Documents (PRDs)",
      "Conduct user interviews and outline detailed user journey maps",
      "Coordinate development milestones with Agile/Scrum engineering teams",
      "Leverage Amplitude and Mixpanel for event-based user tracking"
    ],
    syllabus: [
      {
        title: "Module 1: The Role of a Product Manager",
        duration: "2h 30m",
        lessons: [
          { title: "What is Product Management?", duration: "25:40", isPreview: true },
          { title: "Core Skills: Tech, Business, and UX Triads", duration: "32:10", isPreview: true },
          { title: "A Day in the Life of a PM: Sprints & Syncs", duration: "24:35" }
        ]
      },
      {
        title: "Module 2: Finding Product-Market Fit",
        duration: "3h 40m",
        lessons: [
          { title: "Identifying Target Personas & Paint Points", duration: "35:10", isPreview: true },
          { title: "Competitor Matrices & Strategic Differentiation", duration: "42:15" },
          { title: "Defining the MVP: Feature Prioritization Frameworks", duration: "38:40" }
        ]
      },
      {
        title: "Module 3: UX Prototyping & Agile Sprints",
        duration: "4h 20m",
        lessons: [
          { title: "Drawing Wireframe Screen Maps & User Flows", duration: "45:10" },
          { title: "Writing Clear Agile User Stories & Acceptance Criteria", duration: "38:30" },
          { title: "Telemetry: Tracking Core Event Metrics & User Paths", duration: "42:10" }
        ]
      }
    ]
  }
];
