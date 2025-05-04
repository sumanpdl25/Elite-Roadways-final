import { useNavigate } from 'react-router-dom';

function Failure() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="text-center px-8 py-10 bg-white border border-gray-200 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-red-500 mb-4">Failed</h1>
        <p className="text-gray-700 mb-6">Something went wrong. Please try again.</p>
        <button
          onClick={handleBackClick}
          className="bg-[#6B3FA0] hover:bg-[#4e2c7a] text-white font-semibold px-6 py-2 rounded-full transition duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Failure;