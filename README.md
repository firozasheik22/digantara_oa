# FIROZA - Digantara - Backend Assessment Submission
# 🗓 Scheduler Microservice

A scalable job scheduler microservice built with **Node.js**, **Express**, **Sequelize**, **BullMQ**, and **Redis**. 
This microservice allows users to schedule recurring jobs (like sending emails) using cron expressions and background workers.

## 🚀 Features

* Schedule jobs using cron syntax (e.g., every Monday at 9 AM)
* Background job execution using BullMQ + Redis
* Custom job payloads
* REST API to create, list, and view jobs
* API rate limiting (6000 requests/minute globally)
* Docker-based deployment with Redis container
* Ready for cloud deployment and horizontal scaling

## 📦 Tech Stack

* Node.js + Express
* node-cron for scheduling
* BullMQ for queues
* Redis for job queue storage
* Sequelize with SQLite (can be replaced by PostgreSQL/MySQL)
* Docker + docker-compose

## 📁 Project Structure

```
.
├── src/
│   ├── controllers/        # API logic
│   ├── models/             # DB models (Sequelize)
│   ├── routes/             # API routes
│   ├── utils/              # Helpers (send email)
├── cron/                   # Schedules jobs from DB
├── queues/                 # BullMQ job queue + worker
├── Dockerfile
├── docker-compose.yml
├── app.js                  # App entry point
├── config.js               # App + Redis config
```

## ⚙️ Setup Instructions

### 🔧 Prerequisites

* Docker Desktop installed and running (WSL2 enabled on Windows)
* Node.js (if running without Docker)

### 🐳 Running with Docker

```bash
# Clone the repository
git clone <repo-url>
cd digantara_oa

# Start Redis + App
docker-compose up --build
```

* App runs at `http://localhost:3000`
* Redis is accessible on `localhost:6379` (inside Docker network)

### 🧪 API Endpoints

#### ➕ Create Job

```http
POST /jobs
Content-Type: application/json
```

**Example payload (email):**

```json
{
  "name": "Email Job",
  "schedule": "*/2 * * * *",
  "payload": {
    "type": "email",
    "email": "test@example.com"
  }
}
```
#### 📋 List Jobs

```http
GET /jobs
```

#### 🔍 Get Job by ID

```http
GET /jobs/:id
```

---

## 🌍 Scalability Strategy

The architecture supports:

* **10,000+ users globally**
* **1,000+ services**
* **6,000+ API requests per minute**

### How?

* **Stateless API server** → horizontal scaling with load balancers (e.g., NGINX, AWS ALB)
* **Redis queue** with BullMQ → offloads heavy tasks to background workers
* **Worker pool** → scale workers independently to meet demand
* **Rate limiting** → protects API from overuse

```
Clients → Load Balancer → Node.js API Containers → Redis Queue → Worker Pool → Database
```
