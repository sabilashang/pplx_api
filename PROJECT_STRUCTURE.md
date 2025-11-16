# Project Structure

This document provides a complete overview of the project file structure with detailed descriptions of each file's purpose.

## Complete Directory Tree

```
pplx_api/
│
├── app/                                    # Next.js App Router directory
│   │
│   ├── api/                               # API routes (server-side endpoints)
│   │   │
│   │   ├── sonar/                         # Sonar model endpoint
│   │   │   └── route.ts                   # POST handler for Sonar model
│   │   │
│   │   ├── sonar-pro/                     # Sonar Pro model endpoint
│   │   │   └── route.ts                   # POST handler for Sonar Pro model
│   │   │
│   │   └── sonar-reasoning/               # Sonar Reasoning model endpoint
│   │       └── route.ts                   # POST handler for Sonar Reasoning model
│   │
│   ├── components/                        # React components
│   │   ├── Tabs.tsx                       # Tab navigation component
│   │   ├── TextInput.tsx                  # Text input form component
│   │   └── ResponseDisplay.tsx            # API response display component
│   │
│   ├── globals.css                        # Global CSS styles (Tailwind directives)
│   ├── layout.tsx                         # Root layout component
│   └── page.tsx                           # Home page (main UI)
│
├── lib/                                   # Shared utility libraries
│   └── perplexity.ts                      # Perplexity API helper functions
│
├── .env.example                           # Example environment variables
├── .env.local                             # Local environment variables (not in git)
├── .gitignore                             # Git ignore patterns
│
├── next.config.js                         # Next.js configuration
├── package.json                           # NPM dependencies and scripts
├── postcss.config.js                      # PostCSS configuration (for Tailwind)
├── tailwind.config.ts                     # Tailwind CSS configuration
├── tsconfig.json                          # TypeScript configuration
│
├── README.md                              # Project documentation
├── SPEC.md                                # Complete specification document
├── ARCHITECTURE.md                        # Architecture documentation
└── PROJECT_STRUCTURE.md                   # This file
```

## File Descriptions

### Root Directory

#### Configuration Files

| File | Purpose | Key Contents |
|------|---------|--------------|
| `package.json` | NPM package configuration | Dependencies, scripts, project metadata |
| `tsconfig.json` | TypeScript configuration | Compiler options, path aliases |
| `next.config.js` | Next.js configuration | React strict mode, build options |
| `tailwind.config.ts` | Tailwind CSS configuration | Theme, colors, plugins |
| `postcss.config.js` | PostCSS configuration | Tailwind and autoprefixer plugins |
| `.gitignore` | Git ignore rules | node_modules, .env.local, .next, etc. |

#### Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| `README.md` | Main project documentation | All users |
| `SPEC.md` | Complete specification | Developers, architects |
| `ARCHITECTURE.md` | Architecture details | Developers, technical leads |
| `PROJECT_STRUCTURE.md` | File structure guide | Developers |

#### Environment Files

| File | Purpose | Tracked in Git? |
|------|---------|-----------------|
| `.env.example` | Example environment variables | ✅ Yes |
| `.env.local` | Actual environment variables | ❌ No (gitignored) |

---

### `/app` Directory

The Next.js App Router directory containing all application code.

#### `app/page.tsx`
- **Type**: Client Component
- **Purpose**: Main application page
- **Exports**: `HomePage` (default)
- **Features**:
  - State management (active tab, response, error, loading)
  - API request handling
  - Child component coordination
  - Error handling

#### `app/layout.tsx`
- **Type**: Server Component
- **Purpose**: Root layout wrapper
- **Features**:
  - HTML structure
  - Font loading (Inter)
  - Metadata configuration
  - Global styling wrapper

#### `app/globals.css`
- **Type**: CSS file
- **Purpose**: Global styles
- **Contains**:
  - Tailwind directives
  - Custom scrollbar styles
  - Dark mode variables
  - JSON syntax highlighting classes

---

### `/app/api` Directory

