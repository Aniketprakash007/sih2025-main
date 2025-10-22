import axios from 'axios';

const API_URL =
  process.env.REACT_APP_API_URL || "https://auth-backend-g59s.onrender.com";


// Signup user with all fields
export async function signupUser({ name, school, grade, location, email, password }) {
  try {
    const res = await axios.post(`${API_URL}/api/auth/signup`, { name, school, grade, location, email, password });
    return { msg: res.data.msg, otp: res.data.otp }; // OTP for testing
  } catch (err) {
    return { msg: err.response?.data?.msg || 'Signup failed' };
  }
}

// Login user (email + password)
export async function loginUser(email, password) {
  try {
    const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    return { msg: res.data.msg, otp: res.data.otp }; // OTP for testing
  } catch (err) {
    return { msg: err.response?.data?.msg || 'Login failed' };
  }
}

// Verify OTP
export async function verifyOtp(email, otpInput) {
  try {
    const res = await axios.post(`${API_URL}/api/auth/verify`, { email, otp: otpInput });
    return { msg: res.data.msg, success: res.data.success, token: res.data.token };
  } catch (err) {
    return { msg: err.response?.data?.msg || 'OTP verification failed', success: false };
  }
}


