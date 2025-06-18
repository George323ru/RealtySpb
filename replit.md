# Replit.md

## Overview

This is a full-stack real estate platform built for Saint Petersburg, Russia. The application provides property listings, new buildings information, real estate services, and client management functionality. It follows a modern web architecture with React frontend, Express backend, and PostgreSQL database.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **UI Library**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses

### Key Components

#### Database Schema (shared/schema.ts)
- **Users**: Authentication and user management
- **Properties**: Real estate listings with detailed information
- **New Buildings**: Construction projects and developments
- **Services**: Additional real estate services offered
- **Team Members**: Staff and agent profiles
- **Leads**: Customer inquiries and contact forms
- **Reviews**: Client testimonials and ratings
- **Blog Posts**: Content management for articles

#### Frontend Pages
- **Home**: Landing page with search and featured properties
- **Buy/Sell/Rent**: Property transaction flows
- **New Buildings**: Construction project listings
- **Secondary**: Existing property market
- **Services**: Additional real estate services
- **Team**: Staff directory and profiles
- **About/Contact**: Company information and contact forms
- **Blog**: Content and articles

#### Backend Services (server/storage.ts)
- Property management (CRUD operations with filtering)
- New building listings
- Service catalog management
- Team member profiles
- Lead generation and management
- Review system
- Blog content management

## Data Flow

1. **Property Search**: Users search properties through SearchForm component → API filters and returns results → PropertyCard components display listings
2. **Lead Generation**: Contact forms collect user information → InsertLead schema validation → Database storage → Backend processing
3. **Content Management**: Static content served alongside dynamic property data from database
4. **User Navigation**: Wouter handles client-side routing without page refreshes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **react-hook-form**: Form handling with validation

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for server development

## Deployment Strategy

### Development Environment
- Replit development with live reload
- Vite development server on port 5000
- PostgreSQL database connection via environment variables

### Production Build
- Vite builds client to `dist/public`
- ESBuild compiles server to `dist/index.js`
- Static file serving through Express
- Database migrations through Drizzle Kit

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)
- Build scripts handle both client and server compilation

The architecture emphasizes type safety, modern React patterns, and scalable database design suitable for a real estate platform with complex property data and user interactions.

## Changelog

```
Changelog:
- June 18, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```