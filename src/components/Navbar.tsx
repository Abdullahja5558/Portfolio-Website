import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2.5,
      smoothTouch: 0.1,
      effects: true,
      normalizeScroll: true,
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          width: `${scrolled}%`,
          duration: 0.2,
          ease: "none"
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Magnetic Effect Logic
    const magneticElements = document.querySelectorAll(".nav-links li, .navbar-cta, .navbar-logo");
    
    magneticElements.forEach((el) => {
      el.addEventListener("mousemove", (e: any) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });

    // Entrance Animation removed to fix visibility bug on initial load.
    const ctx = gsap.context(() => {
      // Intentionally left empty or can add other non-buggy animations if needed
    }, headerRef);

    gsap.ticker.lagSmoothing(1000, 16);
    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".nav-links a, .mobile-nav-links a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let target = e.currentTarget as HTMLAnchorElement;
        let section = target.getAttribute("data-href");
        if (section) {
          smoother.scrollTo(section, true, "top top");
          setIsMenuOpen(false);
        }
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header 
        ref={headerRef}
        className={`header ${isScrolled ? "is-scrolled" : ""}`}
      >
        <div className="nav-container">
          <a href="/#" className="navbar-logo" data-cursor="disable">
            FAIZAN<span>.</span>
          </a>

          <nav className="nav-links">
            <ul>
              <li>
                <a data-href="#about" href="#about">
                  <HoverLinks text="ABOUT" />
                </a>
              </li>
              <li>
                <a data-href="#work" href="#work">
                  <HoverLinks text="WORK" />
                </a>
              </li>
              <li>
                <a data-href="#contact" href="#contact">
                  <HoverLinks text="CONTACT" />
                </a>
              </li>
            </ul>
          </nav>

          <a
            href="mailto:example@mail.com"
            className="navbar-cta"
           
          >
            LET'S TALK
          </a>

          <div className="mobile-menu-trigger" onClick={toggleMenu}>
            <span style={{ transform: isMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}></span>
            <span style={{ opacity: isMenuOpen ? 0 : 1 }}></span>
            <span style={{ transform: isMenuOpen ? "rotate(-45deg) translate(7px, -7px)" : "none" }}></span>
          </div>

          <div className="nav-progress-container">
            <div ref={progressBarRef} className="nav-progress-bar"></div>
          </div>
        </div>
      </header>

      <div className={`mobile-menu-overlay ${isMenuOpen ? "is-open" : ""}`}>
        <ul className="mobile-nav-links">
          <li>
            <a data-href="#about" href="#about" onClick={() => setIsMenuOpen(false)}>
              ABOUT
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work" onClick={() => setIsMenuOpen(false)}>
              WORK
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact" onClick={() => setIsMenuOpen(false)}>
              CONTACT
            </a>
          </li>
          <li className="mobile-cta-li">
            <a
              href="mailto:[EMAIL_ADDRESS]"
              className="navbar-cta-mobile"
            >
              LET'S TALK
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
