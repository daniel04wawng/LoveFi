import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import BottomNavigation from "../components/BottomNavigation";
import AnimatedPageWrapper from "../components/AnimatedPageWrapper";

const sampleMessages = [
  {
    profileId: "",
    lastMessage: "Sticker 😍",
    time: "23 min",
    unread: 1,
    isTyping: false,
    isFromUser: false,
  },
  {
    profileId: "",
    lastMessage: "Typing..",
    time: "27 min",
    unread: 2,
    isTyping: true,
    isFromUser: false,
  },
  {
    profileId: "",
    lastMessage: "Ok, see you then.",
    time: "33 min",
    unread: 0,
    isTyping: false,
    isFromUser: false,
  },
  {
    profileId: "",
    lastMessage: "You: Hey! What's up, long time..",
    time: "50 min",
    unread: 0,
    isTyping: false,
    isFromUser: true,
  },
  {
    profileId: "",
    lastMessage: "You: Hello how are you?",
    time: "55 min",
    unread: 0,
    isTyping: false,
    isFromUser: true,
  },
  {
    profileId: "",
    lastMessage: "You: Great I will write later..",
    time: "1 hour",
    unread: 0,
    isTyping: false,
    isFromUser: true,
  },
];

export default function MessagesPage() {
  const { userData } = useUser();
  const [searchText, setSearchText] = useState("");

  const messages = userData.messages || [];

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
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              className="text-black"
            >
              <path
                fill="currentColor"
                d="M5.44824 8.75745C6.7289 7.67518 8.60508 7.67518 9.88574 8.75745C9.95009 8.81566 9.98749 8.89827 9.98926 8.98499C9.99092 9.07162 9.95644 9.15475 9.89453 9.21545L7.88965 11.2379C7.83087 11.2973 7.7506 11.3307 7.66699 11.3307C7.5834 11.3307 7.5031 11.2973 7.44434 11.2379L5.43848 9.21545C5.37688 9.15475 5.34303 9.07141 5.34473 8.98499C5.34656 8.8983 5.3839 8.8156 5.44824 8.75745Z"
              />
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
            Messages
          </h1>
        </div>

        {/* Search Bar */}
        <div className="px-10 pb-6">
          <div className="relative">
            <div className="absolute left-5 top-3.5 text-gray-400 pointer-events-none">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="9.16667"
                  cy="9.16667"
                  r="7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M15.5 15.5L19.5 19.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-12 pl-12 pr-4 border border-[#E8E6EA] rounded-[15px] bg-white text-sm font-normal placeholder-black placeholder-opacity-40 focus:outline-none focus:border-lovefi-purple"
            />
          </div>
        </div>

        {/* Messages Section */}
        <div className="px-10 pb-8">
          <h2 className="text-lg font-normal text-black mb-6 font-[Alata]">
            Messages
          </h2>

          {messages.length === 0 ? (
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
                      d="M70 30C70 58.719 47.7188 82 20 82C15.0133 82 2 82 2 82C2 82 2 63.0361 2 50C2 21.281 24.2812 -2 52 -2C57.8688 -2 70 -2 70 30Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-[Alata] text-black mb-4">
                  No Messages Yet
                </h2>
                <p className="text-gray-600 font-[Alata] max-w-xs mx-auto leading-relaxed">
                  When you heart someone in the matching section, they'll appear
                  here for conversations.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              {messages.map((profile, index) => {
                const messageData =
                  sampleMessages[index % sampleMessages.length];
                const hasUnread = messageData.unread > 0;
                const isOnline = index < 2; // First two are "online"

                return (
                  <div key={profile.id} className="relative">
                    <div className="flex items-center py-4 cursor-pointer hover:bg-gray-50 rounded-lg">
                      {/* Profile Photo */}
                      <div className="relative mr-4">
                        <div
                          className={`w-14 h-14 rounded-full overflow-hidden ${isOnline ? "ring-2 ring-lovefi-purple" : ""}`}
                        >
                          <img
                            src={profile.photos[0]}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-normal text-black font-[Alata] truncate">
                            {profile.name}
                          </h3>
                          <span className="text-xs text-gray-400 font-[Alata] ml-2">
                            {messageData.time}
                          </span>
                        </div>
                        <p className="text-sm text-black font-normal leading-[150%] truncate">
                          {messageData.isTyping ? (
                            <span className="text-black">
                              {messageData.lastMessage}
                            </span>
                          ) : messageData.isFromUser ? (
                            <>
                              <span className="text-black opacity-40">
                                You:{" "}
                              </span>
                              <span className="text-black">
                                {messageData.lastMessage.replace("You: ", "")}
                              </span>
                            </>
                          ) : (
                            <span className="text-black">
                              {messageData.lastMessage}
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Unread Indicator */}
                      {hasUnread && (
                        <div className="ml-3">
                          <div className="w-5 h-5 bg-lovefi-purple rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-normal font-[Alata]">
                              {messageData.unread}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    {index < messages.length - 1 && (
                      <div className="ml-[66px] h-px bg-gray-200"></div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Navigation as part of normal flow */}
        <div className="bg-white border-t-4 border-gray-400 shadow-xl py-6 px-4 mt-8">
          <div className="grid grid-cols-3 gap-0 max-w-sm mx-auto">
            <button
              onClick={() => (window.location.href = "/matching")}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <div className="text-3xl mb-2">♥</div>
              <span className="text-sm font-medium">Matching</span>
            </button>
            <button
              onClick={() => (window.location.href = "/messages")}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-lg text-purple-600 bg-purple-100"
            >
              <div className="text-3xl mb-2">💬</div>
              <span className="text-sm font-medium">Messages</span>
            </button>
            <button
              onClick={() => (window.location.href = "/profile")}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <div className="text-3xl mb-2">👤</div>
              <span className="text-sm font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </AnimatedPageWrapper>
  );
}
