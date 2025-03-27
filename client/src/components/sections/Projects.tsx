import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsInfo } from "@/data/portfolioData";

type ProjectCategory = "All" | "Web App" | "AI" | "Desktop";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");

  const filteredProjects = activeFilter === "All" 
    ? projectsInfo.projects
    : projectsInfo.projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-200">
            My <span className="text-primary">Projects</span>
          </h2>
          <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each project includes a link to the GitHub repository.
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FilterButton 
            category="All" 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter}
          />
          <FilterButton 
            category="Web App" 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter}
          />
          <FilterButton 
            category="AI" 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter}
          />
          <FilterButton 
            category="Desktop" 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter}
          />
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.a 
            href={projectsInfo.githubLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.97 }}
          >
            <i className="fab fa-github mr-2 text-lg"></i>
            <span>See more on GitHub</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

interface FilterButtonProps {
  category: ProjectCategory;
  activeFilter: ProjectCategory;
  setActiveFilter: (category: ProjectCategory) => void;
}

const FilterButton = ({ category, activeFilter, setActiveFilter }: FilterButtonProps) => (
  <motion.button 
    className={`px-4 py-2 rounded-full font-medium text-sm focus:outline-none ${
      activeFilter === category
        ? "bg-primary text-white"
        : "bg-gray-800/70 text-gray-300 hover:bg-gray-800/90"
    }`}
    onClick={() => setActiveFilter(category)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {category}
  </motion.button>
);

interface ProjectCardProps {
  project: typeof projectsInfo.projects[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const categoryColors = {
    "Web App": "bg-primary",
    "AI": "bg-emerald-500",
    "Desktop": "bg-violet-500"
  };
  
  const categoryColor = categoryColors[project.category as keyof typeof categoryColors];
  
  return (
    <motion.div 
      className="project-card bg-gray-800/40 rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary/30 to-violet-600/30 flex items-center justify-center">
          <div className="text-6xl text-white/50">
            <i className={project.icon}></i>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`${categoryColor} px-2 py-1 text-xs text-white rounded-full`}>
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-200 mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 text-sm h-24 overflow-auto">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <span key={techIndex} className="bg-gray-800/70 px-2 py-1 rounded text-xs text-gray-400">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <motion.a 
            href={project.repoLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:text-primary/80 font-medium text-sm flex items-center transition-colors"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
          >
            <i className="fab fa-github mr-2"></i> View on GitHub
          </motion.a>
          {project.demoLink && (
            <motion.a 
              href={project.demoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-violet-500 hover:text-violet-400 text-sm flex items-center transition-colors"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
            >
              <i className="fas fa-external-link-alt mr-2"></i> Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
