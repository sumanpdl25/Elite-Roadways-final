import React from 'react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[#F9F9F9] flex items-center justify-center">
      <div className="w-full max-w-[90rem] h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto px-12 py-10 text-[#2A004E]">
        <h1 className="text-5xl font-bold mb-6">Our Features</h1>

        <p className="text-lg text-gray-600 mb-6">
          Explore the key features of our seamless online bus ticket booking platform:
        </p>

        <ul className="list-disc text-gray-700 pl-6 space-y-3 mb-6">
          <li><strong>User-friendly platform:</strong> Our easy-to-use platform ensures a hassle-free booking experience.</li>
          <li><strong>Secure payment options:</strong> We offer a secure payment gateway for your peace of mind.</li>
          <li><strong>Updates on schedules and availability:</strong> Stay updated on bus schedules and ticket availability in real-time.</li>
          <li><strong>Wide network of destinations:</strong> Our platform offers a wide range of destinations to choose from.</li>
          <li><strong>Comfortable and luxury bus options:</strong> Choose from comfortable and luxury buses for your journey.</li>
          <li><strong>E-tickets for convenience:</strong> Receive your tickets digitally for easy access and quick boarding.</li>
          <li><strong>24/7 customer support:</strong> Our customer support team is available around the clock to assist you.</li>
        </ul>

        {/* Back Button */}
        <div className="flex justify-end mt-16">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-[#6B3FA0] text-white text-lg font-semibold rounded-full shadow-md hover:bg-[#4e2c7a] transition duration-200"
          >
            &larr; Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;