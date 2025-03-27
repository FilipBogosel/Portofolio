import { motion } from "framer-motion";
import { skillsInfo } from "@/data/portfolioData";

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-200">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <motion.div 
            className="bg-gray-800/40 p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-gray-200 mb-6 flex items-center">
              <i className="fas fa-code text-primary mr-3"></i>
              Technical Skills
            </h3>
            
            <div className="space-y-5">
              {skillsInfo.technical.map((skill, index) => (
                <SkillBar 
                  key={index} 
                  name={skill.name} 
                  percentage={skill.percentage}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Tools & Technologies */}
          <motion.div 
            className="bg-gray-800/40 p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-gray-200 mb-6 flex items-center">
              <i className="fas fa-toolbox text-emerald-500 mr-3"></i>
              Tools & Technologies
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {skillsInfo.tools.map((tool, index) => (
                <TechTag 
                  key={index} 
                  icon={tool.icon} 
                  name={tool.name} 
                  delay={index * 0.05}
                />
              ))}
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-200 mt-10 mb-6 flex items-center">
              <i className="fas fa-user-gear text-violet-500 mr-3"></i>
              Soft Skills
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {skillsInfo.soft.map((skill, index) => (
                <SoftSkill 
                  key={index} 
                  icon={skill.icon} 
                  name={skill.name}
                  delay={0.5 + index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface SkillBarProps {
  name: string;
  percentage: number;
  delay: number;
}

const SkillBar = ({ name, percentage, delay }: SkillBarProps) => (
  <div className="skill-item">
    <div className="flex justify-between mb-1">
      <span className="text-gray-300 font-medium">{name}</span>
      <span className="text-primary">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-800/70 rounded-full h-2.5">
      <motion.div 
        className="bg-primary h-2.5 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
      />
    </div>
  </div>
);

interface TechTagProps {
  icon: string;
  name: string;
  delay: number;
}

const TechTag = ({ icon, name, delay }: TechTagProps) => (
  <motion.span 
    className="tech-tag bg-gray-800/70 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <i className={`${icon} text-primary mr-2`}></i> {name}
  </motion.span>
);

interface SoftSkillProps {
  icon: string;
  name: string;
  delay: number;
}

const SoftSkill = ({ icon, name, delay }: SoftSkillProps) => (
  <motion.div 
    className="flex items-center bg-gray-800/70 p-3 rounded-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay }}
    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
  >
    <i className={`${icon} text-violet-500 mr-3`}></i>
    <span className="text-gray-300">{name}</span>
  </motion.div>
);

export default Skills;
