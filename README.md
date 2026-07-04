# Culture Compass AI — Immersive Travel Guide & Cultural Companion

Culture Compass AI is a premium, responsive React 19 web application paired with a FastAPI backend designed to deliver curated, culture-focused travel expeditions. Powered by **Google Gemini 2.5 Flash**, it translates travel preferences (destination, budget, travelers, interests, dates, and accessibility needs) into an editorial timeline, Michelin-style dining recommendations, hidden local gems, checklist notebooks, and postcard journals.

---

## 🚀 Key Features

* **Immersive Editorial Timeline**: Structured day-by-day expedition plans mapping travel times, estimated costs, and local activities.
* **Michelin-Inspired Culinary Journal**: Curated local dish recommendations, street markets, price classifications, and vegetarian alternatives.
* **Secret Spots & Hidden Gems**: Off-the-beaten-path locations with confidence matching scores and local historical value notes.
* **Smart Budget Infographics**: Financial cost allocations (transport, dining, sightseeing, shopping) comparing estimated costs to user budget with saving swap options.
* **Ruled Notebook Ledger Checklist**: Weather-adaptive smart packing check-lists and a local phrasebook featuring phonetic pronunciations.
* **Physical Postcard & Handwriting Diary**: Generates a shareable visual travel postcard mockup with local stamps, wax seals, and copyable journal entries.
* **Interactive Leaflet Mapping**: Dynamically translates coordinates (latitude & longitude) returned by Gemini into map markers highlighting places of interest.
* **High Accessibility (WCAG 2.1 Compliant)**: Full keyboard tab accessibility, focus-visible indicators, proper semantic headings, and ARIA roles.
* **Ox-Clean Linter & Fast Build**: Standardized configuration compiling production builds in under 300ms with 0 errors and 0 linter warnings.

---

## 🛠️ Technology Stack

* **Frontend**: React 19, Vite, Leaflet.js (Interactive Maps), Lucide Icons, and Vanilla CSS variables for theming.
* **Backend**: FastAPI, Uvicorn, Python 3, HTTPX, and python-dotenv.
* **AI Model Engine**: Google Gemini 2.5 Flash API (Structured JSON Schema).

---

## 📂 Folder Structure

```
d:\PromptWars Travel\
├── package.json
├── vite.config.js
├── tailwind.config.js
├── netlify.toml
├── README.md
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── InteractiveMap.jsx
│   │   ├── ItineraryTimeline.jsx
│   │   ├── HiddenGemsCard.jsx
│   │   ├── FoodExplorer.jsx
│   │   ├── EtiquetteEtc.jsx
│   │   ├── BudgetTravelPlanner.jsx
│   │   ├── LanguagePacker.jsx
│   │   └── TravelJournalPostcard.jsx
│   ├── services/
│   │   └── gemini.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   └── utils/
│       └── helpers.js
└── backend/
    ├── requirements.txt
    ├── README.md
    └── app/
        ├── main.py
        ├── config.py
        ├── schemas/
        │   └── schemas.py
        └── services/
            └── gemini.py
```

---

## ⚙️ Local Development & Setup

### 1. Backend API Configuration
Navigate to the `backend/` directory, set up your python virtual environment, and launch the API server:
```bash
# Setup virtual environment
python -m venv venv
.\venv\Scripts\activate

# Install backend dependencies
pip install -r requirements.txt

# Start the FastAPI server on port 8001 (matching frontend config)
python -m uvicorn app.main:app --host 0.0.0.0 --port 8001
```
Ensure your `backend/.env` file exists and has your Gemini key configured:
```env
GEMINI_API_KEY=your_gemini_key_here
PORT=8001
HOST=0.0.0.0
```

### 2. Frontend Setup
Install npm packages and run the Vite client:
```bash
# Install packages
npm install

# Start Vite dev server on port 5173
npm run dev
```
Configure your `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_key_here
VITE_API_BASE_URL=http://localhost:8001
```

---

## ☁️ Netlify Deployment

Since the frontend is a client-side React bundle, it deploys directly to Netlify.

1. Set up build configurations in Netlify:
   * **Build command**: `npm run build`
   * **Publish directory**: `dist`
2. Add the environment variables:
   * `VITE_API_BASE_URL`: The public-facing endpoint (or ngrok URL) of your FastAPI backend.
