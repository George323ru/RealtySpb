import { 
  users, properties, newBuildings, services, teamMembers, leads, reviews, blogPosts,
  type User, type InsertUser, type Property, type InsertProperty,
  type NewBuilding, type InsertNewBuilding, type Service, type InsertService,
  type TeamMember, type InsertTeamMember, type Lead, type InsertLead,
  type Review, type InsertReview, type BlogPost, type InsertBlogPost
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Properties
  getProperties(filters?: {
    propertyType?: string;
    district?: string;
    priceFrom?: number;
    priceTo?: number;
    buildingType?: string;
    rooms?: number;
  }): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;

  // New Buildings
  getNewBuildings(): Promise<NewBuilding[]>;
  getNewBuilding(id: number): Promise<NewBuilding | undefined>;
  createNewBuilding(building: InsertNewBuilding): Promise<NewBuilding>;

  // Services
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;

  // Leads
  getLeads(): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;

  // Reviews
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private newBuildings: Map<number, NewBuilding>;
  private services: Map<number, Service>;
  private teamMembers: Map<number, TeamMember>;
  private leads: Map<number, Lead>;
  private reviews: Map<number, Review>;
  private blogPosts: Map<number, BlogPost>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.newBuildings = new Map();
    this.services = new Map();
    this.teamMembers = new Map();
    this.leads = new Map();
    this.reviews = new Map();
    this.blogPosts = new Map();
    this.currentId = 1;
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample data for demonstration
    this.initializeProperties();
    this.initializeNewBuildings();
    this.initializeServices();
    this.initializeTeamMembers();
    this.initializeReviews();
    this.initializeBlogPosts();
  }

  private initializeProperties() {
    const sampleProperties: Property[] = [
      {
        id: this.currentId++,
        title: "3-комнатная квартира в центре",
        description: "Просторная квартира с отличным ремонтом и видом на Неву",
        price: 12500000,
        pricePerMeter: 141667,
        address: "ул. Рубинштейна, 15",
        district: "Центральный",
        propertyType: "квартира",
        rooms: 3,
        area: "88.2",
        floor: 7,
        totalFloors: 12,
        buildingType: "новостройка",
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"],
        features: ["Евроремонт", "Балкон", "Кондиционер"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        title: "Загородный дом в Пушкине",
        description: "Дом с участком в тихом районе",
        price: 24900000,
        pricePerMeter: 138333,
        address: "пос. Павловск, ул. Садовая",
        district: "Пушкинский",
        propertyType: "дом",
        rooms: 5,
        area: "180.0",
        floor: 2,
        totalFloors: 2,
        buildingType: "вторичка",
        images: ["https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800"],
        features: ["Участок 10 соток", "Гараж", "Баня"],
        isActive: true,
        createdAt: new Date(),
      }
    ];

    sampleProperties.forEach(property => {
      this.properties.set(property.id, property);
    });
  }

  private initializeNewBuildings() {
    const sampleBuildings: NewBuilding[] = [
      {
        id: this.currentId++,
        name: "ЖК Северный Парк",
        description: "Современный жилой комплекс с развитой инфраструктурой",
        location: "Приморский район, м. Комендантский проспект",
        developer: "ПСК Группа",
        completionYear: 2025,
        priceFrom: 4200000,
        pricePerMeter: 115000,
        totalFlats: 324,
        readiness: "75% готовности",
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"],
        features: ["Детский сад", "Фитнес-центр", "Подземный паркинг"],
        isActive: true,
        createdAt: new Date(),
      }
    ];

    sampleBuildings.forEach(building => {
      this.newBuildings.set(building.id, building);
    });
  }

  private initializeServices() {
    const sampleServices: Service[] = [
      {
        id: this.currentId++,
        name: "Предпродажная подготовка",
        description: "Комплексная подготовка недвижимости к продаже",
        shortDescription: "Подготовим вашу недвижимость к продаже для максимальной стоимости",
        icon: "fas fa-hammer",
        price: "от 50 000 ₽",
        features: ["Оценка состояния", "План улучшений", "Косметический ремонт"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        name: "Дизайн-проект",
        description: "Создание уникального дизайна интерьера",
        shortDescription: "Создание уникального дизайна интерьера под ваши потребности",
        icon: "fas fa-paint-brush",
        price: "от 3 000 ₽/м²",
        features: ["3D визуализация", "Планировочные решения", "Подбор материалов"],
        isActive: true,
        createdAt: new Date(),
      }
    ];

    sampleServices.forEach(service => {
      this.services.set(service.id, service);
    });
  }

  private initializeTeamMembers() {
    const sampleMembers: TeamMember[] = [
      {
        id: this.currentId++,
        name: "Анна Петрова",
        position: "Руководитель отдела продаж",
        experience: "Опыт работы: 8 лет",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b5c1b1e4?w=400",
        phone: "+7 (812) 123-45-67",
        telegram: "@anna_petro",
        whatsapp: "+78121234567",
        specialization: ["Продажа квартир", "Новостройки"],
        isActive: true,
      }
    ];

    sampleMembers.forEach(member => {
      this.teamMembers.set(member.id, member);
    });
  }

  private initializeReviews() {
    const sampleReviews: Review[] = [
      {
        id: this.currentId++,
        clientName: "Дмитрий Иванов",
        rating: 5,
        review: "Отличная работа! Помогли продать квартиру за 2 недели по хорошей цене.",
        propertyType: "квартира",
        serviceType: "продажа",
        isPublished: true,
        createdAt: new Date(),
      }
    ];

    sampleReviews.forEach(review => {
      this.reviews.set(review.id, review);
    });
  }

  private initializeBlogPosts() {
    const samplePosts: BlogPost[] = [
      {
        id: this.currentId++,
        title: "Как выбрать квартиру в новостройке",
        slug: "kak-vybrat-kvartiru-v-novostroike",
        excerpt: "Подробный гид по выбору квартиры в новостройке",
        content: "Полное содержание статьи...",
        author: "Анна Петрова",
        category: "Покупка",
        tags: ["новостройки", "покупка", "советы"],
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    samplePosts.forEach(post => {
      this.blogPosts.set(post.id, post);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Property methods
  async getProperties(filters?: any): Promise<Property[]> {
    let properties = Array.from(this.properties.values()).filter(p => p.isActive);
    
    if (filters) {
      if (filters.propertyType) {
        properties = properties.filter(p => p.propertyType === filters.propertyType);
      }
      if (filters.district) {
        properties = properties.filter(p => p.district === filters.district);
      }
      if (filters.priceFrom) {
        properties = properties.filter(p => p.price >= filters.priceFrom);
      }
      if (filters.priceTo) {
        properties = properties.filter(p => p.price <= filters.priceTo);
      }
      if (filters.buildingType) {
        properties = properties.filter(p => p.buildingType === filters.buildingType);
      }
      if (filters.rooms) {
        properties = properties.filter(p => p.rooms === filters.rooms);
      }
    }
    
    return properties;
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.currentId++;
    const newProperty: Property = { 
      ...property, 
      id, 
      createdAt: new Date() 
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }

  // New Building methods
  async getNewBuildings(): Promise<NewBuilding[]> {
    return Array.from(this.newBuildings.values()).filter(b => b.isActive);
  }

  async getNewBuilding(id: number): Promise<NewBuilding | undefined> {
    return this.newBuildings.get(id);
  }

  async createNewBuilding(building: InsertNewBuilding): Promise<NewBuilding> {
    const id = this.currentId++;
    const newBuilding: NewBuilding = { 
      ...building, 
      id, 
      createdAt: new Date() 
    };
    this.newBuildings.set(id, newBuilding);
    return newBuilding;
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values()).filter(s => s.isActive);
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.currentId++;
    const newService: Service = { 
      ...service, 
      id, 
      createdAt: new Date() 
    };
    this.services.set(id, newService);
    return newService;
  }

  // Team Member methods
  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).filter(m => m.isActive);
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentId++;
    const newMember: TeamMember = { ...member, id };
    this.teamMembers.set(id, newMember);
    return newMember;
  }

  // Lead methods
  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const id = this.currentId++;
    const newLead: Lead = { 
      ...lead, 
      id, 
      status: "new",
      source: "website",
      createdAt: new Date() 
    };
    this.leads.set(id, newLead);
    return newLead;
  }

  // Review methods
  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(r => r.isPublished);
  }

  async createReview(review: InsertReview): Promise<Review> {
    const id = this.currentId++;
    const newReview: Review = { 
      ...review, 
      id, 
      isPublished: false,
      createdAt: new Date() 
    };
    this.reviews.set(id, newReview);
    return newReview;
  }

  // Blog Post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(p => p.isPublished);
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(p => p.slug === slug && p.isPublished);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentId++;
    const newPost: BlogPost = { 
      ...post, 
      id, 
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.blogPosts.set(id, newPost);
    return newPost;
  }
}

export const storage = new MemStorage();
