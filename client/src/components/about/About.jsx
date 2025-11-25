import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { about } from "../../portfolio";
import "./about.css";
import Contact from "../contact/Contact";

const About = () => {
  const { name, role, resume, social } = about;

  return (
    <div className="about center">
      {name && (
        <h1>
          Hi, I am <span className="about__name">{name}.</span>
        </h1>
      )}

      {role && <h2 className="about__role">A {role}.</h2>}

      <div className="about__contact center">
        {social && (
          <>
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="github"
                className="link link--icon">
                <GitHubIcon />
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="linkedin"
                className="link link--icon">
                <LinkedInIcon />
              </a>
            )}

            {resume && (
              <a href={resume} download="andres-resume.pdf">
                <span
                  type="button"
                  className="btn btn--outline"
                  style={{ borderRadius: ".375rem" }}>
                  Resume
                </span>
              </a>
            )}
            <Contact />
          </>
        )}
      </div>
      <a
        href="https://wakatime.com/@b7c5c2d6-968c-47f7-89ed-42fd86301a12"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginTop: "20px" }}>
        <img
          src="https://wakatime.com/badge/user/b7c5c2d6-968c-47f7-89ed-42fd86301a12.svg"
          alt="Total time coded since Dec 3 2022"
        />
      </a>
    </div>
  );
};

export default About;
