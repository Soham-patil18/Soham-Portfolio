/**
 * Soham Patil Portfolio — Data Store
 * Structured data for certifications, projects, and credentials.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Soham Patil",
    title: "Java Developer | Full Stack Developer",
    degree: "B.Tech – Information Science and Engineering",
    college: "Basaveshwar Engineering College, Bagalkot",
    graduation: "2027",
    email: "sohampatil49690@gmail.com",
    phone: "+91 7899362940",
    location: "Bagalkot, Karnataka, India",
    github: "https://github.com/Soham-patil18",
    linkedin: "https://linkedin.com/in/soham-patil-108s/",
    portfolio: "https://portfolio-nine-lyart-56.vercel.app/"
  },

  certifications: {
    "meta-js": {
      title: "Programming with JavaScript",
      issuer: "Meta",
      platform: "Coursera / Meta Career Programs",
      date: "July 2026",
      credentialId: "META-JS-2026-SP",
      skills: ["JavaScript (ES6+)", "OOP in JS", "Asynchronous Programming", "Jest Unit Testing", "Data Structures in JS"],
      summary: "Comprehensive certification covering modern JavaScript development, object-oriented concepts, functional programming, DOM manipulation, asynchronous JavaScript (Promises, async/await), and writing unit tests with Jest.",
      verificationUrl: "https://github.com/Soham-patil18"
    },
    "meta-html-css": {
      title: "HTML and CSS in Depth",
      issuer: "Meta",
      platform: "Coursera / Meta Career Programs",
      date: "July 2026",
      credentialId: "META-HTMLCSS-2026-SP",
      skills: ["Semantic HTML5", "Modern CSS3", "CSS Grid & Flexbox", "Responsive Design", "Accessibility (WCAG)", "CSS Animations"],
      summary: "In-depth training on semantic web architecture, modern responsive CSS layouts using Flexbox and CSS Grid, cross-device breakpoints, fluid typography, transitions, animations, and web accessibility standards.",
      verificationUrl: "https://github.com/Soham-patil18"
    },
    "tata-forage": {
      title: "GenAI Powered Data Analytics Job Simulation",
      issuer: "TATA",
      platform: "Forage",
      date: "June 2026",
      credentialId: "TATA-FORAGE-GENAI-2026",
      skills: ["Generative AI Tools", "Data Analysis & Interpretation", "Business Metrics Storytelling", "Executive Presentation"],
      summary: "Completed a simulated enterprise analytics assignment with TATA via Forage, analyzing business metrics using generative AI tools, formulating data-backed recommendations, and crafting executive-level insights.",
      verificationUrl: "https://github.com/Soham-patil18"
    }
  },

  projects: {
    "nammakisan": {
      title: "NammaKisan – Farmer-to-Consumer Platform",
      category: "fullstack",
      date: "Dec 2025",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "Python", "MySQL", "Bootstrap", "Git"],
      description: "A full-stack agricultural marketplace platform designed to connect farmers directly with consumers. Enables direct product listings, fair price discovery, inventory management, and CRUD operations on produce catalogs without middlemen.",
      github: "https://github.com/Soham-patil18/NammaKisan",
      live: "https://nammakisan-frontend1.onrender.com",
      highlights: [
        "Architected responsive frontend with React.js and Bootstrap for catalog browsing and cart management.",
        "Implemented MySQL and MongoDB database schemas for product inventory and transaction records.",
        "Integrated Cloudinary API for image uploads of farmer produce.",
        "Engineered secure authentication with JWT and password encryption."
      ]
    },
    "bec-billdesk": {
      title: "BEC Bill Desk – Online College Fee Payment System",
      category: "fullstack",
      date: "Mar 2025",
      stack: ["Next.js", "React", "JavaScript", "Java", "Python", "MySQL", "Bootstrap", "Git"],
      description: "A web-based institutional billing and fee management system developed for college administration and students. Enables real-time fee queries, payment tracking, and receipt generation.",
      github: "https://github.com/Soham-patil18/BEC-BILLDESK",
      highlights: [
        "Structured secure student fee breakdown tables and transaction history views.",
        "Implemented MySQL database backend to manage student profiles, fees, and invoice records.",
        "Engineered responsive user interface using Next.js and modern JavaScript components."
      ]
    },
    "interviewiq": {
      title: "InterviewIQ AI – Interview Prep & Assessment Platform",
      category: "fullstack",
      date: "Jan 2026",
      stack: ["JavaScript", "Python", "Java", "MongoDB", "MySQL", "HTML5", "CSS3", "Bootstrap", "Git"],
      description: "An AI-assisted interview preparation platform designed to help students and candidates practice domain-specific technical questions, evaluate mock assessments, and monitor preparation metrics.",
      github: "https://github.com/Soham-patil18/InterviewIQ-AI",
      highlights: [
        "Created modular interview question bank categorized by technology and difficulty.",
        "Implemented MongoDB storage for candidate test scores and response logging.",
        "Built responsive web assessment screens with timer and scoring mechanisms."
      ]
    },
    "simon-game": {
      title: "Simon Memory Game",
      category: "frontend",
      date: "Feb 2025",
      stack: ["HTML5", "CSS3", "JavaScript (ES6+)", "Web Audio API"],
      description: "An interactive browser-based memory sequencing game engineered with vanilla JavaScript and optimized event listeners for fast responsiveness.",
      github: "https://github.com/Soham-patil18/SimonGame",
      highlights: [
        "Algorithmic pattern generation with progressive difficulty and audio-visual cues.",
        "Optimized DOM event handling for 40% faster responsiveness.",
        "High score persistence and clean responsive layout."
      ]
    },
    "amazon-clone": {
      title: "Amazon UI Clone & Responsive Layouts",
      category: "frontend",
      date: "Feb 2025",
      stack: ["HTML5", "CSS3", "JavaScript", "Flexbox", "CSS Grid"],
      description: "High-fidelity frontend UI clones of major platforms (Amazon, BMW, Spotify, Flipkart) built to practice complex grid layouts, responsive navigation menus, and cross-browser consistency.",
      github: "https://github.com/Soham-patil18",
      highlights: [
        "Implemented pixel-accurate multi-level navigation bar, banner carousels, and product cards.",
        "Fluid responsiveness across desktop, tablet, and mobile viewports.",
        "Organized CSS architecture utilizing modern variables and Flexbox/Grid modules."
      ]
    }
  }
};
