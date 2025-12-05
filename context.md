Project Overview
Build a modern gift suggestion application with:

Frontend: Next.js 14+ (App Router) with TypeScript and Tailwind CSS
Backend: FastAPI with Pydantic AI agent
Deployment: Vercel (frontend + backend as serverless functions)

Create a FastAPI backend with the following structure:

PROJECT STRUCTURE:
/api
  ├── index.py (main FastAPI app for Vercel)
  ├── agent.py (Pydantic AI agent configuration)
  ├── models.py (Pydantic models)
  └── config.py (configuration management)

REQUIREMENTS:

1. **config.py** - Configuration Management
   - Use pydantic-settings for environment variables
   - Define Settings class with:
     * OPENROUTER_API_KEY
     * MODEL_NAME (default: "google/gemini-2.0-flash-exp:free")
     * CORS_ORIGINS (list of allowed origins)
   - Load from .env file with python-dotenv

2. **models.py** - Data Models
   - Create Pydantic models:
     * GiftRequest: user_message (str), context (optional dict)
     * GiftSuggestion: gift_name (str), reason (str), price_range (str), where_to_buy (list[str])
     * AgentResponse: suggestions (list[GiftSuggestion]), additional_notes (str)

3. **agent.py** - Pydantic AI Agent
   - Import: from pydantic_ai import Agent
   - Create agent with:
     * Model: Use OpenRouter with the free model
     * System prompt: "You are a helpful gift suggestion assistant. When users describe someone they need a gift for, analyze their description and suggest 3 thoughtful, personalized gift ideas. Consider the person's interests, age, relationship, and any mentioned preferences. For each suggestion, provide the gift name, reasoning, price range, and where to buy it."
     * Result type: AgentResponse
   - Configure OpenRouter:
     * Base URL: "https://openrouter.ai/api/v1"
     * API key from config
     * Model name from config
   - Add error handling for API failures

4. **index.py** - FastAPI Application
   - Setup FastAPI with:
     * CORS middleware (allow configured origins)
     * Lifespan context manager for startup/shutdown
   - Create POST endpoint /api/suggest-gift:
     * Accept GiftRequest model
     * Call Pydantic AI agent with user message
     * Return AgentResponse
     * Handle errors gracefully with HTTPException
   - Add GET endpoint /api/health for health checks
   - Add request/response logging middleware

CODE PRINCIPLES:
- Use type hints everywhere (Python 3.10+)
- Implement proper error handling with try/except
- Use dependency injection for agent and config
- Add docstrings to all functions
- Validate all inputs with Pydantic
- Use async/await for I/O operations
- Keep functions small and focused (single responsibility)
- Use constants for magic strings
- Implement proper logging with Python logging module

VERCEL CONFIGURATION:
Create vercel.json:
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.py" }
  ]
}

DEPENDENCIES (requirements.txt):
fastapi
pydantic-ai[openai]
pydantic-settings
python-dotenv
uvicorn

ENVIRONMENT VARIABLES (.env.example):
OPENROUTER_API_KEY=your_key_here
MODEL_NAME=google/gemini-2.0-flash-exp:free
CORS_ORIGINS=["http://localhost:3000"]

Create a Next.js 14+ frontend with the following specifications:

PROJECT STRUCTURE:
/app
  ├── layout.tsx (root layout)
  ├── page.tsx (main page)
  ├── api/
  │   └── suggest/route.ts (API route proxy to backend)
  └── components/
      ├── GiftSuggestionForm.tsx
      ├── SuggestionCard.tsx
      └── LoadingSpinner.tsx

DESIGN REQUIREMENTS:
- Modern, minimal design with Tailwind CSS
- Responsive layout (mobile-first)
- Smooth animations and transitions
- Clean typography with good spacing
- Accessible (ARIA labels, keyboard navigation)
- Color scheme: Use a modern palette (e.g., indigo/purple accent)

COMPONENTS:

1. **page.tsx** - Main Page
   - Center content vertically and horizontally
   - Display app title: "AI Gift Finder 🎁"
   - Render GiftSuggestionForm component
   - Show suggestions below the form when available
   - Implement loading state with spinner

