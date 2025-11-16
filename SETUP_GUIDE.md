# Setup Guide

This guide will walk you through setting up the Perplexity API Demo app from scratch.

## Prerequisites Checklist

Before starting, make sure you have:

- [ ] **Node.js 18.x or higher** installed
- [ ] **npm** or **yarn** package manager
- [ ] **Perplexity API key** (get one from [Perplexity Settings](https://www.perplexity.ai/settings/api))
- [ ] **Code editor** (VS Code recommended)
- [ ] **Terminal/Command Prompt** access

---

## Step 1: Verify Node.js Installation

Open your terminal and run:

```bash
node --version
```

You should see something like:
```
v18.17.0
```

If you see an error or version < 18, download Node.js from [nodejs.org](https://nodejs.org/).

---

## Step 2: Navigate to Project Directory

```bash
cd C:\Users\sabil\OneDrive\Documents\Code\pplx_api
```

Or on macOS/Linux:
```bash
cd /path/to/pplx_api
```

---

## Step 3: Install Dependencies

### Using npm:

```bash
npm install
```

### Using yarn:

```bash
yarn install
```

**What's happening?**
- Installing Next.js, React, TypeScript
- Installing Tailwind CSS
- Installing type definitions
- Setting up development tools

**Expected output:**
```
added 250 packages in 45s
```

---

## Step 4: Get Your Perplexity API Key

1. **Sign up / Log in** to Perplexity:
   - Go to [https://www.perplexity.ai/](https://www.perplexity.ai/)
   - Create an account or log in

2. **Navigate to API settings**:
   - Go to [https://www.perplexity.ai/settings/api](https://www.perplexity.ai/settings/api)
   - Or: Click profile → Settings → API

3. **Generate API key**:
   - Click "Generate New API Key"
   - Copy the key (it starts with `pplx-`)
   - **Important**: Save it securely - you won't see it again!

4. **Note your plan limits**:
   - Check your rate limits
   - Check your token allowance
   - Free tier: Limited requests per day
   - Paid tier: Higher limits

---

## Step 5: Configure Environment Variables

### Option A: Create .env.local file (Recommended)

**On Windows:**
```bash
copy .env.example .env.local
```

**On macOS/Linux:**
```bash
cp .env.example .env.local
```

### Option B: Create manually

Create a new file named `.env.local` in the project root.

### Edit .env.local

Open `.env.local` and add your API key:

```env
PERPLEXITY_API_KEY=pplx-your-actual-api-key-here
```

**Replace** `pplx-your-actual-api-key-here` with your real API key.

**Example:**
```env
PERPLEXITY_API_KEY=pplx-a1b2c3d4e5f6g7h8i9j0
```

**Important Security Notes:**
- ✅ `.env.local` is gitignored (not tracked by git)
- ❌ Never commit this file to version control
- ❌ Never share this file publicly
- ❌ Never paste your key in chat or forums

---

## Step 6: Verify Configuration

Check that your `.env.local` file is correctly formatted:

```bash
# Windows
type .env.local

# macOS/Linux
cat .env.local
```

You should see:
```env
PERPLEXITY_API_KEY=pplx-...your-key...
```

---

## Step 7: Start Development Server

Run the development server:

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

**Expected output:**
```
   ▲ Next.js 14.2.0
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 2.5s
```

---

## Step 8: Open the App

1. **Open your browser**
2. **Navigate to**: [http://localhost:3000](http://localhost:3000)
3. **You should see**: The Perplexity API Demo app with three tabs

---

## Step 9: Test the App

### Test 1: Basic Functionality

1. **Select the "Sonar" tab** (should be active by default)
2. **Enter test text**:
   ```
   Artificial intelligence is revolutionizing industries worldwide. Machine learning algorithms can now process vast amounts of data to identify patterns and make predictions with remarkable accuracy.
   ```
3. **Click "Summarize"**
4. **Expected result**: You should see a 1-2 sentence summary appear below

### Test 2: Different Models

1. **Click "Sonar Pro" tab**
2. **Use the same text** from Test 1
3. **Click "Summarize"**
4. **Compare**: Notice any differences in the summary?

### Test 3: Error Handling

1. **Try submitting empty text** → Should show error
2. **Try very long text** (>2000 chars) → Should show warning

---

## Step 10: Explore the Response

After a successful request:

1. **View the summary** (highlighted in blue box)
2. **Click "Full JSON Response"** to expand
3. **Check token usage** (shown below summary)
4. **Try "Copy" button** to copy JSON to clipboard

---

## Troubleshooting

### Problem: "Cannot find module 'next'"

**Solution**: Dependencies not installed
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: "API key not configured"

**Solution**: Check your `.env.local` file
1. Make sure file is named `.env.local` (not `.env.txt`)
2. Make sure it's in the project root directory
3. Make sure the key starts with `pplx-`
4. Restart the dev server (`Ctrl+C` then `npm run dev`)

### Problem: "Authentication failed"

**Solution**: Invalid API key
1. Go back to Perplexity settings
2. Generate a new API key
3. Update `.env.local` with new key
4. Restart dev server

### Problem: "Rate limit exceeded"

**Solution**: You've hit the API limit
1. Wait 1-5 minutes
2. Try again
3. Consider upgrading your Perplexity plan

### Problem: Port 3000 already in use

**Solution**: Change port
```bash
npm run dev -- -p 3001
```
Then open [http://localhost:3001](http://localhost:3001)

### Problem: "Network error"

**Solution**: Check your internet connection
1. Verify you're online
2. Check firewall settings
3. Try accessing [https://api.perplexity.ai](https://api.perplexity.ai) directly

### Problem: TypeScript errors

**Solution**: Restart TypeScript server
- In VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
- Or restart your editor

### Problem: Tailwind styles not loading

**Solution**: Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

---

## Development Workflow

### Daily Workflow

1. **Start server**: `npm run dev`
2. **Make changes** to files
3. **Browser auto-refreshes** with changes
4. **Stop server**: `Ctrl+C` in terminal

### Making Changes

#### To modify UI:
- Edit `app/components/*.tsx`
- Edit `app/page.tsx`
- Edit `app/globals.css`

#### To modify API logic:
- Edit `app/api/*/route.ts`
- Edit `lib/perplexity.ts`

#### To add new model:
1. Create `app/api/[model-name]/route.ts`
2. Update `app/components/Tabs.tsx`
3. Restart server

### Viewing Logs

**Client-side logs**: Open browser DevTools (F12) → Console

**Server-side logs**: Check the terminal where you ran `npm run dev`

---

## Building for Production

### Build the app:

```bash
npm run build
```

This creates an optimized production build in `.next/` directory.

### Test production build locally:

```bash
npm run build
npm start
```

Then open [http://localhost:3000](http://localhost:3000)

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set environment variables**:
   - Go to [vercel.com](https://vercel.com)
   - Select your project
   - Settings → Environment Variables
   - Add `PERPLEXITY_API_KEY` with your key
   - Redeploy

### Deploy to Netlify

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Build**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

4. **Set environment variables**:
   - Site settings → Environment variables
   - Add `PERPLEXITY_API_KEY`

### Important: Environment Variables

**Always set** `PERPLEXITY_API_KEY` in your deployment platform's environment settings!

---

## Verification Checklist

After setup, verify everything works:

- [ ] Development server starts without errors
- [ ] App opens at localhost:3000
- [ ] All three tabs are visible
- [ ] Can enter text and submit
- [ ] Receives response from Sonar model
- [ ] Can switch to Sonar Pro and get response
- [ ] Can switch to Sonar Reasoning and get response
- [ ] Error handling works (try empty input)
- [ ] JSON response display works
- [ ] Copy button works
- [ ] No console errors in browser DevTools

---

## Next Steps

### Learning Resources

1. **Explore the code**:
   - Read `SPEC.md` for full specification
   - Read `ARCHITECTURE.md` for architecture details
   - Read `PROJECT_STRUCTURE.md` for file organization

2. **Learn Next.js**:
   - [Next.js Documentation](https://nextjs.org/docs)
   - [Next.js Tutorial](https://nextjs.org/learn)

3. **Learn Perplexity API**:
   - [Perplexity API Docs](https://docs.perplexity.ai/)

### Customization Ideas

1. **Change the task**: Edit `lib/perplexity.ts` to change from "summarize" to something else
2. **Add more models**: Add new tabs and API routes
3. **Customize styling**: Edit `tailwind.config.ts` and component styles
4. **Add features**: Implement streaming, history, comparison mode

---

## Getting Help

### Resources

1. **Project Documentation**:
   - `README.md` - General overview
   - `SPEC.md` - Full specification
   - `ARCHITECTURE.md` - Technical details
   - This file - Setup guide

2. **External Documentation**:
   - [Next.js Docs](https://nextjs.org/docs)
   - [Perplexity API Docs](https://docs.perplexity.ai/)
   - [Tailwind CSS Docs](https://tailwindcss.com/docs)

3. **Community**:
   - Next.js Discord
   - Stack Overflow
   - GitHub Issues

---

## Success!

You should now have a fully functional Perplexity API Demo app running locally! 🎉

Try experimenting with different text inputs and comparing results across the three models.

Happy coding! 🚀

