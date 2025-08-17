import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import BottomNavigation from "../components/BottomNavigation";
import AnimatedPageWrapper from "../components/AnimatedPageWrapper";

const sampleMessages = [
  { profileId: "", lastMessage: "Sticker 😍", time: "23 min", unread: 1, isTyping: false, isFromUser: false },
  { profileId: "", lastMessage: "Typing..", time: "27 min", unread: 2, isTyping: true, isFromUser: false },
  { profileId: "", lastMessage: "Ok, see you then.", time: "33 min", unread: 0, isTyping: false, isFromUser: false },
  { profileId: "", lastMessage: "You: Hey! What's up, long time..", time: "50 min", unread: 0, isTyping: false, isFromUser: true },
  { profileId: "", lastMessage: "You: Hello how are you?", time: "55 min", unread: 0, isTyping: false, isFromUser: true },
  { profileId: "", lastMessage: "You: Great I will write later..", time: "1 hour", unread: 0, isTyping: false, isFromUser: true },
];

export default function MessagesPage() {
  const { userData } = useUser();
  const [searchText, setSearchText] = useState("");

  const messages = userData.messages || [];

  return (
    <AnimatedPageWrapper>
      <div className="w-full min-h-screen bg-white relative max-w-sm mx-auto">
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
            Messages
          </h1>
        </div>

        {/* Search Bar */}
        <div className="px-10 pb-6">
          <div className="relative">
            <div className="absolute left-5 top-3.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.833313 8.75004C0.833313 4.3778 4.37774 0.833374 8.74998 0.833374C13.1222 0.833374 16.6666 4.3778 16.6666 8.75004C16.6666 10.636 16.0072 12.3679 14.9062 13.7278L17.9672 16.7887C18.2926 17.1142 18.2926 17.6418 17.9672 17.9673C17.6418 18.2927 17.1141 18.2927 16.7887 17.9673L13.7277 14.9063C12.3679 16.0072 10.6359 16.6667 8.74998 16.6667C4.37774 16.6667 0.833313 13.1223 0.833313 8.75004ZM8.74998 2.50004C5.29822 2.50004 2.49998 5.29828 2.49998 8.75004C2.49998 12.2018 5.29822 15 8.74998 15C12.2017 15 15 12.2018 15 8.75004C15 5.29828 12.2017 2.50004 8.74998 2.50004Z"
                  fill="black"
                  fillOpacity="0.4"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-12 pl-13 pr-4 border border-gray-200 rounded-[15px] bg-white text-sm font-normal placeholder-gray-400 focus:outline-none focus:border-lovefi-purple"
            />
          </div>
        </div>

        {/* Messages Section */}
        <div className="px-10 pb-24">
          <h2 className="text-lg font-normal text-black mb-6 font-[Alata]">Messages</h2>
          
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
                  When you heart someone in the matching section, they'll appear here for conversations.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              {messages.map((profile, index) => {
                const messageData = sampleMessages[index % sampleMessages.length];
                const hasUnread = messageData.unread > 0;
                const isOnline = index < 2; // First two are "online"
                
                return (
                  <div key={profile.id} className="relative">
                    <div className="flex items-center py-4 cursor-pointer hover:bg-gray-50 rounded-lg">
                      {/* Profile Photo */}
                      <div className="relative mr-4">
                        <div className={`w-14 h-14 rounded-full overflow-hidden ${isOnline ? 'ring-2 ring-lovefi-purple' : ''}`}>
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
                            <span className="text-black">{messageData.lastMessage}</span>
                          ) : messageData.isFromUser ? (
                            <>
                              <span className="text-black opacity-40">You: </span>
                              <span className="text-black">{messageData.lastMessage.replace('You: ', '')}</span>
                            </>
                          ) : (
                            <span className="text-black">{messageData.lastMessage}</span>
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

        <BottomNavigation />
      </div>
    </AnimatedPageWrapper>
  );
}
