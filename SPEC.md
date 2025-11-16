# Perplexity API Demo - Complete Specification Document

## 1. Feature Overview

### 1.1 Multi-tab Web UI
- **Purpose**: Demonstrate all Perplexity API endpoints in a single, unified interface
- **Architecture**: Tabbed interface where each tab maps to one specific Perplexity API endpoint
- **User Flow**: 
  1. User selects a tab (endpoint)
  2. User enters text in an input box
  3. User clicks "Submit"
  4. Backend processes the request via the corresponding API route
  5. Response is displayed in prettified JSON format

### 1.2 Consistent Task Across All Endpoints
**Universal Task**: "Summarize the following text in 1–2 sentences."

Every tab/endpoint receives user text input and performs this same task, but using different Perplexity API endpoints/models. This demonstrates how different endpoints handle the same request.

---

## 2. Perplexity API Endpoints

Based on the official Perplexity API documentation at https://docs.perplexity.ai, the following endpoints are available:

### 2.1 Chat Completions Endpoint (Primary)

**Name**: Chat Completions  
**URL**: `https://api.perplexity.ai/chat/completions`  
**HTTP Method**: POST  
**Description**: OpenAI-compatible chat completions endpoint supporting various Perplexity models

#### Available Models:
1. **sonar** - Online model with real-time web search
2. **sonar-pro** - Enhanced online model with deeper reasoning
3. **sonar-reasoning** - Advanced reasoning model with web search

#### Task Implementation:
"Summarize the following text in 1–2 sentences"

#### Request Body:
```json
{
  "model": "sonar",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant that provides concise summaries."
    },
    {
      "role": "user",
      "content": "Summarize the following text in 1–2 sentences: [USER_INPUT]"
    }
  ],
  "max_tokens": 150,
  "temperature": 0.7,
  "top_p": 0.9,
  "stream": false
}
```

#### Expected Response:
```json
{
  "id": "chatcmpl-xyz123",
  "object": "chat.completion",
  "created": 1700000000,
  "model": "sonar",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Summary of the input text in 1-2 sentences."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 30,
    "total_tokens": 55
  }
}
```

---

### 2.2 Tab Configuration

Each tab will use the Chat Completions endpoint with different models to demonstrate variations:

| Tab Name | Model | Description | Endpoint |
|----------|-------|-------------|----------|
| Sonar | `sonar` | Fast online model with web search | `/api/sonar` |
| Sonar Pro | `sonar-pro` | Enhanced model with deeper reasoning | `/api/sonar-pro` |
| Sonar Reasoning | `sonar-reasoning` | Advanced reasoning capabilities | `/api/sonar-reasoning` |

---

## 3. System Architecture

### 3.1 Frontend UI Workflow

```
┌─────────────────────────────────────────┐
│         Browser (Client Side)           │
│  ┌───────────────────────────────────┐  │
│  │   Tab Bar (Tabs.tsx)              │  │
│  │   [Sonar] [Sonar Pro] [Reasoning] │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │   Text Input (TextInput.tsx)      │  │
│  │   [Text Area]                     │  │
│  │   [Submit Button]                 │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │   Response Display                │  │
│  │   (Prettified JSON)               │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                    │
                    ▼ fetch('/api/[endpoint]')
┌─────────────────────────────────────────┐
│    Next.js API Routes (Server Side)     │
│  ┌───────────────────────────────────┐  │
│  │  /app/api/sonar/route.ts          │  │
│  │  /app/api/sonar-pro/route.ts      │  │
│  │  /app/api/sonar-reasoning/route.ts│  │
│  └───────────────────────────────────┘  │
│                  │                       │
│                  ▼ perplexity.ts helper │
│  ┌───────────────────────────────────┐  │
│  │  lib/perplexity.ts                │  │
│  │  (Shared API logic)               │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                    │
                    ▼ HTTPS POST
┌─────────────────────────────────────────┐
│      Perplexity API (External)          │
│   api.perplexity.ai/chat/completions    │
└─────────────────────────────────────────┘
```

### 3.2 Backend API Routes Mapping

```
Frontend Tab         →   Next.js Route          →   Perplexity Model
─────────────────────────────────────────────────────────────────────
Sonar               →   /api/sonar              →   sonar
Sonar Pro           →   /api/sonar-pro          →   sonar-pro
Sonar Reasoning     →   /api/sonar-reasoning    →   sonar-reasoning
```

### 3.3 Environment Variables

```env
PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Required**: API key from Perplexity AI dashboard

### 3.4 Error Handling Model

#### Frontend Error Handling:
- **Network Errors**: Display "Connection failed. Please try again."
- **API Errors**: Display error message from backend
- **Validation Errors**: Prevent empty submissions

#### Backend Error Handling:
- **401 Unauthorized**: Invalid API key
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Perplexity API error
- **Timeout**: Request takes too long

#### Error Response Format:
```json
{
  "error": "Error message",
  "statusCode": 500,
  "details": "Additional error details if available"
}
```

### 3.5 Rate-Limit Considerations

**Perplexity API Rate Limits** (may vary by plan):
- Default: ~20 requests per minute
- Pro plans: Higher limits

**Mitigation Strategies**:
1. Display loading state during requests
2. Disable submit button while processing
3. Show rate limit errors clearly
4. Implement exponential backoff for retries
5. Consider caching responses for identical queries (future enhancement)

---

## 4. Technology Stack

### 4.1 Framework & Language
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Node Version**: 18.x or higher

### 4.2 Styling
- **CSS Framework**: Tailwind CSS
- **Responsive Design**: Mobile-first approach

### 4.3 Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.3.0"
}
```

