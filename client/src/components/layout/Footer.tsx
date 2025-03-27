import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { useScroll } from "@/hooks/useScroll";

const Footer = () => {
  const { scrollTo } = useScroll();
  
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-10 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <motion.span 
              className="text-xl font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white">&lt;</span>
              <span className="text-primary">Dev</span>
              <span className="text-white">/&gt;</span>
            </motion.span>
            <p className="text-gray-400 mt-2">
              © {year} {personalInfo.name}. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <FooterLink label="Home" sectionId="hero" onClick={() => scrollTo("hero")} />
            <FooterLink label="About" sectionId="about" onClick={() => scrollTo("about")} />
            <FooterLink label="Skills" sectionId="skills" onClick={() => scrollTo("skills")} />
            <FooterLink label="Projects" sectionId="projects" onClick={() => scrollTo("projects")} />
            <FooterLink label="Contact" sectionId="contact" onClick={() => scrollTo("contact")} />
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  label: string;
  sectionId: string;
  onClick: () => void;
}

const FooterLink = ({ label, onClick }: FooterLinkProps) => (
  <motion.button
    onClick={onClick}
    className="text-gray-400 hover:text-primary transition-colors"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {label}
  </motion.button>
);

export default Footer;
