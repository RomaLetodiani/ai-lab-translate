# AI Lab Translate

A modern Georgian-English translation application built with Next.js and powered by AI.

## ✨ Features

- 🌐 Seamless translation between Georgian and English
- 🧠 Powered by Georgian First LLM via OpenAI SDK
- 🎨 Modern UI with ShadCN components and Tailwind CSS
- 💾 Local translation history with localStorage
- 📊 Translation statistics and usage tracking
- ⚡ Server Actions for efficient API calls
- 🔄 Real-time language switching
- 📱 Responsive design for all devices

## 🚀 Tech Stack

| Layer    | Technology                 |
| -------- | -------------------------- |
| Frontend | Next.js App Router + React |
| UI       | Tailwind CSS + ShadCN UI   |
| Server   | Server Actions             |
| AI       | Georgian First LLM         |
| Storage  | localStorage               |
| IDE      | Cursor                     |

## 🛠️ Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-lab-translate.git
cd ai-lab-translate
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

```
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=your_base_url
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
📦src
 ┣ 📂actions
 ┃ ┗ 📜translate.actions.ts    # Server actions for translation
 ┣ 📂app
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css            # Global styles
 ┃ ┣ 📜layout.tsx             # Root layout
 ┃ ┗ 📜page.tsx               # Home page
 ┣ 📂assets
 ┃ ┗ 📜socials.svgs.tsx       # Social media icons
 ┣ 📂components
 ┃ ┣ 📂ui                     # ShadCN UI components
 ┃ ┃ ┣ 📜avatar.tsx
 ┃ ┃ ┣ 📜badge.tsx
 ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┣ 📜card.tsx
 ┃ ┃ ┣ 📜select.tsx
 ┃ ┃ ┣ 📜skeleton.tsx
 ┃ ┃ ┣ 📜sonner.tsx
 ┃ ┃ ┣ 📜switch.tsx
 ┃ ┃ ┣ 📜textarea.tsx
 ┃ ┃ ┗ 📜tooltip.tsx
 ┃ ┗ 📜logo.tsx               # Application logo
 ┣ 📂layout
 ┃ ┣ 📜footer.tsx             # Footer component
 ┃ ┗ 📜header.tsx             # Header component
 ┣ 📂lib
 ┃ ┣ 📜socials.const.tsx      # Social media constants
 ┃ ┗ 📜utils.ts               # Utility functions
 ┣ 📂prompts
 ┃ ┗ 📜translate.prompts.ts   # AI translation prompts
 ┗ 📂types
   ┗ 📜translate.types.ts     # TypeScript types
```

## 🎯 Key Components

- **TranslationCard**: Main interface for text input/output
- **HistoryList**: Displays translation history with collapsible view
- **StatsCard**: Shows translation statistics and usage metrics

## 🔧 Development

- Built with TypeScript for type safety
- Uses Server Actions for API calls
- Implements modern React patterns and hooks
- Follows atomic component design principles

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- [ShadCN UI](https://ui.shadcn.com/) for the beautiful components
- [Georgian First LLM](https://ailab.ge/) for the translation model
- [Next.js](https://nextjs.org/) for the amazing framework
