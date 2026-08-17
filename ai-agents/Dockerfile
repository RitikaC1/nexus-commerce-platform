FROM python:3.11-slim

WORKDIR /app

# Install system dependencies required for build tools and Kafka client
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    librdkafka-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source code
COPY . .

# Set environment defaults
ENV PYTHONUNBUFFERED=1
ENV PORT=8000

EXPOSE 8000

# Start FastAPI application via Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]