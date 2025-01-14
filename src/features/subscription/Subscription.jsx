import { useState } from "react";
import { Check } from "lucide-react";

const Subscription = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: "$29",
      period: "month",
      features: [
        "Up to 5 fields",
        "Basic soil analysis",
        "Weather alerts",
        "Email support",
      ],
      priceId: "price_H1234567890",
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: "$99",
      period: "month",
      features: [
        "Unlimited fields",
        "Advanced soil analysis",
        "AI-powered predictions",
        "Priority support",
        "Custom reports",
        "API access",
      ],
      priceId: "price_H9876543210",
    },
  ];

  const handleSubscribe = async (priceId) => {
    try {
      setLoading(true);
      setSelectedPlan(priceId);

      // Simulated API Call
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/subscriptions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ priceId }),
        }
      );

      const { clientSecret } = await response.json();

      // Simulate payment success
      if (clientSecret !== "mock_client_secret") {
        throw new Error("Payment failed.");
      }

      alert("Subscription successful!");
      window.location.reload();
    } catch (error) {
      console.error("Subscription failed:", error);
      alert("Failed to process subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Subscription Plans</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-lg p-4 hover:shadow-lg transition-shadow ${
              selectedPlan === plan.id ? "ring-2 ring-green-500" : ""
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <div className="text-2xl font-bold">
                {plan.price}
                <span className="text-sm text-gray-500">/{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="text-green-500" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.priceId)}
              disabled={loading}
              className={`w-full px-4 py-2 text-white rounded-lg ${
                loading && selectedPlan === plan.id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading && selectedPlan === plan.id
                ? "Processing..."
                : `Subscribe to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
