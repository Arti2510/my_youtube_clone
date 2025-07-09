
// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5100/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Registration failed");

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded my-0"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <small className="text-xs text-gray-500 my-0">
                Enter a valid email address (e.g., user@example.com).
          </small>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded my-5"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL (optional)"
            className="w-full p-2 border rounded"
            value={formData.avatar}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
