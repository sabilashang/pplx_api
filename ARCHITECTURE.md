# Architecture Documentation

## System Overview

This document provides a detailed overview of the Perplexity API Demo application architecture, data flow, and component interactions.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React Components (Client-Side)            │  │
│  │                                                         │  │
│  │  ┌─────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │  Tabs   │  │  TextInput   │  │ ResponseDisplay │  │  │
│  │  └─────────┘  └──────────────┘  └─────────────────┘  │  │
│  │                                                         │  │
│  │                    page.tsx (Main Page)                │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP POST
                              │ fetch('/api/[model]', {...})
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER (API Routes)              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              API Routes (Server-Side)                  │  │
│  │                                                         │  │
│  │  /api/sonar/route.ts                                   │  │
│  │  /api/sonar-pro/route.ts                               │  │
│  │  /api/sonar-reasoning/route.ts                         │  │
│  │                                                         │  │
│  │  Each route:                                           │  │
│  │  1. Validates request                                  │  │
│  │  2. Calls lib/perplexity.ts                            │  │
│  │  3. Returns formatted response                         │  │
│  └───────────────────────────────────────────────────────┘  │
│                              │                               │
│                              │ Uses                          │
│                              ▼                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │          lib/perplexity.ts (API Helper)                │  │
│  │                                                         │  │
│  │  - callPerplexityAPI(model, input)                     │  │
│  │  - Handles authentication                              │  │
│  │  - Formats requests                                    │  │
│  │  - Error handling                                      │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS POST
                              │ Authorization: Bearer {API_KEY}
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PERPLEXITY API (External)                │
│                                                              │
│           https://api.perplexity.ai/chat/completions        │
│                                                              │
│  Models:                                                     │
│  - sonar                                                     │
│  - sonar-pro                                                 │
│  - sonar-reasoning                                           │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Request Flow

1. **User Input**:
   - User enters text in `TextInput` component
   - User clicks "Summarize" button
   - `page.tsx` receives the input

2. **Client-Side Processing**:
   - Validate input (not empty, under character limit)
   - Set loading state
   - Clear previous response/error

3. **API Request**:
   - Make POST request to `/api/{activeTab}`
   - Send JSON body: `{ text: "user input" }`
   - Wait for response

4. **Server-Side Processing** (API Route):
   - Validate request body
   - Check text is valid string
   - Check text length
   - Call `callPerplexityAPI(model, text)`

5. **Perplexity API Call** (lib/perplexity.ts):
   - Load API key from environment
   - Format request with system prompt
   - Add user prompt with summarization task
   - Make HTTP POST to Perplexity
   - Parse response

6. **Response Flow**:
   - API route receives Perplexity response
   - Returns JSON to client
   - Client updates state with response
   - `ResponseDisplay` renders the result

### Error Flow

```
Error Source                  → Handler                → User Display
────────────────────────────────────────────────────────────────────
Empty input                   → page.tsx              → "Please enter text"
Network error                 → page.tsx catch        → "Network error"
Invalid API key               → API route             → "Authentication failed"
Rate limit                    → API route             → "Rate limit exceeded"
Perplexity API error          → lib/perplexity.ts    → Specific error message
Unknown error                 → API route             → "Unexpected error"
```

## Component Architecture

### Client Components (React)

#### 1. page.tsx (Main Page)
**Purpose**: Orchestrates the entire user interface

**State**:
```typescript
const [activeTab, setActiveTab] = useState('sonar')
const [response, setResponse] = useState<any>(null)
const [error, setError] = useState<string | null>(null)
const [isLoading, setIsLoading] = useState(false)
```

**Responsibilities**:
- Manages application state
- Coordinates child components
- Handles API requests
- Error handling
- Loading states

#### 2. Tabs.tsx
**Purpose**: Tab navigation for model selection

**Props**:
```typescript
interface TabsProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}
```

**Features**:
- Visual active state
- Hover tooltips with model descriptions
- Keyboard accessibility

