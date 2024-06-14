import uniqid from "uniqid";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useNavigate } from "react-router-dom";
import "./projectContainer.css";

const ProjectContainer = ({ project }) => {
  const navigate = useNavigate();

  const goToProject = (e) => {
    navigate(project.path);
  };

  return (
    <div className="project" onClick={goToProject}>
      <h3>{project.name}</h3>

      <p className="project__description">{project.description}</p>
      {project.stack && (
        <ul className="project__stack">
          {project.stack.map((item) => (
            <li key={uniqid()} className="project__stack-item">
              {item}
            </li>
          ))}
        </ul>
      )}

      {project.sourceCode && (
        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = project.sourceCode;
          }}
          aria-label="source code"
          className="link link--icon"
        >
          <GitHubIcon />
        </span>
      )}
    </div>
  );
};

export default ProjectContainer;