Server-side API routes that communicate with Perplexity API.

#### Common Pattern

All API routes follow this structure:

```typescript
export async function POST(request: NextRequest) {
  // 1. Parse request body
  // 2. Validate input
  // 3. Call Perplexity API
  // 4. Return response or error
}

export const dynamic = 'force-dynamic'
```

#### `app/api/sonar/route.ts`
- **Endpoint**: `POST /api/sonar`
- **Model**: `sonar`
- **Description**: Fast online model with web search
- **Validation**: Text length, type, emptiness
- **Error Handling**: 400, 401, 429, 500 responses

#### `app/api/sonar-pro/route.ts`
- **Endpoint**: `POST /api/sonar-pro`
- **Model**: `sonar-pro`
- **Description**: Enhanced model with deeper reasoning
- **Validation**: Same as sonar
- **Error Handling**: Same as sonar

#### `app/api/sonar-reasoning/route.ts`
- **Endpoint**: `POST /api/sonar-reasoning`
- **Model**: `sonar-reasoning`
- **Description**: Advanced reasoning capabilities
- **Validation**: Same as sonar
- **Error Handling**: Same as sonar

---

### `/app/components` Directory

Reusable React components.

#### `app/components/Tabs.tsx`
- **Type**: Client Component
- **Purpose**: Tab navigation
- **Props**:
  ```typescript
  {
    activeTab: string
    onTabChange: (tabId: string) => void
  }
  ```
- **Features**:
  - Three tabs (Sonar, Sonar Pro, Sonar Reasoning)
  - Active state styling
  - Hover tooltips
  - Accessibility support

#### `app/components/TextInput.tsx`
- **Type**: Client Component
- **Purpose**: Text input form
- **Props**:
  ```typescript
  {
    onSubmit: (text: string) => void
    isLoading: boolean
  }
  ```
- **Features**:
  - Textarea with 2000 char limit
  - Character counter
  - Submit button
  - Clear button
  - Keyboard shortcuts (Ctrl+Enter)
  - Loading state
  - Validation

#### `app/components/ResponseDisplay.tsx`
- **Type**: Client Component
- **Purpose**: Display API response
- **Props**:
  ```typescript
  {
    response: any
    error: string | null
    isLoading: boolean
  }
  ```
- **Features**:
  - Summary display
  - Full JSON response (collapsible)
  - Copy to clipboard
  - Token usage info
  - Loading state
  - Error state
  - Empty state

---

### `/lib` Directory

Shared utility libraries and helper functions.

#### `lib/perplexity.ts`
- **Type**: Server-side utility
- **Purpose**: Perplexity API integration
- **Exports**:
  - `callPerplexityAPI(model, userInput)` - Main API function
  - `extractContent(response)` - Helper to extract content
  - `PerplexityResponse` - TypeScript interface
  - `PerplexityRequest` - TypeScript interface
- **Features**:
  - API key management
  - Request formatting
  - Error handling
  - Type safety

---

## File Dependencies

### Dependency Graph

```
page.tsx
  ├─> Tabs.tsx
  ├─> TextInput.tsx
  ├─> ResponseDisplay.tsx
  └─> API Routes (/api/sonar, /api/sonar-pro, /api/sonar-reasoning)
        └─> lib/perplexity.ts
              └─> Perplexity API (external)

layout.tsx
  ├─> globals.css
  └─> page.tsx

All files:
  ├─> tsconfig.json (TypeScript config)
  ├─> tailwind.config.ts (Tailwind config)
  └─> next.config.js (Next.js config)
```

### Import Paths

The project uses path aliases configured in `tsconfig.json`:

```typescript
{
  "@/*": ["./*"]
}
```

**Usage examples**:
```typescript
import { callPerplexityAPI } from '@/lib/perplexity'
import Tabs from '@/app/components/Tabs'
```

---

## Component Types

### Server Components (Default)
- `app/layout.tsx`

