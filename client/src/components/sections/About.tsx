import { motion } from "framer-motion";
import { aboutInfo } from "@/data/portfolioData";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-200">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {aboutInfo.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-400 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
            
            <div className="pt-4">
              <motion.a
                href={aboutInfo.resumeLink}
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Download Resume</span>
                <i className="fas fa-download ml-2"></i>
              </motion.a>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-6">
            <AboutCard 
              icon="fa-graduation-cap" 
              title="Education" 
              content={aboutInfo.education}
              iconColor="text-primary"
              delay={0.3}
            />
            
            <AboutCard 
              icon="fa-laptop-code" 
              title="Experience" 
              content={aboutInfo.experience}
              iconColor="text-emerald-500"
              delay={0.4}
            />
            
            <AboutCard 
              icon="fa-award" 
              title="Certifications" 
              content={aboutInfo.certifications}
              iconColor="text-violet-500"
              delay={0.5}
            />
            
            <AboutCard 
              icon="fa-heart" 
              title="Interests" 
              content={aboutInfo.interests}
              iconColor="text-primary"
              delay={0.6}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface AboutCardProps {
  icon: string;
  title: string;
  content: string;
  iconColor: string;
  delay: number;
}

const AboutCard = ({ icon, title, content, iconColor, delay }: AboutCardProps) => (
  <motion.div 
    className="bg-gray-800/40 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className={`text-4xl ${iconColor} mb-4`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <h3 className="text-xl font-semibold text-gray-200 mb-2">{title}</h3>
    <p className="text-gray-400 whitespace-pre-line">{content}</p>
  </motion.div>
);

export default About;
