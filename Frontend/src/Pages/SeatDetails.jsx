import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

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
    <div className="min-h-screen bg-white text-[#4F1C51] relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto p-6 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-black drop-shadow-lg tracking-tight">
            <span className="bg-clip-text text-transparent bg-[#4F1C51]">Seat Details</span>
          </h1>
        </div>

        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bus Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-black">Bus Information</h2>
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
              <h2 className="text-2xl font-bold text-black">Booking Details</h2>
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
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                      <h2 className="text-3xl font-bold mb-6 text-center">Complete Your Booking</h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block mb-2">Pickup Location</label>
                          <input
                            type="text"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            placeholder="Enter pickup location"
                            className="w-full px-4 py-3 rounded bg-white/5 border border-black text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          />
                        </div>
                        <div>
                          <label className="block mb-2">Phone Number</label>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-3 rounded bg-white/5 border border-black text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xl font-semibold">Total: NRS {fare}</div>
                          <div
                            onClick={handleBooking}
                            className="px-8 py-3 bg-[#7c4585] hover:bg-[#3d365c] text-white font-semibold rounded-lg"

                          >
                            Book Now
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SeatDetails;