import React from "react";

const about = {
  // all the properties are optional - can be left empty or deleted
  name: "Andres Correa",
  role: "Full Stack Software Engineer",
  resume: "https://example.com",
  social: {
    linkedin: "https://www.linkedin.com/in/andres-correa-7aa819244/",
    github: "https://github.com/Andres-J-Correa",
  },
};

const projects = [
  {
    name: "Project 1",
    description:
      "Amet asperiores et impedit aliquam consectetur? Voluptates sed a nulla ipsa officia et esse aliquam",
    stack: ["SASS", "TypeScript", "React"],
    sourceCode: "https://github.com",
    path: "/interviews",
    component: React.lazy(() => import("./components/Projects/Interviews")),
  },
];

const skills = [
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Redux",
  "SASS",
  "Material UI",
  "Git",
  "CI/CD",
  "Jest",
  "Enzyme",
];

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: "johnsmith@mail.com",
};

export { about, projects, skills, contact };
