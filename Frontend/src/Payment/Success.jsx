import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate(); // ✅ move this inside the component

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-8 py-10 bg-white border border-gray-200 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-[#6B3FA0]">Payment Successful!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Your payment was successfully processed. Thank you for your purchase!
        </p>
        <button
          onClick={() => navigate("/home")}
          className="bg-[#6B3FA0] hover:bg-[#4e2c7a] text-white font-semibold px-6 py-2 rounded-full transition duration-200 transform hover:scale-105"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Success;
