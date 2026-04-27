import "./styles/About.css";




const About = () => {
  const skills = ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "MongoDB"];

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Full-Stack MERN Developer with 2+ years of experience. Strong grip on JS, TS, and modern web architectures, delivering high-end digital experiences.
        </p>
        
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <span className="premium-dot"></span>
              <span className="skill-text">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;