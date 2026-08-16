/**
 * Soham Patil Portfolio — Data Store
 * Structured data for verified certifications, projects, and credentials.
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
    linkedin: "https://linkedin.com/in/soham-patil-108s/"
  },

  certifications: {
    "meta-js": {
      title: "Programming with JavaScript",
      issuer: "Meta",
      platform: "Coursera",
      date: "July 13, 2026",
      credentialId: "98N1M3C53F7I",
      verificationUrl: "https://coursera.org/verify/98N1M3C53F7I",
      image: "assets/certificates/meta-javascript-certificate.png",
      skills: ["JavaScript (ES6+)", "OOP in JS", "Asynchronous Programming", "Jest Unit Testing", "Data Structures in JS"],
      summary: "Authorized by Meta and offered through Coursera. Validates proficiency in modern JavaScript, functional programming, object-oriented concepts, DOM manipulation, asynchronous programming with Promises & async/await, and unit testing with Jest."
    },
    "meta-html-css": {
      title: "HTML and CSS in depth",
      issuer: "Meta",
      platform: "Coursera",
      date: "July 17, 2026",
      credentialId: "7810YDDDE3HL",
      verificationUrl: "https://coursera.org/verify/7810YDDDE3HL",
      image: "assets/certificates/meta-html-css-certificate.png",
      skills: ["Semantic HTML5", "Modern CSS3", "CSS Grid & Flexbox", "Responsive Design", "Web Accessibility (WCAG)", "CSS Animations"],
      summary: "Authorized by Meta and offered through Coursera. Demonstrates in-depth mastery of semantic HTML5, modern CSS3 layout systems (Flexbox and Grid), responsive web design across viewports, fluid typography, animations, and web accessibility standards."
    },
    "tata-forage": {
      title: "GenAI Powered Data Analytics Job Simulation",
      issuer: "TATA",
      platform: "Forage",
      date: "June 25, 2026",
      credentialId: "Q57uMJM5s9pbmKHXr",
      userCode: "6a3cec1ea27deb0c56362ddf",
      verificationUrl: "assets/certificates/tata-forage-genai-certificate.png",
      image: "assets/certificates/tata-forage-genai-certificate.png",
      skills: ["Exploratory Data Analysis", "Risk Profiling", "Predicting Delinquency with AI", "Data Storytelling & Strategy", "AI-Driven Business Insights"],
      summary: "Issued by Forage in collaboration with TATA. Completed practical tasks in exploratory data analysis and risk profiling, predicting delinquency with AI, and crafting executive-level business reports and data storytelling for collections strategies."
    },
    "bec-contest": {
      title: "Certificate of Appreciation — 1st Place Winner",
      issuer: "Basaveshwar Engineering College, Bagalkote",
      platform: "Internal Quality Assurance Cell (IQAC)",
      date: "February 21, 2026",
      credentialId: "BEC-IQAC-PC-2026",
      verificationUrl: "https://github.com/Soham-patil18",
      image: "assets/certificates/bec-project-contest-1st-prize.jpg",
      skills: ["Software Engineering", "Full Stack Development", "Database Architecture", "Problem Solving", "Technical Presentation"],
      summary: "Secured First Place in the PROJECT CONTEST organized for the IT and Circuit branches (AIML, CSE, ECE, EEE, ISE, MCA) held on 21st February, 2026 at Basaveshwar Engineering College, Bagalkote."
    }
  },

  projects: {
    "nammakisan": {
      title: "NammaKisan — Farmer-to-Consumer Platform",
      category: "fullstack",
      date: "Dec 2025",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "Python", "MySQL", "Bootstrap", "Git"],
      description: "A full-stack agricultural marketplace platform designed to connect farmers directly with consumers.",
      github: "https://github.com/Soham-patil18/NammaKisan",
      live: "https://nammakisan-frontend1.onrender.com"
    }
  }
};
