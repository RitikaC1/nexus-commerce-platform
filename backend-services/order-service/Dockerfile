# Stage 1: Build stage using Maven
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app

# Copy root POM and child module POMs for layer caching
COPY ../pom.xml ./
COPY ./pom.xml ./order-service/
RUN mvn dependency:go-offline -B -f order-service/pom.xml

# Copy source code and build jar
COPY ./src ./order-service/src
RUN mvn package -DskipTests -f order-service/pom.xml

# Stage 2: Runtime stage with minimal Alpine JRE
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Non-root user execution for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=builder /app/order-service/target/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]