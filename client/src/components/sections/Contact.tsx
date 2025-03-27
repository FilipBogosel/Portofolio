import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { contactInfo } from "@/data/portfolioData";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-200">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form className="bg-gray-800/40 p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800/70 border-0 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500/70 focus:ring-2 focus:ring-primary outline-none transition-all" 
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-800/70 border-0 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500/70 focus:ring-2 focus:ring-primary outline-none transition-all" 
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-gray-800/70 border-0 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500/70 focus:ring-2 focus:ring-primary outline-none transition-all" 
                  placeholder="Subject"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5} 
                  className="w-full bg-gray-800/70 border-0 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500/70 focus:ring-2 focus:ring-primary outline-none transition-all resize-none" 
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <motion.button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-primary/50 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <i className="fas fa-paper-plane ml-2"></i>
              </motion.button>
            </form>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-800/40 p-8 rounded-xl shadow-lg h-full">
              <h3 className="text-2xl font-semibold text-gray-200 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <ContactInfoItem 
                  icon="fa-envelope" 
                  title="Email" 
                  value={contactInfo.email} 
                  link={`mailto:${contactInfo.email}`}
                  iconBg="bg-primary/20"
                  iconColor="text-primary"
                  hoverColor="hover:text-primary"
                />
                
                <ContactInfoItem 
                  icon="fa-phone-alt" 
                  title="Phone" 
                  value={contactInfo.phone} 
                  link={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                  iconBg="bg-emerald-500/20"
                  iconColor="text-emerald-500"
                  hoverColor="hover:text-emerald-500"
                />
                
                <ContactInfoItem 
                  icon="fa-map-marker-alt" 
                  title="Location" 
                  value={contactInfo.location} 
                  iconBg="bg-violet-500/20"
                  iconColor="text-violet-500"
                  hoverColor=""
                />
                
                <div className="pt-6">
                  <h4 className="text-lg font-medium text-gray-200 mb-4">Social Media</h4>
                  <div className="flex space-x-4">
                    <SocialIcon 
                      href={contactInfo.social.github} 
                      icon="fa-github" 
                    />
                    <SocialIcon 
                      href={contactInfo.social.linkedin} 
                      icon="fa-linkedin-in" 
                    />
                    <SocialIcon 
                      href={contactInfo.social.instagram} 
                      icon="fa-instagram" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface ContactInfoItemProps {
  icon: string;
  title: string;
  value: string;
  link?: string;
  iconBg: string;
  iconColor: string;
  hoverColor: string;
}

const ContactInfoItem = ({ 
  icon, 
  title, 
  value, 
  link, 
  iconBg, 
  iconColor, 
  hoverColor 
}: ContactInfoItemProps) => (
  <motion.div 
    className="flex items-start"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center ${iconBg} rounded-lg ${iconColor}`}>
      <i className={`fas ${icon} text-xl`}></i>
    </div>
    <div className="ml-4">
      <h4 className="text-lg font-medium text-gray-200">{title}</h4>
      {link ? (
        <a href={link} className={`text-gray-400 ${hoverColor} transition-colors`}>
          {value}
        </a>
      ) : (
        <p className="text-gray-400">{value}</p>
      )}
    </div>
  </motion.div>
);

interface SocialIconProps {
  href: string;
  icon: string;
}

const SocialIcon = ({ href, icon }: SocialIconProps) => (
  <motion.a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-10 h-10 rounded-full bg-gray-800/70 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    <i className={`fab ${icon}`}></i>
  </motion.a>
);

export default Contact;
