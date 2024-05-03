import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthService from "../api/services/authService";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await AuthService.resetPassword(token, password);
      setMessage(
        response.message || "Your password has been successfully reset."
      );
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  return (
    <div className="bg-whiter flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg shadow-graydark">
        <div className="mb-4 text-center">
          <img src="/SFX.png" alt="Logo" className="w-64 mx-auto" />
          <h1 className="text-lg font-semibold mt-3">Reset Your Password</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-2 border-2 border-bodydark rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full p-2 border-2 border-bodydark rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={!password || !confirmPassword}
            className="w-full p-2 text-white bg-foxColor rounded hover:bg-foxColorHover disabled:opacity-50"
          >
            Reset Password
          </button>
          {message && (
            <div className="p-3 mt-3 text-sm text-green-700 bg-green-100 rounded">
              {message}
            </div>
          )}
          {error && (
            <div className="p-3 mt-3 text-sm text-red-700 bg-red-100 rounded">
              {error}
            </div>
          )}
        </form>
        <p className="mt-3 text-sm text-center text-gray-600">
          Remember your password?
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