#### 3. TextInput.tsx
**Purpose**: Text input form with validation

**Props**:
```typescript
interface TextInputProps {
  onSubmit: (text: string) => void
  isLoading: boolean
}
```

**Features**:
- Character count (max 2000)
- Submit button with loading state
- Clear button
- Keyboard shortcuts (Ctrl+Enter)
- Input validation

#### 4. ResponseDisplay.tsx
**Purpose**: Display API response

**Props**:
```typescript
interface ResponseDisplayProps {
  response: any
  error: string | null
  isLoading: boolean
}
```

**Features**:
- Summary display (highlighted)
- Full JSON response (collapsible)
- Copy to clipboard
- Token usage display
- Empty state
- Loading state
- Error state

### Server Components (API Routes)

#### API Route Pattern

All three routes follow the same pattern:

```typescript
export async function POST(request: NextRequest) {
  try {
    // 1. Parse request
    const { text } = await request.json()
    
    // 2. Validate input
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: '...' }, { status: 400 })
    }
    
    // 3. Call Perplexity API
    const response = await callPerplexityAPI(MODEL, text)
    
    // 4. Return response
    return NextResponse.json(response, { status: 200 })
    
  } catch (error) {
    // 5. Error handling
    // ... (specific error cases)
  }
}
```

**Models**:
- `/api/sonar` → `sonar`
- `/api/sonar-pro` → `sonar-pro`
- `/api/sonar-reasoning` → `sonar-reasoning`

### Shared Library

#### lib/perplexity.ts

**Main Function**:
```typescript
async function callPerplexityAPI(
  model: string,
  userInput: string
): Promise<PerplexityResponse>
```

**Responsibilities**:
- API key management (from env)
- Request formatting
- HTTP request to Perplexity
- Response parsing
- Error handling

**Request Format**:
```typescript
{
  model: string,
  messages: [
    {
      role: 'system',
      content: 'You are a helpful assistant...'
    },
    {
      role: 'user',
      content: 'Summarize the following text in 1-2 sentences: ...'
    }
  ],
  max_tokens: 150,
  temperature: 0.7,
  top_p: 0.9,
  stream: false
}
```

## Security Architecture

### API Key Protection

```
Environment Variables (.env.local)
         │
         │ Read at runtime
         ▼
Server-Side Code Only
(lib/perplexity.ts, API routes)
         │
         │ Never exposed to client
         ▼
Used in HTTP headers
Authorization: Bearer {key}
```

**Security Measures**:
1. ✅ API key stored in environment variables
2. ✅ Only accessed on server-side
3. ✅ Never sent to client
4. ✅ Not in version control (.gitignore)
5. ✅ Input validation on all endpoints
6. ✅ Error messages don't expose sensitive info

### Input Validation

**Client-Side** (page.tsx):
- Empty input check
- Character limit warning

**Server-Side** (API routes):
- Type validation (must be string)
- Empty check
- Length validation (max 10,000 chars)
- 400 Bad Request for invalid input

## State Management

### Application State

**Location**: `page.tsx`

```typescript
┌─────────────────────────────────────────────┐
│         Application State (page.tsx)        │
├─────────────────────────────────────────────┤
│ activeTab: string                           │
│   └─> Currently selected model              │
│                                              │
│ response: any | null                         │
│   └─> Latest API response                   │
│                                              │
│ error: string | null                         │
│   └─> Error message if request failed       │
│                                              │
│ isLoading: boolean                           │
│   └─> Whether request is in progress        │
└─────────────────────────────────────────────┘
```

### State Transitions

```
[Initial State]
  activeTab: 'sonar'
  response: null
  error: null
  isLoading: false

    │ User submits text
    ▼

[Loading State]
  activeTab: 'sonar'
  response: null
  error: null
  isLoading: true

    │ API responds
    ▼

[Success State]              [Error State]
  activeTab: 'sonar'           activeTab: 'sonar'
  response: {...}              response: null
  error: null                  error: "Error message"
  isLoading: false             isLoading: false
```

