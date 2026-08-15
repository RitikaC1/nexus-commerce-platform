import os
import logging
from typing import List, Dict, Any
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_openai import ChatOpenAI

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ai-recommender")


class OrderRecommender:
    def __init__(self):
        # Fallback to gpt-3.5-turbo if model not explicitly specified
        api_key = os.getenv("OPENAI_API_KEY", "")
        self.llm_enabled = bool(api_key)
        
        if self.llm_enabled:
            self.llm = ChatOpenAI(temperature=0.7, model="gpt-3.5-turbo", api_key=api_key)
            logger.info("Initialized LangChain OpenAI Recommender")
        else:
            logger.warning("OPENAI_API_KEY not found. Running Recommender in heuristic fallback mode.")

    def generate_recommendations(self, customer_id: str, purchased_items: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Generates complementary product recommendations based on purchase payload.
        """
        if not self.llm_enabled:
            return self._heuristic_fallback(customer_id, purchased_items)

        prompt = ChatPromptTemplate.from_template(
            "You are an e-commerce recommendation engine for Nexus Commerce.\n"
            "Customer ID: {customer_id}\n"
            "Recently Purchased Items: {items}\n\n"
            "Suggest 3 complementary product categories or items that this customer would likely purchase next.\n"
            "Return JSON format with keys 'customer_id', 'recommendations' (list of strings), and 'reasoning'."
        )

        chain = prompt | self.llm | JsonOutputParser()

        try:
            response = chain.invoke({
                "customer_id": customer_id,
                "items": str(purchased_items)
            })
            return response
        except Exception as e:
            logger.error(f"Error during LLM chain execution: {e}")
            return self._heuristic_fallback(customer_id, purchased_items)

    def _heuristic_fallback(self, customer_id: str, purchased_items: List[Dict[str, Any]]) -> Dict[str, Any]:
        return {
            "customer_id": customer_id,
            "recommendations": [
                "Protective Accessories & Cases",
                "Extended Warranty & Support Plan",
                "High-Speed Cable Accessories"
            ],
            "reasoning": "Rule-based fallback recommendations based on transaction volume."
        }


# Global singleton instance
recommender = OrderRecommender()