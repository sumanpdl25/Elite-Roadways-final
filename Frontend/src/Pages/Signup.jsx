import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/v1/users/signup", formData);

      if (response.status === 201) {
        const { token, user } = response.data;
        Cookies.set("token", token, { expires: 7 });
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        
        toast.success("Signup successful! Redirecting to home...");
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[#F9F9F9] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex" style={{ height: '95vh' }}>
        
        <div className="w-1/2 p-12 text-[#2A004E] flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 10,
                duration: 1 
              }}
              className="text-4xl font-bold mb-8 text-center"
            >
              Create Account
            </motion.h1>
            
            <motion.form 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B3FA0] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B3FA0] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B3FA0] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Role</label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === "user"}
                      onChange={handleChange}
                      className="mr-2 h-5 w-5 text-[#6B3FA0] focus:ring-[#6B3FA0]"
                    />
                    <span className="text-gray-700">User</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formData.role === "admin"}
                      onChange={handleChange}
                      className="mr-2 h-5 w-5 text-[#6B3FA0] focus:ring-[#6B3FA0]"
                    />
                    <span className="text-gray-700">Admin</span>
                  </label>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full mt-6 px-6 py-3 rounded-full text-white bg-[#7c4585] shadow-sm transition-all duration-200 hover:bg-[#3d365c] hover:shadow-md text-lg font-medium disabled:opacity-70"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </motion.button>
              
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <motion.span 
                    whileHover={{ color: "#6B3FA0" }}
                    onClick={() => navigate('/login')}
                    className="text-[#6B3FA0] font-medium hover:underline cursor-pointer"
                  >
                    Login
                  </motion.span>
                </p>
              </div>
            </motion.form>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full h-full rounded-2xl overflow-hidden"
          >
            <img 
              src="/signup.jpg" 
              alt="Bus" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default Signup;