import { 
  users, properties, newBuildings, teamMembers, services, blogPosts, leads, reviews,
  type User, type InsertUser, type Property, type InsertProperty, 
  type NewBuilding, type InsertNewBuilding, type TeamMember, type InsertTeamMember,
  type Service, type InsertService, type BlogPost, type InsertBlogPost,
  type Lead, type InsertLead, type Review, type InsertReview
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Properties
  getProperties(filters?: PropertyFilters): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  
  // New Buildings
  getNewBuildings(): Promise<NewBuilding[]>;
  getNewBuilding(id: number): Promise<NewBuilding | undefined>;
  createNewBuilding(building: InsertNewBuilding): Promise<NewBuilding>;
  
  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  
  // Services
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Leads
  getLeads(): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  
  // Reviews
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export interface PropertyFilters {
  propertyType?: string;
  transactionType?: string;
  district?: string;
  priceFrom?: number;
  priceTo?: number;
  areaFrom?: number;
  areaTo?: number;
  rooms?: number;
  isNewBuilding?: boolean;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private properties: Map<number, Property> = new Map();
  private newBuildings: Map<number, NewBuilding> = new Map();
  private teamMembers: Map<number, TeamMember> = new Map();
  private services: Map<number, Service> = new Map();
  private blogPosts: Map<number, BlogPost> = new Map();
  private leads: Map<number, Lead> = new Map();
  private reviews: Map<number, Review> = new Map();
  
  private currentUserId = 1;
  private currentPropertyId = 1;
  private currentNewBuildingId = 1;
  private currentTeamMemberId = 1;
  private currentServiceId = 1;
  private currentBlogPostId = 1;
  private currentLeadId = 1;
  private currentReviewId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed properties
    const sampleProperties: InsertProperty[] = [
      {
        title: "3-комнатная квартира в центре",
        description: "Просторная квартира с ремонтом в центральном районе",
        price: 12500000,
        pricePerMeter: 141667,
        area: 88,
        rooms: 3,
        floor: 7,
        totalFloors: 12,
        propertyType: "apartment",
        transactionType: "sale",
        district: "Центральный",
        address: "ул. Рубинштейна, 15",
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"],
        features: ["Ремонт", "Балкон", "Парковка"],
        isNewBuilding: true,
        buildingClass: "comfort",
        yearBuilt: 2023,
        parking: true,
        elevator: true,
        balcony: true,
        renovation: "euro",
        furnished: false,
        active: true,
      },
      {
        title: "Загородный дом, 180 м²",
        description: "Современный дом с участком в тихом районе",
        price: 24900000,
        pricePerMeter: 138333,
        area: 180,
        rooms: 5,
        floor: 2,
        totalFloors: 2,
        propertyType: "house",
        transactionType: "sale",
        district: "Пушкинский",
        address: "пос. Павловск, ул. Садовая",
        images: ["https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800"],
        features: ["Участок", "Гараж", "Сауна"],
        isNewBuilding: false,
        buildingClass: "premium",
        yearBuilt: 2020,
        parking: true,
        elevator: false,
        balcony: false,
        renovation: "designer",
        furnished: false,
        active: true,
      }
    ];

    sampleProperties.forEach(property => {
      this.createProperty(property);
    });

    // Seed new buildings
    const sampleNewBuildings: InsertNewBuilding[] = [
      {
        name: "ЖК \"Северный Парк\"",
        developer: "ПСК Группа",
        description: "Современный жилой комплекс с развитой инфраструктурой",
        location: "Приморский район, м. Комендантский проспект",
        district: "Приморский",
        priceFrom: 4200000,
        pricePerMeterFrom: 115000,
        totalFlats: 324,
        readiness: "75%",
        completionDate: "IV кв. 2025",
        buildingClass: "comfort",
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"],
        features: ["Детская площадка", "Подземная парковка", "Фитнес-центр"],
        active: true,
      }
    ];

    sampleNewBuildings.forEach(building => {
      this.createNewBuilding(building);
    });

    // Seed team members
    const sampleTeamMembers: InsertTeamMember[] = [
      {
        name: "Анна Петрова",
        position: "Руководитель отдела продаж",
        experience: "8 лет",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b587?w=400",
        phone: "+7 (812) 123-45-67",
        email: "anna@spb-realty.ru",
        telegram: "@anna_realty",
        whatsapp: "+79123456789",
        specialization: ["Новостройки", "Премиум недвижимость"],
        description: "Профессиональный риэлтор с большим опытом работы",
        active: true,
      }
    ];

    sampleTeamMembers.forEach(member => {
      this.createTeamMember(member);
    });

    // Seed services
    const sampleServices: InsertService[] = [
      {
        name: "Предпродажная подготовка",
        slug: "pre-sale-preparation",
        description: "Подготовим вашу недвижимость к продаже для максимальной стоимости",
        fullDescription: "Комплексная подготовка недвижимости включает оценку, рекомендации по улучшению, staging и маркетинг",
        icon: "fas fa-hammer",
        category: "additional",
        price: "от 50 000 ₽",
        duration: "1-2 недели",
        features: ["Профессиональная оценка", "Рекомендации по улучшению", "Staging", "Фотосъемка"],
        active: true,
      }
    ];

    sampleServices.forEach(service => {
      this.createService(service);
    });

    // Seed reviews
    const sampleReviews: InsertReview[] = [
      {
        clientName: "Мария Иванова",
        clientPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
        rating: 5,
        review: "Отличная работа команды! Помогли быстро продать квартиру по хорошей цене.",
        propertyType: "apartment",
        serviceType: "sale",
        active: true,
      }
    ];

    sampleReviews.forEach(review => {
      this.createReview(review);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Properties
  async getProperties(filters?: PropertyFilters): Promise<Property[]> {
    let properties = Array.from(this.properties.values()).filter(p => p.active);
    
    if (filters) {
      if (filters.propertyType) {
        properties = properties.filter(p => p.propertyType === filters.propertyType);
      }
      if (filters.transactionType) {
        properties = properties.filter(p => p.transactionType === filters.transactionType);
      }
      if (filters.district) {
        properties = properties.filter(p => p.district === filters.district);
      }
      if (filters.priceFrom) {
        properties = properties.filter(p => p.price >= filters.priceFrom!);
      }
      if (filters.priceTo) {
        properties = properties.filter(p => p.price <= filters.priceTo!);
      }
      if (filters.areaFrom) {
        properties = properties.filter(p => p.area >= filters.areaFrom!);
      }
      if (filters.areaTo) {
        properties = properties.filter(p => p.area <= filters.areaTo!);
      }
      if (filters.rooms) {
        properties = properties.filter(p => p.rooms === filters.rooms);
      }
      if (filters.isNewBuilding !== undefined) {
        properties = properties.filter(p => p.isNewBuilding === filters.isNewBuilding);
      }
    }
    
    return properties;
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = { ...insertProperty, id };
    this.properties.set(id, property);
    return property;
  }

  async updateProperty(id: number, updates: Partial<InsertProperty>): Promise<Property | undefined> {
    const existing = this.properties.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.properties.set(id, updated);
    return updated;
  }

  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
  }

  // New Buildings
  async getNewBuildings(): Promise<NewBuilding[]> {
    return Array.from(this.newBuildings.values()).filter(b => b.active);
  }

  async getNewBuilding(id: number): Promise<NewBuilding | undefined> {
    return this.newBuildings.get(id);
  }

  async createNewBuilding(insertNewBuilding: InsertNewBuilding): Promise<NewBuilding> {
    const id = this.currentNewBuildingId++;
    const building: NewBuilding = { ...insertNewBuilding, id };
    this.newBuildings.set(id, building);
    return building;
  }

  // Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).filter(m => m.active);
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async createTeamMember(insertTeamMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentTeamMemberId++;
    const member: TeamMember = { ...insertTeamMember, id };
    this.teamMembers.set(id, member);
    return member;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values()).filter(s => s.active);
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.services.values()).find(s => s.slug === slug && s.active);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(p => p.active);
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(p => p.slug === slug && p.active);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const post: BlogPost = { 
      ...insertBlogPost, 
      id, 
      publishedAt: new Date() 
    };
    this.blogPosts.set(id, post);
    return post;
  }

  // Leads
  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const lead: Lead = { 
      ...insertLead, 
      id, 
      createdAt: new Date() 
    };
    this.leads.set(id, lead);
    return lead;
  }

  // Reviews
  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(r => r.active);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { 
      ...insertReview, 
      id, 
      date: new Date() 
    };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();
