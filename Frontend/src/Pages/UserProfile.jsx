import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view profile');
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/v1/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-black relative overflow-hidden">
      <div 
        className="fixed top-0 left-0 w-screen h-screen z-0 bg-white"
      >
      </div>
      <div className="relative z-10 max-w-6xl mx-auto p-6 min-h-screen">
        <div
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-extrabold text-black drop-shadow-lg tracking-tight">
            <span className="bg-clip-text text-transparent bg-[#4F1C51]">
              User Profile
            </span>
          </h1>
        </div>

        <div
          className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-black">
                <span className="bg-clip-text text-transparent bg-[#4F1C51]">
                  Personal Information
                </span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-black w-32">Username:</span>
                  <span className="text-black">{user?.username}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-black w-32">Email:</span>
                  <span className="text-black">{user?.email}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-black w-32">Role:</span>
                  <span className="text-black capitalize">{user?.role}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-black">
                <span className="bg-clip-text text-transparent bg-[#4F1C51]">
                  Account Actions
                </span>
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="w-full py-3 px-6 bg-[#7c4585] text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => navigate('/home')}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Home
      </button>
    </div>
  );
};

export default UserProfile; 