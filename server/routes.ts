import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./database-storage";
import { insertLeadSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Properties routes
  app.get("/api/properties", async (req, res) => {
    try {
      const filters = {
        propertyType: req.query.propertyType as string,
        district: req.query.district as string,
        priceFrom: req.query.priceFrom ? parseInt(req.query.priceFrom as string) : undefined,
        priceTo: req.query.priceTo ? parseInt(req.query.priceTo as string) : undefined,
        buildingType: req.query.buildingType as string,
        rooms: req.query.rooms ? parseInt(req.query.rooms as string) : undefined,
      };
      
      const properties = await storage.getProperties(filters);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/featured", async (req, res) => {
    try {
      const properties = await storage.getProperties();
      // Return first 6 properties as featured
      const featured = properties.slice(0, 6);
      res.json(featured);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  // New buildings routes
  app.get("/api/new-buildings", async (req, res) => {
    try {
      const buildings = await storage.getNewBuildings();
      res.json(buildings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch new buildings" });
    }
  });

  app.get("/api/new-buildings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const building = await storage.getNewBuilding(id);
      
      if (!building) {
        return res.status(404).json({ message: "Building not found" });
      }
      
      res.json(building);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch building" });
    }
  });

  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Team routes
  app.get("/api/team", async (req, res) => {
    try {
      const team = await storage.getTeamMembers();
      res.json(team);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  // Reviews routes
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid review data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create review" });
      }
    }
  });

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const post = await storage.getBlogPost(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Leads routes
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid lead data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create lead" });
      }
    }
  });

  // Contact form route
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = {
        ...req.body,
        serviceType: "консультация"
      };
      const validatedData = insertLeadSchema.parse(contactData);
      const lead = await storage.createLead(validatedData);
      res.status(201).json({ message: "Заявка отправлена успешно", lead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to send contact form" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
