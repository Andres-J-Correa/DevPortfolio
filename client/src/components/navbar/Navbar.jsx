import { useState, useMemo, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/theme";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import WbSunnyRoundedIcon from "@material-ui/icons/WbSunnyRounded";
import { projects, skills, contact } from "../../portfolio";
import "./navbar.css";

const Navbar = () => {
  const [showNavList, setShowNavList] = useState(false);
  const [{ themeName, toggleTheme }] = useContext(ThemeContext);

  const location = useLocation();
  const isHomePage = useMemo(
    () => location.pathname === "/",
    [location.pathname]
  );
  const hasProjects = useMemo(() => projects.length > 0, []);
  const hasSkills = useMemo(() => skills.length > 0, []);
  const hasContact = useMemo(() => Boolean(contact.email), []);

  const toggleNavList = () => setShowNavList(!showNavList);

  return (
    <nav className="center nav">
      <ul
        style={{ display: showNavList ? "flex" : null }}
        className="nav__list"
      >
        {isHomePage && hasProjects && (
          <li className="nav__list-item">
            <a
              href="#projects"
              onClick={toggleNavList}
              className="link link--nav"
            >
              Projects
            </a>
          </li>
        )}
        {isHomePage && hasSkills && (
          <li className="nav__list-item">
            <a
              href="#skills"
              onClick={toggleNavList}
              className="link link--nav"
            >
              Skills
            </a>
          </li>
        )}
        {isHomePage && hasContact && (
          <li className="nav__list-item">
            <a
              href="#contact"
              onClick={toggleNavList}
              className="link link--nav"
            >
              Contact
            </a>
          </li>
        )}
        {!isHomePage && (
          <li className="nav__list-item">
            <Link to="/" className="link link--nav">
              Home
            </Link>
          </li>
        )}
      </ul>

      <button
        type="button"
        onClick={toggleTheme}
        className="btn btn--icon nav__theme"
        aria-label="toggle theme"
      >
        {themeName === "dark" ? <WbSunnyRoundedIcon /> : <Brightness2Icon />}
      </button>

      <button
        type="button"
        onClick={toggleNavList}
        className="btn btn--icon nav__hamburger"
        aria-label="toggle navigation"
      >
        {showNavList ? <CloseIcon /> : <MenuIcon />}
      </button>
    </nav>
  );
};

export default Navbar;
