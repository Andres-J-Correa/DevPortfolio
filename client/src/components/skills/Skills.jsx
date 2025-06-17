import uniqid from "uniqid";
import { skills } from "../../portfolio";
import "./skills.css";

const Skills = () => {
  if (!skills || Object.keys(skills).length === 0) return null;

  return (
    <section className="section skills" id="skills">
      <h2 className="section__title">Skills</h2>
      <div className="skills__categories">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="skills__category">
            <h3 className="skills__category-title">
              {category
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </h3>
            <ul className="skills__list">
              {skillList.map((skill) => (
                <li key={uniqid()} className="skills__list-item btn btn--plain">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
