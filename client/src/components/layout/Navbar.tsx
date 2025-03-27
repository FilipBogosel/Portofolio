import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScroll } from "@/hooks/useScroll";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollTo } = useScroll();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    scrollTo(sectionId);
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed w-full bg-background/90 backdrop-blur-sm z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <motion.span 
              className="text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white">&lt;</span>
              <span className="text-primary">Dev</span>
              <span className="text-white">/&gt;</span>
            </motion.span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink 
                label="Home" 
                sectionId="hero" 
                isActive={activeSection === "hero"} 
                onClick={() => handleNavClick("hero")} 
              />
              <NavLink 
                label="About" 
                sectionId="about" 
                isActive={activeSection === "about"} 
                onClick={() => handleNavClick("about")} 
              />
              <NavLink 
                label="Skills" 
                sectionId="skills" 
                isActive={activeSection === "skills"} 
                onClick={() => handleNavClick("skills")} 
              />
              <NavLink 
                label="Projects" 
                sectionId="projects" 
                isActive={activeSection === "projects"} 
                onClick={() => handleNavClick("projects")} 
              />
              <NavLink 
                label="Contact" 
                sectionId="contact" 
                isActive={activeSection === "contact"} 
                onClick={() => handleNavClick("contact")} 
              />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-primary focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden pb-3 pt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-2 px-2">
              <MobileNavLink 
                label="Home" 
                sectionId="hero" 
                onClick={() => handleNavClick("hero")} 
              />
              <MobileNavLink 
                label="About" 
                sectionId="about" 
                onClick={() => handleNavClick("about")} 
              />
              <MobileNavLink 
                label="Skills" 
                sectionId="skills" 
                onClick={() => handleNavClick("skills")} 
              />
              <MobileNavLink 
                label="Projects" 
                sectionId="projects" 
                onClick={() => handleNavClick("projects")} 
              />
              <MobileNavLink 
                label="Contact" 
                sectionId="contact" 
                onClick={() => handleNavClick("contact")} 
              />
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

interface NavLinkProps {
  label: string;
  sectionId: string;
  isActive: boolean;
  onClick: () => void;
}

const NavLink = ({ label, isActive, onClick }: NavLinkProps) => (
  <button
    onClick={onClick}
    className={`relative nav-link text-gray-300 hover:text-primary px-1 py-2 text-sm font-medium ${
      isActive ? "text-primary" : ""
    }`}
  >
    {label}
    <motion.div
      className="absolute left-0 bottom-[-4px] bg-primary h-0.5 w-0"
      animate={{ width: isActive ? "100%" : "0%" }}
      transition={{ duration: 0.3 }}
    />
  </button>
);

interface MobileNavLinkProps {
  label: string;
  sectionId: string;
  onClick: () => void;
}

const MobileNavLink = ({ label, onClick }: MobileNavLinkProps) => (
  <button
    onClick={onClick}
    className="text-gray-300 hover:bg-gray-800/20 hover:text-primary px-3 py-2 rounded-md text-base font-medium w-full text-left"
  >
    {label}
  </button>
);

export default Navbar;
