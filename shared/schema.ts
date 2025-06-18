import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
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
  area: integer("area").notNull(),
  rooms: integer("rooms"),
  floor: integer("floor"),
  totalFloors: integer("total_floors"),
  propertyType: text("property_type").notNull(), // apartment, house, commercial, land, garage, parking
  transactionType: text("transaction_type").notNull(), // sale, rent
  district: text("district").notNull(),
  address: text("address").notNull(),
  coordinates: jsonb("coordinates").$type<{lat: number, lng: number}>(),
  images: text("images").array().notNull().default([]),
  features: text("features").array().default([]),
  isNewBuilding: boolean("is_new_building").default(false),
  buildingClass: text("building_class"), // economy, comfort, business, premium
  yearBuilt: integer("year_built"),
  parking: boolean("parking").default(false),
  elevator: boolean("elevator").default(false),
  balcony: boolean("balcony").default(false),
  renovation: text("renovation"), // none, cosmetic, euro, designer
  furnished: boolean("furnished").default(false),
  active: boolean("active").default(true),
});

export const newBuildings = pgTable("new_buildings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  developer: text("developer").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  district: text("district").notNull(),
  priceFrom: integer("price_from").notNull(),
  pricePerMeterFrom: integer("price_per_meter_from").notNull(),
  totalFlats: integer("total_flats").notNull(),
  readiness: text("readiness").notNull(), // percentage or "ready"
  completionDate: text("completion_date"),
  buildingClass: text("building_class").notNull(),
  images: text("images").array().notNull().default([]),
  features: text("features").array().default([]),
  coordinates: jsonb("coordinates").$type<{lat: number, lng: number}>(),
  active: boolean("active").default(true),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  experience: text("experience").notNull(),
  photo: text("photo").notNull(),
  phone: text("phone"),
  email: text("email"),
  telegram: text("telegram"),
  whatsapp: text("whatsapp"),
  specialization: text("specialization").array().default([]),
  description: text("description"),
  active: boolean("active").default(true),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  fullDescription: text("full_description"),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // main, additional
  price: text("price"), // price range or "by consultation"
  duration: text("duration"),
  features: text("features").array().default([]),
  active: boolean("active").default(true),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image"),
  author: text("author").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  tags: text("tags").array().default([]),
  category: text("category").notNull(),
  active: boolean("active").default(true),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  service: text("service").notNull(),
  message: text("message"),
  propertyId: integer("property_id"),
  source: text("source"), // website, phone, social
  status: text("status").default("new"), // new, contacted, qualified, closed
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientPhoto: text("client_photo"),
  rating: integer("rating").notNull(),
  review: text("review").notNull(),
  propertyType: text("property_type"),
  serviceType: text("service_type"),
  date: timestamp("date").defaultNow(),
  active: boolean("active").default(true),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

export const insertNewBuildingSchema = createInsertSchema(newBuildings).omit({
  id: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  date: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type NewBuilding = typeof newBuildings.$inferSelect;
export type InsertNewBuilding = z.infer<typeof insertNewBuildingSchema>;

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
