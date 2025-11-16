# 🤖 Perplexity API Demo Application

A comprehensive **Next.js 14** application demonstrating all Perplexity AI API endpoints with a beautiful, modern UI. Perfect for testing, learning, and integrating Perplexity's powerful AI models into your projects.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🎯 What This Project Does

This application provides a **clean, tabbed interface** to test and compare different Perplexity AI models. All models perform text summarization, making it easy to see the differences in their capabilities, speed, and output quality.

### ✨ Key Features

- 🎨 **Beautiful Modern UI** - Responsive design with Tailwind CSS
- 🔄 **6 Perplexity Models** - Test all available AI models side-by-side
- ⚡ **Real-time API Integration** - Direct connection to Perplexity API
- 🛡️ **Secure** - API keys never exposed to client-side
- 📊 **Full Response Display** - View formatted summaries and raw JSON
- 📋 **Copy to Clipboard** - Easy copying of responses
- 🎯 **Error Handling** - Comprehensive error messages and loading states
- 🔧 **Fully Customizable** - Easy to modify prompts, models, and parameters

---

## 📖 Documentation Hub

This project includes comprehensive documentation to help you get started, configure, and customize the application.

### 🚀 Quick Start

| Document | Description | When to Use |
|----------|-------------|-------------|
| **[QUICKSTART.md](QUICKSTART.md)** | Get running in 5 minutes | Start here if you want to run the app immediately |
| **[HOW_TO_RUN_LOCALLY.md](HOW_TO_RUN_LOCALLY.md)** | Local setup guide | Step-by-step installation instructions |

### 🔧 Configuration & Setup

| Document | Description | When to Use |
|----------|-------------|-------------|
| **[API_CONFIGURATION_GUIDE.md](API_CONFIGURATION_GUIDE.md)** | Complete configuration guide | **📌 Essential** - Learn how to modify prompts, parameters, and API settings |
| **[SETUP_GUIDE.md](SETUP_GUIDE.md)** | Detailed setup instructions | Troubleshooting setup issues |
| **[ENV_SETUP.txt](ENV_SETUP.txt)** | Environment variables guide | Setting up API keys |

### 🏗️ Architecture & Structure

| Document | Description | When to Use |
|----------|-------------|-------------|
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | System architecture overview | Understanding how the app is structured |
| **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** | File organization details | Finding specific components and files |
| **[DIRECTORY_TREE.txt](DIRECTORY_TREE.txt)** | Visual directory tree | Quick reference of file locations |
| **[SPEC.md](SPEC.md)** | Complete technical specification | Deep dive into design decisions |

### 📊 Testing & Validation

| Document | Description | When to Use |
|----------|-------------|-------------|
| **[TEST_REPORT.md](TEST_REPORT.md)** | Testing results and coverage | Understanding what's been tested |
| **[TESTING_SUMMARY.txt](TESTING_SUMMARY.txt)** | Quick testing overview | Quick test status reference |

### 📝 Project Management

| Document | Description | When to Use |
|----------|-------------|-------------|
| **[SUMMARY.md](SUMMARY.md)** | Project overview and summary | High-level understanding of the project |
| **[MANIFEST.md](MANIFEST.md)** | Complete project manifest | Comprehensive project documentation |
| **[PROJECT_COMPLETE.txt](PROJECT_COMPLETE.txt)** | Project completion status | Checking what's implemented |

---

## 🚀 Quick Start Guide

Get the application running in just 4 steps:

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Set Up API Key

Create `.env.local` in the project root:

```env
PERPLEXITY_API_KEY=pplx-your-api-key-here
```

