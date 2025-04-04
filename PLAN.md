**Step-by-step guide for building your Georgian-English translation site using**:

- **Next.js (App Router)**
- **Tailwind CSS + ShadCN UI**
- **OpenAI SDK** to connect to Georgian First LLM
- **Server Actions** (instead of API routes)
- **LocalStorage** for translation history
- **Cursor IDE**

---

## 🧰 Final Stack Overview

| Layer   | Tech                                   |
| ------- | -------------------------------------- |
| UI      | Next.js App Router + Tailwind + ShadCN |
| Server  | Server Actions                         |
| AI      | Georgian First LLM via OpenAI SDK      |
| Storage | `localStorage` on client               |
| IDE     | [Cursor](https://www.cursor.so/)       |

---

## ✅ Features Summary

- ✍️ Translate Geo ↔ Eng using your own LLM
- 🌐 Minimal, responsive UI with ShadCN and Tailwind
- 🧠 Translation logic uses Server Actions (no API route)
- 🧩 Translation history saved in browser via `localStorage`

---

## 🧱 Folder Structure

```
app/
│
├── page.tsx           ← main UI
├── actions/
│   └── translate.ts   ← server action for translation
├── components/        ← ShadCN UI components
```