## Performance Considerations

### Optimization Strategies

1. **API Routes**:
   - `export const dynamic = 'force-dynamic'`
   - Prevents static optimization (necessary for API routes)

2. **Client Components**:
   - Use `'use client'` directive only where needed
   - Minimize state updates
   - Debounce character count updates

3. **Response Caching**:
   - Not implemented in MVP
   - Future enhancement: cache identical queries

4. **Bundle Size**:
   - Tailwind CSS (purged in production)
   - No heavy dependencies
   - Tree-shaking enabled

## Error Handling Strategy

### Error Categories

1. **User Input Errors** (400):
   - Empty input
   - Invalid format
   - Too long

2. **Authentication Errors** (401):
   - Invalid API key
   - Expired API key

3. **Rate Limit Errors** (429):
   - Too many requests
   - Quota exceeded

4. **Server Errors** (500):
   - Configuration error (no API key)
   - Network error
   - Perplexity API error
   - Unknown error

### Error Response Format

```json
{
  "error": "Human-readable error message",
  "statusCode": 400
}
```

## Deployment Architecture

### Environment-Based Configuration

```
Development                Production
───────────────────────────────────────────
localhost:3000             your-domain.com
.env.local                 Platform env vars
npm run dev                npm run build + start
Source maps enabled        Optimized bundle
```

### Deployment Checklist

- [ ] Set `PERPLEXITY_API_KEY` in platform env vars
- [ ] Verify API key works in production
- [ ] Test all three model endpoints
- [ ] Check error handling
- [ ] Verify responsive design
- [ ] Test rate limiting behavior

## File Organization

```
app/
├── api/                    # API routes (backend)
│   ├── sonar/
│   ├── sonar-pro/
│   └── sonar-reasoning/
├── components/             # Reusable components
│   ├── Tabs.tsx
│   ├── TextInput.tsx
│   └── ResponseDisplay.tsx
├── globals.css             # Global styles
├── layout.tsx              # Root layout
└── page.tsx                # Main page

lib/
└── perplexity.ts          # Shared API logic

Configuration files (root)
```

## Technology Decisions

### Why Next.js 14 App Router?

- ✅ Server-side API routes (secure API key storage)
- ✅ Server and client components
- ✅ Built-in TypeScript support
- ✅ Excellent developer experience
- ✅ Easy deployment (Vercel, Netlify, etc.)

### Why TypeScript?

- ✅ Type safety
- ✅ Better IDE support
- ✅ Catch errors at compile time
- ✅ Self-documenting code

### Why Tailwind CSS?

- ✅ Utility-first approach
- ✅ No CSS file bloat
- ✅ Responsive design made easy
- ✅ Consistent design system
- ✅ Dark mode support

## API Contract

### Request Contract

**All endpoints**: `POST /api/{model}`

```typescript
{
  text: string  // Required, 1-10000 chars
}
```

### Response Contract

**Success** (200):
```typescript
{
  id: string
  model: string
  object: string
  created: number
  choices: Array<{
    index: number
    finish_reason: string
    message: {
      role: string
      content: string
    }
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}
```

**Error** (400/401/429/500):
```typescript
{
  error: string
}
```

## Future Enhancements

### Planned Features

1. **Response Streaming**: Real-time token streaming
2. **History**: Save previous queries
3. **Comparison Mode**: Compare responses side-by-side
4. **Custom Parameters**: Adjust temperature, max_tokens
5. **Export**: Download responses as JSON/TXT
6. **Analytics**: Track usage and costs

### Scalability Considerations

- Add Redis for response caching
- Implement server-side rate limiting
- Add request queuing for high traffic
- Database for user history
- Authentication/authorization

---

## Conclusion

This architecture provides a clean, secure, and scalable foundation for demonstrating the Perplexity API. The separation of concerns between client components, API routes, and shared libraries ensures maintainability and testability.

