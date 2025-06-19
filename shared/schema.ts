import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  pricePerMeter: integer("price_per_meter"),
  address: text("address").notNull(),
  district: text("district").notNull(),
  propertyType: text("property_type").notNull(), // квартира, дом, коммерческая, земля, гараж, машиноместо
  rooms: integer("rooms"),
  area: decimal("area", { precision: 10, scale: 2 }).notNull(),
  floor: integer("floor"),
  totalFloors: integer("total_floors"),
  buildingType: text("building_type"), // новостройка, вторичка
  images: text("images").array().notNull().default([]),
  features: text("features").array().default([]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newBuildings = pgTable("new_buildings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  developer: text("developer").notNull(),
  completionYear: integer("completion_year"),
  priceFrom: integer("price_from").notNull(),
  pricePerMeter: integer("price_per_meter"),
  totalFlats: integer("total_flats"),
  readiness: text("readiness"), // процент готовности или "Сдан"
  images: text("images").array().notNull().default([]),
  features: text("features").array().default([]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  icon: text("icon").notNull(),
  price: text("price"), // "от 50 000 ₽" или "по договоренности"
  features: text("features").array().default([]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  experience: text("experience").notNull(),
  photo: text("photo").notNull(),
  phone: text("phone"),
  telegram: text("telegram"),
  whatsapp: text("whatsapp"),
  specialization: text("specialization").array().default([]),
  isActive: boolean("is_active").notNull().default(true),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  serviceType: text("service_type").notNull(), // купить, продать, сдать, консультация, оценка
  message: text("message"),
  propertyType: text("property_type"),
  budget: text("budget"),
  status: text("status").notNull().default("new"), // new, contacted, in_progress, closed
  source: text("source").default("website"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  rating: integer("rating").notNull(),
  review: text("review").notNull(),
  propertyType: text("property_type"),
  serviceType: text("service_type"),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array().default([]),
  image: text("image"),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const promotions = pgTable("promotions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  discountType: text("discount_type").notNull(), // percentage, fixed, special
  discountValue: text("discount_value"), // "15%", "50000₽", "Бесплатно"
  validUntil: timestamp("valid_until"),
  category: text("category").notNull(), // buy, sell, rent, services, newbuildings, all
  isActive: boolean("is_active").default(true).notNull(),
  priority: integer("priority").default(0).notNull(), // higher = more important
  backgroundColor: text("background_color").default("#f97316").notNull(),
  textColor: text("text_color").default("#ffffff").notNull(),
  buttonText: text("button_text").default("Получить скидку").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
});

export const insertNewBuildingSchema = createInsertSchema(newBuildings).omit({
  id: true,
  createdAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  status: true,
  source: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
  isPublished: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPromotionSchema = createInsertSchema(promotions).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type NewBuilding = typeof newBuildings.$inferSelect;
export type InsertNewBuilding = z.infer<typeof insertNewBuildingSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Promotion = typeof promotions.$inferSelect;
export type InsertPromotion = z.infer<typeof insertPromotionSchema>;

// Search filters type
export interface PropertySearchFilters {
  propertyType?: string;
  district?: string;
  priceFrom?: number;
  priceTo?: number;
  buildingType?: string;
  rooms?: number;
}
