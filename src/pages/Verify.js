import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, otp: sentOtp } = location.state || {};

  const [otpInput, setOtpInput] = useState("");
  const [msg, setMsg] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpInput }),
      });

      const data = await res.json();
      setMsg(data.msg);

      if (res.ok && data.success) {
        localStorage.setItem("token", data.token);
        navigate("/"); // Dashboard (EcoLearnPlatform)
      }
    } catch (err) {
      setMsg("Verification failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-blue-500">Verify OTP</h2>
        <p className="mb-4">Your email: {email}</p>
        <p className="mb-4 text-purple-500">Testing OTP: {sentOtp}</p>
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 rounded"
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Verify OTP
          </button>
        </form>
        {msg && <p className="mt-4 text-purple-500">{msg}</p>}
      </div>
    </div>
  );
}
