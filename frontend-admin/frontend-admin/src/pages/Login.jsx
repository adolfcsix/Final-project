import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // 🖼️ Import logo
import background from "../assets/background.jpg"; // 🖼️ Import ảnh nền

const Login = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Overlay để làm mờ ảnh nền */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white p-8 rounded-xl shadow-lg w-96">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-20 h-20" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        
        {/* Form */}
        <form className="mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>

          <p className="text-center mt-3 text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
