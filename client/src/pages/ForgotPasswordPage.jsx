import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../api/services/authService";
import { TbFaceId, TbFaceIdError } from "react-icons/tb";

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
      setError(err.message);
    }
  };

  useEffect(() => {
    setError("");
  }, [email]);

  return (
    <div className="bg-gray-2 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg shadow-graydark">
        <div className="mb-4 text-center">
          <img src="/SFX.png" alt="Logo" className="w-64 mx-auto" />
          <h1 className="text-lg font-semibold mt-3">Forgot Password</h1>
          {error && (
            <div className="flex flex-col items-center bg-red-100  text-red-600 text-sm mb-4 text-center shadow-lg border">
              <div className="flex items-center p-1">
                <TbFaceIdError size="20" className="mr-3" />
                <span>{error}</span>
              </div>
            </div>
          )}
          {message && (
            <div className="flex flex-col items-center bg-green-100 text-green-700 text-sm mb-4 text-center shadow-lg border">
              <div className="flex items-center p-1">
                <TbFaceId size="20" className="mr-3" />
                <span>{message}</span>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-2 border-2 border-bodydark rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={!email}
            className="w-full p-2 text-white bg-foxColor rounded hover:bg-foxColorHover disabled:opacity-50"
          >
            Send Reset Link
          </button>
        </form>
        <p className="mt-3 text-sm text-center text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600  hover:underline">
            Login here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
