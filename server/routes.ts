import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Handle contact form submissions
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Name, email, and message are required" });
      }
      
      // For now, we'll just log the message as we don't have an actual email service
      console.log("Contact form submission:", {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      });
      
      return res.status(200).json({ 
        success: true, 
        message: "Message received successfully" 
      });
    } catch (error) {
      console.error("Error in contact form submission:", error);
      return res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your message" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
