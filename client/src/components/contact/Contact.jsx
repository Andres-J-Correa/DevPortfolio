import { contact } from "../../portfolio";
import "./contact.css";

const Contact = () => {
  if (!contact.email) return null;

  return (
    <a href={`mailto:${contact.email}`}>
      <span
        type="button"
        className="btn btn--outline"
        style={{ borderRadius: ".375rem" }}>
        Email me
      </span>
    </a>
  );
};

export default Contact;
