import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { generateProfiles, Profile } from "../utils/profileData";

export default function MatchingScreen() {
  const navigate = useNavigate();
  const { userData } = useUser();
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  // Generate profiles based on user data
  useEffect(() => {
    const userInterests = userData.personalInterests || [];
    const userPreferences = userData.partnerPreferences?.map(pref => pref.options[pref.selected]).filter(Boolean) || [];

    const generatedProfiles = generateProfiles(10, userInterests, userPreferences);
    setProfiles(generatedProfiles);
  }, [userData]);

  const currentProfile = profiles[currentProfileIndex];

  const handlePhotoChange = (direction: 'up' | 'down') => {
    if (!currentProfile) return;
    
    if (direction === 'up' && currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    } else if (direction === 'down' && currentPhotoIndex < currentProfile.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handleAction = (action: 'decline' | 'message' | 'save') => {
    switch (action) {
      case 'decline':
        // Move to next profile
        nextProfile();
        break;
      case 'message':
        // Navigate to messaging (not implemented yet)
        console.log('Navigate to messaging');
        break;
      case 'save':
        // Save profile for later
        console.log('Profile saved');
        nextProfile();
        break;
    }
  };

  const nextProfile = () => {
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
      setCurrentPhotoIndex(0);
    } else {
      // No more profiles - could show empty state or fetch more
      console.log('No more profiles');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (profiles.length === 0) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lovefi-purple mx-auto mb-4"></div>
          <h2 className="text-xl font-[Alata] text-black mb-2">Finding your matches...</h2>
          <p className="text-gray-600">Hold tight while we find people who share your interests!</p>
        </div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-[Alata] text-black mb-2">No more profiles</h2>
          <p className="text-gray-600">Check back later for new matches!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white flex flex-col relative max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-11 pb-6">
        <button
          onClick={handleBack}
          className="w-[52px] h-[52px] rounded-[15px] border border-lovefi-border bg-white flex items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.2071 18.7071C14.8166 19.0976 14.1834 19.0976 13.7929 18.7071L7.79289 12.7071C7.40237 12.3166 7.40237 11.6834 7.79289 11.2929L13.7929 5.29289C14.1834 4.90237 14.8166 4.90237 15.2071 5.29289C15.5976 5.68342 15.5976 6.31658 15.2071 6.70711L9.91421 12L15.2071 17.2929C15.5976 17.6834 15.5976 18.3166 15.2071 18.7071Z"
              fill="#9D74FF"
            />
          </svg>
        </button>
        
        <div className="text-center">
          <h1 className="text-2xl font-[Alata] font-normal text-black">Discover</h1>
          <p className="text-xs font-[Alata] text-black/70">Chicago, IL</p>
        </div>
        
        <div className="w-[52px]"></div> {/* Spacer */}
      </div>

      {/* Profile Card */}
      <div className="flex-1 px-10 pb-6">
        <div className="relative w-full h-[450px] rounded-[15px] overflow-hidden shadow-lg">
          {/* Background photo with opacity - offset for depth effect */}
          <div className="absolute top-4 left-8 right-0 bottom-0 opacity-30 rounded-[15px] overflow-hidden">
            <img
              src={currentProfile.photos[1] || currentProfile.photos[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main photo */}
          <div
            className="absolute top-4 left-0 right-4 bottom-0 cursor-pointer rounded-[15px] overflow-hidden"
            onTouchStart={(e) => {
              const startY = e.touches[0].clientY;
              const handleTouchEnd = (endEvent: TouchEvent) => {
                const endY = endEvent.changedTouches[0].clientY;
                const deltaY = startY - endY;
                
                if (Math.abs(deltaY) > 50) {
                  handlePhotoChange(deltaY > 0 ? 'up' : 'down');
                }
                
                document.removeEventListener('touchend', handleTouchEnd);
              };
              
              document.addEventListener('touchend', handleTouchEnd);
            }}
          >
            <img
              src={currentProfile.photos[currentPhotoIndex]}
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Distance indicator */}
          <div className="absolute top-9 left-4">
            <div className="bg-white/15 rounded-[7px] px-3 py-2 flex items-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-2">
                <path d="M6.99996 0.583374C9.73838 0.583374 11.9583 2.80329 11.9583 5.54171C11.9583 7.28329 11.1546 9.04441 9.81092 10.7629C9.33404 11.3728 8.81541 11.9415 8.28408 12.4594C8.24031 12.5021 8.19727 12.5436 8.155 12.5841L7.9112 12.8127L7.68865 13.0133L7.48987 13.185L7.36847 13.2856C7.15544 13.4592 6.85014 13.4606 6.63555 13.2889L6.50862 13.1838L6.31075 13.0129L6.08861 12.8126L5.84491 12.5841L5.71583 12.4594C5.18451 11.9415 4.66588 11.3728 4.189 10.7629C2.84534 9.04441 2.04163 7.28329 2.04163 5.54171C2.04163 2.80329 4.26154 0.583374 6.99996 0.583374Z" fill="white"/>
              </svg>
              <span className="text-white text-xs font-[Alata]">{currentProfile.distance} km</span>
            </div>
          </div>

          {/* Match percentage */}
          <div className="absolute top-9 right-4">
            <div className="bg-white/15 rounded-[7px] px-3 py-2">
              <span className="text-white text-xs font-[Alata]">{currentProfile.matchPercentage}% Match</span>
            </div>
          </div>

          {/* Photo pagination */}
          {currentProfile.photos.length > 1 && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="bg-white/15 rounded-l-lg px-2 py-4 flex flex-col space-y-2">
                {currentProfile.photos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Bottom overlay with blurred background and profile info */}
          <div className="absolute bottom-0 left-0 right-0 h-[83px] rounded-b-[15px] overflow-hidden">
            {/* Blurred background */}
            <div className="absolute inset-0">
              <img
                src={currentProfile.photos[currentPhotoIndex]}
                alt=""
                className="w-full h-full object-cover filter blur-[12px] scale-110"
              />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Profile info */}
            <div className="relative z-10 flex flex-col justify-center h-full px-4">
              <h2 className="text-white text-2xl font-[Alata] font-normal">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              <p className="text-white text-sm font-[Alata] mt-1">
                [{currentProfile.cryptoTagline}]
              </p>
            </div>
          </div>
        </div>

        {/* Common interests */}
        <div className="mt-4 px-2">
          <p className="text-black text-xs font-[Alata] leading-[150%]">
            What's in common: [{currentProfile.commonInterests.join(", ")}]
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center mt-6 relative">
          {/* Decline button */}
          <button
            onClick={() => handleAction('decline')}
            className="w-[78px] h-[78px] rounded-full bg-white shadow-lg flex items-center justify-center mr-5"
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.86612 7.86612C8.35427 7.37796 9.14573 7.37796 9.63388 7.86612L15 13.2322L20.3661 7.86612C20.8543 7.37796 21.6457 7.37796 22.1339 7.86612C22.622 8.35427 22.622 9.14573 22.1339 9.63388L16.7678 15L22.1339 20.3661C22.622 20.8543 22.622 21.6457 22.1339 22.1339C21.6457 22.622 20.8543 22.622 20.3661 22.1339L15 16.7678L9.63388 22.1339C9.14573 22.622 8.35427 22.622 7.86612 22.1339C7.37796 21.6457 7.37796 20.8543 7.86612 20.3661L13.2322 15L7.86612 9.63388C7.37796 9.14573 7.37796 8.35427 7.86612 7.86612Z"
                fill="#9D74FF"
              />
            </svg>
          </button>

          {/* Message button */}
          <button
            onClick={() => handleAction('message')}
            className="w-[99px] h-[99px] rounded-full bg-lovefi-purple shadow-lg flex items-center justify-center relative z-10"
          >
            <svg width="48" height="48" viewBox="0 0 52 54" fill="none">
              <path
                d="M46 4L24 26M46 4L32 44L24 26M46 4L6 18L24 26"
                stroke="#FFFEFE"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Save/Heart button */}
          <button
            onClick={() => handleAction('save')}
            className="w-[78px] h-[78px] rounded-full bg-white shadow-lg flex items-center justify-center ml-5"
          >
            <svg width="51" height="51" viewBox="0 0 51 51" fill="none">
              <path
                d="M15.9375 8.5C9.48267 8.5 4.25 13.7327 4.25 20.1875C4.25 31.875 18.0625 42.5 25.5 44.9716C32.9375 42.5 46.75 31.875 46.75 20.1875C46.75 13.7327 41.5173 8.5 35.0625 8.5C31.1097 8.5 27.6151 10.4623 25.5 13.4659C23.3849 10.4623 19.8903 8.5 15.9375 8.5Z"
                fill="#9D74FF"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
