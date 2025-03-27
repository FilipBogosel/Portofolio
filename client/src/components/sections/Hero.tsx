import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import profileImage from "../../assets/profile.jpeg";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-emerald-500 font-mono mb-4">Hello, I'm</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-200 mb-4">
              <span className="block mb-2">{personalInfo.name}</span>
              <span className="text-primary typewriter">
                {personalInfo.title}
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl">
              {personalInfo.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-lg transition-all shadow-lg hover:shadow-primary/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="bg-transparent border-2 border-primary text-primary hover:bg-primary/10 font-medium py-2 px-6 rounded-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact Me
              </motion.a>
            </div>
            <div className="flex mt-8 space-x-4">
              <SocialLink href={personalInfo.social.github} icon="fa-github" />
              <SocialLink href={personalInfo.social.linkedin} icon="fa-linkedin" />
              <SocialLink href={personalInfo.social.instagram} icon="fa-instagram" />
            </div>
          </motion.div>
          <motion.div 
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-violet-500 opacity-20 blur-2xl"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden ring-4 ring-primary/30">
                  <motion.div
                    className="w-full h-full"
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  >
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface SocialLinkProps {
  href: string;
  icon: string;
}

const SocialLink = ({ href, icon }: SocialLinkProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-primary transition-colors"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    <i className={`fab ${icon} text-2xl`}></i>
  </motion.a>
);

export default Hero;