### Client Components (Marked with 'use client')
- `app/page.tsx`
- `app/components/Tabs.tsx`
- `app/components/TextInput.tsx`
- `app/components/ResponseDisplay.tsx`

### API Routes (Server-only)
- `app/api/sonar/route.ts`
- `app/api/sonar-pro/route.ts`
- `app/api/sonar-reasoning/route.ts`

### Utilities (Server-only)
- `lib/perplexity.ts`

---

## Generated Files (Not in Repository)

These files are generated during development/build and should not be committed:

```
.next/                    # Next.js build output
node_modules/             # NPM dependencies
.env.local                # Local environment variables
*.tsbuildinfo             # TypeScript incremental build info
next-env.d.ts             # Next.js TypeScript declarations
```

---

## File Size Estimates

| Category | Approximate Total Size |
|----------|------------------------|
| Source code (app/) | ~15 KB |
| Components | ~8 KB |
| API routes | ~6 KB |
| Library (lib/) | ~3 KB |
| Configuration | ~2 KB |
| Documentation | ~50 KB |
| **Total (source)** | **~84 KB** |

After build:
- `node_modules/`: ~300 MB
- `.next/`: ~50 MB
- Production bundle: ~500 KB (gzipped: ~150 KB)

---

## Code Organization Principles

### 1. Separation of Concerns
- **UI Components**: `/app/components`
- **API Logic**: `/app/api`
- **Shared Utilities**: `/lib`
- **Styling**: `/app/globals.css`

### 2. Naming Conventions
- **Components**: PascalCase (e.g., `Tabs.tsx`)
- **Routes**: kebab-case directories (e.g., `sonar-pro/`)
- **Utilities**: camelCase (e.g., `callPerplexityAPI`)
- **Types**: PascalCase (e.g., `PerplexityResponse`)

### 3. File Location Rules
- **Client components** → `/app/components`
- **Server components** → `/app` or `/app/components`
- **API routes** → `/app/api/[endpoint]/route.ts`
- **Utilities** → `/lib`
- **Types** → Defined in the file that uses them or `/lib`

### 4. Import Order (Recommended)
```typescript
// 1. External libraries
import { NextRequest, NextResponse } from 'next/server'

// 2. Internal libraries/utilities
import { callPerplexityAPI } from '@/lib/perplexity'

// 3. Components
import Tabs from '@/app/components/Tabs'

// 4. Types
import type { PerplexityResponse } from '@/lib/perplexity'

// 5. Styles
import './styles.css'
```

---

## Adding New Features

### To Add a New Model/Tab:

1. **Create API route**:
   ```
   app/api/[new-model]/route.ts
   ```

2. **Update Tabs component**:
   ```typescript
   // app/components/Tabs.tsx
   const tabs: Tab[] = [
     // ... existing tabs
     {
       id: 'new-model',
       name: 'New Model',
       description: '...',
       model: 'new-model'
     }
   ]
   ```

3. **Update lib/perplexity.ts** (if needed):
   - Add model-specific logic
   - Update types

### To Add a New Component:

1. Create file: `app/components/NewComponent.tsx`
2. Add `'use client'` if it uses hooks/interactivity
3. Import and use in `page.tsx`

---

## Testing Structure (Future)

Recommended structure for tests:

```
__tests__/
├── api/
│   ├── sonar.test.ts
│   ├── sonar-pro.test.ts
│   └── sonar-reasoning.test.ts
├── components/
│   ├── Tabs.test.tsx
│   ├── TextInput.test.tsx
│   └── ResponseDisplay.test.tsx
└── lib/
    └── perplexity.test.ts
```

---

## Summary

This project follows Next.js 14 App Router conventions with a clear separation between:
- **Client UI** (`/app/components`, `/app/page.tsx`)
- **Server API** (`/app/api`)
- **Shared Logic** (`/lib`)

All files are organized for:
- ✅ Easy navigation
- ✅ Clear responsibilities
- ✅ Type safety
- ✅ Maintainability
- ✅ Scalability

