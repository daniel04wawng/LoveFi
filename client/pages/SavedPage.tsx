import React, { useState } from "react";
import { useUser, Profile } from "../contexts/UserContext";
import BottomNavigation from "../components/BottomNavigation";
import ProfileCard from "../components/ProfileCard";
import AnimatedPageWrapper from "../components/AnimatedPageWrapper";

export default function SavedPage() {
  const { userData, removeSavedProfile } = useUser();
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const savedProfiles = userData.savedProfiles || [];

  const handleRemoveProfile = (profileId: string) => {
    removeSavedProfile(profileId);
  };

  const handleProfileClick = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const closeProfileDetail = () => {
    setSelectedProfile(null);
  };

  if (savedProfiles.length === 0) {
    return (
      <AnimatedPageWrapper>
        <div className="w-full h-screen bg-white relative">
          <div className="pb-20 flex items-center justify-center h-full">
            <div className="text-center px-6">
              <div className="mb-6">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  className="mx-auto mb-4 text-gray-300"
                >
                  <path
                    d="M40 70l-4.83-4.4C16.67 51 6.67 41.67 6.67 30c0-10.33 8-18.33 18.33-18.33 5.8 0 11.37 2.7 15 6.97 3.63-4.27 9.2-6.97 15-6.97C65.33 11.67 73.33 19.67 73.33 30c0 11.67-10 21-28.5 35.6L40 70z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-[Alata] text-black mb-4">
                No Saved Profiles
              </h1>
              <p className="text-gray-600 font-[Alata] max-w-xs mx-auto leading-relaxed">
                When you heart someone in the discover section, they'll appear
                here for you to revisit anytime.
              </p>
            </div>
          </div>
          <BottomNavigation />
        </div>
      </AnimatedPageWrapper>
    );
  }

  return (
    <AnimatedPageWrapper>
      <div className="w-full min-h-screen bg-white relative max-w-sm mx-auto">
        {/* Header */}
        <div className="px-6 pt-11 pb-6">
          <h1 className="text-2xl font-[Alata] text-black text-center">
            Saved Profiles
          </h1>
          <p className="text-xs font-[Alata] text-gray-600 text-center mt-1">
            {savedProfiles.length} profile
            {savedProfiles.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {/* Saved Profiles Grid */}
        <div className="px-4 pb-24">
          <div className="grid grid-cols-1 gap-4">
            {savedProfiles.map((profile) => (
              <div
                key={profile.id}
                onClick={() => handleProfileClick(profile)}
                className="cursor-pointer transform transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ProfileCard
                  profile={profile}
                  onRemove={handleRemoveProfile}
                  showRemoveButton={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Profile Detail Modal */}
        {selectedProfile && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[20px] w-full max-w-sm max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-lg font-[Alata] text-black">
                  {selectedProfile.name}
                </h2>
                <button
                  onClick={closeProfileDetail}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-gray-600"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.195 4.195a.75.75 0 011.06 0L8 6.94l2.745-2.745a.75.75 0 111.06 1.06L9.06 8l2.745 2.745a.75.75 0 11-1.06 1.06L8 9.06l-2.745 2.745a.75.75 0 01-1.06-1.06L6.94 8 4.195 5.255a.75.75 0 010-1.06z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>

              {/* Photo Carousel */}
              <div className="relative h-80">
                <img
                  src={selectedProfile.photos[0]}
                  alt={`${selectedProfile.name}'s photo`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile Details */}
              <div className="p-4 max-h-60 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-[Alata] text-black">
                      {selectedProfile.name}, {selectedProfile.age}
                    </h3>
                    <p className="text-sm font-[Alata] text-gray-600">
                      {selectedProfile.distance}km away •{" "}
                      {selectedProfile.matchPercentage}% match
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-[Alata] text-gray-700 mb-3">
                    {selectedProfile.cryptoTagline}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-[Alata] text-black font-medium mb-2">
                    What's in common:
                  </h4>
                  <p className="text-xs font-[Alata] text-gray-600">
                    [{selectedProfile.commonInterests.join(", ")}]
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-[Alata] text-black font-medium mb-2">
                    Interests:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.personalInterests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded-md text-xs font-[Alata] text-gray-700"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => handleRemoveProfile(selectedProfile.id)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-[Alata] text-sm hover:bg-gray-200 transition-colors"
                  >
                    Remove
                  </button>
                  <button className="flex-1 bg-lovefi-purple text-white py-3 rounded-lg font-[Alata] text-sm hover:bg-lovefi-purple/90 transition-colors">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <BottomNavigation />
      </div>
    </AnimatedPageWrapper>
  );
}
