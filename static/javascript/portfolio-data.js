/**
 * Centralized Portfolio Data Store for Jaya Chandran
 * Python / Django Full Stack Developer
 * Source of truth extracted directly from authentic portfolio.
 */
export const portfolioData = {
  personal: {
    name: "Jaya Chandran",
    role: "Python / Django Full Stack Developer",
    badge: "Available for Hire",
    location: "Chennai, Tamil Nadu, India",
    email: "jaichandranr28@gmail.com",
    phone: "+91 73580 11423",
    github: "https://github.com/Jaya-Chandran",
    linkedin: "https://www.linkedin.com/in/jaya-chandranr28/",
    bio: "Creating polished, responsive web experiences with Python, Django, HTML, CSS, Bootstrap, and JavaScript. Dedicated to building modern digital products with a premium look and scalable backend architecture."
  },

  skills: {
    frontend: [
      { name: "HTML5 & CSS3", level: "92%", icon: "fab fa-html5", color: "text-danger" },
      { name: "Bootstrap 5", level: "88%", icon: "fab fa-bootstrap", color: "text-purple" },
      { name: "JavaScript (ES6+)", level: "82%", icon: "fab fa-js", color: "text-warning" }
    ],
    backend: [
      { name: "Python 3.x", level: "90%", icon: "fab fa-python", color: "text-warning" },
      { name: "Django Framework", level: "85%", icon: "fas fa-leaf", color: "text-success" }
    ],
    database: [
      { name: "MySQL", level: "78%", icon: "fas fa-database", color: "text-info" },
      { name: "PostgreSQL", level: "75%", icon: "fas fa-server", color: "text-primary" }
    ],
    tools: [
      "Git",
      "GitHub",
      "Postman",
      "Render",
      "Cloudinary",
      "VS Code",
      "REST APIs",
      "Bootstrap 5"
    ]
  },

  projects: [
    {
      id: "shopcart",
      title: "E-Commerce Shop Cart",
      category: "Full Stack Backend",
      isFeatured: true,
      image: "/static/images/shopcart.png",
      problem: "Built a complete, secure online store application handling end-to-end e-commerce workflows from product discovery to checkout and order persistence.",
      features: [
        "User Authentication (Register, Login, Session Management)",
        "Dynamic Product Catalog & Category Filtering",
        "Interactive Shopping Cart with Real-time Total Calculation",
        "Order Processing Pipeline & Admin Dashboard Control"
      ],
      technologies: ["Python 3.x", "Django ORM", "HTML5 / CSS3", "Bootstrap 5", "SQLite / PostgreSQL"],
      github: "https://github.com/Jaya-Chandran",
      live: "https://shopcart-utrs.onrender.com/"
    },
    {
      id: "portfolio",
      title: "3D Portfolio Website",
      category: "Frontend & 3D Web",
      isFeatured: false,
      image: "/static/images/portfolio.png",
      description: "A modern responsive developer portfolio built with HTML, CSS, JavaScript, and Three.js 3D graphics showcasing skills, projects, and contact system.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Three.js"],
      github: "https://github.com/Jaya-Chandran/My-portfolio",
      live: "https://jaya-chandran.github.io/My-portfolio/"
    },
    {
      id: "calculator",
      title: "Interactive Calculator App",
      category: "Frontend UI",
      isFeatured: false,
      image: "/static/images/calculator.png",
      description: "A sleek digital calculator application with keyboard support, responsive grid layout, and real-time mathematical expression evaluation.",
      technologies: ["JavaScript", "Bootstrap", "CSS Grid"],
      github: "https://github.com/Jaya-Chandran/calculator",
      live: "https://jaya-chandran.github.io/calculator/"
    },
    {
      id: "todo",
      title: "Interactive Todo Task Manager",
      category: "Web Application",
      isFeatured: false,
      image: "/static/images/Todo-List.png",
      description: "A clean task management web application allowing users to create, mark complete, edit, and filter daily tasks dynamically.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/Jaya-Chandran",
      live: null
    }
  ],

  experience: [
    {
      title: "Full Stack Python Developer Trainee",
      company: "i5 Technologies",
      location: "Chennai, India",
      year: "2025",
      description: "Intensive hands-on development in Python and Django framework. Built full-stack web applications, designed database models using Django ORM, created responsive HTML/CSS/Bootstrap interfaces, and implemented RESTful API patterns."
    }
  ],

  education: [
    {
      degree: "Master of Computer Application (MCA)",
      institution: "Madras University (Correspondence)",
      location: "Chennai, India",
      period: "2024 - 2026 (Ongoing)",
      status: "Ongoing"
    },
    {
      degree: "Bachelor of Computer Application (BCA)",
      institution: "Dr. M.G.R Educational & Research Institute",
      location: "Chennai, India",
      period: "2019 - 2022",
      status: "Graduated"
    },
    {
      degree: "Full Stack Python Developer Certification",
      institution: "i5 Technologies",
      location: "Chennai, India",
      period: "2025",
      status: "Certified"
    }
  ],

  stats: [
    { label: "SELECTED PROJECTS", value: "4+" },
    { label: "TECH STACK TOOLS", value: "10+" },
    { label: "ACADEMIC DEGREES", value: "2" },
    { label: "RESPONSIVE CODE", value: "100%" }
  ]
};
