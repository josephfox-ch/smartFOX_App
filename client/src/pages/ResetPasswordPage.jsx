import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthService from "../api/services/authService";
import { TbFaceId, TbFaceIdError } from "react-icons/tb";

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
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  useEffect(() => {
    setError("");
  }, [password, confirmPassword]);

  return (
    <div className="bg-gray-2 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white  rounded shadow-lg shadow-graydark">
        <div className="mb-4 text-center">
          <img src="/SFX.png" alt="Logo" className="w-64 mx-auto" />
          <h1 className="text-lg font-semibold mt-3 mb-1">
            Reset Your Password
          </h1>
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
          <div className="mb-4 ">
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-2 border-2 border-bodydark rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 ">
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
