# Local To-Do App

A simple To-Do application built with React and Vite, featuring authentication, task management, and a dark/light mode toggle. All data is persisted in localStorage.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS

## Features

- **Authentication** — Login with test credentials, session persisted in localStorage
- **Protected route** — To-Do page is inaccessible without logging in
- **Add tasks** — Input validation, no empty tasks allowed
- **Task status** — Mark tasks as done/pending via checkbox
- **Edit tasks** — Inline editing for each task
- **Delete tasks** — Remove a task from the list
- **Task counter** — Shows how many tasks are done out of total
- **Dark / Light mode** — Theme toggle persisted in localStorage
- **localStorage persistence** — Tasks and session survive page refresh

## Test Credentials

| Field    | Value            |
|----------|------------------|
| Email    | intern@test.com  |
| Password | 123456           |

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── LoginPage.jsx
│   └── TodoPage.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useTasks.js
│   └── useTheme.js
├── App.jsx
├── main.jsx
└── index.css
```
