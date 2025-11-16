# 🚀 How to Run Locally - Complete Guide

This guide will walk you through running the Perplexity API Demo on your local system and testing all endpoints yourself.

---

## ⏱️ NEW FEATURE: Timer Display

✅ **ADDED**: The UI now displays how long each request takes!

When you submit text for summarization, you'll see:
- ⏱️ **Duration display** showing response time in seconds/milliseconds
- 🕐 **Clock icon** next to the duration
- ✅ Shows timing even for failed requests

**Display format**:
- Less than 1 second: `850ms`
- More than 1 second: `3.42s`

---

## 📋 Prerequisites

Before you begin, make sure you have:

1. ✅ **Node.js 18 or higher** installed
   - Check: `node --version` (should be 18.x or higher)
   - Download: https://nodejs.org/

2. ✅ **Perplexity API Key**
   - Get one from: https://www.perplexity.ai/settings/api
   - You'll need to create an account if you don't have one

3. ✅ **Command Line / Terminal** access
   - Windows: PowerShell or Command Prompt
   - Mac/Linux: Terminal

---

## 🎯 Step-by-Step Instructions

### Step 1: Navigate to Project Directory

Open your terminal/command prompt and navigate to the project:

**Windows (PowerShell/CMD):**
```powershell
cd C:\Users\sabil\OneDrive\Documents\Code\pplx_api
```

**Mac/Linux:**
```bash
cd /path/to/pplx_api
```

---

### Step 2: Install Dependencies

Run this command to install all required packages:

```bash
npm install
```

**Expected output:**
```
added 144 packages, and audited 145 packages in 1m
✓ No vulnerabilities found
```

**⏱️ Duration**: ~1-2 minutes (first time only)

---

### Step 3: Configure Environment Variables

You need to set up your Perplexity API key.

#### Option A: Create .env.local file

**Windows:**
```powershell
copy .env.example .env.local
notepad .env.local
```

**Mac/Linux:**
```bash
cp .env.example .env.local
nano .env.local
```

Then add your API key:
```env
PERPLEXITY_API_KEY=pplx-your-actual-api-key-here
```

#### Option B: Create file manually

1. Create a new file named `.env.local` in the project root
2. Add this line:
   ```env
   PERPLEXITY_API_KEY=pplx-your-actual-api-key-here
   ```
3. Replace `pplx-your-actual-api-key-here` with your real API key
4. Save the file

**Important**: The API key must start with `pplx-`

---

### Step 4: Start the Development Server

Run this command to start the server:

```bash
npm run dev
```

**Expected output:**
```
> perplexity-api-demo@1.0.0 dev
> next dev

  ▲ Next.js 14.2.33
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 7.7s
```

**⏱️ Server startup time**: ~8-10 seconds

**✅ Server is running when you see**: `✓ Ready in X.Xs`

---

### Step 5: Open the Application

Open your web browser and go to:

```
http://localhost:3000
```

**What you should see:**
- 🎨 A clean, modern UI with "Perplexity API Demo" header
- 📑 Six tabs at the top:
  1. Sonar
  2. Sonar Pro
  3. Sonar Reasoning
  4. Sonar Reasoning Pro
  5. Deep Research
  6. Search API
- ✍️ A text area to enter your input
- 🔵 A "Summarize" button

---

## 🧪 Testing Each Endpoint

### Test Input Examples

Here are some good test inputs to try:

#### Example 1: AI in Healthcare (recommended)
```
Artificial intelligence is revolutionizing healthcare by enabling early disease 
detection through advanced pattern recognition in medical imaging. Machine 
learning algorithms can now analyze vast datasets to identify subtle anomalies 
that might escape human observation, potentially saving countless lives through 
earlier intervention.
```

#### Example 2: Climate Change
```
Climate change represents one of the most pressing challenges of the 21st 
century, with rising global temperatures causing widespread environmental 
disruption. Scientists agree that immediate action is necessary to reduce 
greenhouse gas emissions and transition to renewable energy sources to prevent 
catastrophic consequences for future generations.
```

#### Example 3: Quantum Computing
```
Quantum computing harnesses the principles of quantum mechanics to process 
information in ways that classical computers cannot. By using quantum bits 
or qubits that can exist in multiple states simultaneously, quantum computers 
have the potential to solve complex problems exponentially faster than 
traditional computers, revolutionizing fields like cryptography and drug discovery.
```

---

### Testing Process

#### For Each Tab (Sonar, Sonar Pro, etc.):

