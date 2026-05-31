# Smart Waste - Flows and Diagrams

## Diploma Thesis Visual Documentation

**Author:** Ernur Torekul
**Project:** Intelligent Household Waste Classification System
**Document Version:** 1.0
**Last Updated:** 2026-04-08

---

## Table of Contents

1. [Figure 1.2 - CNN Working Principle](#figure-12---convolutional-neural-network-cnn-working-principle)
2. [Figure 1.3 - User-System Interaction Scheme](#figure-13---user-system-interaction-scheme)
3. [Figure 2.3 - Image Classification Sequence Diagram](#figure-23---image-classification-process-sequence-diagram)
4. [Figure 2.4 - System Operation Algorithmic Flowchart](#figure-24---system-operation-algorithmic-flowchart)

---

## Figure 1.2 - Convolutional Neural Network (CNN) Working Principle

### Description
This diagram illustrates the architecture and working principle of a Convolutional Neural Network (CNN) used for waste image classification. The CNN processes input images through multiple layers to identify waste categories (plastic, paper, glass, organic, etc.).

### Figure Title (Kazakh): Сурет 1.2. Конволюциялық нейрондық желінің (CNN) жұмыс істеу принципі

### Figure Title (Russian): Рисунок 1.2. Принцип работы сверточной нейронной сети (CNN)

### Mermaid Diagram

```mermaid
graph TB
    subgraph "INPUT LAYER"
        IMG[("📷 Input Image<br/>(224x224x3 RGB)")]
    end

    subgraph "CONVOLUTIONAL LAYER 1"
        CONV1[("Conv2D: 32 filters<br/>Kernel: 3x3<br/>Activation: ReLU")]
        POOL1[("Max Pooling<br/>2x2")]
    end

    subgraph "CONVOLUTIONAL LAYER 2"
        CONV2[("Conv2D: 64 filters<br/>Kernel: 3x3<br/>Activation: ReLU")]
        POOL2[("Max Pooling<br/>2x2")]
    end

    subgraph "CONVOLUTIONAL LAYER 3"
        CONV3[("Conv2D: 128 filters<br/>Kernel: 3x3<br/>Activation: ReLU")]
        POOL3[("Max Pooling<br/>2x2")]
    end

    subgraph "FULLY CONNECTED LAYERS"
        FLATTEN[("Flatten<br/>1D Vector")]
        FC1[("Dense Layer: 512 neurons<br/>Activation: ReLU")]
        DROPOUT[("Dropout: 0.5<br/>Prevent Overfitting")]
        FC2[("Dense Layer: 256 neurons<br/>Activation: ReLU")]
    end

    subgraph "OUTPUT LAYER"
        OUTPUT[("Softmax Layer<br/>5 Classes")]
    end

    subgraph "CLASSIFICATION RESULTS"
        R1[("🧴 Plastic Bottle<br/>Confidence: 95%")]
        R2[("📄 Paper/Cardboard<br/>Confidence: 2%")]
        R3[("🍾 Glass<br/>Confidence: 1%")]
        R4[("🌱 Organic Waste<br/>Confidence: 1%")]
        R5[("🗑️ General Trash<br/>Confidence: 1%")]
    end

    IMG --> CONV1
    CONV1 --> POOL1
    POOL1 --> CONV2
    CONV2 --> POOL2
    POOL2 --> CONV3
    CONV3 --> POOL3
    POOL3 --> FLATTEN
    FLATTEN --> FC1
    FC1 --> DROPOUT
    DROPOUT --> FC2
    FC2 --> OUTPUT
    OUTPUT --> R1
    OUTPUT --> R2
    OUTPUT --> R3
    OUTPUT --> R4
    OUTPUT --> R5

    style IMG fill:#E3F2FD
    style CONV1 fill:#BBDEFB
    style CONV2 fill:#BBDEFB
    style CONV3 fill:#BBDEFB
    style POOL1 fill:#90CAF9
    style POOL2 fill:#90CAF9
    style POOL3 fill:#90CAF9
    style FLATTEN fill:#64B5F6
    style FC1 fill:#42A5F5
    style DROPOUT fill:#42A5F5
    style FC2 fill:#42A5F5
    style OUTPUT fill:#2196F3
    style R1 fill:#C8E6C9
    style R2 fill:#C8E6C9
    style R3 fill:#C8E6C9
    style R4 fill:#C8E6C9
    style R5 fill:#C8E6C9
```

### Technical Explanation

**Convolutional Layers:** Extract features from the input image using learnable filters. Each filter detects specific patterns (edges, textures, shapes).

**Pooling Layers:** Reduce spatial dimensions while preserving important features, making the network more computationally efficient.

**Fully Connected Layers:** Interpret the extracted features and make the final classification decision.

**Softmax Output:** Produces probability distribution across all waste categories, with the highest probability indicating the predicted class.

### Export Instructions
To export as PNG/SVG:
1. Visit https://mermaid.live
2. Paste the Mermaid code above
3. Click "Download PNG" or "Download SVG"

---

## Figure 1.3 - User-System Interaction Scheme

### Description
This block diagram illustrates the complete user flow and interaction points between the user and the Smart Waste system, from QR code scanning to final classification result display.

### Figure Title (Kazakh): Сурет 1.3. Пайдаланушы мен жүйенің өзара әрекеттесу схемасы

### Figure Title (Russian): Рисунок 1.3. Схема взаимодействия пользователя и системы

### Mermaid Diagram

```mermaid
flowchart TD
    START([🚀 Start])

    subgraph "PHYSICAL WORLD"
        QR["📱 QR Code<br/>on Waste Bin"]
        BIN["🗑️ Physical<br/>Waste Bin"]
        ITEM["🧴 Waste Item<br/>(Plastic Bottle)"]
    end

    subgraph "USER ACTIONS"
        SCAN["1️⃣ Scan QR Code<br/>with Phone Camera"]
        OPEN["2️⃣ Open PWA<br/>Web Application"]
        CAPTURE["3️⃣ Capture Photo<br/>of Waste Item"]
        UPLOAD["4️⃣ Upload Image<br/>to System"]
        VIEW["7️⃣ View Result<br/>& Guidance"]
    end

    subgraph "SYSTEM PROCESSING"
        CLOUDINARY["☁️ Cloudinary<br/>Image Storage"]
        API["🔌 NestJS API<br/>Backend Server"]
        AI["🤖 OpenAI Vision<br/>AI Classification"]
        DB["💾 PostgreSQL<br/>Database"]
        TG["📨 Telegram<br/>Notification"]
    end

    subgraph "OUTPUT"
        RESULT["📊 Classification Result:<br/>Category: Recyclable<br/>Confidence: 95%"]
        POINTS["⭐ +10 Eco-Points<br/>Awarded!"]
        GUIDE["✅ Disposal Guidance:<br/>Place in Green Bin"]
    end

    END([✅ End])

    START --> QR
    QR --> SCAN
    SCAN --> OPEN
    OPEN --> BIN
    BIN --> ITEM
    ITEM --> CAPTURE
    CAPTURE --> UPLOAD
    UPLOAD --> CLOUDINARY
    CLOUDINARY --> API
    API --> AI
    AI --> API
    API --> DB
    DB --> RESULT
    RESULT --> POINTS
    POINTS --> GUIDE
    GUIDE --> VIEW
    VIEW --> END

    API -.->|Bin Full Detected| TG
    TG -.->|Collection Alert| END

    style START fill:#C8E6C9
    style END fill:#C8E6C9
    style QR fill:#FFF9C4
    style SCAN fill:#E1BEE7
    style OPEN fill:#E1BEE7
    style CAPTURE fill:#E1BEE7
    style UPLOAD fill:#E1BEE7
    style VIEW fill:#E1BEE7
    style CLOUDINARY fill:#BBDEFB
    style API fill:#90CAF9
    style AI fill:#64B5F6
    style DB fill:#42A5F5
    style TG fill:#FFCC80
    style RESULT fill:#C8E6C9
    style POINTS fill:#FFE082
    style GUIDE fill:#C8E6C9
```

### User Journey Steps

| Step | Action | System Response |
|------|--------|-----------------|
| 1 | User scans QR code on waste bin | Opens mobile PWA with bin ID |
| 2 | Application loads | Requests camera permission |
| 3 | User captures photo of waste item | Image uploaded to Cloudinary |
| 4 | System processes image | Sends to OpenAI Vision API |
| 5 | AI analyzes image | Returns classification result |
| 6 | System stores result | Saves to database, awards points |
| 7 | User views result | Displays category, confidence, guidance |

### Export Instructions
To export as PNG/SVG:
1. Visit https://mermaid.live
2. Paste the Mermaid code above
3. Click "Download PNG" or "Download SVG"

---

## Figure 2.3 - Image Classification Process Sequence Diagram

### Description
This sequence diagram illustrates the time-ordered data exchange between all system components during the image classification process, showing the complete request-response lifecycle.

### Figure Title (Kazakh): Сурет 2.3. Кескінді жіктеу процесінің реттілік диаграммасы

### Figure Title (Russian): Рисунок 2.3. Диаграмма последовательности процесса классификации изображений

### Mermaid Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User as 👤 User
    participant PWA as 📱 Mobile PWA
    participant API as 🔌 NestJS API
    participant Cloud as ☁️ Cloudinary
    participant AI as 🤖 OpenAI Vision
    participant DB as 💾 PostgreSQL

    Note over User,AI: PHASE 1: INITIALIZATION

    User->>PWA: 1. Scan QR Code
    PWA->>API: 2. GET /bins/:id
    API->>DB: 3. Query Bin Details
    DB-->>API: 4. Return Bin Data
    API-->>PWA: 5. Bin Configuration
    PWA-->>User: 6. Show Camera Interface

    Note over User,AI: PHASE 2: IMAGE CAPTURE

    User->>PWA: 7. Capture Photo
    PWA->>PWA: 8. Compress Image

    Note over User,AI: PHASE 3: IMAGE UPLOAD

    PWA->>Cloud: 9. Upload Image
    Cloud-->>PWA: 10. Return Image URL

    Note over User,AI: PHASE 4: AI CLASSIFICATION

    PWA->>API: 11. POST /classifications<br/>{imageUrl, binId}

    API->>API: 12. Validate Request
    API->>DB: 13. Fetch Categories
    DB-->>API: 14. Return Category List

    API->>AI: 15. Send Image + Categories<br/>{imageUrl, categories}

    Note over AI: 16. AI Processing<br/>(CNN Analysis)
    AI-->>API: 17. Return Classification<br/>{category, confidence}

    Note over User,AI: PHASE 5: RESULT PROCESSING

    API->>DB: 18. Create Classification Record
    API->>DB: 19. Update/Create User
    API->>DB: 20. Award Eco-Points (+10)

    DB-->>API: 21. Confirm Transaction
    API-->>PWA: 22. Return Result<br/>{result, points, confidence}
    PWA-->>User: 23. Display Classification

    Note over User,AI: PHASE 6: NOTIFICATION (Optional)

    API->>DB: 24. Check Bin Fullness
    alt Bin is Full
        API->>DB: 25. Get Responsible Person
        DB-->>API: 26. Return Person Details
        API->>API: 27. Send Telegram Notification
    end

    rect rgb(200, 230, 200)
        Note over User,DB: Total Time: ~3-5 seconds
    end
```

### Timeline Breakdown

| Phase | Duration | Description |
|-------|----------|-------------|
| Initialization | ~500ms | QR scan, bin verification |
| Image Capture | ~200ms | Photo capture and compression |
| Image Upload | ~1000ms | Upload to Cloudinary CDN |
| AI Classification | ~2000ms | OpenAI Vision API processing |
| Result Processing | ~300ms | Database operations |
| **Total** | **~4 seconds** | End-to-end classification time |

### Data Flow Summary

```
User Input → QR Code → PWA → Cloudinary → API → OpenAI → API → DB → API → PWA → User Output
```

### Export Instructions
To export as PNG/SVG:
1. Visit https://mermaid.live
2. Paste the Mermaid code above
3. Click "Download PNG" or "Download SVG"

---

## Figure 2.4 - System Operation Algorithmic Flowchart

### Description
This algorithmic flowchart presents the complete program logic of the Smart Waste system, showing all decision points, processes, and possible execution paths from start to finish.

### Figure Title (Kazakh): Сурет 2.4. Жүйе жұмысының алгоритмдік блок-схемасы

### Figure Title (Russian): Рисунок 2.4. Алгоритмическая блок-схема работы системы

### Mermaid Diagram

```mermaid
flowchart TD
    START([🚀 START])

    decision1{📱 QR Code<br/>Scanned?}

    binCheck{🗑️ Bin Valid?}
    binError["❌ Error:<br/>Invalid Bin"]

    cameraReq{"📷 Camera<br/>Permission?"}
    cameraDeny["❌ Error:<br/>Camera Access Denied"]

    capture["📸 Capture Image"]

    uploadCheck{"☁️ Upload<br/>Successful?"}
    uploadError["❌ Error:<br/>Upload Failed"]

    apiCall["🔌 Call Classification API"]

    aiCheck{"🤖 AI<br/>Response?"}
    aiError["❌ Error:<br/>AI Service Unavailable"]

    confidenceCheck{"🎯 Confidence<br/>> 70%?"}

    lowConf["⚠️ Low Confidence<br/>Manual Review Needed"]

    saveDB["💾 Save to Database:<br/>Classification Record"]

    userCheck{"👤 User<br/>Exists?"}
    createUser["👤 Create User<br/>Anonymous Session"]
    updateUser["⭐ Update Eco-Points<br/>+10 Points"]

    displayResult["📊 Display Result:<br/>Category, Confidence, Points"]

    binFullCheck{"🗑️ Bin Full?"}
    notifyPerson["📨 Notify Responsible<br/>Person via Telegram"]

    finalSuccess["✅ Success!<br/>Classification Complete"]

    anotherScan{"🔄 Scan<br/>Another Item?"}

    goodbye(["👋 Thank You!<br/>See You Again!"])

    END([⏹️ END])

    START --> decision1

    decision1 -->|Yes| binCheck
    decision1 -->|No| decision1

    binCheck -->|Valid| cameraReq
    binCheck -->|Invalid| binError
    binError --> END

    cameraReq -->|Granted| capture
    cameraReq -->|Denied| cameraDeny
    cameraDeny --> END

    capture --> uploadCheck

    uploadCheck -->|Success| apiCall
    uploadCheck -->|Failed| uploadError
    uploadError --> END

    apiCall --> aiCheck

    aiCheck -->|Success| confidenceCheck
    aiCheck -->|Failed| aiError
    aiError --> END

    confidenceCheck -->|Yes| saveDB
    confidenceCheck -->|No| lowConf

    lowConf --> saveDB

    saveDB --> userCheck

    userCheck -->|Yes| updateUser
    userCheck -->|No| createUser

    createUser --> updateUser
    updateUser --> displayResult

    displayResult --> binFullCheck

    binFullCheck -->|Yes| notifyPerson
    binFullCheck -->|No| finalSuccess

    notifyPerson --> finalSuccess

    finalSuccess --> anotherScan

    anotherScan -->|Yes| decision1
    anotherScan -->|No| goodbye

    goodbye --> END

    style START fill:#C8E6C9
    style END fill:#FFCDD2
    style goodbye fill:#C8E6C9
    style binError fill:#FFCDD2
    style cameraDeny fill:#FFCDD2
    style uploadError fill:#FFCDD2
    style aiError fill:#FFCDD2
    style finalSuccess fill:#C8E6C9
    style lowConf fill:#FFF9C4
    style displayResult fill:#C8E6C9
    style createUser fill:#BBDEFB
    style updateUser fill:#BBDEFB
    style saveDB fill:#90CAF9
    style notifyPerson fill:#FFCC80
    style capture fill:#E1BEE7
    style apiCall fill:#E1BEE7
```

### Algorithm Steps (Pseudocode)

```
BEGIN
    WHILE user wants to scan
        IF QR code is valid
            IF camera permission granted
                CAPTURE image
                IF upload successful
                    CALL classification API
                    IF AI responds successfully
                        IF confidence > 70%
                            SAVE classification to database
                            IF user exists
                                UPDATE eco-points (+10)
                            ELSE
                                CREATE new user
                                UPDATE eco-points (+10)
                            END IF
                            DISPLAY result to user
                            IF bin is full
                                NOTIFY responsible person
                            END IF
                        ELSE
                            DISPLAY low confidence warning
                            MARK for manual review
                        END IF
                    ELSE
                        DISPLAY AI service error
                    END IF
                ELSE
                    DISPLAY upload error
                END IF
            ELSE
                DISPLAY camera permission error
            END IF
        ELSE
            DISPLAY invalid bin error
        END IF
        ASK if user wants to scan another item
    END WHILE
    DISPLAY goodbye message
END
```

### Decision Points

| Decision | Condition | Action |
|----------|-----------|--------|
| QR Code Scanned? | Valid QR code detected | Proceed to bin validation |
| Bin Valid? | Bin exists in database | Request camera permission |
| Camera Permission? | User granted access | Capture image |
| Upload Successful? | Image uploaded to Cloudinary | Call API |
| AI Response? | OpenAI returns result | Check confidence |
| Confidence > 70%? | High confidence result | Save to database |
| User Exists? | Telegram ID in database | Update points |
| Bin Full? | Fullness status true | Send notification |
| Scan Another? | User wants to continue | Restart loop |

### Export Instructions
To export as PNG/SVG:
1. Visit https://mermaid.live
2. Paste the Mermaid code above
3. Click "Download PNG" or "Download SVG"

---

## Additional Reference Diagrams

### System Context Diagram

```mermaid
graph LR
    subgraph "EXTERNAL ACTORS"
        USER[👤 Citizens]
        ADMIN[👨‍💼 Administrators]
        PERSON[👷 Responsible Persons]
    end

    subgraph "SMART WASTE SYSTEM"
        PWA[📱 Mobile PWA]
        DASHBOARD[🖥️ Admin Dashboard]
        API[🔌 API Server]
    end

    subgraph "EXTERNAL SERVICES"
        OPENAI[🤖 OpenAI]
        TELEGRAM[📨 Telegram]
        CLOUDINARY[☁️ Cloudinary]
    end

    USER --> PWA
    ADMIN --> DASHBOARD
    PERSON --> TELEGRAM

    PWA --> API
    DASHBOARD --> API

    API --> OPENAI
    API --> TELEGRAM
    API --> CLOUDINARY
```

### Technology Stack Overview

```mermaid
mindmap
    root((Smart Waste))
        Frontend
            React 18
            Vite
            TailwindCSS
            PWA
        Backend
            NestJS
            TypeScript
            Prisma
            JWT Auth
        Database
            PostgreSQL
            Redis Cache
        AI/ML
            OpenAI Vision
            CNN Architecture
            GPT-4o Model
        Infrastructure
            Vercel
            AWS ECS
            Cloudinary
        External
            Telegram Bot
            QR Codes
            Raspberry Pi
```

---

## Export Guide for All Diagrams

### Method 1: Mermaid Live Editor (Recommended)

1. Go to https://mermaid.live
2. Copy the Mermaid code block from any diagram above
3. Paste into the left panel
4. The diagram renders automatically
5. Click "Download PNG" or "Download SVG"

### Method 2: VS Code Extension

1. Install VS Code
2. Install "Markdown Preview Mermaid Support" extension
3. Open this file in VS Code
4. Open preview (Cmd/Ctrl + Shift + V)
5. Right-click on diagram → "Copy as PNG"

### Method 3: Command Line (mermaid-cli)

```bash
# Install mermaid-cli
npm install -g @mermaid-js/mermaid-cli

# Export diagram
mmdc -i input.mmd -o output.png
```

### Method 4: Online Tools

- **Draw.io:** Import Mermaid code
- **Mermaid Chart:** https://www.mermaidchart.com
- **Mermaid Live:** https://mermaid.live

---

## Figure Placement in Thesis

### Recommended Placement

| Figure | Section | Page Suggestion |
|--------|---------|-----------------|
| Figure 1.2 (CNN) | 1.2 - AI Recognition Process | Page 8-10 |
| Figure 1.3 (User Flow) | 1.3 - Logical Schema | Page 12-14 |
| Figure 2.3 (Sequence) | 2.3 - Implementation Details | Page 25-27 |
| Figure 2.4 (Algorithm) | 2.3 - Implementation Details | Page 28-30 |

### Caption Format

```
Figure 1.2. Convolutional Neural Network (CNN) working principle.
Source: Developed by author based on OpenAI GPT-4o architecture.
```

---

## Document Information

**Total Figures:** 4 main diagrams + 2 reference diagrams
**Format:** Mermaid (exportable to PNG/SVG)
**Resolution:** Scalable vector graphics (SVG) recommended for thesis
**Color Scheme:** Professional academic colors
**Fonts:** Sans-serif (automatically rendered)

**Tips for Thesis:**
1. Export all diagrams as high-resolution PNG (300 DPI)
2. Keep consistent styling across all figures
3. Add figure numbers and captions in your document processor
4. Reference each figure in the text before it appears
5. Consider creating grayscale versions for print

---

**Document Version:** 1.0
**Last Updated:** 2026-04-08
**Author:** Ernur Torekul
**Purpose:** Diploma Thesis Visual Documentation