2. **GiftSuggestionForm.tsx**
   - Textarea for user input (minimum 20 characters)
   - Character counter showing current/minimum length
   - Submit button with loading state
   - Form validation:
     * Disable submit if input too short
     * Show error message if submission fails
   - Clear form after successful submission
   - Use React hooks (useState) for state management
   - Call /api/suggest endpoint on submit

3. **SuggestionCard.tsx**
   - Display individual gift suggestion:
     * Gift name as heading
     * Reason for suggestion
     * Price range badge
     * Where to buy (links if possible)
   - Card hover effect (slight lift/shadow)
   - Responsive grid layout (1 column mobile, 3 columns desktop)
   - Copy-to-clipboard button for each suggestion

4. **LoadingSpinner.tsx**
   - Animated spinner component
   - Center aligned
   - Smooth rotation animation
   - Accessible loading text

5. **app/api/suggest/route.ts** - API Route
   - POST handler that proxies to FastAPI backend
   - Add error handling
   - Set proper headers
   - Return JSON response
   - Environment variable for backend URL

TECHNICAL REQUIREMENTS:
- Use TypeScript with strict mode
- Use 'use client' directive where needed
- Implement proper error boundaries
- Add loading states for all async operations
- Use Next.js Image component for any images
- Implement proper SEO (metadata in layout)
- Use Server Components where possible
- Client Components only when needed (interactivity)

STYLING GUIDELINES:
- Use Tailwind utility classes
- No custom CSS files
- Consistent spacing scale (4, 8, 16, 24, 32px)
- Rounded corners (rounded-lg, rounded-xl)
- Shadows for depth (shadow-md, shadow-lg)
- Hover/focus states on interactive elements
- Smooth transitions (transition-all duration-300)

ENVIRONMENT VARIABLES (.env.local):
NEXT_PUBLIC_API_URL=http://localhost:8000
# For production: your-vercel-backend-url

PACKAGE.JSON SCRIPTS:
"dev": "next dev"
"build": "next build"
"start": "next start"
"lint": "next lint"

DEPENDENCIES:
- next (14+)
- react
- react-dom
- typescript
- @types/node
- @types/react
- tailwindcss
- postcss
- autoprefixer

BACKEND DEPLOYMENT TO VERCEL:

1. Create a GitHub repository with your backend code
2. Go to Vercel dashboard
3. Import the repository
4. Configure:
   - Framework Preset: Other
   - Root Directory: . (or /api if nested)
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
5. Add Environment Variables:
   - OPENROUTER_API_KEY
   - MODEL_NAME
   - CORS_ORIGINS (include your frontend URL)
6. Deploy

FRONTEND DEPLOYMENT TO VERCEL:

1. In your frontend directory, update .env.production:
   NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
2. Push to GitHub
3. Import to Vercel
4. Framework: Next.js (auto-detected)
5. Deploy

TESTING:
1. Test backend: curl https://your-backend.vercel.app/api/health
2. Test frontend: Visit your-frontend.vercel.app
3. Test full flow: Submit a gift request and verify suggestions appear

USER INPUT:
"I need a gift for my 30-year-old brother who loves gaming, coffee, and is learning to cook. Budget around $50-100."

EXPECTED OUTPUT:
{
  "suggestions": [
    {
      "gift_name": "Mechanical Gaming Keyboard",
      "reason": "Perfect for a gaming enthusiast, enhances gaming experience with responsive keys",
      "price_range": "$70-$90",
      "where_to_buy": ["Amazon", "Best Buy", "Newegg"]
    },
    {
      "gift_name": "Premium Coffee Subscription (3 months)",
      "reason": "Ideal for coffee lovers, delivers specialty beans monthly, great for exploration",
      "price_range": "$50-$75",
      "where_to_buy": ["Trade Coffee", "Atlas Coffee Club", "Blue Bottle"]
    },
    {
      "gift_name": "Chef's Knife Set for Beginners",
      "reason": "Essential for someone learning to cook, quality tools make cooking more enjoyable",
      "price_range": "$60-$100",
      "where_to_buy": ["Sur La Table", "Williams Sonoma", "Amazon"]
    }
  ],
  "additional_notes": "All suggestions fit within your budget and align with his interests. Consider pairing the knife set with a beginner's cookbook!"
}