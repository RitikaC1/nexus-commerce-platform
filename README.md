<!--  
# Nexus Commerce Platform

Nexus is an enterprise-grade, event-driven e-commerce ecosystem built to demonstrate distributed systems architecture, reactive microservices, and autonomous AI orchestration. 

The platform leverages modern backend engineering principles paired with cutting-edge Agentic AI workflows to deliver an intelligent, highly resilient shopping experience.

---

## 🏗️ High-Level Architecture

The repository is structured into three decoupled core pillars:

* **`backend-services/`**: Core Java / Spring Boot microservices (Catalog, Order, Inventory) utilizing **Spring Cloud Gateway**, **Spring Security (OAuth2/JWT)**, and distributed transaction management using the **Saga Pattern**.
* **`ai-agents/`**: Autonomous AI orchestrators and background workers running on python/Databricks, utilizing frameworks like **LangGraph** to process real-time events and expose intelligent, tool-using APIs.
* **`deployments/`**: Cloud-native infrastructure configurations containing multi-stage **Dockerfiles**, **Kubernetes (K8s)** manifests, Helm charts, and continuous integration via **GitHub Actions**.

---

## 🚀 System Backbone & Event Streaming

Instead of tight HTTP/REST coupling, Nexus uses **Apache Kafka** as an asynchronous event bus. 

Key architectural components include:
* **Decoupled Scaling**: Core transaction logic remains highly performant; long-running AI analytics and model inference consume events downstream.
* **Data Integrity**: Sequential message processing using strategic partitioning keys (e.g., `customerId`) to maintain absolute state across services.
* **Resilience**: Circuit-breaking and graceful degradation implemented via **Resilience4j**.

---

## 📅 Tech Stack
* **Backend:** Java, Spring Boot, Spring Data JPA, Spring Cloud, Resilience4j
* **AI/ML:** Python, Databricks, LangGraph / LangChain, Vector Databases (`pgvector` / Milvus)
* **Data & Messaging:** PostgreSQL, Redis, Apache Kafka
* **DevOps:** Docker, Kubernetes, GitHub Actions -->





# Nexus Commerce Platform

A distributed, event-driven e-commerce platform built with a polyglot microservices architecture. The system processes customer transactions using Spring Boot microservices, streams real-time events through Apache Kafka, and delivers AI-powered product recommendations via a Python LangChain service to a Next.js frontend.

---

## 🏗️ Architecture Overview

* **Catalog Service (`backend-services/catalog-service`)**: Java Spring Boot service handling product catalog CRUD operations and inventory tracking with PostgreSQL.
* **Order Service (`backend-services/order-service`)**: Java Spring Boot service managing transactional order processing and emitting `OrderCreatedEvent` payloads to Kafka.
* **AI Recommendation Agent (`ai-agents`)**: Python FastAPI service utilizing LangChain and OpenAI (with heuristic fallbacks) consuming Kafka event streams to generate personalized recommendations.
* **Frontend (`frontend`)**: Next.js (TypeScript & Tailwind CSS) web interface for browsing products, submitting orders, and viewing real-time AI suggestions.
* **Message Broker & Storage**: Apache Kafka + Zookeeper for asynchronous event streaming; PostgreSQL for relational persistence.
* **CI/CD Pipeline (`.github/workflows/ci.yml`)**: Automated GitHub Actions pipeline validating Java, Python, and Node.js compilation on every commit.

---

## 🛠️ Tech Stack

* **Languages**: Java 17, Python 3.11, TypeScript
* **Frameworks**: Spring Boot 3, FastAPI, Next.js 14, LangChain
* **Messaging & Database**: Apache Kafka, PostgreSQL
* **DevOps & Tooling**: Docker, Docker Compose, GitHub Actions, Maven, npm

---

## 🚀 Quick Start with Docker Compose

Ensure Docker Engine and Docker Compose are installed and running locally:

```bash
# 1. Clone the repository
git clone [https://github.com/RitikaC1/nexus-commerce-platform.git](https://github.com/RitikaC1/nexus-commerce-platform.git)
cd nexus-commerce-platform

# 2. Start all services in detached mode
docker compose up -d --build