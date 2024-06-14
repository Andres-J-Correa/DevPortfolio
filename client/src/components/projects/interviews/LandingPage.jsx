import React from "react";
import { useNavigate } from "react-router-dom";
import CodeIcon from "@material-ui/icons/Code";
import StorageIcon from "@material-ui/icons/Storage";
import LanguageIcon from "@material-ui/icons/Language";
import "./interviews.css";

const Interviews = () => {
  const navigate = useNavigate();

  const topics = [
    { id: 1, text: "React", icon: <CodeIcon className="interviews__icon" /> },
    {
      id: 2,
      text: ".Net",
      icon: <LanguageIcon className="interviews__icon" />,
    },
    { id: 3, text: "SQL", icon: <StorageIcon className="interviews__icon" /> },
  ];

  const handleBoxClick = (topic) => () => {
    navigate("new", { state: { ...topic, icon: undefined } });
  };

  return (
    <div className="interviews__root">
      <h1 className="interviews__header">AI Code Interviews</h1>
      <h2 className="interviews__subtitle">Select a Topic</h2>
      <div className="interviews__grid">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="interviews__topic"
            onClick={handleBoxClick(topic)}
            aria-label={topic.text}
            name={topic.text}
          >
            {topic.icon}
            <h3>{topic.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interviews;
