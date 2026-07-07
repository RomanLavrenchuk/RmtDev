# RmtDev — Remote Job Search Platform

A job search platform for remote developer positions. Browse, search and bookmark remote jobs fetched in real-time from an external API.

## 🚀 Live Demo

> Coming soon / [View on Vercel](#)

---

## ✨ Features

- 🔍 **Search** remote developer jobs by keyword
- 📋 **Job listings** with detailed descriptions
- 🔖 **Bookmark** jobs to save for later
- 📄 **Pagination** for browsing large result sets
- ⚡ **Real-time data** fetched from external Jobs API
- 🔔 **Toast notifications** for user feedback
- 📱 **Responsive** design for all screen sizes

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 18, TypeScript |
| State Management | React Query (@tanstack/react-query) |
| Icons | Radix UI Icons |
| Notifications | react-hot-toast |
| Bundler | Vite |
| Styling | CSS |

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/RomanLavrenchuk/rmtdev.git

# Navigate to project folder
cd rmtdev

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
rmtdev/
├── src/
│   ├── components/     # UI components
│   ├── contexts/       # React Context providers
│   ├── lib/            # API calls and utilities
│   ├── index.css       # Global styles
│   ├── main.tsx        # App entry point
│   └── vite-env.d.ts   # Vite type declarations
├── public/
└── package.json
```

---

## 🔗 API

This project uses an external Jobs API to fetch remote developer job listings in real time.

---

## 📄 License

MIT
