import os
import threading
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

from consumer import start_order_event_listener
from recommender import recommender

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ai-agent-service")

# Background thread handle for Kafka listener
kafka_thread: Optional[threading.Thread] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Start Kafka event consumer in background thread
    global kafka_thread
    bootstrap_servers = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092")
    
    logger.info("Starting background Kafka order-events listener...")
    kafka_thread = threading.Thread(
        target=start_order_event_listener,
        kwargs={"bootstrap_servers": bootstrap_servers},
        daemon=True
    )
    kafka_thread.start()
    
    yield
    
    # Shutdown logic
    logger.info("Shutting down AI Agent service...")


app = FastAPI(
    title="Nexus Commerce AI Agent Service",
    description="Microservice providing real-time AI product recommendations powered by Kafka & LangChain",
    version="1.0.0",
    lifespan=lifespan
)


class RecommendationRequest(BaseModel):
    customer_id: str
    purchased_items: List[Dict[str, Any]]


@app.get("/health")
def health_check():
    return {
        "status": "UP",
        "service": "ai-agents",
        "kafka_listener_alive": kafka_thread.is_alive() if kafka_thread else False
    }


@app.post("/api/v1/recommendations")
def get_recommendations(request: RecommendationRequest):
    try:
        recommendations = recommender.generate_recommendations(
            customer_id=request.customer_id,
            purchased_items=request.purchased_items
        )
        return recommendations
    except Exception as e:
        logger.error(f"Error generating recommendations: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate AI recommendations")