import json
import logging
from confluent_kafka import Consumer, KafkaError

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("order-event-consumer")


def create_kafka_consumer(bootstrap_servers: str, group_id: str):
    conf = {
        "bootstrap.servers": bootstrap_servers,
        "group.id": group_id,
        "auto.offset.reset": "earliest",
        "enable.auto.commit": True,
    }
    return Consumer(conf)


def start_order_event_listener(
    bootstrap_servers: str = "localhost:9092",
    topic: str = "order-events",
    group_id: str = "ai-recommendation-group",
):
    consumer = create_kafka_consumer(bootstrap_servers, group_id)
    consumer.subscribe([topic])

    logger.info(f"Kafka consumer subscribed to topic '{topic}' at {bootstrap_servers}")

    try:
        while True:
            msg = consumer.poll(timeout=1.0)

            if msg is None:
                continue

            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    continue
                else:
                    logger.error(f"Kafka consumer error: {msg.error()}")
                    break

            try:
                payload = json.loads(msg.value().decode("utf-8"))
                order_id = payload.get("orderId")
                customer_id = payload.get("customerId")
                total_amount = payload.get("totalAmount")

                logger.info(
                    f"Received OrderCreatedEvent -> Order: {order_id} | Customer: {customer_id} | Total: ${total_amount}"
                )

                # Event handoff point for downstream AI recommendation pipeline

            except json.JSONDecodeError as e:
                logger.error(f"Failed to decode message JSON: {e}")

    except KeyboardInterrupt:
        logger.info("Stopping Kafka event consumer...")
    finally:
        consumer.close()


if __name__ == "__main__":
    start_order_event_listener()