1. **Click the tab** you want to test
2. **Paste or type** your test input in the text area
3. **Click "Summarize"** button
4. **Watch for**:
   - ⏳ Loading spinner appears
   - ⏱️ Timer running in background
5. **Wait for response** (times vary by model):
   - Search API: ~2 seconds ⚡
   - Reasoning models: ~3-5 seconds ⚡
   - Search-based models: ~15-20 seconds 🔍

#### What You'll See:

**✅ Successful Response:**
```
┌─────────────────────────────────────────────┐
│ ✅ Summary                                  │
│ [AI-generated 1-2 sentence summary]         │
│                                             │
│ Model: sonar                                │
│ Tokens: 152 (83 prompt + 69 completion)    │
│ 🕐 Duration: 3.42s                         │
└─────────────────────────────────────────────┘
```

**❌ Error Response:**
```
┌─────────────────────────────────────────────┐
│ ❌ Error                                    │
│ [Error message]                             │
│ Failed after: 1.23s                         │
└─────────────────────────────────────────────┘
```

---

## ⏱️ Expected Response Times

Based on live testing, here are typical response times:

| Endpoint | Expected Duration | Type |
|----------|-------------------|------|
| 🚀 **Search API** | **2.0s** | Fastest - raw search |
| ⚡ **Sonar Reasoning** | **3.4s** | Fast - no web search |
| ⚡ **Deep Research** | **4.6s** | Fast - comprehensive |
| ⚡ **Reasoning Pro** | **4.8s** | Fast - enhanced |
| 🔍 **Sonar Pro** | **16.8s** | Slower - web search |
| 🔍 **Sonar** | **19.1s** | Slower - web search |

**Why the difference?**
- **Fast models** (2-5s): Don't perform web searches
- **Slower models** (15-20s): Retrieve and process web search results

---

## 🎯 Understanding the Timer Feature

### Where the Timer Shows:

1. **In the Summary Box** (bottom right of model info):
   ```
   Model: sonar  •  Tokens: 152  •  🕐 Duration: 3.42s
   ```

2. **In Error Messages** (if request fails):
   ```
   Failed after: 1.23s
   ```

### Timer Accuracy:

- ✅ Measures total round-trip time (client → server → Perplexity API → back)
- ✅ Includes network latency
- ✅ Includes API processing time
- ✅ Accurate to milliseconds

### What Affects Duration:

- 🌐 **Internet speed**: Slower connection = longer time
- 🤖 **Model complexity**: More processing = longer time
- 🔍 **Web searches**: Models that search web take longer
- 📊 **Input length**: More text = more tokens = longer time
- 🚦 **API load**: Higher traffic = potential delays

---

## 🔍 Comparing Models

### Quick Comparison Test:

1. **Copy this text:**
   ```
   Artificial intelligence is revolutionizing healthcare through early disease detection.
   ```

2. **Test on Sonar** (click Sonar tab → paste → Summarize)
   - ⏱️ Note the duration
   - 📝 Note the summary style

3. **Test on Sonar Pro** (click Sonar Pro tab → paste → Summarize)
   - ⏱️ Compare duration
   - 📝 Compare summary quality

4. **Test on Sonar Reasoning** (click Sonar Reasoning tab → paste → Summarize)
   - ⏱️ See much faster response
   - 📝 See reasoning process in `<think>` tags

5. **Continue with other tabs** to compare all models

### What to Look For:

- **Speed differences**: Reasoning models are much faster
- **Response quality**: Sonar Pro often more refined
- **Reasoning visibility**: Reasoning models show their thinking
- **Token usage**: Varies by model

---

## 🐛 Troubleshooting

### Problem: Server won't start

**Error**: `EADDRINUSE: address already in use`

**Solution**: Port 3000 is already in use
```bash
# Kill the process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# OR use a different port:
npm run dev -- -p 3001
# Then open http://localhost:3001
```

---

### Problem: "API key not configured"

**Solution**: Check your .env.local file
1. Make sure file exists in project root
2. Make sure it's named `.env.local` (not `.env.local.txt`)
3. Make sure API key starts with `pplx-`
4. Restart the dev server (Ctrl+C then `npm run dev`)

---

### Problem: "Authentication failed"

**Solution**: Invalid API key
1. Go to https://www.perplexity.ai/settings/api
2. Generate a new API key
3. Update `.env.local` with new key
4. Restart server

---

### Problem: Very slow responses (>30 seconds)

**Possible causes**:
- Slow internet connection
- High API load
- Very long input text

