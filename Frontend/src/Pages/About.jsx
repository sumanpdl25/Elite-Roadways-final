import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate(); // Declare the navigate function

  return (
    <div className="w-full h-screen bg-[#F9F9F9] flex items-center justify-center">
      <div className="w-full max-w-[90rem] h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto px-12 py-10 text-[#2A004E]">
        <h1 className="text-5xl font-bold mb-6">About Us</h1>

        <p className="text-lg text-gray-600 mb-6">
          At Elite Roadways, we’re redefining how you travel. Our platform offers
          a seamless and secure ticket booking experience designed to put you in control.
        </p>

        <ul className="list-disc text-gray-700 pl-6 space-y-3 mb-6">
          <li><strong>User-friendly:</strong> Easy for all age groups.</li>
          <li><strong>Quick booking:</strong> Reserve tickets in just a few clicks.</li>
          <li><strong>Secure payments:</strong> Your safety is our priority.</li>
          <li><strong>Reliable rides:</strong> Punctual, comfy, and safe travel.</li>
          <li><strong>Anytime access:</strong> Book or change plans whenever needed.</li>
          <li><strong>24/7 Support:</strong> Our customer service is available around the clock to assist you.</li>
          <li><strong>Multiple Payment Options:</strong> We support a variety of payment methods, making it easy for you.</li>
        </ul>

        <p className="text-md text-gray-600 mb-10">
          Join us and experience a smarter, smoother way to travel.
        </p>

        {/* Back Button */}
        <div className="flex justify-end mt-16">
          <button
            onClick={() => navigate('/')} // Navigate to the home page (or any other route)
            className="px-6 py-3 rounded-full text-white bg-[#6B3FA0] shadow-sm transition-all duration-200 hover:bg-[#4e2c7a] hover:shadow-md"
          >
            &larr; Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;