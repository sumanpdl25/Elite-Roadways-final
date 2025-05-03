import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const SeatDetails = () => {
  const { seatId } = useParams();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);
  const [busInfo, setBusInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookedUser, setBookedUser] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fare, setFare] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await axios.get("/api/v1/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data.user;
        setUserProfile(user);
        setIsAdmin(user.role === "admin");
        setPhoneNumber(user.phone || "");
        setPickupLocation(user.address || "");
      } catch (err) {
        console.error("Profile fetch error:", err);
        toast.error("Failed to fetch user profile");
      }
    };

    const fetchBusInfo = async () => {
      try {
        const busId = localStorage.getItem("selectedBusId");
        if (!busId) return navigate("/home");

        const res = await axios.get(`/api/v1/bus/getbus/${busId}`);
        const bus = res.data.bus;

        setBusInfo(bus);
        setFare(bus.fare);

        if (bus.bookedBy && bus.bookedBy[seatId]) {
          const booking = bus.bookedBy[seatId];
          setBookingDetails(booking);
          setBookedUser({
            name: booking.userId?.username || "Booked User",
            contactNumber: booking.contactNumber,
            pickupLocation: booking.pickupLocation,
          });
        }
      } catch (err) {
        console.error("Bus info fetch error:", err);
        toast.error("Failed to fetch bus information");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchBusInfo();
  }, [navigate, seatId]);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const busId = localStorage.getItem("selectedBusId");
      const selectedSeat = localStorage.getItem("selectedSeat");

      if (!busId || !selectedSeat) {
        return navigate("/home", {
          state: { toast: { type: "error", message: "Missing booking information" } },
        });
      }

      if (!pickupLocation || !phoneNumber) {
        return toast.error("Please fill in all required fields", {
          duration: 2000,
          position: "top-center",
          style: {
            background: "#ef4444",
            color: "#fff",
            fontSize: "16px",
            padding: "16px",
            borderRadius: "8px",
          },
        });
      }

      const res = await axios.post(
        "/api/v1/bus/bookseat",
        {
          busId,
          seatNumber: selectedSeat,
          userId: userProfile._id,
          pickupLocation,
          contactNumber: phoneNumber,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        localStorage.removeItem("selectedBusId");
        localStorage.removeItem("selectedSeat");
        navigate("/payment", { state: { totalAmount: fare } });
      }
    } catch (err) {
      console.error("Booking error:", err);
      navigate("/home", {
        state: {
          toast: {
            type: "error",
            message: err.response?.data?.message || "❌ Booking Failed! Please try again.",
          },
        },
      });
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
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="fixed top-0 left-0 w-screen h-screen z-0">
        <img src="/bus1.jpg" alt="Bus" className="w-full h-full object-cover opacity-40" />
      </motion.div>

      <div className="fixed inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/80 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto p-6 min-h-screen">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-green-400">Seat Details</span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bus Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white/90">Bus Information</h2>
              <div className="space-y-4">
                <p>Seat Number: {seatId}</p>
                <p>Bus Number: {busInfo?.busnum}</p>
                <p>Driver: {busInfo?.driver}</p>
                <p>Route: {busInfo?.origin} → {busInfo?.destination}</p>
                <p>Departure: {new Date(busInfo?.departuretime).toLocaleString()}</p>
                <p>Fare: NRS {fare}</p>
              </div>
            </div>

            {/* Booking Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white/90">Booking Details</h2>
              {isAdmin && bookingDetails ? (
                <div className="space-y-4">
                  <p>Booked By: {bookedUser?.name}</p>
                  <p>Contact: {bookingDetails.contactNumber}</p>
                  <p>Pickup: {bookingDetails.pickupLocation}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <p>Status: {bookingDetails ? "Booked" : "Available"}</p>
                  {!bookingDetails && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl">
                      <h2 className="text-3xl font-bold mb-6 text-center">Complete Your Booking</h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block mb-2">Pickup Location</label>
                          <input
                            type="text"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            placeholder="Enter pickup location"
                            className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          />
                        </div>
                        <div>
                          <label className="block mb-2">Phone Number</label>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xl font-semibold">Total: NRS {fare}</div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleBooking}
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white font-semibold rounded-lg shadow-lg"
                          >
                            Book Now
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SeatDetails;
