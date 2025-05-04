import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/v1/users/login', formData);

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                toast.success('Login successful! Redirecting...', {
                    position: 'top-right',
                    autoClose: 2000,
                });

                setTimeout(() => navigate('/home'), 2000);
            } else {
                toast.error(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Login failed. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="w-full h-screen bg-[#F9F9F9] flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex" style={{ height: '75vh' }}>
                {/* Left Side - Login Form */}
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
                            Welcome Back
                        </motion.h1>
                        
                        <motion.form 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            onSubmit={handleSubmit} 
                            className="space-y-6"
                        >
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
                            
                            <div className="relative">
                                <label className="block text-lg font-medium text-gray-700 mb-2">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B3FA0] focus:border-transparent pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-[42px] text-gray-500 hover:text-[#3d365c]"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full mt-6 px-6 py-3 rounded-full text-white bg-[#6B3FA0] shadow-sm transition-all duration-200 hover:bg-[#4e2c7a] hover:shadow-md text-lg font-medium"
                            >
                                Login
                            </motion.button>
                            
                            <div className="text-center pt-4">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <motion.span 
                                        whileHover={{ color: "#6B3FA0" }}
                                        onClick={() => navigate('/signup')}
                                        className="text-[#6B3FA0] font-medium hover:underline cursor-pointer"
                                    >
                                        Sign up
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
                            src="/login.jpg" 
                            alt="Bus" 
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </motion.div>
                </div>
            </div>
            
            <ToastContainer />
        </div>
    );
}

export default Login;