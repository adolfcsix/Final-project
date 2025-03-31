import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Kiểm tra dữ liệu đầu vào
  const validateInput = () => {
    const { fullname, email, password, confirmPassword } = formData;
    if (!fullname.trim()) return "Full name is required!";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format!";
    if (password.length < 6) return "Password must be at least 6 characters!";
    if (password !== confirmPassword) return "Passwords do not match!";
    return null;
  };

  // Xử lý đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/sign-up`, {
        email: formData.email,
        password: formData.password,
        fullname: formData.fullname,
        address: formData.address.trim() || "N/A",
      });

      alert("🎉 Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 transform transition-all animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create Your Account</h2>
        <p className="text-sm text-center text-gray-500 mb-4">Join us and manage your warehouse efficiently!</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          {[
            { name: "fullname", type: "text", placeholder: "Full Name", icon: <FaUser /> },
            { name: "email", type: "email", placeholder: "Email", icon: <FaEnvelope /> },
            { name: "password", type: "password", placeholder: "Password", icon: <FaLock /> },
            { name: "confirmPassword", type: "password", placeholder: "Confirm Password", icon: <FaLock /> },
            { name: "address", type: "text", placeholder: "Address (Optional)", icon: <FaMapMarkerAlt /> },
          ].map(({ name, type, placeholder, icon }) => (
            <div key={name} className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</span>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required={name !== "address"}
                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;