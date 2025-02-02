import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../api/services/authService";
import { TbFaceId, TbFaceIdError } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";

const VerifyAccountPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { validateSession } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setOtp("");
    try {
      const userId = new URLSearchParams(window.location.search).get("userId");
      const response = await AuthService.verifyOTP(userId, otp);
      if (response.success) {
        console.log("verify-response", response);
        setMessage(response.message);
        await validateSession();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error(response.message || "Verification failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setMessage("");
    try {
      const userId = new URLSearchParams(window.location.search).get("userId");
      const response = await AuthService.resendOTP(userId);
      setMessage(response.message);
      console.log("OTP has been resent");
      console.log("otp response", response);
    } catch (error) {
      setError("Failed to resend OTP");
    }
  };

  useEffect(() => {
    setError("");
    setMessage("");
  }, [otp]);

  return (
    <div className="bg-gray-2 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg shadow-graydark">
        <div className="mb-4">
          <img src="/SFX.png" alt="Logo" className="mx-auto w-56 mb-4" />
        </div>
        <div>
          <h1 className="text-lg font-semibold mt-3 text-center mb-1">
            Verify Account
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="otp"
              className="w-full mt-1 mb-2 p-2 border-2 border-bodydark rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded text-sm"
              placeholder="Enter Code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <p className="text-xs text-graydark">
              *Please enter the Authentication Code sent to your email.
            </p>
            <div className="grid gap-2 mt-3">
              <button
                type="submit"
                disabled={!otp}
                className="p-2 bg-foxColor text-white rounded hover:bg-foxColorHover disabled:opacity-50"
              >
                Verify
              </button>
              <div className="text-center text-sm">
                <span>Didn't receive a code? </span>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="  text-primary hover:underline"
                >
                  Resend it.
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountPage;