---

## 5. Project Structure

```
pplx_api/
├── app/
│   ├── api/                          # API routes (server-side)
│   │   ├── sonar/
│   │   │   └── route.ts             # Sonar model endpoint
│   │   ├── sonar-pro/
│   │   │   └── route.ts             # Sonar Pro model endpoint
│   │   └── sonar-reasoning/
│   │       └── route.ts             # Sonar Reasoning model endpoint
│   ├── components/                   # React components
│   │   ├── Tabs.tsx                 # Tab navigation component
│   │   ├── TextInput.tsx            # Input form component
│   │   └── ResponseDisplay.tsx      # JSON response viewer
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Main page (home)
│   └── globals.css                   # Global styles
├── lib/
│   └── perplexity.ts                # Shared Perplexity API helper
├── .env.example                      # Example environment variables
├── .env.local                        # Local environment (gitignored)
├── .gitignore
├── next.config.js                    # Next.js configuration
├── package.json                      # Dependencies
├── postcss.config.js                 # PostCSS config for Tailwind
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── README.md                         # Setup and usage instructions
└── SPEC.md                          # This specification document
```

---

## 6. API Route Specifications

### 6.1 Common Pattern for All Routes

**Request Format:**
```typescript
POST /api/[endpoint]
Content-Type: application/json

{
  "text": "User input text to summarize"
}
```

**Success Response:**
```typescript
200 OK
Content-Type: application/json

{
  "id": "chatcmpl-xyz",
  "model": "sonar",
  "choices": [...],
  "usage": {...}
}
```

**Error Response:**
```typescript
500 Internal Server Error
Content-Type: application/json

{
  "error": "Failed to process request",
  "statusCode": 500
}
```

---

## 7. Component Specifications

### 7.1 Tabs Component
**Purpose**: Tab navigation for switching between endpoints  
**Props**:
- `activeTab: string` - Currently active tab ID
- `onTabChange: (tabId: string) => void` - Callback when tab changes

**Tabs**:
1. Sonar
2. Sonar Pro
3. Sonar Reasoning

### 7.2 TextInput Component
**Purpose**: Text input and submission  
**Props**:
- `onSubmit: (text: string) => void` - Callback with user input
- `isLoading: boolean` - Whether request is in progress

**Features**:
- Textarea for multi-line input
- Character count display
- Submit button (disabled when loading)
- Clear button

### 7.3 ResponseDisplay Component
**Purpose**: Display API response in formatted JSON  
**Props**:
- `response: any` - API response object
- `error: string | null` - Error message if any

**Features**:
- Syntax-highlighted JSON
- Copy to clipboard button
- Expandable/collapsible sections

---

## 8. Security Considerations

1. **API Key Protection**: 
   - Never expose API key in client-side code
   - Use environment variables
   - Access only from server-side API routes

2. **Input Sanitization**: 
   - Validate user input length
   - Prevent XSS attacks
   - Limit request size

3. **CORS**: 
   - API routes are same-origin
   - No additional CORS configuration needed

4. **Rate Limiting**: 
   - Implement client-side debouncing
   - Consider server-side rate limiting for production

---

## 9. Future Enhancements (Out of Scope for MVP)

1. **Response Caching**: Store recent queries and responses
2. **Conversation History**: Save previous interactions
3. **Streaming Responses**: Real-time token streaming
4. **Comparison View**: Compare responses from different models side-by-side
5. **Export Functionality**: Download responses as JSON/TXT
6. **Authentication**: User login and personal API key management
7. **Usage Analytics**: Track token usage and costs
8. **Model Parameters**: Allow users to adjust temperature, max_tokens, etc.

---

## 10. Testing Strategy

### 10.1 Manual Testing Checklist
- [ ] Each tab successfully calls its respective endpoint
- [ ] Loading states display correctly
- [ ] Error messages appear for failed requests
- [ ] JSON responses are properly formatted
- [ ] Empty input is prevented
- [ ] UI is responsive on mobile/tablet/desktop

### 10.2 Test Scenarios
1. **Valid Input**: "Artificial intelligence is transforming industries..."
2. **Empty Input**: Should show validation error
3. **Very Long Input**: Test token limits
4. **Invalid API Key**: Should return 401 error
5. **Network Failure**: Should show appropriate error

---

## 11. Deployment Considerations

### 11.1 Recommended Platforms
- **Vercel** (recommended - built for Next.js)
- **Netlify**
- **Railway**
- **Render**

### 11.2 Environment Variables Setup
Set `PERPLEXITY_API_KEY` in platform's environment variable configuration

### 11.3 Build Commands
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

---

## 12. Documentation Requirements

### 12.1 README.md Must Include
1. Project description
2. Prerequisites
3. Installation steps
4. Environment setup
5. Running locally
6. Project structure
7. Available endpoints
8. Troubleshooting

### 12.2 Code Documentation
- All functions should have JSDoc comments
- Complex logic should include inline comments
- API routes should document expected request/response formats

---

## End of Specification

