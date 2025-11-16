# ⚡ Quick Start Guide

Get the Perplexity API Demo running in 5 minutes.

## 📋 Prerequisites

- Node.js 18+ installed
- Perplexity API key ([get one here](https://www.perplexity.ai/settings/api))

## 🚀 4 Steps to Run

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Create Environment File

Create a file named `.env.local` in the project root:

```env
PERPLEXITY_API_KEY=pplx-your-actual-api-key-here
```

**Replace** `pplx-your-actual-api-key-here` with your real API key.

### 3️⃣ Start Development Server

```bash
npm run dev
```

### 4️⃣ Open in Browser

Navigate to: **http://localhost:3000**

---

## ✅ You're Done!

You should see a web app with three tabs:
- **Sonar** - Fast model
- **Sonar Pro** - Enhanced model  
- **Sonar Reasoning** - Advanced model

## 🎯 Quick Test

1. **Enter text** in the textarea (try: "Artificial intelligence is transforming healthcare...")
2. **Click "Summarize"**
3. **See the result** - a 1-2 sentence summary

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| ❌ "API key not configured" | Check `.env.local` exists and has your key |
| ❌ "Authentication failed" | Verify API key is correct |
| ❌ "Port 3000 already in use" | Run: `npm run dev -- -p 3001` |
| ❌ Dependencies error | Run: `rm -rf node_modules && npm install` |

---

## 📚 Next Steps

**Want to learn more?**

- Read [`README.md`](README.md) for full documentation
- See [`SETUP_GUIDE.md`](SETUP_GUIDE.md) for detailed setup
- Check [`SPEC.md`](SPEC.md) for complete specification

**Want to customize?**

- Edit `app/components/` for UI changes
- Edit `lib/perplexity.ts` to change the task
- Edit `tailwind.config.ts` for styling

---

## 🎨 What You Built

A Next.js 14 app that:
- ✅ Connects to Perplexity API
- ✅ Uses 3 different AI models
- ✅ Summarizes text in 1-2 sentences
- ✅ Shows beautiful JSON responses
- ✅ Handles errors gracefully

---

## 📞 Need Help?

1. Check the browser console (F12)
2. Check the terminal for errors
3. Review [`SETUP_GUIDE.md`](SETUP_GUIDE.md)
4. Read [`SUMMARY.md`](SUMMARY.md)

---

**That's it! Happy coding! 🚀**

---

## 📖 Full Documentation

This project includes 8 comprehensive documentation files:

1. **README.md** - Main documentation
2. **SPEC.md** - Complete specification
3. **ARCHITECTURE.md** - System architecture
4. **PROJECT_STRUCTURE.md** - File organization
5. **SETUP_GUIDE.md** - Detailed setup
6. **SUMMARY.md** - Project overview
7. **QUICKSTART.md** - This file
8. **DIRECTORY_TREE.txt** - Visual file tree

Choose the level of detail you need!

