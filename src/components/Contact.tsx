import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaInstagram, FaGithub } from "react-icons/fa"; // Additional icons
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <p className="sub-heading">Have a project in mind?</p>
      
      {/* Big Talk Link with Hover Outline */}
      <a href="mailto:example@mail.com" className="big-title-link">
        <h3 className="big-title">Let's Talk.</h3>
      </a>

      <div className="contact-flex">
        {/* Column 1: Intro */}
        <div className="contact-box">
          <h2 style={{fontSize: '30px', margin: '0 0 15px 0'}}>FS</h2>
          <p style={{fontSize: '14px', opacity: 0.7, lineHeight: '1.6'}}>
            Digital excellence through minimal architecture. Building the future of the web, one pixel at a time.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="contact-box">
          <h4>Navigation</h4>
          <div className="social-links">
             <a href="#work" className="contact-social-link">Work</a>
             <a href="#expertise" className="contact-social-link">Expertise</a>
             <a href="#process" className="contact-social-link">Process</a>
          </div>
        </div>

        {/* Column 3: Social */}
        <div className="contact-box">
          <h4>Social</h4>
          <div className="social-links">
            <a href="https://instagram.com" className="contact-social-link">
              <FaInstagram /> Instagram
            </a>
            <a href="https://github.com" className="contact-social-link">
              <FaGithub /> GitHub
            </a>
          </div>
        </div>

        {/* Column 4: Location & Status */}
        <div className="contact-box">
          <h4>Location</h4>
          <p style={{margin: 0}}>Based in FSD, Pakistan</p>
          <p style={{opacity: 0.5, fontSize: '14px', marginTop: '5px'}}>Available Worldwide</p>
          
          
        </div>
      </div>
      
      {/* Copyright Footer (Optional) */}
      <div style={{marginTop: '60px', opacity: 0.4, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px'}}>
        <MdCopyright /> 2026 AJ DEVELOPER
      </div>
    </div>
  );
};

export default Contact;