> **Get your API key:** [Perplexity AI Settings](https://www.perplexity.ai/settings/api)

### 3️⃣ Start Development Server

```bash
npm run dev
```

### 4️⃣ Open in Browser

Navigate to: **http://localhost:3000**

✅ **You're ready to go!**

> 📖 **Need more details?** See [QUICKSTART.md](QUICKSTART.md) or [HOW_TO_RUN_LOCALLY.md](HOW_TO_RUN_LOCALLY.md)

---

## 🎨 Available Models

This application supports all Perplexity AI models:

| Model | Endpoint | Speed | Capabilities | Best For |
|-------|----------|-------|--------------|----------|
| **Sonar** | `/api/sonar` | ⚡ Fastest | Web search, quick responses | Simple queries, fast answers |
| **Sonar Pro** | `/api/sonar-pro` | 🚀 Fast | Enhanced reasoning, web search | Complex queries, better accuracy |
| **Sonar Reasoning** | `/api/sonar-reasoning` | 🧠 Moderate | Advanced multi-step reasoning | Analysis, problem-solving |
| **Sonar Reasoning Pro** | `/api/sonar-reasoning-pro` | 🎯 Slower | Expert-level reasoning | Complex problems, best accuracy |
| **Sonar Deep Research** | `/api/sonar-deep-research` | 🔬 Slowest | In-depth research with citations | Research, comprehensive analysis |
| **Search** | `/api/search` | ⚡ Fast | Search-optimized responses | Web-based queries |

---

## 🔧 Customization Guide

### 🎯 Modify System Prompts

**Location:** `lib/perplexity.ts` (lines 78-80)

Change how the AI behaves:

```typescript
{
    role: 'system',
    content: 'You are a helpful assistant that provides concise summaries.'
    //       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //       Change this to modify AI behavior
}
```

### 💬 Modify User Prompts

**Location:** `lib/perplexity.ts` (lines 82-84)

Change the task instruction:

```typescript
{
    role: 'user',
    content: `Summarize the following text in 1–2 sentences:\n\n${userInput}`
    //        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //        Change this to modify the task
}
```

### ⚙️ Modify API Parameters

**Location:** `lib/perplexity.ts` (lines 86-89)

Adjust AI behavior:

```typescript
max_tokens: 150,      // Change response length (1-4096)
temperature: 0.7,     // Change creativity (0.0-2.0)
top_p: 0.9,          // Change token selection (0.0-1.0)
stream: false        // Enable/disable streaming
```

#### Parameter Guide

| Parameter | Default | Range | Effect | Increase For | Decrease For |
|-----------|---------|-------|--------|--------------|--------------|
| `max_tokens` | 150 | 1-4096 | Response length | Longer responses | Shorter responses |
| `temperature` | 0.7 | 0.0-2.0 | Creativity | More creative | More factual |
| `top_p` | 0.9 | 0.0-1.0 | Word variety | More variety | More focused |

> 📖 **Complete guide:** [API_CONFIGURATION_GUIDE.md](API_CONFIGURATION_GUIDE.md)

---

## 📁 Project Structure

```
pplx_api/
├── 📁 app/
│   ├── 📁 api/                    # API routes (server-side)
│   │   ├── sonar/
│   │   ├── sonar-pro/
│   │   ├── sonar-reasoning/
│   │   ├── sonar-reasoning-pro/
│   │   ├── sonar-deep-research/
│   │   └── search/
│   ├── 📁 components/             # React components
│   │   ├── Tabs.tsx              # Tab navigation
│   │   ├── TextInput.tsx         # Input form
│   │   └── ResponseDisplay.tsx   # Response viewer
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles
│
├── 📁 lib/
│   └── perplexity.ts             # ⭐ API helper (modify here!)
│
├── 📁 Documentation/
│   ├── README.md                 # This file
│   ├── API_CONFIGURATION_GUIDE.md # ⭐ Configuration guide
│   ├── QUICKSTART.md             # Quick start
│   ├── SETUP_GUIDE.md            # Setup guide
│   ├── ARCHITECTURE.md           # Architecture
│   ├── SPEC.md                   # Specification
│   └── ... (more docs)
│
├── .env.local                    # ⚙️ API keys (create this!)
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
└── tailwind.config.ts            # Tailwind config
```

> 📖 **Detailed structure:** [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

## 🔑 API Setup

### Getting Your API Key

1. Visit [Perplexity AI Settings](https://www.perplexity.ai/settings/api)
2. Sign in to your account
3. Navigate to the **API** section
4. Click **Generate New API Key**
5. Copy the key (format: `pplx-xxxxxxxxxxxx`)

### Setting Up Environment Variables

Create `.env.local` in the project root:

```env
PERPLEXITY_API_KEY=pplx-your-actual-api-key-here
```

**⚠️ Important:**
- ✅ Replace with your real API key
- ✅ No quotes needed
- ✅ Restart server after creating this file
- ❌ Never commit `.env.local` to Git
- ❌ Never share your API key

> 📖 **Detailed setup:** [API_CONFIGURATION_GUIDE.md](API_CONFIGURATION_GUIDE.md#-setting-up-api-keys)

---

## 🎮 Using the Application

### Web Interface

1. **Select a model tab** - Choose from 6 available models
2. **Enter text** - Type or paste text to summarize
3. **Click "Summarize"** - Submit your request
4. **View results** - See the AI-generated summary
5. **Show JSON** (optional) - View the full API response

### API Endpoints

All endpoints accept POST requests with JSON:

#### Request Format

```bash
POST http://localhost:3000/api/[model-name]
Content-Type: application/json

{
  "text": "Your text to summarize here..."
}
```

#### Response Format

```json
{
  "id": "chatcmpl-xyz123",
  "model": "sonar",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Summary goes here."
      }
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 30,
    "total_tokens": 55
  }
}
```

#### Example with cURL

```bash
curl -X POST http://localhost:3000/api/sonar \
  -H "Content-Type: application/json" \
  -d '{"text":"Artificial intelligence is transforming healthcare..."}'
```

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x | React framework with App Router |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **React** | 18.x | UI library |
| **Tailwind CSS** | 3.x | Utility-first CSS framework |
| **Perplexity API** | Latest | AI model integration |

### Key Files to Modify

| File | Purpose | Modify To |
|------|---------|-----------|
| `lib/perplexity.ts` | API configuration | Change prompts, parameters, models |
| `app/components/Tabs.tsx` | Tab navigation | Add/remove model tabs |
| `app/components/TextInput.tsx` | Input form | Customize input UI |
| `app/components/ResponseDisplay.tsx` | Response display | Customize output UI |
| `app/globals.css` | Global styles | Change colors, fonts |
| `tailwind.config.ts` | Tailwind config | Customize theme |

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variable:**
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Add: `PERPLEXITY_API_KEY` = `your-api-key`

4. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the .next folder
```

**Railway:**
- Connect GitHub repository
- Add `PERPLEXITY_API_KEY` environment variable
- Deploy automatically

**Render:**
- Create Web Service from repository
- Add `PERPLEXITY_API_KEY` environment variable
- Deploy

> **⚠️ Important:** Always set `PERPLEXITY_API_KEY` in your deployment platform's environment variables!

---

## 🐛 Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| ❌ "API key not configured" | Create `.env.local` with your API key, restart server |
| ❌ "Authentication failed" | Check API key is correct in `.env.local` |
| ❌ "Rate limit exceeded" | Wait a few minutes before trying again |
| ❌ Port 3000 in use | Run `npm run dev -- -p 3001` to use port 3001 |
| ❌ TypeScript errors | Run `rm -rf node_modules && npm install` |
| ❌ Changes not taking effect | Restart the development server |

### Getting Help

1. **Check browser console** (F12) for client-side errors
2. **Check terminal** for server-side errors
3. **Review documentation:**
   - [SETUP_GUIDE.md](SETUP_GUIDE.md) - Setup issues
   - [API_CONFIGURATION_GUIDE.md](API_CONFIGURATION_GUIDE.md) - Configuration issues
   - [QUICKSTART.md](QUICKSTART.md) - Quick fixes
4. **Check logs:** Look for error messages in the terminal
5. **Verify API key:** Make sure it starts with `pplx-`

---

## 📚 Learning Resources

### Official Documentation

- **[Perplexity API Docs](https://docs.perplexity.ai/)** - Official API documentation
- **[Next.js Documentation](https://nextjs.org/docs)** - Next.js guides and references
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript documentation
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)** - Tailwind utility classes

### Project Documentation

- **[API_CONFIGURATION_GUIDE.md](API_CONFIGURATION_GUIDE.md)** - 📌 **Start here for configuration**
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Understand the system design
- **[SPEC.md](SPEC.md)** - Detailed technical specifications

---

## 🔒 Security Best Practices

This application follows security best practices:

- ✅ **API keys in environment variables** - Never in code
- ✅ **Server-side API calls** - Keys never exposed to client
- ✅ **Input validation** - All user inputs are validated
- ✅ **Error handling** - Errors don't expose sensitive info
- ✅ **No credential logging** - API keys never logged
- ✅ **HTTPS recommended** - For production deployments

### Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] Never commit API keys to version control
- [ ] Use environment variables in production
- [ ] Enable HTTPS for production deployments
- [ ] Regularly rotate API keys
- [ ] Monitor API usage and costs

---

## 🎯 Use Cases

This project is perfect for:

- ✅ **Learning** - Understanding Perplexity API integration
- ✅ **Testing** - Comparing different AI models
- ✅ **Prototyping** - Building AI-powered applications
- ✅ **Research** - Experimenting with AI parameters
- ✅ **Integration** - Reference for API implementation
- ✅ **Education** - Teaching AI API integration

---

## 🤝 Contributing

This is a demonstration project. Feel free to:

- Fork the repository
- Customize for your needs
- Share your improvements
- Report issues or suggestions

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**MIT License Summary:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ No liability
- ❌ No warranty

---

## 🙏 Acknowledgments

Built with amazing technologies:

- **[Next.js](https://nextjs.org/)** - The React Framework for Production
- **[Perplexity AI](https://www.perplexity.ai/)** - Advanced AI Models
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-First CSS Framework
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript with Types
- **[React](https://react.dev/)** - The Library for Web Interfaces

---

## 📞 Support & Contact

### Need Help?

1. **Check Documentation** - Review the guides in this repository
2. **Read FAQs** - See troubleshooting section above
3. **GitHub Issues** - Report bugs or request features
4. **Perplexity Support** - For API-related questions

### Useful Links

| Resource | Link |
|----------|------|
| **Perplexity Dashboard** | https://www.perplexity.ai/settings/api |
| **API Documentation** | https://docs.perplexity.ai/ |
| **Next.js Docs** | https://nextjs.org/docs |
| **GitHub Repository** | [sabilashang/pplx_api](https://github.com/sabilashang/pplx_api) |

---

## 🗺️ Documentation Roadmap

Quick navigation to all documentation:

### Getting Started
1. [QUICKSTART.md](QUICKSTART.md) - Quick 5-minute setup
2. [HOW_TO_RUN_LOCALLY.md](HOW_TO_RUN_LOCALLY.md) - Detailed local setup

### Configuration
3. [API_CONFIGURATION_GUIDE.md](API_CONFIGURATION_GUIDE.md) - ⭐ **Complete configuration guide**
4. [ENV_SETUP.txt](ENV_SETUP.txt) - Environment setup
5. [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup instructions

### Architecture
6. [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
7. [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - File structure
8. [SPEC.md](SPEC.md) - Technical specification
9. [DIRECTORY_TREE.txt](DIRECTORY_TREE.txt) - Visual tree

### Project Info
10. [SUMMARY.md](SUMMARY.md) - Project summary
11. [MANIFEST.md](MANIFEST.md) - Complete manifest
12. [TEST_REPORT.md](TEST_REPORT.md) - Testing results

---

## ⭐ Quick Links

| I Want To... | Go To |
|--------------|-------|
| **Get started quickly** | [QUICKSTART.md](QUICKSTART.md) |
| **Modify API prompts** | [API_CONFIGURATION_GUIDE.md](API_CONFIGURATION_GUIDE.md#-modifying-system-prompts) |
| **Change AI parameters** | [API_CONFIGURATION_GUIDE.md](API_CONFIGURATION_GUIDE.md#️-configuring-api-parameters) |
| **Setup API keys** | [API_CONFIGURATION_GUIDE.md](API_CONFIGURATION_GUIDE.md#-setting-up-api-keys) |
| **Understand architecture** | [ARCHITECTURE.md](ARCHITECTURE.md) |
| **Find a specific file** | [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) |
| **Fix setup issues** | [SETUP_GUIDE.md](SETUP_GUIDE.md) |
| **See all endpoints** | [SPEC.md](SPEC.md) |

---

<div align="center">

**🚀 Ready to get started?**

[Quick Start](QUICKSTART.md) • [Configuration Guide](API_CONFIGURATION_GUIDE.md) • [Full Documentation](SPEC.md)

**Made with ❤️ using Next.js and Perplexity AI**

⭐ **Star this repo if you find it helpful!**

</div>

---

## 📊 Project Stats

- **Lines of Code:** ~2,000+
- **Components:** 3 React components
- **API Endpoints:** 6 routes
- **Documentation Files:** 15+ guides
- **Models Supported:** 6 Perplexity models
- **Setup Time:** 5 minutes
- **License:** MIT

---

**Last Updated:** November 2025

**Version:** 1.0.0

**Status:** ✅ Production Ready
