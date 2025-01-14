import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: name, email, password }),
      }
    );

    if (response.ok) {
      navigate("/login");
    } else {
      console.error("Signup failed:", response.statusText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="text-center p-6 bg-white">
          <svg
            className="w-16 h-16 mx-auto text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L7 7M12 2L17 7M12 2V16M7 7C4 7 2 9 2 12C2 15 4 17 7 17M7 7H17M17 7C20 7 22 9 22 12C22 15 20 17 17 17M17 17H7" />
          </svg>
          <h1 className="text-2xl font-bold text-green-800 mt-4">
            AgriTech Solutions
          </h1>
          <p className="text-gray-600 mt-2">Join the future of agriculture</p>
        </div>

        {/* Signup Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="John Doe"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="you@example.com"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="••••••••"
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-green-600 hover:text-green-500 font-medium"
              >
                Sign in
              </button>
            </p>

            <p className="text-center text-sm text-gray-600">
              By signing up, you agree to our{" "}
              <button className="text-green-600 hover:text-green-500">
                Terms of Service
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