**Solutions**:
- Check your internet speed
- Try with shorter text
- Wait a moment and try again
- Use faster models (Reasoning, Search API)

---

### Problem: "Rate limit exceeded"

**Solution**: You've made too many requests
- Wait 1-5 minutes
- Try again
- Consider upgrading your Perplexity plan

---

### Problem: Timer shows but no response

**Solution**: Request is still processing
- Search-based models can take 15-20 seconds
- Wait for the response
- If it takes > 30 seconds, there may be an issue

---

## 💡 Tips for Best Experience

### 1. Start with Fast Models
Begin testing with:
- ✅ Search API (2s)
- ✅ Sonar Reasoning (3-5s)

These give quick feedback and let you verify everything works.

### 2. Test Different Text Lengths
Try:
- Short text (1 sentence)
- Medium text (2-3 sentences)  ← **Recommended**
- Long text (4-5 sentences)

### 3. Compare Response Times
Keep track of durations to see patterns:
- Morning vs evening
- Weekday vs weekend
- Different models

### 4. Watch Token Usage
Higher tokens = higher cost. The UI shows:
- Prompt tokens (your input)
- Completion tokens (AI response)
- Total tokens

### 5. Use the Copy Button
After getting a good response:
- Click "Full JSON Response"
- Click "Copy" button
- Save interesting responses for comparison

---

## 🎨 UI Features

### Main Features:

1. **Tab Navigation**: Switch between 6 different models
2. **Text Input**: 
   - Character counter (shows current / 2000 max)
   - Validates empty input
   - Clear button to reset
3. **Loading State**: Animated spinner while processing
4. **Response Display**:
   - ✅ Success box (blue) with summary
   - ❌ Error box (red) with error details
   - ⏱️ Duration display
   - 📊 Token usage
   - 🔄 Model information
5. **JSON Viewer**:
   - Expandable full response
   - Copy to clipboard
   - Syntax highlighting

### Keyboard Shortcuts:

- **Ctrl + Enter** (Windows) / **Cmd + Enter** (Mac): Submit form
- **Tab**: Navigate between elements

---

## 📊 Monitoring Server Logs

While the app is running, watch your terminal for logs:

```
POST /api/sonar 200 in 15822ms           ← Request to Sonar took 15.8s
POST /api/sonar-pro 200 in 16742ms      ← Request to Sonar Pro took 16.7s
POST /api/sonar-reasoning 200 in 3396ms ← Request to Reasoning took 3.4s
```

This shows:
- Which endpoint was called
- HTTP status (200 = success)
- Server-side duration

**Note**: Server logs show slightly different times than UI timer because:
- Server logs: Only API processing time
- UI timer: Total round-trip time (includes network)

---

## 🛑 Stopping the Server

To stop the development server:

**Windows/Mac/Linux:**
- Press **Ctrl + C** in the terminal
- Type **Y** if prompted to confirm

**Clean shutdown:**
```
^C
Terminate batch job (Y/N)? Y
```

---

## 🚀 Next Steps After Testing

Once you've tested locally and everything works:

### 1. Document Your Findings
- Which models work best for your use case?
- What are typical response times?
- Which model provides best quality summaries?

### 2. Deploy to Production
See `README.md` for deployment instructions to:
- Vercel (recommended)
- Netlify
- Railway
- Render

### 3. Customize the App
- Change the task (modify `lib/perplexity.ts`)
- Add new features (history, comparison mode)
- Adjust styling (edit Tailwind classes)

### 4. Monitor Usage
- Track API costs
- Monitor response times
- Collect user feedback

---

## ✅ Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│          QUICK REFERENCE                        │
├─────────────────────────────────────────────────┤
│ Install:    npm install                         │
│ Setup:      Create .env.local with API key      │
│ Run:        npm run dev                         │
│ Open:       http://localhost:3000               │
│ Stop:       Ctrl+C                              │
├─────────────────────────────────────────────────┤
│ Fast models:    2-5 seconds                     │
│ Search models:  15-20 seconds                   │
├─────────────────────────────────────────────────┤
│ Timer shown:    In summary box & errors         │
│ Format:         "3.42s" or "850ms"              │
└─────────────────────────────────────────────────┘
```

---

## 🎉 You're All Set!

Now you can:
- ✅ Run the application locally
- ✅ Test all 6 endpoints
- ✅ See response times for each model
- ✅ Compare different models
- ✅ Understand performance characteristics

**Happy Testing! 🚀**

For more details, see:
- `README.md` - General documentation
- `TEST_REPORT.md` - Detailed test results
- `SPEC.md` - Technical specifications

