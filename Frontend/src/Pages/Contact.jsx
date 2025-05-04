import React from 'react';  
import { useNavigate } from 'react-router-dom';

// Import icons from Phosphor Icons React package
import { FacebookLogo, InstagramLogo, YoutubeLogo } from '@phosphor-icons/react';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-[90rem] h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex relative">
        
        {/* Left Section: Profile Card */}
        <div className="w-1/2 flex flex-col items-center justify-center p-10 text-[#2A004E]">
          <div className="p-8 rounded-xl text-center mb-6 relative">
            <img
              src="/profile-picture.png"
              alt="User Profile"
              className="w-64 h-64 rounded-full object-cover mx-25"
            />
            <h2 className="text-2xl font-bold mb-2">Sushil Adhikari</h2>
            <p className="text-lg mb-4">@sushil_adhikari87</p>
          </div>
        </div>

        {/* Right Section: Contact Info and Social Media Links */}
        <div className="w-1/2 flex flex-col justify-center p-10 text-[#2A004E]">
          {/* Social Media Links */}
          <div className="flex flex-col items-start mb-6">
            <a
              href="https://www.facebook.com/sushil.adk.9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2A004E] hover:text-[#4267B2] transition-colors flex items-center mb-3"
            >
              <FacebookLogo size={32} />
              <span className="ml-2">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/sushil_adhikari87/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2A004E] hover:text-pink-500 transition-colors flex items-center mb-3"
            >
              <InstagramLogo size={32} />
              <span className="ml-2">Instagram</span>
            </a>
            <a
              href="https://youtube.com/@puranchourvlogs7930"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2A004E] hover:text-red-600 transition-colors flex items-center mb-3"
            >
              <YoutubeLogo size={32} />
              <span className="ml-2">YouTube</span>
            </a>
          </div>

          {/* Contact Info */}
          <div className="text-left text-[#2A004E]">
            <div className="mb-2">
              <h3 className="font-semibold">Phone:</h3>
              <p className="ml-2">9814129965</p>
            </div>
            <div>
              <h3 className="font-semibold">Email:</h3>
              <p className="ml-2">adhikarisushil219@gmail.com</p>
            </div>
            <div>
              <h3 className="font-semibold">Contact Us:</h3>
              <p className="ml-2">eliteroadways2024@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Back Button inside the Card */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => navigate('/')}
                  className="px-6 py-3 rounded-full text-white bg-[#6B3FA0] shadow-sm transition-all duration-200 hover:bg-[#4e2c7a] hover:shadow-md"
          >
            &larr; Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;