#!/bin/sh

# Wait for Kafka broker to be fully running and responsive
echo "Waiting for Kafka to be ready..."
cub kafka-ready -b kafka:29092 120 5

echo "Initializing Kafka topics for Nexus Platform..."

# 1. Operational Topic: Order Events (3 partitions for scaling consumers)
kafka-topics --create --if-not-exists --bootstrap-server kafka:29092 \
  --topic order-events --partitions 3 --replication-factor 1

# 2. Operational Topic: Inventory Sync Events
kafka-topics --create --if-not-exists --bootstrap-server kafka:29092 \
  --topic inventory-events --partitions 2 --replication-factor 1

# 3. AI Stream Topic: Real-time user interactions for the recommendation engine
kafka-topics --create --if-not-exists --bootstrap-server kafka:29092 \
  --topic customer-clickstream --partitions 3 --replication-factor 1

# 4. Agentic Control Topic: For routing actions back from LangGraph to Spring Boot
kafka-topics --create --if-not-exists --bootstrap-server kafka:29092 \
  --topic agent-commands --partitions 2 --replication-factor 1

echo "All Nexus Kafka topics successfully provisioned!"