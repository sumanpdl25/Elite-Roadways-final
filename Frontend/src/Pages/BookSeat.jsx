import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookSeat({ selectedSeat, onSelectSeat, busId, bookedSeats, isAdmin }) {
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [busDetails, setBusDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [totalFare, setTotalFare] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { busId, userId, pickupLocation } = location.state;

        const busResponse = await axios.get(`/api/v1/bus/getbus/${busId}`);
        if (!busResponse.data.success) throw new Error("Failed to fetch bus details");
        setBusDetails(busResponse.data.bus);

        const userResponse = await axios.get("/api/v1/users/profile");
        if (!userResponse.data?.user) throw new Error("Failed to fetch user details");
        setUserDetails(userResponse.data.user);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error loading booking page");
        navigate("/");
      }
    };

    fetchData();
  }, [location.state, navigate]);

  const handleSeatClick = (seat) => {
    if (!seat.available && !isAdmin) {
      toast.error("This seat is already booked");
      return;
    }

    onSelectSeat(seat);
    localStorage.setItem("selectedBusId", busId);
    localStorage.setItem("selectedSeat", seat.id);
    navigate(`/seat-details/${seat.id}`);
  };

  useEffect(() => {
    if (busDetails?.fare) {
      setTotalFare(selectedSeats.length * busDetails.fare);
    }
  }, [selectedSeats, busDetails]);

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    try {
      const response = await axios.post(
        "/api/v1/bus/bookseat",
        {
          busId: busDetails._id,
          seats: selectedSeats,
          pickupLocation: location.state.pickupLocation,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Seats booked successfully!");
        navigate("/", {
          state: {
            toast: {
              type: "success",
              message: "Seats booked successfully!",
            },
          },
        });
      } else {
        toast.error(response.data.message || "Failed to book seats");
      }
    } catch (error) {
      console.error("Error booking seats:", error);
      toast.error(error.response?.data?.message || "Error booking seats");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const createSeats = () => {
    const seats = [];
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 4; col++) {
        const seatNumber = `${row}${String.fromCharCode(64 + col)}`;
        seats.push({
          id: seatNumber,
          number: seatNumber,
          available: !bookedSeats.includes(seatNumber),
          selected: seatNumber === selectedSeat,
        });
      }
    }
    return seats;
  };

  const seats = createSeats();

  return (
    <div className="min-h-screen bg-white text-black relative">
      <div className="relative z-10 max-w-6xl mx-auto p-6 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-[#4F1C51] tracking-tight">
            Select Your Seat
          </h1>
        </div>

        <div className="bg-gray-100 p-8 rounded-2xl shadow-xl border border-gray-300">
          <div className="bus-layout relative w-full max-w-4xl mx-auto">

{/* Bus front */}
<div className="bus-front h-8 bg-blue-600/40 backdrop-blur-md rounded-t-lg flex items-center justify-center border-b border-white/10">
            </div>
            
            {/* Driver's area with door */}
            <div className="driver-area h-20 bg-gray-300/40 backdrop-blur-md flex items-center justify-between border-b border-white/10">
              {/* Door - Left side */}
              <div className="pl-8">
                <div className="w-14 h-16 bg-gray-400/80 rounded-lg flex flex-col overflow-hidden border-2 border-gray-500/50">
                  {/* Door window */}
                  <div className="w-full h-8 bg-blue-300/30 border-b border-gray-500/50"></div>
                  {/* Door bottom part */}
                  <div className="w-full h-8 relative flex items-center">
                    {/* Door handle */}
                    <div className="absolute right-2 w-2 h-6 bg-gray-600/80 rounded-full flex items-center justify-center">
                      <div className="w-1 h-4 bg-gray-700/80 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver - Right side with steering wheel */}
              <div className="pr-8">
                <div className="w-16 h-16 bg-gray-400/80 rounded-full flex items-center justify-center relative">
                  {/* Steering wheel */}
                  <div className="w-12 h-12 border-4 border-gray-600 rounded-full flex items-center justify-center">
                    {/* Steering wheel spokes */}
                    <div className="absolute w-8 h-1 bg-gray-600 rounded-full"></div>
                    <div className="absolute w-8 h-1 bg-gray-600 rounded-full transform rotate-90"></div>
                    <div className="absolute w-8 h-1 bg-gray-600 rounded-full transform rotate-45"></div>
                    <div className="absolute w-8 h-1 bg-gray-600 rounded-full transform -rotate-45"></div>
                    {/* Center of steering wheel */}
                    <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seats layout */}
            <div className="seating-area p-4">
              <div className="all-rows grid grid-cols-9 gap-2">
                <div className="col-span-4 grid grid-cols-2 gap-4">
                  {seats.filter((_, index) => index % 4 < 2).map((seat, index) => (
                    <button
                      key={`left-${index}`}
                      onClick={() => handleSeatClick(seat)}
                      className={`h-20 rounded-lg border-2 flex items-center justify-center relative shadow-md ${
                        seat.selected
                          ? "border-blue-500 bg-blue-100"
                          : seat.available
                          ? "border-green-500 bg-green-100"
                          : "border-red-500 bg-red-100"
                      }`}
                      disabled={!seat.available && !isAdmin}
                    >
                      <span className="font-bold text-lg">{seat.number}</span>
                    </button>
                  ))}
                </div>

                <div className="col-span-1 flex items-center justify-center">
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="w-1/2 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                </div>

                <div className="col-span-4 grid grid-cols-2 gap-4">
                  {seats.filter((_, index) => index % 4 >= 2).map((seat, index) => (
                    <button
                      key={`right-${index}`}
                      onClick={() => handleSeatClick(seat)}
                      className={`h-20 rounded-lg border-2 flex items-center justify-center relative shadow-md ${
                        seat.selected
                          ? "border-blue-500 bg-blue-100"
                          : seat.available
                          ? "border-green-500 bg-green-100"
                          : "border-red-500 bg-red-100"
                      }`}
                      disabled={!seat.available && !isAdmin}
                    >
                      <span className="font-bold text-lg">{seat.number}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Seat Status Legend - Right-aligned */}
<div className="mt-6 flex justify-end pr-4">
  <div className="inline-flex items-center gap-6 px-6 py-2 rounded-full border border-gray-200 shadow-sm">
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 rounded-md border-2 border-green-500 bg-green-100"></div>
      <span className="text-xs font-medium text-gray-700">Available</span>
    </div>
    
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 rounded-md border-2 border-red-500 bg-red-100"></div>
      <span className="text-xs font-medium text-gray-700">Booked</span>
    </div>
  </div>
</div>
          </div>
        </div>
        <ToastContainer />
      </div>
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
  );
}

BookSeat.propTypes = {
  selectedSeat: PropTypes.string,
  onSelectSeat: PropTypes.func.isRequired,
  busId: PropTypes.string,
  bookedSeats: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool,
};

export default BookSeat;
