# StadiumMind AI — Smart Stadium & Tournament Operations OS

StadiumMind AI is an enterprise-grade, GenAI-enabled operations system designed to power host stadiums (like MetLife Stadium) during the **FIFA World Cup 2026**. 

The application integrates real-time telemetry, crowd flow predictions, incident tracking, volunteer coordination, and emergency dispatch, augmented by the **Gemini 2.5 Flash** model for automated decision support and multilingual translation.

---

## 🚀 Key Features

*   **Operations Dashboard:** Live match-day telemetry including attendance tracking, crowd density profiles, wait times, and emergency alerts.
*   **Live Stadium Map:** A multi-layered interactive Leaflet map featuring real-time crowd heatmap overlays, gate queues, medical station status, and AI-recommended evacuation routes.
*   **AI Assistant Command Center:** Full-fledged operational chatbot with Speech-to-Text (STT) voice input, Text-to-Speech (TTS) audio output, quick prompts, and multilingual capabilities.
*   **Crowd Analysis & Forecasting:** Predictive analytics that simulate stadium exit queues and concourse congestion for the next 5 hours using machine learning models.
*   **Emergency & Incident Dispatch:** Immediate incident logging, automated AI priority scoring, nearest resource maps, and team dispatch status trackers.
*   **Role-Based Control Panels:** Custom panels tailored for **Volunteers**, **Security Staff**, **Medical Teams**, **Transport Managers**, and **System Administrators**.

---

## 🛠️ Tech Stack

*   **Framework:** Next.js 16 (App Router) + TypeScript
*   **Styling:** TailwindCSS + Framer Motion (Aesthetics: Dark mode, neon glows, glassmorphism)
*   **State Management:** Zustand (Stores for Auth, Stadium, and Notifications)
*   **Queries & Sync:** TanStack React Query + Supabase Realtime Channels
*   **Charts & Maps:** Recharts + React Leaflet
*   **AI Engine:** Google Gemini SDK (Gemini 2.5 Flash)
*   **Forms:** React Hook Form + Zod Validations

---

## 📁 Project Structure

```
pw4/
├── app/                  # Next.js App Router Pages
│   ├── (auth)/           # Authentication flows (Login, Register, Reset)
│   ├── (dashboard)/      # Dashboard pages (Dashboard, Map, Panels, etc.)
│   ├── api/              # API routes (AI Chat, Predict, Translate, Incident)
│   └── globals.css       # Core styling & theme variables
├── components/           # Reusable UI & layout elements
│   ├── ai/               # AI & Chat components
│   ├── dashboard/        # Stats cards and charts
│   ├── layout/           # Sidebar, Navbar, Footer
│   ├── map/              # Leaflet Map and Heatmaps
│   └── ui/               # Custom design system components
├── lib/                  # Application core utilities
│   ├── gemini/           # Gemini client & system prompts
│   ├── hooks/            # TanStack Query & Supabase hooks
│   ├── store/            # Zustand global stores
│   ├── supabase/         # Supabase client & server instances
│   └── utils/            # Format and export helpers
└── supabase/             # Database migrations & seeds
```

---

## ⚙️ Quick Start

1.  **Clone the repository and install dependencies:**
    ```bash
    npm install
    ```

2.  **Configure environment variables:**
    Copy `.env.local.example` to `.env.local` and add your credentials:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    GEMINI_API_KEY=your-google-gemini-key
    ```

3.  **Run migrations and seed the database:**
    Apply the SQL schema inside `supabase/migrations/00001_initial_schema.sql` to your Supabase PostgreSQL instance.

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  **Compile & Verify Production Build:**
    ```bash
    npm run build
    ```

