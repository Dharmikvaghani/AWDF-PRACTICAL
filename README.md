# Advanced Web Development Frameworks (ITUE301) - Lab Practicals

**Student Name:** Dharmik Vaghani  
**Student ID:** 24CS104  
**Department:** Computer Science and Engineering, CSPIT  
**Academic Year:** 2026-27  
**Repository:** [https://github.com/Dharmikvaghani/AWDF-PRACTICAL.git](https://github.com/Dharmikvaghani/AWDF-PRACTICAL.git)  

---

## 📌 Practical Index & Architectural Overview

| Practical # | Title & Core Topic | Primary Technologies | Key Components / Features |
| :---: | :--- | :--- | :--- |
| **01** | Introduction to React & Component Architecture | React 19, Vite, Vanilla CSS | Reusable functional components (`Header`, `About`, `Skills`, `Footer`), One-way props flow |
| **02** | State Management & Client-Side Routing | React Router DOM v6, useState | Declarative routes (`/`, `/projects`, `/contact`, `/tasks`), Dark/Light mode, Controlled inputs |
| **03** | REST API Integration & Data Rendering | Fetch API, useEffect, Async/Await | GitHub REST API integration, client-side search filter, Skeleton loaders, error fallback |
| **04** | RESTful Backend API with Node.js & Express | Node.js, Express.js | Structured router modularization, logging middleware, CRUD endpoints, centralized error handling |
| **05** | MongoDB Integration & Schema Design with Mongoose | MongoDB, Mongoose ODM | Strict Mongoose schema with enum validation & timestamps, persistent database CRUD |
| **06** | Full Stack Application Integration | React, Express, MongoDB, CORS | Centralized API client (`api.js`), CORS middleware, Optimistic UI updates with rollback |
| **07** | Authentication & Middleware Pipeline | JWT (jsonwebtoken), bcryptjs | Password salting/hashing, JWT issuance, `authenticate` Bearer middleware, protected task routes |
| **08** | Performance Optimization & Lazy Loading | React.lazy(), Suspense, React.memo | Dynamic bundle code-splitting (`TaskAnalytics`), isolated re-renders, Vite `manualChunks` |
| **09** | In-Memory Caching & Query Optimization | node-cache, Express | 60s TTL caching layer, user-scoped cache keys (`tasks:${userId}:list`), automatic mutation invalidation |
| **10** | Asynchronous Processing with Event-Driven Architecture | Node.js EventEmitter | Native event decoupling (`task-created`, `task-deleted`), non-blocking HTTP 201 response in 26ms |
| **11** | Containerization with Docker & Docker Compose | Docker, Docker Compose, Nginx | Multi-stage frontend Dockerfile, lightweight Node 20 backend, MongoDB 7.0 named volume persistence |
| **12** | Continuous Integration (CI) with GitHub Actions | GitHub Actions, Ubuntu CI runner | Automated linting, backend MongoDB service testing, and production Vite bundle verification on push |
| **13** | AI API Integration into a Web Application | Google Gemini / Heuristic Engine | Server-side credential protection, sliding-window rate limiting (10 req/min), human-in-the-loop UI |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ or v20+
- **MongoDB**: Local MongoDB instance or Docker
- **Docker & Docker Compose** (Optional for containerized run)

### 2. Running Locally

#### Start Backend:
```bash
cd backend
npm install
npm run dev
# Server running at http://localhost:5000
```

#### Start Frontend:
```bash
cd frontend
npm install
npm run dev
# Vite dev server running at http://localhost:5173
```

### 3. Running with Docker Compose (Single Command):
```bash
docker compose up -d --build
```
- Frontend SPA: `http://localhost:8080`
- Express API: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

---

## 📄 Submission Documents
- Word Practical File: `AWDF_Practical_24CS104_Dharmik_Vaghani.docx` (Complete 26-page report with all code snippets, student details, and 13 verified output figures).
