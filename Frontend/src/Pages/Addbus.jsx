import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Addbus() {
  const [loading, setLoading] = useState(true);
  const [busData, setBusData] = useState({
    busnum: "",
    date: new Date().toISOString().split('T')[0],
    origin: "",
    destination: "",
    fare: "",
    departuretime: "",
    driver: "",
    driverContact: "",
    seats: 40,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/v1/users/profile", {
          withCredentials: true
        });
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Please login to access this page");
          navigate("/login");
        } else {
          toast.error("Error accessing page");
          navigate("/");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const formattedData = {
        ...busData,
        departuretime: new Date(busData.departuretime).toISOString(),
        fare: parseFloat(busData.fare),
        seats: parseInt(busData.seats, 10)
      };

      const response = await axios.post("/api/v1/bus/addbus", formattedData, {
        withCredentials: true
      });

      if (response.data.success) {
        toast.success("Bus added successfully!");
        navigate("/home", {
          state: {
            toast: {
              type: "success",
              message: "Bus added successfully!",
            },
          },
        });
      } else {
        toast.error(response.data.message || "Failed to add bus");
      }
    } catch (error) {
      console.error("Error adding bus:", error);
      toast.error(error.response?.data?.message || "Error adding bus");
      navigate("/home");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-white flex flex-col items-center dark:bg-gray-800 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 w-full h-full z-0"
      >
      </motion.div>

      <div className="absolute inset-0 bg-white"></div>

      <div className="w-full max-w-6xl p-6 z-10 relative">
        <div
          className="flex justify-between items-center mb-8 gap-x-4"
        >
          <h1 className="text-4xl font-extrabold text-black drop-shadow-lg tracking-tight">
            <span className="bg-clip-text text-transparent bg-[#4F1C51]">
              Add New Bus
            </span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/20"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-black font-bold">Bus Number</label>
                <input
                  type="text"
                  name="busnum"
                  value={busData.busnum}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-black text-black placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  placeholder="Enter bus number"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">Driver Name</label>
                <input
                  type="text"
                  name="driver"
                  value={busData.driver}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-black text-black placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  placeholder="Enter driver name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">Driver Contact</label>
                <input
                  type="text"
                  name="driverContact"
                  value={busData.driverContact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-black text-black placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  placeholder="Enter driver contact"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">Origin</label>
                <input
                  type="text"
                  name="origin"
                  value={busData.origin}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-black text-black placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  placeholder="Enter origin"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={busData.destination}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-black text-black placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  placeholder="Enter destination"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">Departure Time</label>
                <input
                  type="datetime-local"
                  name="departuretime"
                  value={busData.departuretime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-black text-black placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">Fare</label>
                <input
                  type="number"
                  name="fare"
                  value={busData.fare}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-black text-black placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  placeholder="Enter fare"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">Number of Seats</label>
                <input
                  type="number"
                  name="seats"
                  value={busData.seats}
                  onChange={handleChange}
                  required
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-black text-black placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  placeholder="Enter number of seats"
                />
              </div>
            </div>

            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="col-span-2 px-8 py-3 bg-[#7c4585] hover:to-[#3d365c] rounded-lg text-white font-medium transition duration-300 shadow-lg text-lg tracking-wide"
            >
              Add Bus
            </motion.button>
          </form>
        </motion.div>
        {/* Back Button */}
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

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={true}
        theme="dark"
        toastStyle={{
          background: "#1f2937",
          color: "#fff",
          fontSize: "16px",
          padding: "16px",
          borderRadius: "8px",
          marginTop: "1rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      />
    </div>
  );
}

export default Addbus;
