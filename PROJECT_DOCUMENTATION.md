# Smart Waste — Intelligent Household Waste Classification System

## Project Documentation

**Author:** Ernur Torekul
**Project Type:** University Diploma Thesis
**Academic Year:** 2025-2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Solution & Objectives](#3-solution--objectives)
4. [System Architecture](#4-system-architecture)
5. [Technology Stack](#5-technology-stack)
6. [Database Design](#6-database-design)
7. [API Specification](#7-api-specification)
8. [Core Features](#8-core-features)
9. [AI/ML Integration](#9-aiml-integration)
10. [Security Considerations](#10-security-considerations)
11. [Deployment Architecture](#11-deployment-architecture)
12. [Testing Strategy](#12-testing-strategy)
13. [Future Enhancements](#13-future-enhancements)

---

## 1. Project Overview

### 1.1 Project Vision

Smart Waste is an intelligent waste management system designed to promote proper waste disposal habits among citizens through technology. The system combines computer vision, mobile web technology, and real-time notifications to create a seamless waste classification experience.

### 1.2 Target Audience

- **Citizens:** General public seeking guidance on proper waste disposal
- **Waste Management Personnel:** Responsible persons who maintain waste collection points
- **Administrators:** System operators who manage waste infrastructure

### 1.3 Project Goals

1. Increase waste classification accuracy through AI-powered image recognition
2. Promote environmental awareness through gamification (eco-points system)
3. Optimize waste collection operations through real-time bin monitoring
4. Provide actionable insights through comprehensive analytics

---

## 2. Problem Statement

### 2.1 Environmental Challenge

Improper waste disposal remains a significant environmental challenge:
- Contamination of recyclable materials reduces recycling efficiency
- Lack of citizen knowledge leads to incorrect bin usage
- Overfilled bins result in litter and environmental pollution
- Inefficient collection schedules waste resources

### 2.2 Current Limitations

Existing waste management systems face several challenges:
- No real-time guidance for citizens at disposal points
- Manual bin monitoring is labor-intensive and delayed
- Lack of data on disposal patterns and bin usage
- No engagement mechanisms to encourage proper disposal

### 2.3 Opportunity for Innovation

The convergence of mobile technology, AI/ML capabilities, and IoT devices presents an opportunity to create an intelligent waste management ecosystem that addresses these challenges effectively.

---

## 3. Solution & Objectives

### 3.1 Core Solution

Smart Waste provides an integrated solution through:
1. **QR Code Integration:** Physical QR codes at waste bins link to a mobile web application
2. **AI-Powered Classification:** Computer vision analyzes waste items and provides disposal guidance
3. **Real-Time Monitoring:** IoT sensors detect bin fullness and trigger collection notifications
4. **Gamification:** Eco-points reward system encourages proper waste disposal

### 3.2 Technical Objectives

| Objective | Description | Success Metric |
|-----------|-------------|----------------|
| Classification Accuracy | AI correctly identifies waste categories | ≥85% accuracy |
| Response Time | End-to-end classification latency | <5 seconds |
| System Availability | Uptime for critical services | ≥99% |
| User Engagement | Active user participation | Monthly active users |

### 3.3 Business Objectives

1. Reduce recycling contamination by 40%
2. Improve collection efficiency by 30%
3. Increase citizen environmental awareness
4. Provide data-driven insights for urban planning

---

## 4. System Architecture

### 4.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          SMART WASTE SYSTEM                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│  │   Mobile    │    │   Admin     │    │   Telegram  │             │
│  │    PWA      │    │  Dashboard  │    │    Bot      │             │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘             │
│         │                  │                  │                     │
│         └──────────────────┼──────────────────┘                     │
│                            │                                        │
│                   ┌────────▼────────┐                              │
│                   │   NestJS API    │                              │
│                   │   (Backend)     │                              │
│                   └────────┬────────┘                              │
│                            │                                        │
│         ┌──────────────────┼──────────────────┐                    │
│         │                  │                  │                    │
│  ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐             │
│  │ PostgreSQL  │   │  OpenAI     │   │  Cloudinary │             │
│  │  Database   │   │   Vision    │   │   Storage   │             │
│  └─────────────┘   └─────────────┘   └─────────────┘             │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                   IoT Layer (Optional)                      │  │
│  │  ┌────────────────┐         ┌────────────────┐              │  │
│  │  │ Raspberry Pi   │         │  Ultrasonic    │              │  │
│  │  │   + Camera     │         │    Sensors     │              │  │
│  │  └────────────────┘         └────────────────┘              │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Component Interaction Flow

#### User Classification Flow
```
1. User scans QR code → Opens PWA
2. PWA requests camera access
3. User captures waste item photo
4. Image uploaded to Cloudinary
5. API sends image URL to OpenAI Vision
6. AI returns classification result
7. User receives disposal guidance + eco-points
8. Classification logged to database
```

#### Bin Monitoring Flow
```
1. Pi agent/sensor detects bin fullness
2. Agent sends POST to /bins/:id/fullness
3. API updates bin status in database
4. API identifies responsible person
5. Telegram service sends notification
6. Notification logged to database
```

### 4.3 Technology Layer Breakdown

| Layer | Component | Technology | Purpose |
|-------|-----------|------------|---------|
| **Frontend** | User Interface | React 18 + Vite | Progressive Web App |
| **Frontend** | Admin Panel | React 18 + Vite | Management Dashboard |
| **Styling** | UI Framework | TailwindCSS | Responsive Design |
| **Backend** | API Server | NestJS | REST API & Business Logic |
| **Database** | Primary DB | PostgreSQL | Data Persistence |
| **ORM** | Database Access | Prisma | Type-safe Database Queries |
| **AI/ML** | Classification | OpenAI Vision API | Image Analysis |
| **Storage** | Image Storage | Cloudinary | CDN & Asset Management |
| **Notifications** | Alert System | Telegram Bot API | Real-time Notifications |
| **Authentication** | Admin Access | JWT | Secure Admin Sessions |
| **IoT** | Edge Agent | Python | Raspberry Pi Integration |

---

## 5. Technology Stack

### 5.1 Frontend Stack

#### React 18 + Vite
**Justification:**
- **Performance:** Vite provides instant hot module replacement and optimized builds
- **Modern:** React 18 features including concurrent rendering and automatic batching
- **Ecosystem:** Extensive library support and community resources
- **TypeScript Support:** First-class TypeScript integration for type safety

#### TailwindCSS
**Justification:**
- **Utility-First:** Rapid UI development without writing custom CSS
- **Responsive:** Built-in responsive design utilities
- **Consistency:** Design system enforcement through utility classes
- **Bundle Size:** Purges unused styles in production

#### PWA (vite-plugin-pwa)
**Justification:**
- **Offline Support:** Service workers enable offline functionality
- **Installability:** Users can install the app on mobile devices
- **Mobile-First:** Optimized for mobile web browsers
- **Push Notifications:** Future-proof for notification features

### 5.2 Backend Stack

#### NestJS Framework
**Justification:**
- **Architecture:** Structured modules, services, and controllers pattern
- **TypeScript:** Full TypeScript support with decorators
- **Scalability:** Built-in dependency injection and modular architecture
- **Enterprise-Ready:** Production-grade patterns and best practices
- **Interoperability:** Easy integration with external services

#### Prisma ORM
**Justification:**
- **Type Safety:** Auto-generated TypeScript types from schema
- **Migrations:** Declarative schema with automated migrations
- **Developer Experience:** Intuitive API with excellent TypeScript integration
- **Performance:** Optimized queries with connection pooling

#### PostgreSQL
**Justification:**
- **Reliability:** ACID compliance for data integrity
- **Features:** Advanced JSON support, full-text search, and geospatial data
- **Scalability:** Proven performance at scale
- **Open Source:** Community-driven development

### 5.3 AI/ML Stack

#### OpenAI Vision API (GPT-4o)
**Justification:**
- **Accuracy:** State-of-the-art image understanding
- **Flexibility:** Natural language prompts for custom classification
- **Reliability:** Enterprise-grade API with SLA guarantees
- **Speed:** Fast response times for real-time applications

#### Alternative: Ollama + LLaVA
**Justification:**
- **Privacy:** On-premise inference for sensitive deployments
- **Cost:** No per-request costs after initial setup
- **Open Source:** Community-maintained models
- **Flexibility:** Custom model fine-tuning capabilities

### 5.4 Infrastructure Stack

#### Cloudinary
**Justification:**
- **CDN:** Global content delivery network
- **Optimization:** Automatic image optimization and transformation
- **Reliability:** Enterprise-grade storage with 99.9% uptime SLA
- **API:** Comprehensive REST and SDK APIs

#### Telegram Bot API
**Justification:**
- **Reliability:** Proven messaging infrastructure
- **Reach:** Wide adoption in target regions
- **Simplicity:** Straightforward API integration
- **Cost:** Free for basic usage

---

## 6. Database Design

### 6.1 Entity Relationship Diagram

```
┌───────────────┐       ┌──────────────────┐       ┌─────────────┐
│     User      │       │ Classification   │       │     Bin     │
├───────────────┤       ├──────────────────┤       ├─────────────┤
│ id (PK)       │───1───│ id (PK)          │───N───│ id (PK)     │
│ telegramId    │       │ imageUrl         │       │ qrCode      │
│ phoneNumber   │       │ result           │       │ location    │
│ ecoPoints     │       │ confidence       │       │ isFull      │
│ createdAt     │       │ pointsEarned     │       │ areaId (FK) │
└───────────────┘       │ createdAt        │       │ categoryId  │
                        │ userId (FK)      │       │ (FK)        │
                        │ binId (FK)       │       └─────────────┘
                        └──────────────────┘              │
                                                         │
                              ┌──────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐          ┌──────────────────┐
                    │      Area        │          │   BinCategory    │
                    ├──────────────────┤          ├──────────────────┤
                    │ id (PK)          │          │ id (PK)          │
                    │ name             │          │ name             │
                    │ responsiblePerson│          │ color            │
                    │   (FK)           │          │ icon             │
                    └──────────────────┘          └──────────────────┘
                              │
                              ▼
                    ┌──────────────────────┐
                    │ ResponsiblePerson    │
                    ├──────────────────────┤
                    │ id (PK)              │
                    │ name                 │
                    │ telegramId           │
                    │ areaId (FK, unique)  │
                    └──────────────────────┘
```

### 6.2 Schema Documentation

#### User
Represents system users who accumulate eco-points through proper waste disposal.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| telegramId | String | Unique, Optional | Telegram user ID for identification |
| phoneNumber | String | Optional | User phone number for contact |
| ecoPoints | Integer | Default: 0 | Accumulated eco-points |
| createdAt | DateTime | Auto | Account creation timestamp |

#### Area
Geographical area containing multiple waste bins.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| name | String | Required | Area name/description |
| responsiblePerson | UUID | FK, Optional | Assigned personnel |

#### ResponsiblePerson
Person responsible for waste collection in an area.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| name | String | Required | Person's full name |
| telegramId | String | Required | Telegram ID for notifications |
| areaId | UUID | FK, Unique | Assigned area |

#### BinCategory
Type of waste bin (recyclable, general, organic, etc.).

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| name | String | Required | Category name |
| color | String | Required | Hex color for UI |
| icon | String | Required | Icon identifier |

#### Bin
Physical waste collection container.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| qrCode | String | Unique | QR code identifier |
| location | String | Required | Physical location description |
| isFull | Boolean | Default: false | Fullness status |
| areaId | UUID | FK | Assigned area |
| categoryId | UUID | FK | Waste category |
| createdAt | DateTime | Auto | Installation timestamp |

#### Classification
Record of waste item classification by AI.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| imageUrl | String | Required | Cloudinary image URL |
| result | String | Required | AI classification result |
| confidence | Float | 0.0-1.0 | Classification confidence |
| pointsEarned | Integer | Default: 10 | Awarded eco-points |
| binId | UUID | FK | Associated bin |
| userId | UUID | FK, Optional | User who performed scan |
| createdAt | DateTime | Auto | Scan timestamp |

#### Notification
History of notifications sent to responsible persons.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| type | String | Required | Notification type |
| message | String | Required | Notification content |
| sentAt | DateTime | Auto | Sent timestamp |
| status | String | Default: "SENT" | Delivery status |
| binId | UUID | FK | Related bin |

#### Admin
Administrator account for dashboard access.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| email | String | Unique | Login email |
| password | String | Required | Hashed password |

### 6.3 Database Indexes

Optimized indexes for query performance:

```sql
-- Performance indexes
CREATE INDEX idx_classification_user ON "Classification"(userId);
CREATE INDEX idx_classification_bin ON "Classification"(binId);
CREATE INDEX idx_classification_created ON "Classification"(createdAt);
CREATE INDEX idx_notification_bin ON "Notification"(binId);
CREATE INDEX idx_bin_area ON "Bin"(areaId);
CREATE INDEX idx_bin_category ON "Bin"(categoryId);
```

---

## 7. API Specification

### 7.1 API Design Principles

1. **RESTful Architecture:** Resource-based URL design
2. **Standardized Responses:** Consistent response format across all endpoints
3. **Validation:** Input validation using class-validator
4. **Error Handling:** Comprehensive error responses with proper HTTP status codes
5. **Authentication:** JWT-based authentication for admin endpoints

### 7.2 Standard Response Format

```typescript
// Success Response
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": { /* additional error context */ }
  }
}
```

### 7.3 Authentication Endpoints

#### POST /auth/admin/login
Authenticate administrator and receive JWT token.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": "uuid",
      "email": "admin@example.com"
    }
  }
}
```

### 7.4 Bin Management Endpoints

#### GET /bins
Retrieve all bins with optional filtering.

**Query Parameters:**
- `areaId` (optional): Filter by area
- `categoryId` (optional): Filter by category
- `isFull` (optional): Filter by fullness status

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "qrCode": "BIN-001",
      "location": "Central Park, North Entrance",
      "isFull": false,
      "area": { /* area object */ },
      "category": { /* category object */ }
    }
  ]
}
```

#### POST /bins
Create a new bin (Admin only).

**Request:**
```json
{
  "qrCode": "BIN-002",
  "location": "Main Street Plaza",
  "areaId": "area-uuid",
  "categoryId": "category-uuid"
}
```

#### GET /bins/:id
Retrieve specific bin details.

**Response:** Single bin object with classifications count.

#### PATCH /bins/:id
Update bin details (Admin only).

**Request:**
```json
{
  "location": "Updated location",
  "isFull": true
}
```

#### DELETE /bins/:id
Delete a bin (Admin only).

#### POST /bins/:id/fullness
Report bin fullness status (Pi Agent).

**Request:**
```json
{
  "isFull": true
}
```

**Triggers:**
- Updates bin status
- Sends Telegram notification to responsible person
- Logs notification in database

### 7.5 Bin Category Endpoints

#### GET /bin-categories
Retrieve all waste categories.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Recyclable",
      "color": "#10B981",
      "icon": "♻️"
    }
  ]
}
```

#### POST /bin-categories
Create new category (Admin only).

**Request:**
```json
{
  "name": "Organic",
  "color": "#8B5CF6",
  "icon": "🌱"
}
```

#### PATCH /bin-categories/:id
Update category (Admin only).

#### DELETE /bin-categories/:id
Delete category (Admin only).

### 7.6 Area Management Endpoints

#### GET /areas
Retrieve all areas with responsible persons.

#### POST /areas
Create new area (Admin only).

**Request:**
```json
{
  "name": "Downtown District",
  "responsiblePersonId": "person-uuid"
}
```

#### PATCH /areas/:id
Update area (Admin only).

### 7.7 Responsible Person Endpoints

#### GET /responsible-persons
Retrieve all responsible persons.

#### POST /responsible-persons
Create new responsible person (Admin only).

**Request:**
```json
{
  "name": "John Doe",
  "telegramId": "@johndoe",
  "areaId": "area-uuid"
}
```

#### PATCH /responsible-persons/:id
Update responsible person (Admin only).

### 7.8 Classification Endpoints

#### POST /classifications
Classify waste item image (Main scan endpoint).

**Request:**
```json
{
  "imageUrl": "https://res.cloudinary.com/...",
  "binId": "bin-uuid",
  "userTelegramId": "@username (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "classification-uuid",
    "result": "Plastic Bottle",
    "category": "Recyclable",
    "confidence": 0.95,
    "description": "This is a plastic bottle that should be placed in the recyclable bin.",
    "pointsEarned": 10,
    "totalPoints": 150
  }
}
```

**Process:**
1. Validate input parameters
2. Fetch available categories from database
3. Call OpenAI Vision API with image
4. Parse and validate AI response
5. Create classification record
6. Update user eco-points
7. Return result to client

#### GET /classifications
Retrieve classification history (Admin only).

**Query Parameters:**
- `binId` (optional): Filter by bin
- `userId` (optional): Filter by user
- `from` (optional): Start date
- `to` (optional): End date
- `limit` (optional): Pagination limit
- `offset` (optional): Pagination offset

### 7.9 User Endpoints

#### GET /users/leaderboard
Retrieve top users by eco-points.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "telegramId": "@eco_warrior",
      "ecoPoints": 540,
      "classifications": 54
    }
  ]
}
```

#### GET /users/:telegramId
Retrieve specific user profile.

### 7.10 Notification Endpoints

#### GET /notifications
Retrieve notification history (Admin only).

**Query Parameters:**
- `binId` (optional): Filter by bin
- `type` (optional): Filter by type
- `from` (optional): Start date
- `to` (optional): End date

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "BIN_FULL",
      "message": "Bin at Central Park is full. Please collect.",
      "sentAt": "2026-04-02T10:30:00Z",
      "status": "SENT",
      "bin": { /* bin object */ }
    }
  ]
}
```

---

## 8. Core Features

### 8.1 Mobile PWA - User Classification Flow

#### Feature Overview
The Progressive Web App (PWA) provides citizens with an intuitive interface for waste classification using their mobile devices.

#### User Journey

```
┌──────────────────────────────────────────────────────────────────┐
│                     USER CLASSIFICATION FLOW                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. SCAN QR CODE                                                 │
│     └─ Opens app with pre-filled bin ID                          │
│                                                                  │
│  2. CAMERA PERMISSION                                            │
│     └─ Request camera access from device                         │
│                                                                  │
│  3. CAPTURE IMAGE                                                │
│     └─ Display camera viewfinder with capture button            │
│     └─ Image preview with retake option                          │
│                                                                  │
│  4. UPLOAD & CLASSIFY                                           │
│     └─ Upload to Cloudinary                                      │
│     └─ Send to backend for AI classification                     │
│     └─ Display loading state                                     │
│                                                                  │
│  5. DISPLAY RESULTS                                              │
│     └─ Show AI-identified category                               │
│     └─ Display confidence percentage                             │
│     └─ Highlight correct bin with color/icon                     │
│     └─ Award eco-points                                          │
│     └─ Show brief description                                    │
│                                                                  │
│  6. CONFIRMATION                                                 │
│     └─ Success message                                          │
│     └─ Option to scan another item                              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

#### Technical Implementation

**Camera Access:**
```typescript
// Using MediaDevices API
const stream = await navigator.mediaDevices.getUserMedia({
  video: { facingMode: 'environment' } // Rear camera
});
```

**Image Capture:**
```typescript
// Capture frame from video stream
const canvas = document.createElement('canvas');
canvas.getContext('2d').drawImage(video, 0, 0);
const blob = await new Promise(resolve => canvas.toBlob(resolve));
```

**PWA Manifest:**
```json
{
  "name": "Smart Waste",
  "short_name": "SmartWaste",
  "start_url": "/scan",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#10B981",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 8.2 Admin Dashboard

#### Feature Overview
Web-based administration interface for managing all system entities and viewing analytics.

#### Dashboard Modules

**1. Authentication**
- JWT-based login
- Session management
- Auto-refresh tokens
- Protected routes

**2. Bin Management**
- List all bins with status indicators
- Add new bins with QR code generation
- Edit bin details (location, category, area)
- Delete bins with confirmation
- View bin classifications history
- Manual fullness status override

**3. Category Management**
- Create custom waste categories
- Define category colors and icons
- Edit/delete categories
- View category usage statistics

**4. Area Management**
- Define geographical areas
- Assign responsible persons
- View area statistics
- Manage area boundaries

**5. Responsible Person Management**
- Add/remove personnel
- Link to areas
- Manage Telegram IDs
- View notification history

**6. Classification History**
- View all classifications with images
- Filter by date, bin, user, category
- Export data (CSV/JSON)
- View confidence scores
- Manual correction capability

**7. Notification Center**
- View all sent notifications
- Filter by type and date
- View delivery status
- Manual notification trigger

**8. Analytics Dashboard**
- Classification trends over time
- Category distribution charts
- Top users leaderboard
- Bin usage statistics
- Collection efficiency metrics

#### UI/UX Considerations

**Desktop-First Design:**
- Optimized for larger screens
- Data tables with sorting/filtering
- Sidebar navigation
- Modal dialogs for forms
- Real-time updates (optional WebSocket)

**Accessibility:**
- WCAG AA compliance
- Keyboard navigation
- Screen reader support
- High contrast mode
- Semantic HTML

### 8.3 Bin Fullness Monitoring System

#### Feature Overview
Real-time monitoring of waste bin capacity with automated notifications for collection.

#### Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                      BIN FULLNESS MONITORING                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐      │
│  │   RASPBERRY │      │   NESTJS    │      │  TELEGRAM   │      │
│  │      PI     │─────│     API      │─────│     BOT     │      │
│  │   AGENT     │      │             │      │             │      │
│  └─────────────┘      └─────────────┘      └─────────────┘      │
│         │                    │                    │              │
│         │ 1. Capture         │ 2. Process         │ 4. Notify     │
│         │    sensor data     │    fullness        │    person     │
│         │                    │                    │              │
│         │                    │ 3. Query DB        │              │
│         │                    │    for             │              │
│         │                    │    responsible     │              │
│         │                    │    person          │              │
│                                  │                                 │
│                           ┌──────▼──────┐                          │
│                           │  DATABASE   │                          │
│                           │             │                          │
│                           │ • Update    │                          │
│                           │   bin.isFull│                          │
│                           │ • Log       │                          │
│                           │   notification│                        │
│                           └─────────────┘                          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

#### Detection Methods

**Method 1: Ultrasonic Sensor (Recommended)**
```python
# HC-SR04 Ultrasonic Sensor
import time
from gpiozero import DistanceSensor

sensor = DistanceSensor(echo=18, trigger=17)

def check_fullness():
    distance = sensor.distance * 100  # Convert to cm
    # Bin is considered full if distance < 10cm
    return distance < 10
```

**Method 2: Camera-Based Detection**
```python
# Basic image analysis
import cv2

def detect_fullness(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Analyze pixel density or use ML model
    # Return boolean fullness status
```

**Method 3: Weight Sensor (Alternative)**
```python
# Load cell sensor
from hx711 import HX711

def check_weight():
    hx = HX711(5, 6)
    weight = hx.get_weight(5)
    return weight > BIN_CAPACITY
```

#### Notification Flow

```python
# Pi Agent sends update
POST /bins/{bin_id}/fullness
{
  "isFull": true,
  "confidence": 0.95,
  "method": "ultrasonic"
}

# API processes
1. Update Bin.isFull = true
2. Fetch Area -> ResponsiblePerson
3. Send Telegram message
4. Create Notification record
```

### 8.4 Telegram Notification System

#### Feature Overview
Automated notifications sent to responsible persons when bins require attention.

#### Bot Configuration

```typescript
interface TelegramConfig {
  botToken: string;        // Bot authentication token
  apiBaseUrl: string;      // https://api.telegram.org/bot{token}/
  maxRetries: number;      // 3
  timeout: number;         // 5000ms
}
```

#### Message Format

```
🗑️ Smart Waste Alert

Bin at {location} is now FULL and requires collection.

📍 Location: {bin.location}
🏷️ Bin ID: {bin.qrCode}
📁 Category: {bin.category.name}
⏰ Detected: {timestamp}

Please proceed to collect the waste.

---
Smart Waste System
```

#### Error Handling

**Retry Strategy:**
- Initial attempt
- Retry after 1 minute
- Retry after 5 minutes
- Log failure after 3 attempts

**Fallback:**
- Store failed notifications in database
- Provide manual "Resend" button in admin dashboard
- Alert system administrators

### 8.5 Eco-Points Gamification System

#### Feature Overview
Reward system to encourage user engagement and proper waste disposal habits.

#### Points Structure

| Action | Points | Description |
|--------|--------|-------------|
| First Classification | 20 | Welcome bonus |
| Regular Classification | 10 | Standard reward |
| Streak Bonus (7 days) | +5 | Weekly consistency |
| Perfect Month | +50 | 30+ classifications |
| Referral | +25 | Invite new users |

#### Leaderboard

**Global Leaderboard:**
- Top 100 users by eco-points
- Updated in real-time
- Shows rank, username, points, classifications

**Area Leaderboard:**
- Top users per geographical area
- Encourages local competition

**Monthly Reset:**
- Monthly top users receive special recognition
- Archive monthly winners
- Fresh competition each month

#### User Profile

```typescript
interface UserProfile {
  telegramId: string;
  ecoPoints: number;
  rank: number;
  classifications: number;
  streak: number;
  badges: Badge[];
  achievements: Achievement[];
  joinedAt: Date;
}
```

---

## 9. AI/ML Integration

### 9.1 Classification Strategy

#### OpenAI Vision API (Primary)

**Model Selection:**
- **GPT-4o:** Best accuracy, faster response, cost-effective
- **GPT-4 Vision:** Alternative with similar capabilities
- **GPT-4o-mini:** Lower cost for high-volume scenarios

**Prompt Engineering:**

```typescript
const classificationPrompt = `
You are a waste classification assistant for a smart waste management system.

Available waste categories:
${categories.map(c => `- ${c.name}: ${c.description}`).join('\n')}

Analyze the provided image and return ONLY a valid JSON object with this structure:
{
  "category": "Exact category name from the list above",
  "confidence": 0.95,
  "description": "Brief explanation of why this item belongs to the category",
  "disposalTips": "Short tip for proper disposal"
}

Requirements:
- category MUST match exactly one of the available categories
- confidence must be a decimal between 0.0 and 1.0
- description should be 1-2 sentences maximum
- if uncertain, choose the most likely category but reduce confidence
`;
```

**API Integration:**

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function classifyImage(imageUrl: string, categories: string[]) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
              detail: "high"
            }
          },
          {
            type: "text",
            text: buildPrompt(categories)
          }
        ]
      }
    ],
    max_tokens: 300,
    temperature: 0.3, // Low temperature for consistent results
  });

  return JSON.parse(response.choices[0].message.content);
}
```

### 9.2 Ollama Alternative (Open Source)

#### Setup Instructions

**Installation:**
```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull LLaVA model
ollama pull llava

# Run model
ollama run llava
```

**API Integration:**

```typescript
async function classifyWithOllama(imageUrl: string, categories: string[]) {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llava',
      prompt: buildPrompt(categories),
      images: [await downloadImageAsBase64(imageUrl)],
      stream: false,
      format: 'json',
    })
  });

  return JSON.parse(await response.text());
}
```

#### Comparison

| Feature | OpenAI Vision | Ollama + LLaVA |
|---------|---------------|----------------|
| Accuracy | Higher | Good |
| Speed | Faster | Slower |
| Cost | Per-request | Free (after setup) |
| Privacy | Cloud | On-premise |
| Setup | API key | Local installation |
| Scalability | Unlimited | Hardware limited |

### 9.3 Performance Optimization

**Image Optimization:**
```typescript
// Resize and compress before sending
async function optimizeImage(imageUrl: string) {
  const image = await jimp.read(imageUrl);
  return image
    .resize(1024, 1024) // Max 1024x1024
    .quality(85)        // 85% quality
    .getBase64Async('image/jpeg');
}
```

**Caching Strategy:**
```typescript
// Cache classifications for similar images
const classificationCache = new LRUCache({
  max: 1000,
  ttl: 1000 * 60 * 60, // 1 hour
});

const imageHash = createImageHash(imageData);

if (classificationCache.has(imageHash)) {
  return classificationCache.get(imageHash);
}
```

---

## 10. Security Considerations

### 10.1 Authentication & Authorization

**Admin Authentication:**
- JWT-based stateless authentication
- Token expiration: 24 hours
- Refresh token support
- Password hashing with bcrypt (salt rounds: 10)

**User Identification:**
- Telegram ID for registered users
- Anonymous session IDs for guests
- No authentication required for public endpoints

### 10.2 API Security

**Rate Limiting:**
```typescript
// Apply rate limiting to prevent abuse
@UseGuards(ThrottlerGuard)
@Throttle(10, 60) // 10 requests per minute
async classify(@Body() dto: ClassificationDto) {
  // Classification logic
}
```

**Input Validation:**
```typescript
// Validate all inputs using class-validator
export class ClassificationDto {
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsUUID()
  @IsNotEmpty()
  binId: string;

  @IsOptional()
  @IsString()
  userTelegramId?: string;
}
```

**SQL Injection Prevention:**
- Use Prisma ORM for all database queries
- Never concatenate user input into queries
- Parameterized queries only

### 10.3 Data Protection

**Image Storage:**
- Cloudinary handles image security
- No sensitive data stored in URLs
- Automatic SSL/TLS for transmission

**Database Security:**
- Prepared statements via Prisma
- Row-level security for multi-tenant scenarios
- Regular backups with encryption

**GDPR Compliance:**
- Right to deletion: User data deletion endpoint
- Data export: User data export endpoint
- Consent management: Explicit consent for data collection

### 10.4 API Security Best Practices

**CORS Configuration:**
```typescript
// Restrict CORS to specific domains
app.enableCors({
  origin: [
    'https://smartwaste.app',
    'https://admin.smartwaste.app'
  ],
  credentials: true,
});
```

**Helmet.js Headers:**
```typescript
// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "res.cloudinary.com"],
    }
  }
}));
```

---

## 11. Deployment Architecture

### 11.1 Production Environment

```
┌──────────────────────────────────────────────────────────────────┐
│                        PRODUCTION STACK                           │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                     LOAD BALANCER                        │    │
│  │                    (Nginx/AWS ELB)                      │    │
│  └──────────────────────┬──────────────────────────────────┘    │
│                         │                                        │
│         ┌───────────────┴───────────────┐                      │
│         │                               │                      │
│  ┌──────▼──────┐                  ┌─────▼─────┐              │
│  │  Frontend   │                  │   API     │              │
│  │  (Vercel/   │                  │  (AWS ECS  │              │
│  │   Netlify)  │                  │   /Heroku)│              │
│  └─────────────┘                  └─────┬─────┘              │
│                                          │                     │
│         ┌───────────────┬───────────────┼─────────────┐       │
│         │               │               │             │       │
│  ┌──────▼──────┐ ┌─────▼─────┐ ┌──────▼─────┐ ┌─────▼─────┐  │
│  │ PostgreSQL  │ │ Cloudinary │ │  OpenAI    │ │ Telegram  │  │
│  │ (AWS RDS/   │ │    (SaaS)  │ │    API     │ │    API    │  │
│  │  Supabase)  │ │            │ │            │ │           │  │
│  └─────────────┘ └────────────┘ └────────────┘ └───────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 11.2 Infrastructure Recommendations

**Frontend (Vercel):**
- Automatic HTTPS
- Edge caching
- Preview deployments
- Analytics integration

**Backend (AWS ECS):**
- Container orchestration
- Auto-scaling
- Load balancing
- Health checks

**Database (AWS RDS):**
- Managed PostgreSQL
- Automated backups
- Multi-AZ deployment
- Read replicas for analytics

**CI/CD Pipeline:**
```yaml
# GitHub Actions example
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy API
        run: |
          npm ci
          npm run build
          # Deploy to AWS ECS
```

### 11.3 Monitoring & Logging

**Application Monitoring:**
- Sentry for error tracking
- Datadog/New Relic for APM
- CloudWatch for AWS services

**Logging Strategy:**
```typescript
// Structured logging
logger.log({
  level: 'info',
  message: 'Classification completed',
  binId: dto.binId,
  userId: dto.userTelegramId,
  duration: ms,
  success: true,
});
```

---

## 12. Testing Strategy

### 12.1 Testing Pyramid

```
                    ┌─────────────┐
                    │   E2E Tests │
                    │  (Playwright)│
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │    Integration Tests    │
              │    (Jest + Supertest)   │
              └────────────┬────────────┘
                           │
              ┌────────────┴────────────┐
              │     Unit Tests          │
              │  (Jest for both)        │
              └─────────────────────────┘
```

### 12.2 Unit Testing

**Backend (Jest):**
```typescript
describe('ClassificationService', () => {
  it('should classify image correctly', async () => {
    const result = await service.classify(imageUrl, categories);
    expect(result.category).toBeDefined();
    expect(result.confidence).toBeGreaterThan(0.7);
  });
});
```

**Frontend (Vitest):**
```typescript
describe('CameraComponent', () => {
  it('should request camera access on mount', async () => {
    render(<Camera />);
    await waitFor(() => {
      expect(getUserMedia).toHaveBeenCalled();
    });
  });
});
```

### 12.3 Integration Testing

```typescript
describe('POST /classifications', () => {
  it('should create classification and award points', async () => {
    const response = await request(app)
      .post('/classifications')
      .send({ imageUrl, binId })
      .expect(201);

    expect(response.body.data.pointsEarned).toBe(10);
  });
});
```

### 12.4 End-to-End Testing

```typescript
test('user classification flow', async ({ page }) => {
  await page.goto('/scan?binId=test-bin');
  await page.click('[data-testid="capture-button"]');
  await page.waitForSelector('[data-testid="result"]');
  expect(await page.textContent('h1')).toContain('Recyclable');
});
```

### 12.5 Target Coverage

| Layer | Target Coverage | Priority |
|-------|----------------|----------|
| Unit Tests | 80%+ | High |
| Integration Tests | 60%+ | Medium |
| E2E Tests | Critical paths only | High |

---

## 13. Future Enhancements

### 13.1 Planned Features

**Phase 2 Features:**
1. **Multi-language Support**
   - Kazakh, Russian, English
   - Localized AI prompts
   - Regional UI adaptation

2. **Advanced Analytics**
   - Waste generation patterns
   - Collection optimization
   - Environmental impact metrics
   - Predictive maintenance

3. **Machine Learning Improvements**
   - Custom model training
   - Fine-tuning on local waste data
   - Continuous learning from corrections

4. **Mobile App (Native)**
   - React Native implementation
   - Offline mode support
   - Push notifications
   - QR code scanner built-in

5. **IoT Enhancements**
   - Real-time weight monitoring
   - Temperature sensors (for organic waste)
   - GPS tracking for mobile bins
   - Solar power options

6. **Integration Opportunities**
   - Municipal waste management systems
   - Recycling center booking
   - Educational institution partnerships
   - Corporate sustainability programs

### 13.2 Scalability Considerations

**Database Scaling:**
- Read replicas for analytics queries
- Partitioning by geographical area
- Caching layer (Redis) for frequent queries

**API Scaling:**
- Horizontal pod autoscaling
- Queue system for AI classifications
- CDN for static assets

**AI Optimization:**
- Model versioning for A/B testing
- Fallback models for high availability
- Cost monitoring and optimization

### 13.3 Research Opportunities

**Academic Research Areas:**
1. Impact of gamification on recycling behavior
2. Computer vision accuracy for waste classification
3. IoT sensor reliability in outdoor environments
4. Cost-benefit analysis of smart waste systems
5. User privacy in public waste monitoring

---

## Appendix

### A. Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/smartwaste"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="24h"

# OpenAI
OPENAI_API_KEY="sk-..."

# Cloudinary
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Telegram
TELEGRAM_BOT_TOKEN="...:..."

# App
APP_URL="https://smartwaste.app"
API_URL="https://api.smartwaste.app"
PORT=3000
```

### B. Development Scripts

```bash
# API
cd apps/api
npm install
npx prisma migrate dev
npm run start:dev

# Web
cd apps/web
npm install
npm run dev

# Pi Agent
cd apps/pi-agent
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

### C. References

1. NestJS Documentation: https://docs.nestjs.com
2. Prisma Documentation: https://www.prisma.io/docs
3. OpenAI API Reference: https://platform.openai.com/docs
4. Cloudinary Documentation: https://cloudinary.com/documentation
5. Telegram Bot API: https://core.telegram.org/bots/api

---

**Document Version:** 1.0
**Last Updated:** 2026-04-02
**Status:** Initial Release
