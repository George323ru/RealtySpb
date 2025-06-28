import { 
  users, properties, newBuildings, services, teamMembers, leads, reviews, blogPosts, promotions,
  type User, type InsertUser, type Property, type InsertProperty,
  type NewBuilding, type InsertNewBuilding, type Service, type InsertService,
  type TeamMember, type InsertTeamMember, type Lead, type InsertLead,
  type Review, type InsertReview, type BlogPost, type InsertBlogPost,
  type Promotion, type InsertPromotion
} from "../shared/schema.js";
import { storageLogger } from "./logger";

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
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;

  // New Buildings
  getNewBuildings(): Promise<NewBuilding[]>;
  getNewBuilding(id: number): Promise<NewBuilding | undefined>;
  createNewBuilding(building: InsertNewBuilding): Promise<NewBuilding>;
  updateNewBuilding(id: number, building: Partial<InsertNewBuilding>): Promise<NewBuilding | undefined>;
  deleteNewBuilding(id: number): Promise<boolean>;

  // Services
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;

  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: number): Promise<boolean>;

  // Leads
  getLeads(): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead | undefined>;
  deleteLead(id: number): Promise<boolean>;

  // Reviews
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: number, review: Partial<InsertReview>): Promise<Review | undefined>;
  deleteReview(id: number): Promise<boolean>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  // Promotions
  getPromotions(category?: string): Promise<Promotion[]>;
  getPromotion(id: number): Promise<Promotion | undefined>;
  createPromotion(promotion: InsertPromotion): Promise<Promotion>;
  updatePromotion(id: number, promotion: Partial<InsertPromotion>): Promise<Promotion | undefined>;
  deletePromotion(id: number): Promise<boolean>;

  // Admin methods - get all items including inactive
  getAllProperties(): Promise<Property[]>;
  getAllNewBuildings(): Promise<NewBuilding[]>;
  getAllServices(): Promise<Service[]>;
  getAllTeamMembers(): Promise<TeamMember[]>;
  getAllReviews(): Promise<Review[]>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getAllPromotions(): Promise<Promotion[]>;
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
  private promotions: Map<number, Promotion>;
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
    this.promotions = new Map();
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
    this.initializePromotions();
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
        propertyType: "apartment",
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
        propertyType: "house",
        rooms: 5,
        area: "180.0",
        floor: 2,
        totalFloors: 2,
        buildingType: "вторичка",
        images: ["https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800"],
        features: ["Участок 10 соток", "Гараж", "Баня"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        title: "Офисное помещение на Невском",
        description: "Современный офис в бизнес-центре класса А",
        price: 18500000,
        pricePerMeter: 185000,
        address: "Невский пр., 28",
        district: "Центральный",
        propertyType: "office",
        rooms: null,
        area: "100.0",
        floor: 8,
        totalFloors: 15,
        buildingType: "бизнес-центр",
        images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"],
        features: ["Планировка open space", "Кондиционирование", "Охрана 24/7", "Парковка"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        title: "Торговое помещение на первой линии",
        description: "Помещение свободного назначения в центре города",
        price: 25000000,
        pricePerMeter: 312500,
        address: "ул. Большая Конюшенная, 5",
        district: "Центральный",
        propertyType: "retail",
        rooms: null,
        area: "80.0",
        floor: 1,
        totalFloors: 6,
        buildingType: "историческое здание",
        images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"],
        features: ["Витрина", "Отдельный вход", "Высокие потолки", "Центр города"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        title: "Складское помещение в промзоне",
        description: "Современный склад с рампой и офисной частью",
        price: 15000000,
        pricePerMeter: 30000,
        address: "Индустриальный пр., 45",
        district: "Красносельский",
        propertyType: "warehouse",
        rooms: null,
        area: "500.0",
        floor: 1,
        totalFloors: 1,
        buildingType: "промышленное",
        images: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"],
        features: ["Автопогрузчик", "Рампа", "Офисная зона", "Охраняемая территория"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        title: "Ресторан в историческом центре",
        description: "Готовый ресторан с полным оборудованием",
        price: 35000000,
        pricePerMeter: 175000,
        address: "Казанская ул., 7",
        district: "Центральный",
        propertyType: "restaurant",
        rooms: null,
        area: "200.0",
        floor: 1,
        totalFloors: 4,
        buildingType: "историческое здание",
        images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"],
        features: ["Профессиональная кухня", "Зал на 50 мест", "Терраса", "Лицензия"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        title: "Производственное помещение",
        description: "Цех с кран-балкой и подъездными путями",
        price: 22000000,
        pricePerMeter: 44000,
        address: "Шуваловский пр., 88",
        district: "Выборгский",
        propertyType: "production",
        rooms: null,
        area: "500.0",
        floor: 1,
        totalFloors: 1,
        buildingType: "промышленное",
        images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"],
        features: ["Кран-балка 5т", "220/380В", "Ж/д ветка", "Административная часть"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        title: "Медицинский центр под ключ",
        description: "Полностью оборудованная клиника",
        price: 45000000,
        pricePerMeter: 225000,
        address: "пр. Энгельса, 154",
        district: "Выборгский",
        propertyType: "medical",
        rooms: null,
        area: "200.0",
        floor: 1,
        totalFloors: 3,
        buildingType: "специализированное",
        images: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800"],
        features: ["Медицинское оборудование", "5 кабинетов", "Рентген", "Лицензия"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        title: "Салон красоты в ТЦ",
        description: "Готовый к работе салон красоты",
        price: 8500000,
        pricePerMeter: 170000,
        address: "ТЦ Галерея, Лиговский пр., 30А",
        district: "Центральный",
        propertyType: "beauty",
        rooms: null,
        area: "50.0",
        floor: 2,
        totalFloors: 5,
        buildingType: "торговый центр",
        images: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800"],
        features: ["4 рабочих места", "Маникюрная зона", "Кабинет косметолога", "Ремонт"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        title: "Фитнес-клуб премиум-класса",
        description: "Полностью оборудованный спортзал",
        price: 55000000,
        pricePerMeter: 137500,
        address: "Каменноостровский пр., 42",
        district: "Петроградский",
        propertyType: "fitness",
        rooms: null,
        area: "400.0",
        floor: 1,
        totalFloors: 2,
        buildingType: "спортивное",
        images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"],
        features: ["Тренажерный зал", "Групповые залы", "Сауна", "Раздевалки"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        title: "Автосервис с оборудованием",
        description: "Станция технического обслуживания",
        price: 28000000,
        pricePerMeter: 70000,
        address: "Московское шоссе, 165",
        district: "Московский",
        propertyType: "auto",
        rooms: null,
        area: "400.0",
        floor: 1,
        totalFloors: 1,
        buildingType: "промышленное",
        images: ["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800"],
        features: ["4 поста", "Подъемники", "Компрессор", "Офисная часть"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        title: "Земельный участок ИЖС",
        description: "Участок для индивидуального жилищного строительства",
        price: 3500000,
        pricePerMeter: 35000,
        address: "пос. Ленинское, ул. Дачная",
        district: "Ленинградская область",
        propertyType: "land",
        rooms: null,
        area: "100.0",
        floor: null,
        totalFloors: null,
        buildingType: "земельный участок",
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"],
        features: ["ИЖС", "Электричество", "Газ по границе", "Хорошие подъездные пути"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        title: "Гараж в ГСК",
        description: "Капитальный гараж с погребом",
        price: 850000,
        pricePerMeter: 42500,
        address: "ГСК Автомобилист, Васильевский остров",
        district: "Василеостровский",
        propertyType: "garage",
        rooms: null,
        area: "20.0",
        floor: null,
        totalFloors: null,
        buildingType: "гараж",
        images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"],
        features: ["Погреб", "Электричество", "Охрана", "Удобный подъезд"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        title: "Машиноместо в подземном паркинге",
        description: "Охраняемое машиноместо в ЖК",
        price: 1200000,
        pricePerMeter: 80000,
        address: "ЖК Северная Долина, Приморский р-н",
        district: "Приморский",
        propertyType: "parking",
        rooms: null,
        area: "15.0",
        floor: -1,
        totalFloors: null,
        buildingType: "подземный паркинг",
        images: ["https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800"],
        features: ["Подземный паркинг", "Охрана 24/7", "Видеонаблюдение", "Вентиляция"],
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
        description: "Современный жилой комплекс с развитой инфраструктурой и детским садом",
        location: "Приморский район, м. Комендантский проспект",
        developer: "ПСК Группа",
        completionYear: 2025,
        priceFrom: 4200000,
        pricePerMeter: 115000,
        totalFlats: 324,
        readiness: "75% готовности",
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"],
        features: ["Детский сад", "Фитнес-центр", "Подземный паркинг", "Консьерж"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        name: "ЖК Московские Ворота",
        description: "Премиальный жилой комплекс в центре города с панорамными видами",
        location: "Московский район, м. Московские Ворота",
        developer: "ЛСР. Недвижимость",
        completionYear: 2024,
        priceFrom: 7800000,
        pricePerMeter: 195000,
        totalFlats: 180,
        readiness: "Готов к заселению",
        images: ["https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop"],
        features: ["Видовые квартиры", "SPA-зона", "Паркинг", "Охрана 24/7"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        name: "ЖК Green Park",
        description: "Экологичный жилой комплекс среди зеленых насаждений",
        location: "Выборгский район, м. Озерки",
        developer: "Группа ЦДС",
        completionYear: 2025,
        priceFrom: 3900000,
        pricePerMeter: 108000,
        totalFlats: 450,
        readiness: "Идет отделка",
        images: ["https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&h=600&fit=crop"],
        features: ["Эко-материалы", "Детские площадки", "Велопарковка", "Зеленый двор"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        name: "ЖК Невский Стиль",
        description: "Элитный комплекс с авторскими планировками и премиум отделкой",
        location: "Центральный район, наб. реки Фонтанки",
        developer: "RBI",
        completionYear: 2026,
        priceFrom: 12500000,
        pricePerMeter: 285000,
        totalFlats: 96,
        readiness: "Заложен фундамент",
        images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"],
        features: ["Историческая архитектура", "Квартиры с террасами", "Консьерж", "Элитная отделка"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        name: "ЖК Новый Горизонт",
        description: "Современный жилой комплекс комфорт-класса с развитой инфраструктурой",
        location: "Кировский район, м. Ленинский проспект",
        developer: "Строительный трест",
        completionYear: 2027,
        priceFrom: 5200000,
        pricePerMeter: 130000,
        totalFlats: 600,
        readiness: "Проект утвержден",
        images: ["https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop"],
        features: ["Школа", "Поликлиника", "Торговый центр", "Многоуровневый паркинг"],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentId++,
        name: "ЖК Васильевский",
        description: "Уютный жилой комплекс на Васильевском острове рядом с метро",
        location: "Василеостровский район, м. Василеостровская",
        developer: "Setl Group",
        completionYear: 2024,
        priceFrom: 6700000,
        pricePerMeter: 167000,
        totalFlats: 210,
        readiness: "Ведется отделка",
        images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"],
        features: ["Близко к метро", "Двор без машин", "Подземная парковка", "Кладовые"],
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
      },
      {
        id: this.currentId++,
        name: "Земля",
        description: "Комплексные услуги по земельным участкам",
        shortDescription: "Подбор участков, юридическое сопровождение и помощь в строительстве",
        icon: "fas fa-seedling",
        price: "от 100 000 ₽",
        features: ["Подбор участка", "Проверка документов", "Подключение коммуникаций", "Разрешения на строительство"],
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
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
        phone: "+7 (812) 123-45-67",
        telegram: "@anna_petro",
        whatsapp: "+78121234567",
        specialization: ["Продажа квартир", "Новостройки"],
        isActive: true,
      },
      {
        id: this.currentId++,
        name: "Дмитрий Козлов",
        position: "Ведущий эксперт по коммерческой недвижимости",
        experience: "Опыт работы: 12 лет",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
        phone: "+7 (812) 234-56-78",
        telegram: "@dmitry_kozlov",
        whatsapp: "+78122345678",
        specialization: ["Коммерческая недвижимость", "Инвестиции", "Офисы"],
        isActive: true,
      },
      {
        id: this.currentId++,
        name: "Елена Соколова",
        position: "Специалист по элитной недвижимости",
        experience: "Опыт работы: 6 лет",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
        phone: "+7 (812) 345-67-89",
        telegram: "@elena_sokolova",
        whatsapp: "+78123456789",
        specialization: ["Элитная недвижимость", "Пентхаусы", "VIP-клиенты"],
        isActive: true,
      },
      {
        id: this.currentId++,
        name: "Михаил Волков",
        position: "Эксперт по загородной недвижимости",
        experience: "Опыт работы: 10 лет",
        photo: "https://randomuser.me/api/portraits/men/46.jpg",
        phone: "+7 (812) 456-78-90",
        telegram: "@mikhail_volkov",
        whatsapp: "+78124567890",
        specialization: ["Загородная недвижимость", "Коттеджи", "Земельные участки"],
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

  private initializePromotions() {
    const samplePromotions: Promotion[] = [
      {
        id: this.currentId++,
        title: "Скидка 5% на покупку квартиры",
        description: "При покупке квартиры через наше агентство получите скидку 5% на комиссию. Акция действует до конца месяца.",
        discountType: "percentage",
        discountValue: "5%",
        category: "buy",
        backgroundColor: "#2563eb",
        textColor: "#ffffff",
        buttonText: "Купить со скидкой",
        priority: 100,
        isActive: true,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        createdAt: new Date()
      },
      {
        id: this.currentId++,
        title: "Бесплатная оценка недвижимости",
        description: "Профессиональная оценка вашей недвижимости совершенно бесплатно. Узнайте реальную стоимость за 24 часа.",
        discountType: "special",
        discountValue: "0₽",
        category: "sell",
        backgroundColor: "#059669",
        textColor: "#ffffff",
        buttonText: "Получить оценку",
        priority: 90,
        isActive: true,
        validUntil: null,
        createdAt: new Date()
      },
      {
        id: this.currentId++,
        title: "Первый месяц аренды в подарок",
        description: "При аренде квартиры через наше агентство первый месяц аренды за наш счет для новых клиентов.",
        discountType: "fixed",
        discountValue: "1 месяц",
        category: "rent",
        backgroundColor: "#dc2626",
        textColor: "#ffffff",
        buttonText: "Арендовать",
        priority: 85,
        isActive: true,
        validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        createdAt: new Date()
      },
      {
        id: this.currentId++,
        title: "Скидка на юридические услуги",
        description: "Получите скидку 15% на все юридические услуги при сделках с недвижимостью.",
        discountType: "percentage",
        discountValue: "15%",
        category: "services",
        backgroundColor: "#7c3aed",
        textColor: "#ffffff",
        buttonText: "Получить скидку",
        priority: 80,
        isActive: true,
        validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        createdAt: new Date()
      },
      {
        id: this.currentId++,
        title: "Специальное предложение на новостройки",
        description: "Эксклюзивные условия от застройщиков: скидки до 10% и рассрочка без переплат.",
        discountType: "percentage",
        discountValue: "до 10%",
        category: "new-buildings",
        backgroundColor: "#ea580c",
        textColor: "#ffffff",
        buttonText: "Смотреть предложения",
        priority: 95,
        isActive: true,
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        createdAt: new Date()
      },
      {
        id: this.currentId++,
        title: "Комплексное обслуживание",
        description: "Полный цикл услуг по недвижимости со скидкой 20% при заказе пакета услуг.",
        discountType: "percentage",
        discountValue: "20%",
        category: "all",
        backgroundColor: "#0891b2",
        textColor: "#ffffff",
        buttonText: "Заказать пакет",
        priority: 75,
        isActive: true,
        validUntil: null,
        createdAt: new Date()
      }
    ];

    samplePromotions.forEach(promotion => {
      this.promotions.set(promotion.id, promotion);
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
      createdAt: new Date(),
      pricePerMeter: property.pricePerMeter ?? null,
      rooms: property.rooms ?? null,
      floor: property.floor ?? null,
      totalFloors: property.totalFloors ?? null,
      buildingType: property.buildingType ?? null,
      features: property.features ?? null,
      images: property.images ?? [],
      isActive: property.isActive ?? true
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }

  async updateProperty(id: number, propertyUpdate: Partial<InsertProperty>): Promise<Property | undefined> {
    const existingProperty = this.properties.get(id);
    if (!existingProperty) return undefined;

    const updatedProperty: Property = {
      ...existingProperty,
      ...propertyUpdate,
      id, // Keep original ID
      createdAt: existingProperty.createdAt, // Keep original creation date
    };
    
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }

  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
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
      createdAt: new Date(),
      completionYear: building.completionYear ?? null,
      pricePerMeter: building.pricePerMeter ?? null,
      totalFlats: building.totalFlats ?? null,
      readiness: building.readiness ?? null,
      images: building.images ?? [],
      features: building.features ?? null,
      isActive: building.isActive ?? true
    };
    this.newBuildings.set(id, newBuilding);
    return newBuilding;
  }

  async updateNewBuilding(id: number, buildingUpdate: Partial<InsertNewBuilding>): Promise<NewBuilding | undefined> {
    const existingBuilding = this.newBuildings.get(id);
    if (!existingBuilding) return undefined;

    const updatedBuilding: NewBuilding = {
      ...existingBuilding,
      ...buildingUpdate,
      id,
      createdAt: existingBuilding.createdAt,
    };
    
    this.newBuildings.set(id, updatedBuilding);
    return updatedBuilding;
  }

  async deleteNewBuilding(id: number): Promise<boolean> {
    return this.newBuildings.delete(id);
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
      createdAt: new Date(),
      price: service.price ?? null,
      features: service.features ?? null,
      isActive: service.isActive ?? true
    };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(id: number, serviceUpdate: Partial<InsertService>): Promise<Service | undefined> {
    const existingService = this.services.get(id);
    if (!existingService) return undefined;

    const updatedService: Service = {
      ...existingService,
      ...serviceUpdate,
      id,
      createdAt: existingService.createdAt,
    };
    
    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
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
    const newMember: TeamMember = { 
      ...member, 
      id,
      isActive: member.isActive ?? true,
      phone: member.phone ?? null,
      telegram: member.telegram ?? null,
      whatsapp: member.whatsapp ?? null,
      specialization: member.specialization ?? null
    };
    this.teamMembers.set(id, newMember);
    return newMember;
  }

  async updateTeamMember(id: number, memberUpdate: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const existingMember = this.teamMembers.get(id);
    if (!existingMember) return undefined;

    const updatedMember: TeamMember = {
      ...existingMember,
      ...memberUpdate,
      id,
    };
    
    this.teamMembers.set(id, updatedMember);
    return updatedMember;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    return this.teamMembers.delete(id);
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
      createdAt: new Date(),
      email: lead.email ?? null,
      propertyType: lead.propertyType ?? null,
      message: lead.message ?? null,
      budget: lead.budget ?? null
    };
    this.leads.set(id, newLead);
    return newLead;
  }

  async updateLead(id: number, leadUpdate: Partial<InsertLead>): Promise<Lead | undefined> {
    const existingLead = this.leads.get(id);
    if (!existingLead) return undefined;

    const updatedLead: Lead = {
      ...existingLead,
      ...leadUpdate,
      id,
      createdAt: existingLead.createdAt,
    };
    
    this.leads.set(id, updatedLead);
    return updatedLead;
  }

  async deleteLead(id: number): Promise<boolean> {
    return this.leads.delete(id);
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
      createdAt: new Date(),
      propertyType: review.propertyType ?? null,
      serviceType: review.serviceType ?? null
    };
    this.reviews.set(id, newReview);
    return newReview;
  }

  async updateReview(id: number, reviewUpdate: Partial<InsertReview>): Promise<Review | undefined> {
    const existingReview = this.reviews.get(id);
    if (!existingReview) return undefined;

    const updatedReview: Review = {
      ...existingReview,
      ...reviewUpdate,
      id,
      createdAt: existingReview.createdAt,
    };
    
    this.reviews.set(id, updatedReview);
    return updatedReview;
  }

  async deleteReview(id: number): Promise<boolean> {
    return this.reviews.delete(id);
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
      updatedAt: new Date(),
      image: post.image ?? null,
      tags: post.tags ?? null,
      isPublished: post.isPublished ?? true
    };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  async updateBlogPost(id: number, postUpdate: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) return undefined;

    const updatedPost: BlogPost = {
      ...existingPost,
      ...postUpdate,
      id,
      createdAt: existingPost.createdAt,
      updatedAt: new Date(),
    };
    
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Promotion methods
  async getPromotions(category?: string): Promise<Promotion[]> {
    let promotions = Array.from(this.promotions.values()).filter(p => p.isActive);
    
    if (category && category !== "all") {
      promotions = promotions.filter(p => p.category === category || p.category === "all");
    }
    
    return promotions.sort((a, b) => b.priority - a.priority);
  }

  async getPromotion(id: number): Promise<Promotion | undefined> {
    return this.promotions.get(id);
  }

  async createPromotion(promotion: InsertPromotion): Promise<Promotion> {
    const id = this.currentId++;
    const newPromotion: Promotion = { 
      ...promotion, 
      id, 
      createdAt: new Date(),
      isActive: promotion.isActive ?? true,
      buttonText: promotion.buttonText ?? "Подробнее",
      discountValue: promotion.discountValue ?? null,
      validUntil: promotion.validUntil ?? null,
      priority: promotion.priority ?? 0,
      backgroundColor: promotion.backgroundColor ?? "#f59e0b",
      textColor: promotion.textColor ?? "#000000"
    };
    this.promotions.set(id, newPromotion);
    return newPromotion;
  }

  async updatePromotion(id: number, promotionUpdate: Partial<InsertPromotion>): Promise<Promotion | undefined> {
    const existingPromotion = this.promotions.get(id);
    if (!existingPromotion) return undefined;

    const updatedPromotion: Promotion = {
      ...existingPromotion,
      ...promotionUpdate,
      id,
      createdAt: existingPromotion.createdAt,
    };
    
    this.promotions.set(id, updatedPromotion);
    return updatedPromotion;
  }

  async deletePromotion(id: number): Promise<boolean> {
    return this.promotions.delete(id);
  }

  // New methods
  async updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const existingProperty = this.properties.get(id);
    if (existingProperty) {
      const updatedProperty: Property = {
        ...existingProperty,
        ...property,
        updatedAt: new Date()
      };
      this.properties.set(id, updatedProperty);
      return updatedProperty;
    }
    return undefined;
  }

  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
  }

  async updateNewBuilding(id: number, building: Partial<InsertNewBuilding>): Promise<NewBuilding | undefined> {
    const existingBuilding = this.newBuildings.get(id);
    if (existingBuilding) {
      const updatedBuilding: NewBuilding = {
        ...existingBuilding,
        ...building,
        updatedAt: new Date()
      };
      this.newBuildings.set(id, updatedBuilding);
      return updatedBuilding;
    }
    return undefined;
  }

  async deleteNewBuilding(id: number): Promise<boolean> {
    return this.newBuildings.delete(id);
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const existingService = this.services.get(id);
    if (existingService) {
      const updatedService: Service = {
        ...existingService,
        ...service,
        updatedAt: new Date()
      };
      this.services.set(id, updatedService);
      return updatedService;
    }
    return undefined;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const existingMember = this.teamMembers.get(id);
    if (existingMember) {
      const updatedMember: TeamMember = {
        ...existingMember,
        ...member,
        updatedAt: new Date()
      };
      this.teamMembers.set(id, updatedMember);
      return updatedMember;
    }
    return undefined;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    return this.teamMembers.delete(id);
  }

  async updateReview(id: number, review: Partial<InsertReview>): Promise<Review | undefined> {
    const existingReview = this.reviews.get(id);
    if (existingReview) {
      const updatedReview: Review = {
        ...existingReview,
        ...review,
        updatedAt: new Date()
      };
      this.reviews.set(id, updatedReview);
      return updatedReview;
    }
    return undefined;
  }

  async deleteReview(id: number): Promise<boolean> {
    return this.reviews.delete(id);
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existingPost = this.blogPosts.get(id);
    if (existingPost) {
      const updatedPost: BlogPost = {
        ...existingPost,
        ...post,
        updatedAt: new Date()
      };
      this.blogPosts.set(id, updatedPost);
      return updatedPost;
    }
    return undefined;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  async updatePromotion(id: number, promotion: Partial<InsertPromotion>): Promise<Promotion | undefined> {
    const existingPromotion = this.promotions.get(id);
    if (existingPromotion) {
      const updatedPromotion: Promotion = {
        ...existingPromotion,
        ...promotion,
        updatedAt: new Date()
      };
      this.promotions.set(id, updatedPromotion);
      return updatedPromotion;
    }
    return undefined;
  }

  async deletePromotion(id: number): Promise<boolean> {
    return this.promotions.delete(id);
  }

  // Admin methods
  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getAllNewBuildings(): Promise<NewBuilding[]> {
    return Array.from(this.newBuildings.values());
  }

  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async getAllReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getAllPromotions(): Promise<Promotion[]> {
    return Array.from(this.promotions.values());
  }
}

import { db } from "./db";
import { eq, like, and, gte, lte, or } from "drizzle-orm";

// Commented out MemStorage for database implementation
export const storage = new MemStorage();

/*
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getProperties(filters?: any): Promise<Property[]> {
    let query = db.select().from(properties);
    
    const conditions = [];
    if (filters?.propertyType) {
      conditions.push(eq(properties.propertyType, filters.propertyType));
    }
    if (filters?.district) {
      conditions.push(eq(properties.district, filters.district));
    }
    if (filters?.priceFrom) {
      conditions.push(gte(properties.price, filters.priceFrom));
    }
    if (filters?.priceTo) {
      conditions.push(lte(properties.price, filters.priceTo));
    }
    if (filters?.buildingType) {
      conditions.push(eq(properties.buildingType, filters.buildingType));
    }
    if (filters?.rooms) {
      conditions.push(eq(properties.rooms, filters.rooms));
    }

    if (conditions.length > 0) {
      return await db.select().from(properties).where(and(...conditions));
    }

    return await db.select().from(properties);
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const [newProperty] = await db
      .insert(properties)
      .values(property)
      .returning();
    return newProperty;
  }

  async getNewBuildings(): Promise<NewBuilding[]> {
    return await db.select().from(newBuildings);
  }

  async getNewBuilding(id: number): Promise<NewBuilding | undefined> {
    const [building] = await db.select().from(newBuildings).where(eq(newBuildings.id, id));
    return building || undefined;
  }

  async createNewBuilding(building: InsertNewBuilding): Promise<NewBuilding> {
    const [newBuilding] = await db
      .insert(newBuildings)
      .values(building)
      .returning();
    return newBuilding;
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db
      .insert(services)
      .values(service)
      .returning();
    return newService;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers);
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member || undefined;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db
      .insert(teamMembers)
      .values(member)
      .returning();
    return newMember;
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads);
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db
      .insert(leads)
      .values(lead)
      .returning();
    return newLead;
  }

  async getReviews(): Promise<Review[]> {
    return await db.select().from(reviews);
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db
      .insert(reviews)
      .values(review)
      .returning();
    return newReview;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts);
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db
      .insert(blogPosts)
      .values(post)
      .returning();
    return newPost;
  }

  async getPromotions(category?: string): Promise<Promotion[]> {
    let results: Promotion[];
    
    if (category && category !== "all") {
      results = await db.select().from(promotions).where(
        and(
          eq(promotions.isActive, true),
          or(eq(promotions.category, category), eq(promotions.category, "all"))
        )
      );
    } else {
      results = await db.select().from(promotions).where(eq(promotions.isActive, true));
    }
    
    return results.sort((a, b) => b.priority - a.priority);
  }

  async getPromotion(id: number): Promise<Promotion | undefined> {
    const [promotion] = await db.select().from(promotions).where(eq(promotions.id, id));
    return promotion || undefined;
  }

  async createPromotion(promotion: InsertPromotion): Promise<Promotion> {
    const [newPromotion] = await db
      .insert(promotions)
      .values(promotion)
      .returning();
    return newPromotion;
  }
}

}
*/
