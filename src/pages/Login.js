// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");      
  const [generatedOtp, setGeneratedOtp] = useState(""); 
  const [showOtp, setShowOtp] = useState(false);
  const [msg, setMsg] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMsg(data.msg || "Login failed");
        return;
      }

      setGeneratedOtp(data.otp);
      setShowOtp(true);
      setMsg("Enter OTP to continue");
    } catch (err) {
      console.error(err);
      setMsg("Server error");
    }
  };

  const handleVerify = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setMsg(data.msg || "OTP verification failed");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/ecolearn");
    } catch (err) {
      console.error(err);
      setMsg("Server error during OTP verification");
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/8542538/pexels-photo-8542538.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navigation Bar */}
      <header className="bg-white shadow-md border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Leaf className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
               प्रकृति पाठशाला
              </h1>
            </div>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/login" className="text-blue-500 font-semibold hover:text-blue-600">Login</Link>
              <Link to="/signup" className="text-blue-500 font-semibold hover:text-blue-600">Sign Up</Link>
              <Link to="/forgot-password" className="text-gray-500 hover:text-blue-600 text-sm">Forgot Password?</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white mt-2 rounded-xl shadow-lg p-4 space-y-3">
              <Link to="/login" className="block text-blue-500 font-semibold hover:text-blue-600">Login</Link>
              <Link to="/signup" className="block text-blue-500 font-semibold hover:text-blue-600">Sign Up</Link>
              <Link to="/forgot-password" className="block text-gray-500 hover:text-blue-600">Forgot Password?</Link>
            </div>
          )}
        </div>
      </header>

      {/* Login Form */}
      <div className="flex flex-1 justify-center items-center px-4">
        <div
          className="w-full max-w-md rounded-2xl shadow-lg p-8 mt-12"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} // semi-transparent
        >
          <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Login </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            No account? <Link to="/signup" className="text-green-500 hover:underline">Sign Up</Link>
          </p>

          {showOtp && (
            <div className="mt-6 p-4 rounded-xl space-y-3" style={{ backgroundColor: "rgba(255,255,255,0.5)" }}>
              <p className="text-sm text-gray-700">OTP (for testing): <b className="text-purple-500">{generatedOtp}</b></p>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleVerify}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all"
              >
                Verify OTP
              </button>
            </div>
          )}

          {msg && <p className="mt-4 text-center text-red-500 font-medium">{msg}</p>}
        </div>
      </div>
    </div>
  );
}
