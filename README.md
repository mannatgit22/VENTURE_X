<div align="center">

  <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
  <img src="https://img.shields.io/badge/-React_19-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react" />
  <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
  <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  <img src="https://img.shields.io/badge/-Sanity-black?style=for-the-badge&logoColor=white&logo=sanity&color=F03E2F" alt="sanity" />

  <h3 align="center">Venture-X — Startup Pitching Platform</h3>

  <div align="center">
    A platform where entrepreneurs can submit startup ideas, browse pitches, and gain visibility through a clean and minimal interface.
  </div>

</div>

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Quick Start](#quick-start)
5. [Environment Variables](#environment-variables)
6. [Project Structure](#project-structure)

---

## 🤖 Introduction

**Venture-X** is a Next.js 15 startup directory platform where founders can submit their startup ideas for visibility, browse other pitches by category, and track how many people have viewed their idea.

The platform uses **Sanity CMS** for real-time content management, **GitHub OAuth** for authentication, and **Next.js server-side rendering** for fast, dynamic page loads.

---

## ⚙️ Tech Stack

- **Next.js 15** — App Router, SSR, Server Actions
- **React 19** — UI components
- **TypeScript** — Type safety across the codebase
- **Sanity CMS** — Headless CMS for pitch content and editor picks
- **Tailwind CSS** — Utility-first styling
- **ShadCN UI** — Accessible component library
- **NextAuth / GitHub OAuth** — Authentication

---

## 🔋 Features

- **Pitch Submission** — Users can submit startup ideas with a title, description, category, and image link
- **Browse Pitches** — Explore all submitted ideas with category-based filtering
- **Live View Counter** — Each pitch tracks how many times it has been viewed
- **Search** — Search pitches by keyword in real time
- **User Profiles** — Each user has a profile page listing all their submitted pitches
- **GitHub Authentication** — Sign in instantly using your GitHub account
- **Editor Picks** — Admins can highlight top pitches via Sanity Studio
- **Live Content API** — Homepage dynamically displays the latest pitches using Sanity's Content API
- **Minimalist Design** — Clean, distraction-free UI focused on the pitches

---

## 🤸 Quick Start

### Prerequisites

Make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v18+)
- [npm](https://www.npmjs.com/)

### Clone the Repository

```bash
git clone https://github.com/mannatgit22/venture-x.git
cd venture-x
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=

SANITY_TOKEN=

AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

- Get your Sanity credentials from [sanity.io](https://www.sanity.io/)
- Get your GitHub OAuth credentials from [GitHub Developer Settings](https://github.com/settings/developers)

### Run the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

```
venture-x/
├── app/                  # Next.js App Router pages
│   ├── (root)/           # Main layout and pages
│   └── studio/           # Sanity Studio route
├── components/           # Reusable UI components
├── lib/                  # Utility functions and validation
├── sanity/               # Sanity schema and queries
│   ├── schemaTypes/      # Content models
│   └── lib/queries.ts    # GROQ queries
├── public/               # Static assets
├── .env.local            # Environment variables (not committed)
└── README.md
```

---

## 🔗 Links

- **GitHub Repository:** [github.com/mannatgit22/venture-x](https://github.com/mannatgit22/venture-x)
- **Live Demo:** Coming soon

---

## 📜 License

This project is open source and available for educational and personal use.
