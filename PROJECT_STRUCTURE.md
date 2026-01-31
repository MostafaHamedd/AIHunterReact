# HunterAI Project Structure

## Overview
This is a React + TypeScript skeleton for an AI-powered job hunting and application tracking platform.

## Tech Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router** - Navigation
- **Lucide React** - Icons

## Project Structure

```
HunterAI/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.tsx        # Main layout with navigation
│   │   ├── JobInput.tsx      # Job description input (URL or text)
│   │   ├── ResumeUpload.tsx  # Resume file upload component
│   │   ├── ATSScorePanel.tsx # ATS scoring display (sticky panel)
│   │   ├── OptimizationChanges.tsx # Shows how resume was optimized
│   │   ├── ResumePreview.tsx # Side-by-side resume preview
│   │   └── AIEditor.tsx      # AI chat assistant for resume editing
│   │
│   ├── pages/                # Page components
│   │   ├── Dashboard.tsx     # Main dashboard with stats
│   │   ├── JobAnalyzer.tsx   # Job analysis and optimization page
│   │   ├── ResumeEditor.tsx  # Resume editor with AI assistant
│   │   ├── Applications.tsx  # Applications list view
│   │   └── ApplicationDetail.tsx # Individual application details
│   │
│   ├── store/                # State management
│   │   └── useStore.ts       # Zustand store with all app state
│   │
│   ├── services/             # API/mock services
│   │   └── mockService.ts    # Mock services for development
│   │
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # All type definitions
│   │
│   ├── utils/                # Utility functions
│   │   └── cn.ts             # Class name utility (clsx + tailwind-merge)
│   │
│   ├── App.tsx               # Main app component with routing
│   ├── main.tsx              # Entry point
│   ├── index.css             # Global styles and Tailwind imports
│   └── vite-env.d.ts         # Vite type definitions
│
├── public/                   # Static assets (if any)
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── README.md                 # Project documentation

```

## Features Implemented

### ✅ Core Features
1. **Job Description Input** - URL or text paste
2. **Resume Upload** - PDF/DOCX file upload with drag & drop
3. **ATS Scoring** - Keyword matching and score display
4. **Optimization Changes** - Transparent explanation of changes
5. **Resume Preview** - Original vs Optimized side-by-side view
6. **AI Editor** - Chat interface for resume optimization
7. **Application Tracking** - Full CRUD for job applications
8. **Dashboard** - Statistics and quick actions

### 🎨 UI/UX
- Modern, clean design with Tailwind CSS
- Responsive layout
- Dark mode support (via Tailwind dark: classes)
- Smooth transitions and hover effects
- Sticky ATS score panel
- Beautiful gradients and shadows

### 📊 State Management
- Zustand store for global state
- All application data persisted in store
- Easy to extend with backend integration

### 🔧 Mock Services
- `mockExtractJobData` - Extracts job requirements
- `mockParseResume` - Parses resume files
- `mockCalculateATSScore` - Calculates ATS match score
- `mockOptimizeResume` - Optimizes resume content
- `mockOptimizeCoverLetter` - Optimizes cover letter

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Next Steps (Backend Integration)

When ready to add backend:
1. Replace mock services in `src/services/` with actual API calls
2. Add authentication if needed
3. Add Google Drive API integration
4. Add real resume parsing (PDF/DOCX libraries)
5. Add AI service integration (OpenAI, Anthropic, etc.)
6. Add database for persistence

## Notes

- All services are currently mocked for frontend development
- State is stored in memory (will be lost on refresh)
- File uploads are simulated (no actual parsing yet)
- AI responses are mocked with setTimeout delays
- Google Drive integration is placeholder (not implemented)

