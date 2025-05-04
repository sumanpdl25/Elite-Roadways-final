import React from 'react';
import { Link } from 'react-router-dom';

const first = () => {
  return (
    <div className="w-full h-screen bg-[#F9F9F9] flex items-center justify-center">
      <div className="w-full max-w-[90rem] h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">

<div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
  <img src="/logo.jpg" alt="Logo" className="w-20 h-20" />
  <nav className="flex space-x-6">
    {['About', 'Features', 'Contact'].map((item) => (
      <Link
        key={item}
        to={`/${item.toLowerCase()}`}
        className="text-[#7c4585] text-lg font-semibold px-4 py-2 rounded-md transition-all duration-200 hover:bg-[#3d365c] hover:text-white"
      >
        {item}
      </Link>
    ))}
  </nav>
</div>

        
        <div className="flex flex-1">
        
          <div className="w-1/2 p-12 flex flex-col justify-center">
            <div>
              <h1 className="text-5xl font-bold text-[#2A004E] mb-4">Reclaim your time</h1>
              <p className="text-lg text-gray-600 mb-8">
      Ready to hit the road? Say goodbye to the hassle of long queues and last-minute
      surprises. With our easy-to-use platform, booking your bus ticket is as simple
      as a few taps. Discover schedules, check prices, and secure your seat—all in
      minutes. Travel smart, travel easy.
    </p>

              <div className="flex space-x-4">
                <Link
                  to="/signup"
                  className="px-6 py-3 rounded-full text-white bg-[#7c4585] shadow-sm transition-all duration-200 hover:bg-[#3d365c] hover:shadow-md"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-full border border-[#6B3FA0] text-[#7c4585] transition-all duration-200 hover:bg-[#3d365c] hover:text-white hover:shadow-md"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>


{/* Right Image */}
<div className="w-1/2 p-8 flex items-start justify-center ml-auto mr-[-50px]">
  <img 
    src="/home-image.png" 
    alt="Bus travel illustration" 
    className="w-3/4 h-auto object-contain rounded-lg mt-[-20px]"
  />
</div>
        </div>
      </div>
    </div>
  );
};

export default first;