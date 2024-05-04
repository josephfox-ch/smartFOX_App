import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthService from "../api/services/authService";
import { TbFaceId, TbFaceIdError } from "react-icons/tb";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const userId = new URLSearchParams(window.location.search).get("userId");
      const response = await AuthService.verifyOTP(userId, otp);
      if (response.success) {
        dispatch({
          type: "LOGIN",
          payload: {
            user: response.user,
          },
        });
        console.log("verify-response", response);
        setMessage(response.message);
        setTimeout(() => {
          navigate("/dashboard");
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
      setMessage("A new Authentication Code has been sent to your email.");
      console.log("OTP has been resent");
      console.log("otp response", response);
    } catch (error) {
      setError("Failed to resend OTP");
    }
  };

  return (
    <div className="bg-whiter flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg shadow-graydark">
        <div className="mb-4">
          <img src="./SFX.png" alt="Logo" className="mx-auto w-56 mb-4" />
        </div>
        <div>
          <h3 className="text-center py-2 text-lg font-semibold bg-gray-200 rounded">
            Verify Account
          </h3>
          {error && (
            <div className="flex flex-col items-center bg-red-100  text-red-600 text-sm mb-4 text-center shadow-lg">
              <div className="flex items-center p-1">
                <TbFaceIdError size="20" className="mr-3" />
                <span>{error}</span>
              </div>
            </div>
          )}
          {message && (
            <div className="flex flex-col items-center bg-green-100 text-green-600 text-sm mb-4 text-center shadow-lg ">
              <div className="flex items-center p-1">
                <TbFaceId size="20" className="mr-3" />
                <span>{message}</span>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="otp" className="block text-left">
              OTP Code
            </label>
            <input
              type="text"
              id="otp"
              className="w-full mt-1 mb-2 p-2 border-2 border-bodydark rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded"
              placeholder="Enter Code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <p className="text-xs text-graydark">
              Please enter the Authentication Code sent to your email.
            </p>
            <div className="grid gap-2 mt-3">
              <button
                type="submit"
                disabled={!otp}
                className="p-2 bg-foxColor text-white rounded hover:bg-foxColorHover disabled:opacity-50"
              >
                Verify
              </button>
              <button
                type="button"
                onClick={handleResendOTP}
                className="p-2 bg-bodydark2 text-white rounded hover:bg-bodydark3"
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
