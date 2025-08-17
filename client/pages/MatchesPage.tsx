import React, { useState, useEffect } from "react";
import { useUser, Profile } from "../contexts/UserContext";
import BottomNavigation from "../components/BottomNavigation";
import AnimatedPageWrapper from "../components/AnimatedPageWrapper";
import { generateProfiles } from "../utils/profileData";

export default function MatchesPage() {
  const { userData, saveProfile, removeSavedProfile, isSaved } = useUser();
  const [matches, setMatches] = useState<Profile[]>([]);

  // Generate some sample matches
  useEffect(() => {
    const userInterests = userData.personalInterests || [];
    const userPreferences = userData.partnerPreferences
      ?.map((pref) => pref.options[pref.selected])
      .filter(Boolean) || [];

    // Generate matches (profiles that have already "liked" the user back)
    const matchedProfiles = generateProfiles(6, userInterests, userPreferences);
    setMatches(matchedProfiles);
  }, [userData]);

  const handleProfileAction = (profile: Profile, action: "like" | "pass") => {
    if (action === "like") {
      saveProfile(profile);
    }
    // Remove from matches regardless of action
    setMatches(prev => prev.filter(p => p.id !== profile.id));
  };

  return (
    <AnimatedPageWrapper>
      <div className="w-full min-h-screen bg-white relative max-w-sm mx-auto">
        {/* Header */}
        <div className="px-10 pt-11 pb-6">
          <h1 className="text-[34px] font-bold text-black leading-[150%] font-[Sk-Modernist]">
            Matches
          </h1>
        </div>

        {/* Matches Grid */}
        <div className="px-10 pb-24">
          {matches.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="mb-6">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    className="mx-auto mb-4 text-gray-300"
                  >
                    <path
                      d="M25 13.33C15.795 13.33 8.33 20.795 8.33 30c0 18.33 21.67 33.33 31.67 36.67 10-3.34 31.67-18.34 31.67-36.67 0-9.205-7.465-16.67-16.67-16.67-5.205 0-9.83 2.405-12.83 6.165C38.16 15.735 33.535 13.33 28.33 13.33z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-[Alata] text-black mb-4">
                  No Matches Yet
                </h2>
                <p className="text-gray-600 font-[Alata] max-w-xs mx-auto leading-relaxed">
                  Keep swiping to find people who like you back!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-[15px]">
              {matches.map((profile) => (
                <div
                  key={profile.id}
                  className="relative w-[140px] h-[200px] rounded-[15px] overflow-hidden"
                >
                  {/* Main Photo */}
                  <img
                    src={profile.photos[0]}
                    alt={`${profile.name}'s photo`}
                    className="w-full h-full object-cover"
                  />

                  {/* Name Overlay */}
                  <div className="absolute left-4 top-[132px] z-10">
                    <span className="text-white font-bold text-base leading-[150%] font-[Sk-Modernist] drop-shadow-sm">
                      {profile.name}, {profile.age}
                    </span>
                  </div>

                  {/* Bottom Container */}
                  <div className="absolute bottom-0 left-0 w-full h-10 bg-black rounded-b-[15px]"></div>

                  {/* Blurred Photo Overlay */}
                  <div className="absolute bottom-0 left-0 w-full h-10 overflow-hidden rounded-b-[15px]">
                    <img
                      src={profile.photos[0]}
                      alt=""
                      className="w-full h-[200px] object-cover blur-[12px] transform -translate-y-[160px]"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-0 left-0 w-full h-10 flex items-center justify-center z-20">
                    {/* Decline Button */}
                    <button
                      onClick={() => handleProfileAction(profile, "pass")}
                      className="flex items-center justify-center w-6 h-6 ml-6"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.24408 5.24408C5.56951 4.91864 6.09715 4.91864 6.42259 5.24408L10 8.82149L13.5774 5.24408C13.9028 4.91864 14.4305 4.91864 14.7559 5.24408C15.0814 5.56951 15.0814 6.09715 14.7559 6.42259L11.1785 10L14.7559 13.5774C15.0814 13.9028 15.0814 14.4305 14.7559 14.7559C14.4305 15.0814 13.9028 15.0814 13.5774 14.7559L10 11.1785L6.42259 14.7559C6.09715 15.0814 5.56951 15.0814 5.24408 14.7559C4.91864 14.4305 4.91864 13.9028 5.24408 13.5774L8.82149 10L5.24408 6.42259C4.91864 6.09715 4.91864 5.56951 5.24408 5.24408Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Divider */}
                    <div className="w-px h-10 bg-white opacity-50 mx-1"></div>

                    {/* Like Button */}
                    <button
                      onClick={() => handleProfileAction(profile, "like")}
                      className="flex items-center justify-center w-6 h-6 mr-6"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.24999 3.33325C3.71869 3.33325 1.66666 5.38529 1.66666 7.91659C1.66666 12.4999 7.08332 16.6666 9.99999 17.6358C12.9167 16.6666 18.3333 12.4999 18.3333 7.91659C18.3333 5.38529 16.2813 3.33325 13.75 3.33325C12.1999 3.33325 10.8294 4.10279 9.99999 5.28067C9.17053 4.10279 7.80012 3.33325 6.24999 3.33325Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </AnimatedPageWrapper>
  );
}
