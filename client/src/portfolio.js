const about = {
  name: "Andres Correa",
  role: "Full Stack Software Developer",
  resume: `${process.env.PUBLIC_URL}/assets/resume.pdf`,
  social: {
    linkedin: "https://www.linkedin.com/in/andres-correa-dev/",
    github: "https://github.com/Andres-J-Correa",
  },
};

const projects = [
  {
    name: "TourGo",
    description:
      "A full-stack property management system designed to streamline the management of vacation rentals.",
    stack: [
      "React.js",
      "ASP.NET",
      "MariaDB",
      "JavaScript",
      "TypeScript",
      "CSS3",
      "Bootstrap 5",
      "HTML5",
      "C#",
      "MySQL",
      "REST APIs",
      "JWT",
      "Github Actions",
      "VPS",
      "Nginx",
      "Responsive Design",
      "Internationalization (i18n)",
    ],
    link: "https://tourgo.space",
  },
  {
    name: "ForexFinder",
    description:
      "Android application that allows users to find the best forex shops nearby and compare their prices.",
    stack: [
      "Android",
      "React Native",
      "Expo",
      "NestJS",
      "Node.js",
      "Express.js",
      "JavaScript",
      "TypeScript",
      "OAuth 2.0",
      "Google Maps API",
      "JWT",
      "TypeORM",
      "PostgreSQL",
      "REST APIs",
      "Docker",
      "GitHub Actions",
    ],
    link: "https://forexfinder.tourgo.space/",
  },
];

const skills = {
  frontend: [
    "React.js",
    "React Native",
    "JavaScript",
    "TypeScript",
    "HTML5",
    "CSS3",
    "SASS",
    "Bootstrap",
    "Tailwind CSS",
    "Material UI",
    "Redux",
    "Next.js",
    "Responsive Design",
  ],
  backend: [
    "ASP.NET Web API",
    ".Net Core",
    "Node.js",
    "Express.js",
    "NestJS",
    "C#",
    "REST APIs",
    "JWT",
    "OAuth 2.0",
  ],
  databases: [
    "SQL",
    "Relational Databases",
    "MySQL",
    "MariaDb",
    "PostgreSQL",
    "TypeORM",
  ],
  cloudAndDevOps: [
    "Azure",
    "AWS",
    "VPS Management",
    "CI/CD",
    "GitHub Actions",
    "Docker",
    "Nginx",
  ],
  testing: ["Jest", "xUnit"],
  aiAndML: ["OpenAI API", "Llama", "Prompt Engineering"],
  tools: [
    "Git",
    "Github",
    "VS Code",
    "Visual Studio",
    "SSMS",
    "DBeaver",
    "Postman",
    "Agentic Development",
  ],
  methodologies: ["Agile Methodologies", "TDD"],
};

const contact = {
  email: "andresj.correas@outlook.com",
};

export { about, projects, skills, contact };
