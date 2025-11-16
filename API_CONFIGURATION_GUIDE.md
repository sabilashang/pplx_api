# 🔧 API Configuration Guide

Complete guide to configuring and customizing your Perplexity API integration.

---

## 📑 Table of Contents

1. [Setting Up API Keys](#setting-up-api-keys)
2. [Modifying System Prompts](#modifying-system-prompts)
3. [Understanding User Prompts](#understanding-user-prompts)
4. [Configuring API Parameters](#configuring-api-parameters)
5. [Advanced Configuration](#advanced-configuration)
6. [Multiple Models Configuration](#multiple-models-configuration)

---

## 🔑 Setting Up API Keys

### Step 1: Get Your Perplexity API Key

1. Visit [Perplexity AI Settings](https://www.perplexity.ai/settings/api)
2. Sign in to your account
3. Navigate to the API section
4. Generate a new API key
5. Copy the key (format: `pplx-xxxxxxxxxxxxxxxxxxxxxxxx`)

### Step 2: Create Environment File

Create a file named `.env.local` in the **root directory** of your project:

```
pplx_api/
├── .env.local          ← Create this file here
├── app/
├── lib/
└── package.json
```

### Step 3: Add Your API Key

Open `.env.local` and add:

```env
PERPLEXITY_API_KEY=pplx-your-actual-api-key-here
```

**Important Notes:**
- ✅ Replace `pplx-your-actual-api-key-here` with your real API key
- ✅ No quotes needed around the key
- ✅ No spaces around the `=` sign
- ❌ Never commit `.env.local` to version control
- ❌ Never share your API key publicly

### Step 4: Restart Development Server

After creating `.env.local`, restart your server:

```bash
# Stop the server (Ctrl+C or Cmd+C)
# Then restart:
npm run dev
```

---

## 📝 Modifying System Prompts

The **system prompt** defines the AI's behavior and personality. It tells the model how to respond.

### Location

**File:** `lib/perplexity.ts`  
**Lines:** 78-80

### Current System Prompt

```typescript
{
    role: 'system',
    content: 'You are a helpful assistant that provides concise summaries. Always respond with clear, accurate summaries in 1-2 sentences.'
}
```

### How to Modify

1. Open `lib/perplexity.ts`
2. Navigate to line 78
3. Find the `messages` array in the `callPerplexityAPI` function
4. Edit the `content` field in the system message

### Example Modifications

#### For a Creative Writer

```typescript
{
    role: 'system',
    content: 'You are a creative writing assistant that crafts engaging narratives. Transform any input into a captivating story with vivid descriptions.'
}
```

#### For a Code Explainer

```typescript
{
    role: 'system',
    content: 'You are an expert programmer who explains code clearly. Break down technical concepts into simple terms that anyone can understand.'
}
```

#### For a Data Analyst

```typescript
{
    role: 'system',
    content: 'You are a data analyst who extracts key insights. Identify patterns, trends, and important statistics from any text.'
}
```

#### For a Professional Email Writer

```typescript
{
    role: 'system',
    content: 'You are a professional business communication expert. Transform casual text into polished, professional emails.'
}
```

### Best Practices

- ✅ Be specific about the desired behavior
- ✅ Keep it concise (1-3 sentences)
- ✅ Define the tone and style
- ✅ Specify the output format if needed
- ❌ Don't make it too long or complex
- ❌ Don't include user-specific instructions here

---

## 💬 Understanding User Prompts

The **user prompt** is the actual task instruction sent with each request.

### Location

**File:** `lib/perplexity.ts`  
**Lines:** 82-84

### Current User Prompt

```typescript
{
    role: 'user',
    content: `Summarize the following text in 1–2 sentences:\n\n${userInput}`
}
```

### Structure Breakdown

```typescript
content: `[TASK INSTRUCTION]\n\n${userInput}`
         ─────────────────       ─────────
         Your instructions       User's input
```

### How to Modify

1. Open `lib/perplexity.ts`
2. Navigate to line 83
3. Find the second object in the `messages` array (with `role: 'user'`)
4. Edit the template string before `${userInput}`

### Example Modifications

#### For Translation

```typescript
{
    role: 'user',
    content: `Translate the following text to Spanish:\n\n${userInput}`
}
```

#### For Sentiment Analysis

```typescript
{
    role: 'user',
    content: `Analyze the sentiment of this text (positive/negative/neutral) and explain why:\n\n${userInput}`
}
```

#### For Question Answering

```typescript
{
    role: 'user',
    content: `Answer the following question in detail:\n\n${userInput}`
}
```

#### For Bullet Points

```typescript
{
    role: 'user',
    content: `Extract the main points from this text as bullet points:\n\n${userInput}`
}
```

#### For Code Review

```typescript
{
    role: 'user',
    content: `Review this code and suggest improvements:\n\n${userInput}`
}
```

### Important Notes

- The `${userInput}` variable contains what the user types in the text area
- Keep the `\n\n` for proper formatting
- The instruction should match your system prompt's purpose

---

## ⚙️ Configuring API Parameters

Control the AI's behavior with these parameters.

### Location

**File:** `lib/perplexity.ts`  
**Lines:** 86-89

### Current Configuration

```typescript
max_tokens: 150,
temperature: 0.7,
top_p: 0.9,
stream: false
```

---

### 📊 Parameter Reference

#### 1. `max_tokens`

**What it does:** Maximum number of tokens (words/pieces) in the response

**Current value:** `150`

**Range:** `1` to `4096` (model-dependent)

**Examples:**

```typescript
max_tokens: 50      // Very short responses (1-2 sentences)
max_tokens: 150     // Short responses (paragraph)
max_tokens: 500     // Medium responses (multiple paragraphs)
max_tokens: 2000    // Long responses (detailed explanations)
```

**Use cases:**
- **50-100**: Quick summaries, yes/no answers
- **150-300**: Standard responses, explanations
- **500-1000**: Detailed analysis, essays
- **1000+**: Long-form content, comprehensive reports

---

#### 2. `temperature`

**What it does:** Controls randomness/creativity in responses

**Current value:** `0.7`

**Range:** `0.0` to `2.0`

**Scale:**

```
0.0 ────────── 0.7 ────────── 1.5 ────────── 2.0
Deterministic  Balanced      Creative      Very Random
Consistent     Moderate      Diverse       Unpredictable
```

**Examples:**

```typescript
temperature: 0.0    // Factual, consistent, deterministic
temperature: 0.3    // Slightly varied, mostly consistent
temperature: 0.7    // Balanced creativity and consistency
temperature: 1.0    // More creative and varied
temperature: 1.5    // Very creative, diverse outputs
```

**Use cases:**
- **0.0-0.3**: Code generation, factual Q&A, data extraction
- **0.4-0.8**: General chat, summaries, balanced tasks
- **0.9-1.5**: Creative writing, brainstorming, storytelling
- **1.6-2.0**: Experimental, highly diverse outputs

---

#### 3. `top_p` (Nucleus Sampling)

**What it does:** Alternative to temperature; considers top % of probable tokens

**Current value:** `0.9`

**Range:** `0.0` to `1.0`

**Scale:**

```
0.0 ────────── 0.5 ────────── 0.9 ────────── 1.0
Very Focused   Focused       Balanced      Open
```

**Examples:**

```typescript
top_p: 0.1      // Very focused, only most likely words
top_p: 0.5      // Fairly focused, reduced creativity
top_p: 0.9      // Balanced approach (recommended)
top_p: 1.0      // Considers all possible tokens
```

**Use cases:**
- **0.1-0.5**: When you need very focused, precise outputs
- **0.6-0.9**: General purpose, balanced creativity (recommended)
- **0.95-1.0**: When you want maximum variety

**Note:** Use either `temperature` OR `top_p`, not both at extreme values

---

#### 4. `stream`

**What it does:** Enable/disable streaming responses (tokens appear gradually)

**Current value:** `false`

**Options:** `true` or `false`

```typescript
stream: false   // Wait for complete response (easier to handle)
stream: true    // Receive response tokens in real-time (streaming)
```

**Use cases:**
- **false**: Standard API calls, batch processing
- **true**: Real-time chat interfaces, better UX for long responses

**Note:** Streaming requires additional implementation in your UI

---

#### 5. Additional Available Parameters

You can also add these parameters to the `payload` object:

##### `presence_penalty`

Controls repetition of topics/concepts

```typescript
presence_penalty: 0.5  // Range: -2.0 to 2.0
```

- **Negative values**: More repetition
- **0**: Neutral
- **Positive values**: Less repetition, more diverse topics

##### `frequency_penalty`

Controls repetition of specific words/phrases

```typescript
frequency_penalty: 0.5  // Range: -2.0 to 2.0
```

- **Negative values**: May repeat words
- **0**: Neutral
- **Positive values**: Avoids repeating words

---

### 🎯 Complete Example Configurations

#### Configuration 1: Factual Q&A

```typescript
const payload: PerplexityRequest = {
    model: model,
    messages: [
        {
            role: 'system',
            content: 'You are a knowledgeable assistant providing accurate, factual information.'
        },
        {
            role: 'user',
            content: `Answer this question accurately:\n\n${userInput}`
        }
    ],
    max_tokens: 300,
    temperature: 0.2,      // Low - consistent, factual
    top_p: 0.9,
    stream: false,
    presence_penalty: 0,
    frequency_penalty: 0
};
```

#### Configuration 2: Creative Writing

```typescript
const payload: PerplexityRequest = {
    model: model,
    messages: [
        {
            role: 'system',
            content: 'You are a creative writer crafting engaging stories with vivid imagery.'
        },
        {
            role: 'user',
            content: `Write a creative story based on:\n\n${userInput}`
        }
    ],
    max_tokens: 1000,
    temperature: 1.2,      // High - very creative
    top_p: 0.95,
    stream: false,
    presence_penalty: 0.6, // Diverse topics
    frequency_penalty: 0.3 // Varied vocabulary
};
```

#### Configuration 3: Code Generation

```typescript
const payload: PerplexityRequest = {
    model: model,
    messages: [
        {
            role: 'system',
            content: 'You are an expert programmer who writes clean, efficient code.'
        },
        {
            role: 'user',
            content: `Write code for the following:\n\n${userInput}`
        }
    ],
    max_tokens: 800,
    temperature: 0.1,      // Very low - deterministic
    top_p: 0.9,
    stream: false,
    presence_penalty: 0,
    frequency_penalty: 0
};
```

#### Configuration 4: Conversational Chat

```typescript
const payload: PerplexityRequest = {
    model: model,
    messages: [
        {
            role: 'system',
            content: 'You are a friendly, helpful assistant who engages in natural conversation.'
        },
        {
            role: 'user',
            content: userInput  // No template, just direct input
        }
    ],
    max_tokens: 400,
    temperature: 0.8,      // Moderate - natural variety
    top_p: 0.9,
    stream: false,
    presence_penalty: 0.3,
    frequency_penalty: 0.3
};
```

---

## 🔬 Advanced Configuration

### Model Selection

Each API route calls a specific Perplexity model. Models are defined in the route files.

#### Available Models

| Model | Speed | Reasoning | Use Case |
|-------|-------|-----------|----------|
| `sonar` | ⚡ Fastest | Basic | Quick queries, simple tasks |
| `sonar-pro` | 🚀 Fast | Enhanced | Complex queries, better accuracy |
| `sonar-reasoning` | 🧠 Moderate | Advanced | Deep analysis, multi-step reasoning |
| `sonar-reasoning-pro` | 🎯 Slower | Expert | Most complex tasks, best accuracy |
| `sonar-deep-research` | 🔬 Slowest | Research | In-depth research, citations |

#### Where Models are Specified

**In API Routes:** `app/api/[model-name]/route.ts`

Example from `app/api/sonar/route.ts`:

```typescript
// Line 40
const response = await callPerplexityAPI('sonar', text)
                                         ^^^^^^
                                         Model name
```

#### Changing the Model

To use a different model for an endpoint:

1. Open the route file (e.g., `app/api/sonar/route.ts`)
2. Find the `callPerplexityAPI()` call
3. Change the first parameter:

```typescript
// Change from 'sonar' to 'sonar-pro'
const response = await callPerplexityAPI('sonar-pro', text)
```

---

### Creating Custom Configurations Per Model

You can create different configurations for different models by modifying `lib/perplexity.ts`:

```typescript
export async function callPerplexityAPI(
    model: string,
    userInput: string
): Promise<PerplexityResponse> {
    const apiKey = process.env.PERPLEXITY_API_KEY;

    if (!apiKey) {
        throw new Error('PERPLEXITY_API_KEY is not configured');
    }

    // Different configs for different models
    let systemPrompt = 'You are a helpful assistant.';
    let maxTokens = 150;
    let temperature = 0.7;

    // Customize based on model
    switch(model) {
        case 'sonar':
            systemPrompt = 'You are a fast assistant providing quick summaries.';
            maxTokens = 100;
            temperature = 0.5;
            break;
        
        case 'sonar-pro':
            systemPrompt = 'You are an advanced assistant providing detailed analysis.';
            maxTokens = 300;
            temperature = 0.7;
            break;
        
        case 'sonar-reasoning':
            systemPrompt = 'You are an expert reasoning assistant. Think step-by-step.';
            maxTokens = 500;
            temperature = 0.4;
            break;
        
        case 'sonar-deep-research':
            systemPrompt = 'You are a research assistant. Provide comprehensive analysis with citations.';
            maxTokens = 1000;
            temperature = 0.3;
            break;
    }

    const payload: PerplexityRequest = {
        model: model,
        messages: [
            {
                role: 'system',
                content: systemPrompt
            },
            {
                role: 'user',
                content: userInput
            }
        ],
        max_tokens: maxTokens,
        temperature: temperature,
        top_p: 0.9,
        stream: false
    };

    // ... rest of the function
}
```

---

### Environment-Specific Configuration

You can use different configurations for development vs production:

```typescript
// In lib/perplexity.ts

const isDevelopment = process.env.NODE_ENV === 'development';

const payload: PerplexityRequest = {
    model: model,
    messages: [...],
    max_tokens: isDevelopment ? 100 : 500,  // Shorter in dev
    temperature: isDevelopment ? 0.5 : 0.7,
    top_p: 0.9,
    stream: false
};
```

---

## 🎨 Multiple Models Configuration

### Current Setup

The app has 6 different endpoints for 6 models:

```
/api/sonar              → sonar
/api/sonar-pro          → sonar-pro
/api/sonar-reasoning    → sonar-reasoning
/api/sonar-reasoning-pro → sonar-reasoning-pro
/api/sonar-deep-research → sonar-deep-research
/api/search             → (search model)
```

### Adding a New Model Endpoint

#### Step 1: Create New API Route

Create a new file: `app/api/[your-model]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { callPerplexityAPI } from '@/lib/perplexity'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { text } = body

        // Validation
        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Invalid request: "text" field is required' },
                { status: 400 }
            )
        }

        // Call your model
        const response = await callPerplexityAPI('your-model-name', text)

        return NextResponse.json(response, { status: 200 })

    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        )
    }
}

export const dynamic = 'force-dynamic'
```

#### Step 2: Update UI Tabs (Optional)

Edit `app/components/Tabs.tsx` to add your new model to the tabs.

---

## 📊 Quick Reference Table

| Parameter | Current | Range | Purpose | When to Increase | When to Decrease |
|-----------|---------|-------|---------|------------------|------------------|
| `max_tokens` | 150 | 1-4096 | Response length | Need longer outputs | Need shorter, quicker responses |
| `temperature` | 0.7 | 0.0-2.0 | Creativity/randomness | Want more creative/diverse outputs | Need consistent/factual outputs |
| `top_p` | 0.9 | 0.0-1.0 | Token selection | Want more variety | Need focused outputs |
| `stream` | false | true/false | Streaming | Building chat UI | Standard API calls |
| `presence_penalty` | N/A | -2.0-2.0 | Topic diversity | Want new topics | Topics can repeat |
| `frequency_penalty` | N/A | -2.0-2.0 | Word repetition | Avoid word repetition | Repetition acceptable |

---

## 🚀 Testing Your Configuration

After making changes:

1. **Save all files**
2. **Restart the dev server:**
   ```bash
   npm run dev
   ```
3. **Test in the browser:** http://localhost:3000
4. **Check the output** to see if it matches your expectations
5. **Adjust parameters** as needed

---

## 💡 Tips and Best Practices

### ✅ DO

- Start with default values and adjust gradually
- Test changes with various inputs
- Use low temperature (0.0-0.3) for factual tasks
- Use higher temperature (0.8-1.5) for creative tasks
- Keep system prompts clear and concise
- Document your custom configurations

### ❌ DON'T

- Don't use extreme values without testing
- Don't combine high temperature AND high top_p
- Don't make system prompts too long (>500 chars)
- Don't forget to restart the server after changes
- Don't commit `.env.local` to Git

---

## 🐛 Troubleshooting

### Changes Not Taking Effect

**Solution:** Restart the development server

```bash
# Stop: Ctrl+C or Cmd+C
npm run dev
```

### API Key Error

**Solution:** Check `.env.local` exists and has correct format

```env
PERPLEXITY_API_KEY=pplx-your-key-here
```

### Response Too Short/Long

**Solution:** Adjust `max_tokens` in `lib/perplexity.ts`

### Response Too Random/Boring

**Solution:** Adjust `temperature`:
- Too random → Lower temperature (0.3-0.5)
- Too boring → Raise temperature (0.8-1.2)

### Model Not Found

**Solution:** Check spelling of model name. Valid models:
- `sonar`
- `sonar-pro`
- `sonar-reasoning`
- `sonar-reasoning-pro`
- `sonar-deep-research`

---

## 📚 Related Documentation

- **[README.md](README.md)** - Main documentation and overview
- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions
- **[SPEC.md](SPEC.md)** - Complete technical specification
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture details

---

## 📞 Need Help?

1. Check the [Perplexity API Documentation](https://docs.perplexity.ai/)
2. Review the console logs (F12 in browser)
3. Check terminal output for errors
4. Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup help

---

**Happy configuring! 🎉**

