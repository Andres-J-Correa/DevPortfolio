import { contact } from "../../portfolio";
import "./contact.css";

const Contact = () => {
  if (!contact.email) return null;

  return (
    <a href={`mailto:${contact.email}`} className="btn btn--outline btn--sm">
      Email me
    </a>
  );
};

export default Contact;
