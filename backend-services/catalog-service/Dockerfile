# Stage 1: Build stage using Maven
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app

# Copy root POM and child module POMs to leverage Docker layer caching
COPY ../pom.xml ./
COPY ./pom.xml ./catalog-service/
RUN mvn dependency:go-offline -B -f catalog-service/pom.xml

# Copy catalog service source code and build package
COPY ./src ./catalog-service/src
RUN mvn package -DskipTests -f catalog-service/pom.xml

# Stage 2: Runtime stage with minimal Alpine image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create a non-root group and user for enterprise security best practices
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy built jar from builder stage
COPY --from=builder /app/catalog-service/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]