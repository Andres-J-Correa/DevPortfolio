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
      "VPS",
      "React.js",
      "JavaScript",
      "CSS3",
      "HTML5",
      "ASP.NET",
      "C#",
      "MySQL",
      "MariaDB",
      "REST APIs",
    ],
    link: "https://www.tourgo.space",
  },
];

const skills = {
  frontend: [
    "HTML5",
    "CSS3",
    "SASS",
    "JavaScript",
    "React",
    "Redux",
    "Next.js",
    "Responsive Design",
  ],
  backend: ["Node.js", "C#", ".Net Core", "ASP.NET Web API", "REST APIs"],
  databases: ["SQL", "Relational Database", "MySQL", "MariaDb", "SSMS"],
  cloudAndDevOps: ["Azure", "AWS", "VPS Management", "CI/CD", "GitHub Actions"],
  testing: ["Jest"],
  aiAndML: ["AI", "OpenAI API", "Prompt Engineering"],
  tools: [
    "Git",
    "Github",
    "VS Code",
    "Visual Studio",
    "Postman",
    "Internationalization (i18n)",
  ],
  methodologies: ["Agile Methodologies"],
};

const contact = {
  email: "andresj.correas@gmail.com",
};

export { about, projects, skills, contact };
