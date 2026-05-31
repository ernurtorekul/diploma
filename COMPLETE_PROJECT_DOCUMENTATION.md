# Smart Waste - Complete Project Documentation

**Project Title:** Smart Waste — Intelligent Household Waste Classification System

**Author:** Ernur Torekul

**Project Type:** University Diploma Thesis

**Academic Year:** 2025-2026

**Status:** Complete

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement & Solution](#2-problem-statement--solution)
3. [System Purpose & Objectives](#3-system-purpose--objectives)
4. [Complete Technology Stack](#4-complete-technology-stack)
5. [System Architecture](#5-system-architecture)
6. [Core Features](#6-core-features)
7. [Database Design](#7-database-design)
8. [API Specification](#8-api-specification)
9. [AI/ML Integration](#9-aiml-integration)
10. [IoT Integration (ESP32)](#10-iot-integration-esp32)
11. [Frontend Applications](#11-frontend-applications)
12. [Security & Authentication](#12-security--authentication)
13. [Deployment & Infrastructure](#13-deployment--infrastructure)
14. [Development Workflow](#14-development-workflow)
15. [Testing Strategy](#15-testing-strategy)
16. [Future Enhancements](#16-future-enhancements)

---

## 1. Executive Summary

### 1.1 Project Overview

Smart Waste is an intelligent waste management system that combines computer vision, mobile web technology, and IoT sensors to help citizens properly dispose of household waste. The system uses AI-powered image recognition to classify waste items and provides real-time guidance on proper disposal, while simultaneously monitoring bin capacity through IoT sensors.

### 1.2 Key Innovation

The integration of three modern technologies creates a comprehensive waste management solution:
- **Computer Vision:** OpenAI GPT-4o Vision API for accurate waste classification
- **Progressive Web App:** Mobile-first interface accessible via QR codes
- **IoT Monitoring:** ESP32 microcontrollers with ultrasonic sensors for real-time bin fullness tracking

### 1.3 Target Users

1. **Citizens:** General public seeking guidance on proper waste disposal
2. **Waste Management Personnel:** Responsible persons who maintain waste collection points
3. **Administrators:** System operators who manage waste infrastructure

### 1.4 Impact Metrics

- **Classification Accuracy:** ≥85% target with OpenAI Vision API
- **Response Time:** <5 seconds end-to-end classification
- **System Availability:** ≥99% uptime for critical services
- **Environmental Goals:** 40% reduction in recycling contamination

---

## 2. Problem Statement & Solution

### 2.1 The Problem

**Environmental Challenge:**
- Contamination of recyclable materials reduces recycling efficiency
- Lack of citizen knowledge leads to incorrect bin usage
- Overfilled bins result in litter and environmental pollution
- Inefficient collection schedules waste resources and fuel

**Current Limitations:**
- No real-time guidance for citizens at disposal points
- Manual bin monitoring is labor-intensive and delayed
- Lack of data on disposal patterns and bin usage
- No engagement mechanisms to encourage proper disposal

### 2.2 The Solution

Smart Waste addresses these challenges through an integrated approach:

1. **QR Code Integration:** Physical QR codes at waste bins link to a mobile web application
2. **AI-Powered Classification:** Computer vision analyzes waste items and provides disposal guidance
3. **Real-Time Monitoring:** IoT sensors detect bin fullness and trigger collection notifications
4. **Gamification:** Eco-points reward system encourages proper waste disposal
5. **Smart Notifications:** Automated alerts to responsible persons when bins need attention

### 2.3 Why We Need It

**Environmental Benefits:**
- Reduces recycling contamination through proper classification
- Optimizes collection routes based on real-time bin status
- Provides data for urban planning and waste management policies
- Promotes environmental awareness and education

**Operational Efficiency:**
- Reduces unnecessary collection trips (fuel savings)
- Prevents overflow situations through proactive monitoring
- Enables data-driven resource allocation
- Streamlines communication with collection personnel

**User Engagement:**
- Makes waste disposal interactive and educational
- Rewards positive behavior through gamification
- Provides immediate feedback on disposal decisions
- Creates community around environmental stewardship

---

## 3. System Purpose & Objectives

### 3.1 Primary Purpose

To create an intelligent, accessible, and engaging waste management system that:
- Educates citizens on proper waste disposal
- Automates bin monitoring and collection notifications
- Provides actionable insights for waste management optimization
- Promotes environmental awareness through technology

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

## 4. Complete Technology Stack

### 4.1 Technology Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SMART WASTE STACK                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PRESENTATION LAYER                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
│  │  React PWA  │    │   Admin     │    │   Telegram  │            │
│  │  (Mobile)   │    │  Dashboard  │    │     Bot     │            │
│  └─────────────┘    └─────────────┘    └─────────────┘            │
│                                                                     │
│  APPLICATION LAYER                                                  │
│  ┌─────────────────────────────────────────────────────────┐       │
│  │           NestJS API (TypeScript)                        │       │
│  │  • REST Endpoints  • Business Logic  • Integration      │       │
│  └─────────────────────────────────────────────────────────┘       │
│                                                                     │
│  DATA LAYER                                                         │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐     │
│  │PostgreSQL │  │Cloudinary │  │  OpenAI   │  │  Redis    │     │
│  │  Database │  │   CDN     │  │   Vision   │  │  Cache    │     │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘     │
│                                                                     │
│  IOT LAYER                                                          │
│  ┌─────────────────────────────────────────────────────────┐       │
│  │  ESP32 Microcontroller + HC-SR04 Ultrasonic Sensor       │       │
│  └─────────────────────────────────────────────────────────┘       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Detailed Technology Breakdown

#### Frontend Stack

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **React** | 18.2.0 | UI Framework | Component-based architecture, concurrent features |
| **Vite** | 5.1.4 | Build Tool | Fast development server, optimized builds |
| **TypeScript** | 5.3.3 | Type Safety | Catch errors at compile time |
| **TailwindCSS** | 3.4.1 | Styling | Rapid UI development, consistent design |
| **React Router** | 6.22.0 | Routing | Client-side routing for SPA |
| **Zustand** | 4.5.0 | State Management | Simple, lightweight state management |
| **Axios** | 1.15.0 | HTTP Client | Promise-based API requests |
| **Leaflet** | 1.9.4 | Maps | Interactive maps for bin locations |
| **vite-plugin-pwa** | 0.19.5 | PWA Support | Offline capabilities, installable |

#### Backend Stack

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **NestJS** | 10.0.0 | Framework | Structured architecture, dependency injection |
| **TypeScript** | 5.1.3 | Language | Type safety across the stack |
| **Prisma** | 6.19.3 | ORM | Type-safe database access, migrations |
| **PostgreSQL** | 15+ | Database | ACID compliance, advanced features |
| **JWT** | 11.0.2 | Authentication | Stateless auth for admin users |
| **Passport** | 0.7.0 | Auth Strategy | Modular authentication middleware |
| **Bcrypt** | 6.0.0 | Password Hashing | Secure password storage |
| **Class Validator** | 0.15.1 | Validation | DTO validation using decorators |
| **OpenAI SDK** | 6.33.0 | AI Integration | GPT-4o Vision API client |

#### IoT Stack

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **MicroPython** | Latest | Firmware | Python on microcontrollers |
| **ESP32** | - | Microcontroller | WiFi, GPIO, low power |
| **HC-SR04** | - | Ultrasonic Sensor | Distance measurement for bin fullness |

#### Infrastructure & External Services

| Service | Purpose | Justification |
|---------|---------|---------------|
| **Cloudinary** | Image Storage & CDN | Optimized image delivery, transformations |
| **Telegram Bot API** | Notifications | Reliable messaging, wide adoption |
| **OpenAI Vision API** | AI Classification | State-of-the-art image understanding |
| **Vercel** (Recommended) | Frontend Hosting | Zero-config deployment, global CDN |
| **AWS ECS** (Recommended) | Backend Hosting | Container orchestration, auto-scaling |
| **AWS RDS** (Recommended) | Database Hosting | Managed PostgreSQL, backups |

---

## 5. System Architecture

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                       SMART WASTE SYSTEM                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    CLIENT APPLICATIONS                       │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │ Mobile PWA   │  │   Admin Web  │  │  ESP32 Agent │     │   │
│  │  │  (Citizens)  │  │  (Admins)    │  │  (IoT)       │     │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│                              ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     NESTJS API GATEWAY                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │   │
│  │  │   Auth   │  │   Guards │  │ Intercpt │  │ Filters  │   │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│                              ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      SERVICE LAYER                           │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │Classification│  │      Bin     │  │     User     │     │   │
│  │  │   Service    │  │   Service    │  │   Service    │     │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘     │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │  Notification│  │     Area     │  │  Telegram    │     │   │
│  │  │   Service    │  │   Service    │  │   Service    │     │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│         ┌────────────────────┼────────────────────┐                │
│         ▼                    ▼                    ▼                │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │ PostgreSQL   │    │   OpenAI     │    │  Cloudinary  │       │
│  │   Database   │    │   Vision     │    │     CDN      │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 Architectural Patterns

**Three-Tier Architecture:**
1. **Presentation Layer:** React PWA, Admin Dashboard, ESP32 Agent
2. **Application Layer:** NestJS API with modular services
3. **Data Layer:** PostgreSQL, Cloudinary, OpenAI API

**Design Patterns Used:**
- **Dependency Injection:** NestJS built-in DI container
- **Repository Pattern:** Data access via Prisma
- **Factory Pattern:** AI provider selection
- **Observer Pattern:** Notification system
- **Strategy Pattern:** Multiple notification strategies

### 5.3 Module Structure

```
apps/api/src
├── main.ts                      # Application entry point
├── app.module.ts                # Root module
├── config/                      # Configuration
│   ├── configuration.ts
│   └── database.config.ts
├── common/                      # Shared modules
│   ├── filters/                 # Exception filters
│   ├── guards/                  # Auth guards (JWT)
│   ├── interceptors/            # Response transformers
│   └── dto/                     # Common DTOs
├── auth/                        # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   └── dto/
├── users/                       # Users module
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
├── bins/                        # Bins module
│   ├── bins.controller.ts
│   ├── bins.service.ts
│   └── dto/
├── bin-categories/              # Bin categories module
├── areas/                       # Areas module
├── responsible-persons/         # Responsible persons module
├── classifications/             # Classifications module
│   ├── classifications.controller.ts
│   ├── classifications.service.ts
│   └── dto/
├── notifications/               # Notifications module
├── telegram/                    # Telegram module
└── prisma/                      # Prisma ORM
    ├── prisma.service.ts
    └── prisma.module.ts
```

---

## 6. Core Features

### 6.1 AI-Powered Waste Classification

**User Flow:**
1. User scans QR code on waste bin
2. Mobile PWA opens with bin context
3. User captures photo of waste item
4. Image uploaded to Cloudinary
5. API sends image to OpenAI Vision API
6. AI returns classification with confidence score
7. User receives disposal guidance + eco-points

**Technical Implementation:**
- Model: OpenAI GPT-4o Vision
- Prompt Engineering: Custom prompts with available categories
- Confidence Threshold: 70% for automatic classification
- Fallback: Manual review for low confidence
- Languages: Russian (primary), Kazakh (planned)

### 6.2 Real-Time Bin Monitoring

**How It Works:**
1. ESP32 microcontroller mounted on bin lid
2. HC-SR04 ultrasonic sensor measures distance to trash
3. Distance converted to percentage full
4. ESP32 sends POST to `/bins/:id/fullness` every 5 minutes
5. API updates database and triggers notifications if full

**Hardware Setup:**
```
HC-SR04 Sensor          ESP32
┌─────────────┐        ┌─────────────┐
│ VCC    ─────┼────────┼──► 3.3V or 5V
│ GND    ─────┼────────┼──► GND
│ TRIG   ─────┼────────┼──► GPIO 5
│ ECHO   ─────┼────────┼──► GPIO 18
└─────────────┘        └─────────────┘
```

**Fullness Calculation:**
```
percentage = (1 - current_distance / max_depth) × 100

Example:
- max_depth = 80cm (empty bin)
- current = 20cm (trash is 20cm from top)
- percentage = (1 - 20/80) × 100 = 75% full
```

### 6.3 Automated Notifications

**Notification Triggers:**
- Bin fullness ≥ 85%: "Bin is full, collection needed"
- Bin fullness ≥ 95%: "URGENT: Bin overflowing"
- Bin was full, now < 85%: "Bin emptied, thank you"

**Delivery:**
- Telegram Bot API
- Sent to responsible person's Telegram ID
- Includes location, bin info, urgency level
- Google Maps link if coordinates available

### 6.4 Gamification System

**Points Structure:**
- First Classification: 20 points (welcome bonus)
- Regular Classification: 10 points
- Streak Bonus: +5 points for 7-day consistency
- Perfect Month: +50 points for 30+ classifications

**Leaderboard:**
- Top 100 users by eco-points
- Real-time updates
- Shows rank, username, points, classifications
- Monthly archives for competitions

### 6.5 Admin Dashboard

**Features:**
1. **Authentication:** JWT-based login
2. **Bin Management:** CRUD operations, QR code generation
3. **Category Management:** Define waste types, colors, icons
4. **Area Management:** Geographical zones, personnel assignment
5. **Personnel Management:** Responsible persons, Telegram IDs
6. **Classification History:** View all scans with images
7. **Notification Center:** Notification history, manual triggers
8. **Analytics Dashboard:** Charts, trends, statistics

### 6.6 Progressive Web App (PWA)

**PWA Features:**
- Installable on mobile devices
- Offline support (basic functionality)
- Camera access via MediaDevices API
- Responsive design (mobile-first)
- Push notifications capability (future)

**User Interface:**
- Scan Page: Camera viewfinder with capture button
- Result Page: Classification result with guidance
- Leaderboard Page: Top users display
- Russian language UI (primary)

---

## 7. Database Design

### 7.1 Entity Relationship Overview

```
User ||--o{ Classification : performs
Area ||--o{ Bin : contains
Area ||--|| ResponsiblePerson : managed_by
BinCategory ||--o{ Bin : categorizes
Bin ||--o{ Classification : receives
Bin ||--o{ Notification : triggers
```

### 7.2 Complete Schema

#### User
Citizens who accumulate eco-points through proper waste disposal.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| telegramId | String | Unique, Optional | Telegram user ID |
| phoneNumber | String | Optional | Contact number |
| ecoPoints | Integer | Default: 0 | Accumulated points |
| createdAt | DateTime | Auto | Account creation |

#### Area
Geographical area containing multiple waste bins.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| name | String | Required | Area name |
| responsiblePersonId | UUID | FK, Optional | Assigned personnel |

#### ResponsiblePerson
Person responsible for waste collection in an area.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| name | String | Required | Person's name |
| telegramId | String | Required | Telegram ID |
| areaId | UUID | FK, Unique | Assigned area |

#### BinCategory
Type of waste bin (recyclable, general, organic, etc.).

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| name | String | Required | Category name |
| color | String | Required | Hex color for UI |
| icon | String | Required | Emoji/icon |

#### Bin
Physical waste collection container.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| qrCode | String | Unique | QR identifier |
| location | String | Required | Location description |
| latitude | Float | Optional | GPS coordinate |
| longitude | Float | Optional | GPS coordinate |
| isFull | Boolean | Default: false | Fullness status |
| fullnessPercentage | Integer | Optional | 0-100 percentage |
| fullnessThreshold | Integer | Default: 85 | Alert threshold |
| lastFullnessUpdate | DateTime | Optional | Last IoT update |
| areaId | UUID | FK | Assigned area |
| categoryId | UUID | FK | Waste category |
| createdAt | DateTime | Auto | Installation timestamp |

#### Classification
Record of waste item classification by AI.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| imageUrl | String | Required | Cloudinary URL |
| result | String | Required | AI result |
| confidence | Float | 0.0-1.0 | Confidence score |
| pointsEarned | Integer | Default: 10 | Points awarded |
| binId | UUID | FK | Associated bin |
| userId | UUID | FK, Optional | User who scanned |
| createdAt | DateTime | Auto | Scan timestamp |

#### Notification
History of notifications sent to responsible persons.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, Auto | Unique identifier |
| type | String | Required | Notification type |
| message | String | Required | Content |
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

### 7.3 Database Indexes

Optimized indexes for query performance:

```sql
-- Performance indexes
CREATE INDEX idx_classification_user ON "Classification"(userId);
CREATE INDEX idx_classification_bin ON "Classification"(binId);
CREATE INDEX idx_classification_created ON "Classification"(createdAt DESC);
CREATE INDEX idx_notification_bin ON "Notification"(binId);
CREATE INDEX idx_bin_area ON "Bin"(areaId);
CREATE INDEX idx_bin_category ON "Bin"(categoryId);
CREATE INDEX idx_user_points ON "User"(ecoPoints DESC); -- Leaderboard
```

---

## 8. API Specification

### 8.1 API Design Principles

- **RESTful Architecture:** Resource-based URL design
- **Standardized Responses:** Consistent format across endpoints
- **Validation:** Input validation using class-validator
- **Error Handling:** Proper HTTP status codes
- **Authentication:** JWT for admin endpoints

### 8.2 Standard Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": { /* additional context */ }
  }
}
```

### 8.3 API Endpoints

#### Authentication
```
POST /auth/admin/login
Body: { email, password }
Response: { token, admin }
```

#### Bins
```
GET    /bins                     # List all bins
POST   /bins                     # Create bin (admin)
GET    /bins/:id                 # Get bin details
PATCH  /bins/:id                 # Update bin (admin)
DELETE /bins/:id                 # Delete bin (admin)
POST   /bins/:id/fullness        # Report fullness (IoT)
```

#### Bin Categories
```
GET    /bin-categories           # List categories
POST   /bin-categories           # Create category (admin)
PATCH  /bin-categories/:id       # Update category (admin)
DELETE /bin-categories/:id       # Delete category (admin)
```

#### Areas
```
GET    /areas                    # List areas
POST   /areas                    # Create area (admin)
PATCH  /areas/:id                # Update area (admin)
```

#### Responsible Persons
```
GET    /responsible-persons      # List persons
POST   /responsible-persons      # Create person (admin)
PATCH  /responsible-persons/:id  # Update person (admin)
```

#### Classifications
```
POST   /classifications          # Classify waste item
GET    /classifications          # List history (admin)
```

#### Users
```
GET    /users/leaderboard        # Get top users
GET    /users/:telegramId        # Get user profile
```

#### Notifications
```
GET    /notifications            # List history (admin)
```

### 8.4 Classification Endpoint Detail

**POST /classifications**

Request:
```json
{
  "imageUrl": "https://res.cloudinary.com/.../image.jpg",
  "binId": "uuid (optional)",
  "userTelegramId": "@username (optional)"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "classification-uuid",
    "result": "Plastic Bottle",
    "category": {
      "id": "category-uuid",
      "name": "Recyclable",
      "color": "#10B981",
      "icon": "♻️"
    },
    "confidence": 0.95,
    "description": "This plastic bottle should go in the recyclable bin.",
    "pointsEarned": 10,
    "totalPoints": 150,
    "binColor": "#10B981",
    "binIcon": "♻️"
  }
}
```

---

## 9. AI/ML Integration

### 9.1 OpenAI Vision API

**Model:** GPT-4o (latest multimodal model)

**Configuration:**
```typescript
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

**Prompt Engineering:**
```typescript
const prompt = `
You are a waste classification assistant. Analyze this image and classify it into ONE of these categories: ${categoryNames.join(', ')}.

Return valid JSON only:
{ 
  "category": "exact category name from the list", 
  "confidence": 0.0-1.0, 
  "description": "brief disposal instruction in Russian" 
}

Important:
- Category MUST match exactly one of the available categories
- Description should be in Russian
- Be accurate with your classification
`;
```

**API Call:**
```typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{
    role: 'user',
    content: [
      { type: 'image_url', image_url: { url: imageUrl } },
      { type: 'text', text: prompt }
    ]
  }],
  max_tokens: 300,
  temperature: 0.3,  // Low for consistency
});
```

### 9.2 Alternative: Ollama (Open Source)

**Setup:**
```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull LLaVA model
ollama pull llava
```

**Integration:**
```typescript
async function classifyWithOllama(imageUrl: string, categories: string[]) {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    body: JSON.stringify({
      model: 'llava',
      prompt: buildPrompt(categories),
      images: [await downloadImageAsBase64(imageUrl)],
      stream: false,
    })
  });
  return JSON.parse(await response.text());
}
```

### 9.3 Comparison

| Feature | OpenAI Vision | Ollama + LLaVA |
|---------|---------------|----------------|
| Accuracy | Higher | Good |
| Speed | Faster (~2s) | Slower (~5s) |
| Cost | Per-request | Free (after setup) |
| Privacy | Cloud | On-premise |
| Scalability | Unlimited | Hardware limited |

---

## 10. IoT Integration (ESP32)

### 10.1 Hardware Components

**ESP32 Microcontroller:**
- WiFi connectivity
- GPIO pins for sensor interface
- Low power consumption
- MicroPython firmware

**HC-SR04 Ultrasonic Sensor:**
- Range: 2cm to 400cm
- Accuracy: ~3mm
- Operating voltage: 5V (works with 3.3V)
- Trigger/Echo interface

### 10.2 Firmware Architecture

**Main Components:**

1. **Hardware Setup** (`setup_hc_sr04`):
   - Initialize trigger and echo pins
   - Configure pin modes

2. **Distance Measurement** (`measure_distance`):
   - Send 10μs trigger pulse
   - Measure echo duration
   - Convert to centimeters

3. **Percentage Calculation** (`distance_to_percentage`):
   - Convert distance to 0-100% full
   - Handle edge cases

4. **WiFi Connection** (`connect_wifi`):
   - Connect to configured network
   - Handle reconnection

5. **API Communication** (`send_fullness_update`):
   - POST to `/bins/:id/fullness`
   - JSON payload with percentage
   - Error handling

6. **Main Loop** (`main`):
   - Check WiFi status
   - Measure distance
   - Send to API
   - Sleep for interval

### 10.3 Configuration

**config.py:**
```python
# WiFi
WIFI_SSID = "YOUR_SSID"
WIFI_PASSWORD = "YOUR_PASSWORD"

# API
API_URL = "http://your-api.com/api"
BIN_ID = "bin-uuid-from-database"

# Hardware
TRIG_PIN = 5
ECHO_PIN = 18
BIN_MAX_DEPTH_CM = 80

# Monitoring
CHECK_INTERVAL_SEC = 300  # 5 minutes

# Debug
DEBUG = True
```

### 10.4 Deployment

**Flashing MicroPython:**
```bash
esptool.py --port /dev/tty.xxx erase_flash
esptool.py --port /dev/tty.xxx --chip esp32 write_flash -z 0x1000 firmware.bin
```

**Uploading Files:**
```bash
ampy put config.py
ampy put main.py
```

**Monitoring:**
```bash
screen /dev/tty.xxx 115200
```

---

## 11. Frontend Applications

### 11.1 Mobile PWA (Citizen App)

**Purpose:** Allow citizens to scan waste and get classification

**Pages:**

1. **ScanPage** (`/scan`):
   - Camera access via MediaDevices API
   - Capture button overlay
   - Image preview
   - Retake/confirm options

2. **ResultPage** (`/result`):
   - Display classification result
   - Show confidence percentage
   - Category color/icon display
   - Eco-points awarded
   - Disposal guidance

3. **LeaderboardPage** (`/leaderboard`):
   - Top 100 users list
   - Rank, username, points
   - Classifications count

**State Management:**
- Zustand for lightweight state
- Stores: auth, bin, user

**Services:**
- API client (Axios)
- Classification service
- User service
- Bin service

### 11.2 Admin Dashboard

**Purpose:** Manage system entities and view analytics

**Pages:**

1. **LoginPage** (`/admin/login`):
   - Email/password form
   - JWT token storage
   - Auto-redirect to dashboard

2. **AdminLayout**:
   - Sidebar navigation
   - Header with user menu
   - Protected routes (JWT guard)

3. **DashboardPage** (`/admin`):
   - Statistics cards
   - Charts (classifications, bins)
   - Recent activity

4. **BinsPage** (`/admin/bins`):
   - Table with all bins
   - Add/Edit/Delete actions
   - Status indicators
   - QR code display

5. **CategoriesPage** (`/admin/categories`):
   - Category management
   - Color/icon picker
   - Usage statistics

6. **AreasPage** (`/admin/areas`):
   - Area management
   - Map view (Leaflet)
   - Person assignment

7. **PeoplePage** (`/admin/people`):
   - Responsible persons
   - Telegram ID management
   - Area assignment

8. **NotificationsPage** (`/admin/notifications`):
   - Notification history
   - Status indicators
   - Manual resend

**UI Components:**
- Button, Input, Card, Modal, Table, Badge
- Charts (Bar, Pie, Line)
- Map (Leaflet with markers)

---

## 12. Security & Authentication

### 12.1 Authentication Strategy

**Admin Authentication:**
- JWT (JSON Web Tokens)
- Bcrypt password hashing (10 rounds)
- Token expiration: 24 hours
- Refresh token support (future)

**User Identification:**
- Telegram ID for registered users
- Anonymous session IDs for guests
- No authentication required for public endpoints

### 12.2 Security Measures

**API Security:**
- Rate limiting (Throttler)
- Input validation (class-validator)
- SQL injection prevention (Prisma)
- XSS protection
- CORS configuration
- Helmet.js security headers

**Data Protection:**
- Image storage via Cloudinary (SSL)
- Database encryption at rest (RDS)
- GDPR compliance (right to deletion)
- No sensitive data in URLs

**Password Security:**
```typescript
// Hash password on create
const hash = await bcrypt.hash(password, 10);

// Verify on login
const isValid = await bcrypt.compare(plainPassword, hashedPassword);
```

### 12.3 JWT Implementation

**Strategy:**
```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
```

**Guard:**
```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

---

## 13. Deployment & Infrastructure

### 13.1 Recommended Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        PRODUCTION STACK                          │
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

### 13.2 Infrastructure Components

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

### 13.3 Environment Variables

**API (.env):**
```env
DATABASE_URL="postgresql://user:password@host:5432/db"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="24h"
OPENAI_API_KEY="sk-..."
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
TELEGRAM_BOT_TOKEN="...:..."
PORT=3000
```

**Web (.env):**
```env
VITE_API_URL="http://localhost:3000/api"
```

---

## 14. Development Workflow

### 14.1 Project Structure

```
smart-waste/
├── apps/
│   ├── api/                    # NestJS backend
│   │   ├── src/
│   │   ├── prisma/
│   │   ├── test/
│   │   └── package.json
│   ├── web/                    # React frontend
│   │   ├── src/
│   │   ├── public/
│   │   ├── index.html
│   │   └── package.json
│   └── esp32-agent/            # MicroPython IoT
│       ├── main.py
│       ├── config.py
│       ├── boot.py
│       └── README.md
├── docs/                       # Documentation
│   ├── PROJECT_DOCUMENTATION.md
│   ├── ARCHITECTURE.md
│   ├── ER_DIAGRAM.md
│   └── FLOWS_AND_DIAGRAMS.md
├── package.json                # Root package.json
└── README.md
```

### 14.2 Development Scripts

**Root Commands:**
```bash
# Install all dependencies
npm run install:all

# Run API
npm run api

# Run Web
npm run web

# Database migrations
npm run prisma:migrate

# Prisma Studio
npm run prisma:studio
```

**API Commands:**
```bash
cd apps/api
npm run start:dev    # Development mode
npm run build        # Production build
npm run start:prod   # Run production
npm run test         # Run tests
npm run test:e2e     # End-to-end tests
```

**Web Commands:**
```bash
cd apps/web
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
```

### 14.3 Git Workflow

**Branch Strategy:**
- `main`: Production code
- `develop`: Development branch
- `feature/*`: Feature branches
- `bugfix/*`: Bug fixes

**Commit Conventions:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `refactor:` Code refactoring
- `test:` Tests
- `chore:` Maintenance

---

## 15. Testing Strategy

### 15.1 Testing Pyramid

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

### 15.2 Unit Testing

**Backend (Jest):**
```typescript
describe('ClassificationsService', () => {
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

### 15.3 Integration Testing

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

### 15.4 Target Coverage

| Layer | Target Coverage | Priority |
|-------|----------------|----------|
| Unit Tests | 80%+ | High |
| Integration Tests | 60%+ | Medium |
| E2E Tests | Critical paths | High |

---

## 16. Future Enhancements

### 16.1 Planned Features

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
   - Temperature sensors (organic waste)
   - GPS tracking for mobile bins
   - Solar power options

6. **Integration Opportunities**
   - Municipal waste management systems
   - Recycling center booking
   - Educational institution partnerships
   - Corporate sustainability programs

### 16.2 Scalability Considerations

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

### 16.3 Research Opportunities

**Academic Research Areas:**
1. Impact of gamification on recycling behavior
2. Computer vision accuracy for waste classification
3. IoT sensor reliability in outdoor environments
4. Cost-benefit analysis of smart waste systems
5. User privacy in public waste monitoring

---

## Appendix

### A. Quick Start Guide

**Prerequisites:**
- Node.js 18+
- PostgreSQL 15+
- Python 3.9+ (for ESP32)
- OpenAI API key
- Cloudinary account
- Telegram Bot token

**Installation:**
```bash
# Clone repository
git clone <repo-url>
cd smart-waste

# Install dependencies
npm run install:all

# Configure environment
cp apps/api/.env.example apps/api/.env
# Edit .env with your values

# Setup database
npm run prisma:migrate
npm run prisma:generate

# Seed database (optional)
npm run prisma:seed

# Run applications
npm run api  # Terminal 1
npm run web  # Terminal 2
```

### B. Useful Commands

**Database:**
```bash
npm run prisma:studio      # Open Prisma Studio
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run migrations
npm run prisma:seed        # Seed database
```

**Development:**
```bash
npm run api                # Start API server
npm run web                # Start web server
npm run api:build          # Build API for production
npm run web:build          # Build web for production
```

### C. Troubleshooting

**Common Issues:**

1. **Database connection error:**
   - Check DATABASE_URL in .env
   - Verify PostgreSQL is running
   - Ensure database exists

2. **OpenAI API error:**
   - Verify API key is valid
   - Check API credits
   - Test with curl first

3. **ESP32 won't connect:**
   - Check WiFi credentials
   - Verify API URL is accessible
   - Monitor serial output

4. **Camera not working:**
   - Check browser permissions
   - Use HTTPS (required for camera)
   - Try different browser

### D. References

**Documentation:**
- [NestJS](https://docs.nestjs.com)
- [Prisma](https://www.prisma.io/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [React](https://react.dev)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev)

**Hardware:**
- [ESP32 Datasheet](https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf)
- [HC-SR04 Datasheet](https://www.sparkfun.com/datasheets/Sensors/HC-SR04.pdf)
- [MicroPython](https://docs.micropython.org)

---

**Document Version:** 1.0

**Last Updated:** 2026-05-18

**Author:** Ernur Torekul

**Status:** Complete

**Purpose:** Comprehensive project documentation for diploma thesis and project reference
