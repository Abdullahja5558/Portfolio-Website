import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Career.css";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.to(timelineRef.current, {
        maxHeight: "100%",
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%", // extended the end point slightly for a longer draw
         // This makes the line draw incredibly smoothly with a slight lag
        },
      });

      // Box reveal animations
      gsap.from(".career-info-box", {
        opacity: 0,
        y: 80,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      // Title reveal
      gsap.from(".career-section h2", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="career-section section-container" ref={sectionRef} id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline" ref={timelineRef}>
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Creative Agency</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Lead the development of high-performance web applications using
              the MERN stack. Collaborated with cross-functional teams to
              deliver seamless user experiences.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Engineer</h4>
                <h5>Tech Startup</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Specialized in building interactive user interfaces with React and
              GSAP. Optimized application performance and ensured cross-browser
              compatibility.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Developer</h4>
                <h5>Freelance</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Architecting scalable digital solutions for global clients.
              Mastering Next.js and TypeScript to build the next generation of
              premium web experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;