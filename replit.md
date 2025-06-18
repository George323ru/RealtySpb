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
- June 18, 2025. Database integration completed - PostgreSQL database now provides persistent data storage
- June 18, 2025. Sample data populated for all entities (properties, services, team, reviews, blog posts)
- June 18, 2025. DatabaseStorage implemented replacing MemStorage for production-ready data persistence
- June 18, 2025. Building cards optimized - reduced image height from h-40 to h-32, compact padding from p-4 to p-3, smaller button height h-8
- June 18, 2025. Specialist selection page created with filtering system (gender, age, experience, services)
- June 18, 2025. Related services added to main service cards showing additional offerings
- June 18, 2025. Promotion banner removed from homepage as requested
- June 18, 2025. Cart page implemented for property list management and PDF export
- June 18, 2025. Unified "Земля" page created combining land services and land selection with comprehensive filters and service descriptions
- June 18, 2025. Navigation updated to include unified "Земля" section in services dropdown
- June 18, 2025. Building cards enhanced with compact "Подробнее" buttons (text-sm h-8)
- June 18, 2025. Removed old separate "Услуги по земле" and "Подбор участка" references from homepage, services, and constants
- June 18, 2025. Deleted obsolete LandServices.tsx and LandSelection.tsx files - now unified under single /land route
- June 18, 2025. Navigation redesigned to horizontal layout with always-visible menu items instead of dropdown menus
- June 18, 2025. Simplified navigation structure with 12 main sections displayed as compact horizontal buttons
- June 18, 2025. Improved text readability by making colors darker (text-primary: 10%, text-secondary: 25%)
- June 18, 2025. Enhanced property carousel with navigation buttons, scroll indicators, and smooth scrolling
- June 18, 2025. Fixed CTA section text readability with black text on orange background
- June 18, 2025. Redesigned search form to compact horizontal layout in Yandex style with visual separators
- June 18, 2025. Simplified new building cards to match other interface elements with clean, unified design
- June 18, 2025. Enhanced property carousel navigation with visible buttons, hover effects, and clear scroll indicators
- June 18, 2025. Updated property types to focus on commercial real estate - removed residential types, kept only business premises
- June 18, 2025. Created individual service landing pages - each service now has dedicated landing page with detailed information, benefits, process steps, and conversion forms
- June 18, 2025. Updated navigation menu - replaced general "Услуги" with specific service buttons for direct access to individual service pages
- June 18, 2025. All 12 services now available in header navigation with shortened names for space efficiency
- June 18, 2025. Redesigned services navigation - replaced individual service buttons with dropdown menu grouped by categories (like "Купить" button structure)
- June 18, 2025. Services dropdown menu restructured to flat list - all 12 services now visible without categories in 3-column grid layout for immediate access
- June 18, 2025. Completely unified land services - removed all separate references to "Услуги по земле" and "Подбор участка", now single "Земля" section throughout entire site
- June 18, 2025. Fixed header file duplication - removed Header.tsx (uppercase), updated header.tsx (lowercase) with complete 12-service dropdown menu
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Company domain: realtorvspb.ru
Company name: "риэлтор в СПБ"
Design consistency: All pages must match homepage design
Forms: Only name and phone (Russian mask) fields across all pages
Land services: Merge "услуги по земле" and "подбор участка" into single "земля" section
Realtor selection: Anonymous constructor (gender, age, experience, services) instead of specific people
Shopping cart: Users can create property lists and export to PDF
All buttons and filters must be functional
Search filters must work and show matching results
Each page should work as standalone landing page with relevant conversion elements
```