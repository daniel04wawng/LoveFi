import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import AnimatedPageWrapper from "./AnimatedPageWrapper";

interface LocationSelectionProps {
  onContinue?: () => void;
  onBack?: () => void;
}

export default function LocationSelection({ onContinue, onBack }: LocationSelectionProps) {
  const { userData, updateUserData } = useUser();
  const [location, setLocation] = useState(userData.location || "1083 Western Rd");
  const [radius, setRadius] = useState(userData.radius || 10);

  // Update context when location changes
  useEffect(() => {
    updateUserData({ location, radius });
  }, [location, radius, updateUserData]);

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
  };

  const getDisplayName = () => {
    if (userData.firstName) {
      return userData.firstName;
    }
    return "[Name]";
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <AnimatedPageWrapper direction="left">
      <div className="h-screen bg-white px-5 py-5 relative overflow-hidden">
        <div className="w-full max-w-[375px] mx-auto h-full flex flex-col">
          {/* Back Button */}
          <div className="flex-shrink-0 pt-4">
            <Link
              to="/gender-selection"
              onClick={onBack}
              className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-2xl border border-lovefi-border bg-white hover:bg-gray-50 transition-colors"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M15.2071 18.7071C14.8166 19.0976 14.1834 19.0976 13.7929 18.7071L7.79289 12.7071C7.40237 12.3166 7.40237 11.6834 7.79289 11.2929L13.7929 5.29289C14.1834 4.90237 14.8166 4.90237 15.2071 5.29289C15.5976 5.68342 15.5976 6.31658 15.2071 6.70711L9.91421 12L15.2071 17.2929C15.5976 17.6834 15.5976 18.3166 15.2071 18.7071Z" 
                  fill="#9D74FF"
                />
              </svg>
            </Link>
          </div>

          {/* Header Text */}
          <div className="pt-12 pb-8">
            <h1 className="text-lg font-alata font-normal leading-[150%] text-black">
              Thanks for the information, {getDisplayName()} Where are you{" "}
              <span className="text-lovefi-text-secondary">located?</span>
            </h1>
          </div>

          {/* Location Input Field */}
          <div className="flex-grow">
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={handleLocationChange}
                  className="w-full h-[58px] border border-lovefi-border rounded-2xl bg-white px-4 text-base font-alata font-normal text-gray-600 focus:outline-none focus:ring-2 focus:ring-lovefi-purple focus:border-transparent"
                  placeholder="Enter your location"
                />
                
                {/* Floating Label */}
                <div className="absolute -top-[9px] left-5 bg-white px-2">
                  <span className="text-xs font-alata font-normal text-black text-opacity-40">
                    Location
                  </span>
                </div>
              </div>
            </div>

            {/* Radius Slider Section */}
            <div className="mt-8">
              <div className="mb-4">
                <h3 className="text-base font-alata font-normal text-black mb-2">
                  Search Radius: {radius} km
                </h3>
              </div>
              
              {/* Radius Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #8F7CFF 0%, #8F7CFF ${(radius / 50) * 100}%, #E5E5E5 ${(radius / 50) * 100}%, #E5E5E5 100%)`
                  }}
                />
                <style jsx>{`
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #8F7CFF;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  }
                  .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #8F7CFF;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  }
                `}</style>
              </div>
              
              {/* Slider Labels */}
              <div className="flex justify-between mt-2 text-xs font-alata text-gray-500">
                <span>1 km</span>
                <span>50 km</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex-shrink-0 pb-8">
            <button
              onClick={handleContinue}
              className="w-full h-14 rounded-2xl text-white font-alata font-normal text-base transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(90deg, #8F7CFF 0%, #AC6DFF 100%)"
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </AnimatedPageWrapper>
  );
}
