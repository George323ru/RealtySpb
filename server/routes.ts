import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertReviewSchema } from "../shared/schema.js";
import { z } from "zod";
import { routesLogger } from "./logger";

export async function registerRoutes(app: Express): Promise<Server> {
  routesLogger.processStart('Routes registration');

  // Properties routes
  app.get("/api/properties", async (req, res) => {
    const startTime = Date.now();
    try {
      const filters = {
        propertyType: req.query.propertyType as string,
        district: req.query.district as string,
        priceFrom: req.query.priceFrom ? parseInt(req.query.priceFrom as string) : undefined,
        priceTo: req.query.priceTo ? parseInt(req.query.priceTo as string) : undefined,
        buildingType: req.query.buildingType as string,
        rooms: req.query.rooms ? parseInt(req.query.rooms as string) : undefined,
      };
      
      routesLogger.debug('Получение списка недвижимости', { filters });
      const properties = await storage.getProperties(filters);
      
      const duration = Date.now() - startTime;
      routesLogger.info(`Возвращено ${properties.length} объектов недвижимости`, { 
        count: properties.length, 
        duration: `${duration}ms`,
        filters 
      });
      
      res.json(properties);
    } catch (error) {
      routesLogger.error("Ошибка при получении списка недвижимости", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/featured", async (req, res) => {
    const startTime = Date.now();
    try {
      routesLogger.debug('Получение рекомендуемой недвижимости');
      const properties = await storage.getProperties();
      const featured = properties.slice(0, 6);
      
      const duration = Date.now() - startTime;
      routesLogger.info(`Возвращено ${featured.length} рекомендуемых объектов`, { 
        count: featured.length, 
        duration: `${duration}ms` 
      });
      
      res.json(featured);
    } catch (error) {
      routesLogger.error("Ошибка при получении рекомендуемой недвижимости", error);
      res.status(500).json({ message: "Failed to fetch featured properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    const startTime = Date.now();
    try {
      const id = parseInt(req.params.id);
      routesLogger.debug('Получение объекта недвижимости по ID', { propertyId: id });
      
      const property = await storage.getProperty(id);
      
      if (!property) {
        routesLogger.warn('Объект недвижимости не найден', { propertyId: id });
        return res.status(404).json({ message: "Property not found" });
      }
      
      const duration = Date.now() - startTime;
      routesLogger.info('Объект недвижимости найден', { 
        propertyId: id, 
        title: property.title,
        duration: `${duration}ms` 
      });
      
      res.json(property);
    } catch (error) {
      routesLogger.error("Ошибка при получении объекта недвижимости", error, { propertyId: req.params.id });
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  // New buildings routes
  app.get("/api/new-buildings", async (req, res) => {
    const startTime = Date.now();
    try {
      routesLogger.debug('Получение списка новостроек');
      const buildings = await storage.getNewBuildings();
      
      const duration = Date.now() - startTime;
      routesLogger.info(`Возвращено ${buildings.length} новостроек`, { 
        count: buildings.length, 
        duration: `${duration}ms` 
      });
      
      res.json(buildings);
    } catch (error) {
      routesLogger.error("Ошибка при получении списка новостроек", error);
      res.status(500).json({ message: "Failed to fetch new buildings" });
    }
  });

  app.get("/api/new-buildings/:id", async (req, res) => {
    const startTime = Date.now();
    try {
      const id = parseInt(req.params.id);
      routesLogger.debug('Получение новостройки по ID', { buildingId: id });
      
      const building = await storage.getNewBuilding(id);
      
      if (!building) {
        routesLogger.warn('Новостройка не найдена', { buildingId: id });
        return res.status(404).json({ message: "Building not found" });
      }
      
      const duration = Date.now() - startTime;
      routesLogger.info('Новостройка найдена', { 
        buildingId: id, 
        name: building.name,
        duration: `${duration}ms` 
      });
      
      res.json(building);
    } catch (error) {
      routesLogger.error("Ошибка при получении новостройки", error, { buildingId: req.params.id });
      res.status(500).json({ message: "Failed to fetch building" });
    }
  });

  // Services routes
  app.get("/api/services", async (req, res) => {
    const startTime = Date.now();
    try {
      routesLogger.debug('Получение списка услуг');
      const services = await storage.getServices();
      
      const duration = Date.now() - startTime;
      routesLogger.info(`Возвращено ${services.length} услуг`, { 
        count: services.length, 
        duration: `${duration}ms` 
      });
      
      res.json(services);
    } catch (error) {
      routesLogger.error("Ошибка при получении списка услуг", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    const startTime = Date.now();
    try {
      const id = parseInt(req.params.id);
      routesLogger.debug('Получение услуги по ID', { serviceId: id });
      
      const service = await storage.getService(id);
      
      if (!service) {
        routesLogger.warn('Услуга не найдена', { serviceId: id });
        return res.status(404).json({ message: "Service not found" });
      }
      
      const duration = Date.now() - startTime;
      routesLogger.info('Услуга найдена', { 
        serviceId: id, 
        name: service.name,
        duration: `${duration}ms` 
      });
      
      res.json(service);
    } catch (error) {
      routesLogger.error("Ошибка при получении услуги", error, { serviceId: req.params.id });
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Team routes
  app.get("/api/team", async (req, res) => {
    const startTime = Date.now();
    try {
      routesLogger.debug('Получение списка сотрудников');
      const team = await storage.getTeamMembers();
      
      const duration = Date.now() - startTime;
      routesLogger.info(`Возвращено ${team.length} сотрудников`, { 
        count: team.length, 
        duration: `${duration}ms` 
      });
      
      res.json(team);
    } catch (error) {
      routesLogger.error("Ошибка при получении списка сотрудников", error);
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  // Reviews routes
  app.get("/api/reviews", async (req, res) => {
    const startTime = Date.now();
    try {
      routesLogger.debug('Получение списка отзывов');
      const reviews = await storage.getReviews();
      
      const duration = Date.now() - startTime;
      routesLogger.info(`Возвращено ${reviews.length} отзывов`, { 
        count: reviews.length, 
        duration: `${duration}ms` 
      });
      
      res.json(reviews);
    } catch (error) {
      routesLogger.error("Ошибка при получении списка отзывов", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    const startTime = Date.now();
    try {
      routesLogger.info('Создание нового отзыва', { 
        authorName: req.body.name,
        rating: req.body.rating 
      });
      
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      
      const duration = Date.now() - startTime;
      routesLogger.info('Отзыв успешно создан', { 
        reviewId: review.id,
        authorName: review.name,
        rating: review.rating,
        duration: `${duration}ms` 
      });
      
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        routesLogger.warn("Некорректные данные отзыва", { 
          errors: error.errors,
          requestBody: req.body 
        });
        res.status(400).json({ message: "Invalid review data", errors: error.errors });
      } else {
        routesLogger.error("Ошибка при создании отзыва", error);
        res.status(500).json({ message: "Failed to create review" });
      }
    }
  });

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    const startTime = Date.now();
    try {
      routesLogger.debug('Получение списка статей блога');
      const posts = await storage.getBlogPosts();
      
      const duration = Date.now() - startTime;
      routesLogger.info(`Возвращено ${posts.length} статей блога`, { 
        count: posts.length, 
        duration: `${duration}ms` 
      });
      
      res.json(posts);
    } catch (error) {
      routesLogger.error("Ошибка при получении списка статей блога", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    const startTime = Date.now();
    try {
      const slug = req.params.slug;
      routesLogger.debug('Получение статьи блога по slug', { slug });
      
      const post = await storage.getBlogPost(slug);
      
      if (!post) {
        routesLogger.warn('Статья блога не найдена', { slug });
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      const duration = Date.now() - startTime;
      routesLogger.info('Статья блога найдена', { 
        slug, 
        title: post.title,
        duration: `${duration}ms` 
      });
      
      res.json(post);
    } catch (error) {
      routesLogger.error("Ошибка при получении статьи блога", error, { slug: req.params.slug });
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Leads routes
  app.post("/api/leads", async (req, res) => {
    const startTime = Date.now();
    try {
      routesLogger.info('Создание новой заявки', { 
        name: req.body.name,
        serviceType: req.body.serviceType,
        source: 'api/leads'
      });
      
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      
      const duration = Date.now() - startTime;
      routesLogger.info('Заявка успешно создана', { 
        leadId: lead.id,
        name: lead.name,
        serviceType: lead.serviceType,
        duration: `${duration}ms` 
      });
      
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        routesLogger.warn("Некорректные данные заявки", { 
          errors: error.errors,
          requestBody: req.body 
        });
        res.status(400).json({ message: "Invalid lead data", errors: error.errors });
      } else {
        routesLogger.error("Ошибка при создании заявки", error);
        res.status(500).json({ message: "Failed to create lead" });
      }
    }
  });

  // Contact form route
  app.post("/api/contact", async (req, res) => {
    const startTime = Date.now();
    try {
      routesLogger.info('Создание заявки через контактную форму', { 
        name: req.body.name,
        source: 'contact_form'
      });
      
      const contactData = {
        ...req.body,
        serviceType: "консультация"
      };
      const validatedData = insertLeadSchema.parse(contactData);
      const lead = await storage.createLead(validatedData);
      
      const duration = Date.now() - startTime;
      routesLogger.info('Заявка через контактную форму создана', { 
        leadId: lead.id,
        name: lead.name,
        duration: `${duration}ms` 
      });
      
      res.status(201).json({ message: "Заявка отправлена успешно", lead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        routesLogger.warn("Некорректные данные контактной формы", { 
          errors: error.errors,
          requestBody: req.body 
        });
        res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      } else {
        routesLogger.error("Ошибка при отправке контактной формы", error);
        res.status(500).json({ message: "Failed to send contact form" });
      }
    }
  });

  // Promotions routes
  app.get("/api/promotions", async (req, res) => {
    const startTime = Date.now();
    try {
      const category = req.query.category as string;
      routesLogger.debug('Получение списка акций', { category });
      
      const promotions = await storage.getPromotions(category);
      
      const duration = Date.now() - startTime;
      routesLogger.info(`Возвращено ${promotions.length} акций`, { 
        count: promotions.length, 
        category,
        duration: `${duration}ms` 
      });
      
      res.json(promotions);
    } catch (error) {
      routesLogger.error("Ошибка при получении списка акций", error);
      res.status(500).json({ message: "Failed to fetch promotions" });
    }
  });

  app.get("/api/promotions/:id", async (req, res) => {
    const startTime = Date.now();
    try {
      const id = parseInt(req.params.id);
      routesLogger.debug('Получение акции по ID', { promotionId: id });
      
      const promotion = await storage.getPromotion(id);
      
      if (!promotion) {
        routesLogger.warn('Акция не найдена', { promotionId: id });
        return res.status(404).json({ message: "Promotion not found" });
      }
      
      const duration = Date.now() - startTime;
      routesLogger.info('Акция найдена', { 
        promotionId: id, 
        title: promotion.title,
        duration: `${duration}ms` 
      });
      
      res.json(promotion);
    } catch (error) {
      routesLogger.error("Ошибка при получении акции", error, { promotionId: req.params.id });
      res.status(500).json({ message: "Failed to fetch promotion" });
    }
  });

  routesLogger.processEnd('Routes registration');
  return createServer(app);
}
