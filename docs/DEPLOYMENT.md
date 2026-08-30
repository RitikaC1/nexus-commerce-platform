# Nexus Commerce Platform - Deployment & Local Setup Guide

This guide details the steps required to build, test, and run the Nexus Commerce multi-service platform in both local development and containerized environments.

---

## 📋 Prerequisites

Ensure the following tools are installed on your machine before getting started:

* **Java Development Kit (JDK 17)**: For Spring Boot services
* **Python 3.11+**: For AI Agent microservices
* **Node.js 20+ & npm**: For Next.js frontend development
* **Docker & Docker Compose**: For containerized orchestration
* **Apache Maven 3.8+**: For building backend Java modules

---

## 🛠️ Local Development (Service-by-Service)

### 1. Infrastructure (Database & Kafka)
Start PostgreSQL and Kafka before launching individual microservices:
```bash
docker compose up -d postgres kafka zookeeper