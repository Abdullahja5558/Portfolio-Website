import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Luxe Vision",
    category: "3D Interaction / Luxury",
    tools: "Next.js, Three.js, GSAP, Tailwind",
    description: "An immersive 3D experience for a high-end eyewear brand featuring smooth orbital controls and dynamic lighting.",
    image: "/images/placeholder.webp",
  },
  {
    name: "Quantum Dashboard",
    category: "SaaS / Fintech",
    tools: "React, TypeScript, Recharts, Framer Motion",
    description: "A high-performance financial dashboard with real-time data visualization and glassmorphic UI components.",
    image: "/images/placeholder.webp",
  },
  {
    name: "Nebula Stream",
    category: "Streaming / Entertainment",
    tools: "Node.js, Express, MongoDB, Socket.io",
    description: "A real-time streaming platform with synchronized playback and interactive chat features.",
    image: "/images/placeholder.webp",
  },
  {
    name: "Ethereal Portfolio",
    category: "Creative / Portfolio",
    tools: "Vite, React, GLSL, GSAP",
    description: "A futuristic portfolio design with custom shaders and fluid typography animations.",
    image: "/images/placeholder.webp",
  },
];

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".work-box") as HTMLElement[];
    
    cards.forEach((card, index) => {
      // Mouse move effect for the glow
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });

      // Scaling effect on scroll
      if (index !== cards.length - 1) {
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.3,
          scrollTrigger: {
            trigger: card,
            start: "top 100px",
            end: "bottom 100px",
            scrub: 1,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container">
        <h2>
          Featured <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <h4>{project.name}</h4>
                  <p>{project.category}</p>
                </div>
                <div className="work-details">
                  <h4>Tools and features</h4>
                  <p>{project.tools}</p>
                  <p style={{ marginTop: "20px", fontSize: "16px", color: "#888" }}>
                    {project.description}
                  </p>
                </div>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

