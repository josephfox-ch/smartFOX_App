import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../api/services/authService";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      await AuthService.forgotPassword(email);
      setMessage(
        "If an account exists for this email, a reset link will be sent."
      );
    } catch (err) {
      console.error("Forgot Password Error:", err);
      setError("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="bg-whiter flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg shadow-graydark">
        <div className="mb-4 text-center">
          <img src="/SFX.png" alt="Logo" className="w-64 mx-auto" />
          <h1 className="text-lg font-semibold mt-3">Forgot Password</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={!email}
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Send Reset Link
          </button>
          {message && (
            <div className="p-3 mt-3 text-sm text-green-700 bg-green-100 rounded">
              {message}
            </div>
          )}
          {error && (
            <div className="p-2 mt-3 text-sm text-red-700 bg-red-100 rounded">
              {error}
            </div>
          )}
        </form>
        <p className="mt-3 text-sm text-center text-gray-600">
          Remember your password? <Link to="/login" className="text-blue-600  hover:underline">Login here.</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

