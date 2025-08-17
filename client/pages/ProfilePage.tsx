import React from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import AnimatedPageWrapper from "../components/AnimatedPageWrapper";

export default function ProfilePage() {
  const { userData } = useUser();
  const navigate = useNavigate();

  const calculateAge = (birthday: string) => {
    if (!birthday) return "Not set";
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatBirthday = (birthday: string) => {
    if (!birthday) return "Not set";
    return new Date(birthday).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getGenderDisplay = () => {
    if (!userData.gender) return "Not set";
    if (userData.gender === "other" && userData.customGender) {
      return userData.customGender;
    }
    return userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1);
  };

  const getPartnerPreferencesDisplay = () => {
    if (!userData.partnerPreferences || userData.partnerPreferences.length === 0) {
      return "Not set";
    }
    return userData.partnerPreferences
      .map((pref) => {
        const selectedOption = pref.options[pref.selected];
        return selectedOption || "Not selected";
      })
      .join(", ");
  };

  const handleLogout = () => {
    clearUserData();
    window.location.href = "/";
  };

  return (
    <AnimatedPageWrapper>
      <div className="w-full min-h-screen bg-white relative max-w-sm mx-auto overflow-x-hidden">
        {/* Status Bar */}
        <div className="h-11 bg-white flex items-center justify-between px-5 pt-2">
          <div className="text-sm font-semibold">4:20</div>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-0.5">
              <div className="w-1 h-3 bg-black rounded-full"></div>
              <div className="w-1 h-3 bg-black rounded-full"></div>
              <div className="w-1 h-3 bg-black rounded-full"></div>
              <div className="w-1 h-3 bg-black rounded-full"></div>
            </div>
            <svg width="15" height="11" viewBox="0 0 15 11" className="text-black">
              <path fill="currentColor" d="M5.44824 8.75745C6.7289 7.67518 8.60508 7.67518 9.88574 8.75745C9.95009 8.81566 9.98749 8.89827 9.98926 8.98499C9.99092 9.07162 9.95644 9.15475 9.89453 9.21545L7.88965 11.2379C7.83087 11.2973 7.7506 11.3307 7.66699 11.3307C7.5834 11.3307 7.5031 11.2973 7.44434 11.2379L5.43848 9.21545C5.37688 9.15475 5.34303 9.07141 5.34473 8.98499C5.34656 8.8983 5.3839 8.8156 5.44824 8.75745Z"/>
            </svg>
            <div className="w-6 h-3 border border-black rounded-sm opacity-35 relative">
              <div className="w-4 h-1.5 bg-black rounded-sm absolute top-0.5 left-0.5"></div>
              <div className="w-0.5 h-1 bg-black opacity-40 absolute -right-1 top-1"></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="px-11 pt-4 pb-6">
          <h1 className="text-[34px] font-normal text-black leading-[150%] font-[Alata]">
            Profile
          </h1>
        </div>

        {/* Profile Content */}
        <div className="px-10 pb-32">
          {/* Profile Picture Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-normal text-black font-[Alata]">Photos</h2>
              <button
                onClick={() => navigate('/photo-upload')}
                className="text-lovefi-purple font-[Alata] text-sm hover:underline"
              >
                Edit
              </button>
            </div>
            {userData.photos && userData.photos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {userData.photos.slice(0, 4).map((photo, index) => (
                  <div key={index} className="aspect-square rounded-[15px] overflow-hidden">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Profile photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-32 border-2 border-dashed border-gray-200 rounded-[15px] flex items-center justify-center">
                <span className="text-gray-400 font-[Alata]">No photos uploaded</span>
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-normal text-black font-[Alata]">Basic Information</h2>
              <button
                onClick={() => navigate('/user-info')}
                className="text-lovefi-purple font-[Alata] text-sm hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-black font-[Alata]">Name</span>
                <span className="text-black/70 font-[Alata]">
                  {userData.firstName && userData.lastName
                    ? `${userData.firstName} ${userData.lastName}`
                    : userData.firstName || "Not set"}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-black font-[Alata]">Age</span>
                <span className="text-black/70 font-[Alata]">
                  {calculateAge(userData.birthday || "")}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-black font-[Alata]">Birthday</span>
                <span className="text-black/70 font-[Alata]">
                  {formatBirthday(userData.birthday || "")}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-black font-[Alata]">Gender</span>
                <span className="text-black/70 font-[Alata]">
                  {getGenderDisplay()}
                </span>
              </div>
            </div>
          </div>

          {/* Location & Preferences */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-normal text-black font-[Alata]">Location & Search</h2>
              <button
                onClick={() => navigate('/location-selection')}
                className="text-lovefi-purple font-[Alata] text-sm hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-black font-[Alata]">Location</span>
                <span className="text-black/70 font-[Alata]">
                  {userData.location || "Not set"}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-black font-[Alata]">Search Radius</span>
                <span className="text-black/70 font-[Alata]">
                  {userData.radius ? `${userData.radius} km` : "Not set"}
                </span>
              </div>
            </div>
          </div>

          {/* Partner Preferences */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-normal text-black font-[Alata]">Partner Preferences</h2>
              <button
                onClick={() => navigate('/partner-preferences')}
                className="text-lovefi-purple font-[Alata] text-sm hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="py-3 border-b border-gray-100">
              <span className="text-black/70 font-[Alata] text-sm leading-relaxed">
                {getPartnerPreferencesDisplay()}
              </span>
            </div>
          </div>

          {/* Personal Interests */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-normal text-black font-[Alata]">Personal Interests</h2>
              <button
                onClick={() => navigate('/personal-interests')}
                className="text-lovefi-purple font-[Alata] text-sm hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="py-3">
              {userData.personalInterests && userData.personalInterests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userData.personalInterests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-lovefi-purple/10 text-lovefi-purple px-3 py-1 rounded-full text-sm font-[Alata]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-black/70 font-[Alata]">Not set</span>
              )}
            </div>
          </div>

          {/* Wallet Information */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-normal text-black font-[Alata]">Wallet</h2>
              <button
                onClick={() => navigate('/wallet-connect')}
                className="text-lovefi-purple font-[Alata] text-sm hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="py-3 border-b border-gray-100">
              {userData.wallet ? (
                <div className="flex items-center">
                  {userData.wallet.logo && (
                    <img
                      src={userData.wallet.logo}
                      alt={userData.wallet.name}
                      className="w-5 h-5 mr-2"
                    />
                  )}
                  <span className="text-black/70 font-[Alata]">
                    {userData.wallet.name}
                  </span>
                </div>
              ) : (
                <span className="text-black/70 font-[Alata]">Not connected</span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation as part of normal flow */}
        <div className="bg-white border-t-4 border-gray-400 shadow-xl py-6 px-4 fixed bottom-0 left-0 right-0 max-w-sm mx-auto">
          <div className="grid grid-cols-3 gap-0">
            <button
              onClick={() => (window.location.href = "/matching")}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <div className="text-3xl mb-2">♥</div>
              <span className="text-sm font-medium">Matching</span>
            </button>
            <button
              onClick={() => (window.location.href = "/messages")}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <div className="text-3xl mb-2">💬</div>
              <span className="text-sm font-medium">Messages</span>
            </button>
            <button
              onClick={() => (window.location.href = "/profile")}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-lg text-purple-600 bg-purple-100"
            >
              <div className="text-3xl mb-2">👤</div>
              <span className="text-sm font-medium">Profile</span>
            </button>
          </div>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[20px] p-6 max-w-sm w-full mx-auto">
              <h3 className="text-xl font-[Alata] text-black mb-4 text-center">
                Sign Out?
              </h3>
              <p className="text-black/70 font-[Alata] text-center mb-6">
                Are you sure you want to sign out? You'll need to reconnect your wallet to sign back in.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 h-12 border border-gray-300 rounded-[15px] text-black font-[Alata] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 h-12 bg-red-600 rounded-[15px] text-white font-[Alata] hover:bg-red-700"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatedPageWrapper>
  );
}
