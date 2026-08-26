import unittest
from recommender import OrderRecommender


class TestOrderRecommender(unittest.TestCase):
    def setUp(self):
        self.recommender = OrderRecommender()
        self.sample_customer_id = "cust-101"
        self.sample_items = [
            {"product_id": "prod-1", "name": "Wireless Mouse", "price": 25.99}
        ]

    def test_fallback_recommendations(self):
        # Verify heuristic fallback returns structured output with expected keys
        result = self.recommender._heuristic_fallback(
            self.sample_customer_id, self.sample_items
        )

        self.assertEqual(result["customer_id"], self.sample_customer_id)
        self.assertIn("recommendations", result)
        self.assertIn("reasoning", result)
        self.assertTrue(len(result["recommendations"]) > 0)

    def test_generate_recommendations_structure(self):
        # Ensure generate_recommendations returns valid dictionary
        result = self.recommender.generate_recommendations(
            self.sample_customer_id, self.sample_items
        )

        self.assertIn("customer_id", result)
        self.assertIn("recommendations", result)


if __name__ == "__main__":
    unittest.main()