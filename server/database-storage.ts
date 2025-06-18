import { db } from "./db";
import { eq, like, and, gte, lte } from "drizzle-orm";
import { 
  users, 
  properties, 
  newBuildings, 
  services, 
  teamMembers, 
  leads, 
  reviews, 
  blogPosts,
  type User,
  type InsertUser,
  type Property,
  type InsertProperty,
  type NewBuilding,
  type InsertNewBuilding,
  type Service,
  type InsertService,
  type TeamMember,
  type InsertTeamMember,
  type Lead,
  type InsertLead,
  type Review,
  type InsertReview,
  type BlogPost,
  type InsertBlogPost
} from "@shared/schema";

// Storage interface remains the same
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
    let query = db.select().from(properties).where(eq(properties.isActive, true));
    
    if (filters) {
      const conditions = [];
      
      if (filters.propertyType) {
        conditions.push(eq(properties.propertyType, filters.propertyType));
      }
      if (filters.district) {
        conditions.push(eq(properties.district, filters.district));
      }
      if (filters.priceFrom) {
        conditions.push(gte(properties.price, filters.priceFrom));
      }
      if (filters.priceTo) {
        conditions.push(lte(properties.price, filters.priceTo));
      }
      if (filters.buildingType) {
        conditions.push(eq(properties.buildingType, filters.buildingType));
      }
      if (filters.rooms) {
        conditions.push(eq(properties.rooms, filters.rooms));
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    return await query;
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
    return await db.select().from(newBuildings).where(eq(newBuildings.isActive, true));
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
    return await db.select().from(services).where(eq(services.isActive, true));
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
    return await db.select().from(teamMembers).where(eq(teamMembers.isActive, true));
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
    return await db.select().from(reviews).where(eq(reviews.isPublished, true));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db
      .insert(reviews)
      .values(review)
      .returning();
    return newReview;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).where(eq(blogPosts.isPublished, true));
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
}

export const storage = new DatabaseStorage();