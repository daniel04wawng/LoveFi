import React, { useState, useEffect } from "react";
import { useUser, ChatMessage } from "../contexts/UserContext";
import { useNavigate, useSearchParams } from "react-router-dom";
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

// Default messages for demonstration - these will be replaced by actual chat messages
const getDefaultMessages = (profileName: string): ChatMessage[] => [
  {
    id: "demo-1",
    text: `Hi! Nice to meet you ${profileName}! I saw on the app that we've crossed paths several times this week 😄`,
    timestamp: "2:55 PM",
    isFromUser: false,
  },
];

export default function MessagesPage() {
  const { userData, sendMessage, getConversation, markMessagesAsRead } = useUser();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [openChatId, setOpenChatId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [currentChatMessages, setCurrentChatMessages] = useState<ChatMessage[]>([]);

  const messages = userData.messages || [];

  // Check for chat parameter in URL and load conversation
  useEffect(() => {
    const chatId = searchParams.get('chat');
    if (chatId) {
      setOpenChatId(chatId);
      const conversations = userData.conversations || [];
      const conversation = conversations.find(conv => conv.profileId === chatId);
      const conversationMessages = conversation ? conversation.messages : [];

      // If no conversation exists, start with default demo messages
      if (conversationMessages.length === 0) {
        const profile = messages.find(p => p.id === chatId);
        if (profile) {
          const userName = userData.firstName || "there";
          setCurrentChatMessages(getDefaultMessages(userName));
        }
      } else {
        setCurrentChatMessages(conversationMessages);
      }

      // Mark messages as read when opening chat
      markMessagesAsRead(chatId);
    }
  }, [searchParams, userData.conversations, userData.firstName, messages, markMessagesAsRead]);

  // Update chat messages when conversation changes
  useEffect(() => {
    if (openChatId) {
      const conversations = userData.conversations || [];
      const conversation = conversations.find(conv => conv.profileId === openChatId);
      const conversationMessages = conversation ? conversation.messages : [];

      if (conversationMessages.length > 0) {
        setCurrentChatMessages(conversationMessages);
      }
    }
  }, [openChatId, userData.conversations]);

  const openChat = (profileId: string) => {
    setOpenChatId(profileId);
    setSearchParams({ chat: profileId });
  };

  const closeChat = () => {
    setOpenChatId(null);
    setSearchParams({});
    setCurrentChatMessages([]); // Clear current chat when closing
  };

  const handleSendMessage = () => {
    if (messageText.trim() && openChatId) {
      sendMessage(openChatId, messageText.trim());
      setMessageText("");
    }
  };

  const handleDollarClick = () => {
    console.log("Dollar button clicked");
  };

  const currentChatProfile = openChatId ? messages.find(p => p.id === openChatId) : null;

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
            Messages
          </h1>
        </div>

        {/* Search Bar */}
        <div className="px-10 pb-6">
          <div className="relative">
            <div className="absolute left-5 top-3.5 text-gray-400 pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9.16667" cy="9.16667" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M15.5 15.5L19.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <input
              id="search-messages"
              name="searchMessages"
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
                const conversations = userData.conversations || [];
                const conversation = conversations.find(conv => conv.profileId === profile.id);
                const conversationMessages = conversation ? conversation.messages : [];
                const lastMessage = conversationMessages.length > 0
                  ? conversationMessages[conversationMessages.length - 1]
                  : null;

                // Use sample data if no real conversation exists
                const messageData = sampleMessages[index % sampleMessages.length];
                const displayMessage = lastMessage
                  ? {
                      lastMessage: lastMessage.isFromUser
                        ? `You: ${lastMessage.text}`
                        : lastMessage.text,
                      time: lastMessage.timestamp,
                      isFromUser: lastMessage.isFromUser
                    }
                  : messageData;

                const hasUnread = conversationMessages.some(msg => !msg.isFromUser && !msg.isRead);
                const isOnline = index < 2; // First two are "online"
                
                return (
                  <div key={profile.id} className="relative">
                    <div 
                      className="flex items-center py-4 cursor-pointer hover:bg-gray-50 rounded-lg"
                      onClick={() => openChat(profile.id)}
                    >
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
                            {displayMessage.time}
                          </span>
                        </div>
                        <p className="text-sm text-black font-normal leading-[150%] truncate">
                          {messageData.isTyping ? (
                            <span className="text-black">{displayMessage.lastMessage}</span>
                          ) : displayMessage.isFromUser ? (
                            <>
                              <span className="text-black opacity-40">You: </span>
                              <span className="text-black">{displayMessage.lastMessage.replace('You: ', '')}</span>
                            </>
                          ) : (
                            <span className="text-black">{displayMessage.lastMessage}</span>
                          )}
                        </p>
                      </div>

                      {/* Unread Indicator */}
                      {hasUnread && (
                        <div className="ml-3">
                          <div className="w-5 h-5 bg-lovefi-purple rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-normal font-[Alata]">
                              {conversationMessages.filter(msg => !msg.isFromUser && !msg.isRead).length}
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
              onClick={() => window.location.href = '/matching'}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <div className="text-3xl mb-2">♥</div>
              <span className="text-sm font-medium">Matching</span>
            </button>
            <button
              onClick={() => window.location.href = '/messages'}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-lg text-purple-600 bg-purple-100"
            >
              <div className="text-3xl mb-2">💬</div>
              <span className="text-sm font-medium">Messages</span>
            </button>
            <button
              onClick={() => window.location.href = '/profile'}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <div className="text-3xl mb-2">👤</div>
              <span className="text-sm font-medium">Profile</span>
            </button>
          </div>
        </div>

        {/* Chat Modal Overlay */}
        {openChatId && currentChatProfile && (
          <div className="fixed inset-0 bg-black/50 z-50 flex flex-col">
            <div className="flex-1 bg-white relative max-w-sm mx-auto w-full">
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
                    <path fill="currentColor" d="M5.44824 8.75745C6.7289 7.67518 8.60508 7.67518 9.88574 8.75745C9.95009 8.81566 9.98749 8.89827 9.98926 8.98499Z"/>
                  </svg>
                  <div className="w-6 h-3 border border-black rounded-sm opacity-35 relative">
                    <div className="w-4 h-1.5 bg-black rounded-sm absolute top-0.5 left-0.5"></div>
                  </div>
                </div>
              </div>

              {/* Header with Back Button */}
              <div className="px-10 pt-2 pb-4 flex items-center">
                <button 
                  onClick={closeChat}
                  className="mr-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <h1 className="text-[34px] font-normal text-black leading-[150%] font-[Alata]">
                  Messages
                </h1>
              </div>

              {/* Chat Container */}
              <div className="flex-1 bg-white rounded-t-[44px] relative flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>
                {/* Pull indicator */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-[27px] h-3 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <div className="w-3 h-0.5 bg-[#E8E6EA] rounded-full"></div>
                  </div>
                </div>

                {/* Chat Header */}
                <div className="pt-8 px-10 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-0.5">
                          <img
                            src={currentChatProfile.photos[0]}
                            alt={currentChatProfile.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#E94057] rounded-full"></div>
                      </div>
                      <div className="ml-4">
                        <h2 className="text-2xl font-normal text-black font-[Alata]">{currentChatProfile.name}</h2>
                        <p className="text-xs text-black/40 font-[Alata]">• Online</p>
                      </div>
                    </div>
                    <button className="w-13 h-13 border border-[#E8E6EA] rounded-[15px] bg-white flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4.75C12.6904 4.75 13.25 5.30964 13.25 6C13.25 6.69036 12.6904 7.25 12 7.25C11.3096 7.25 10.75 6.69036 10.75 6C10.75 5.30964 11.3096 4.75 12 4.75Z" fill="black"/>
                        <path d="M12 10.75C12.6904 10.75 13.25 11.3096 13.25 12C13.25 12.6904 12.6904 13.25 12 13.25C11.3096 13.25 10.75 12.6904 10.75 12C10.75 11.3096 11.3096 10.75 12 10.75Z" fill="black"/>
                        <path d="M12 16.25C12.6904 16.25 13.25 16.8096 13.25 17.5C13.25 18.1904 12.6904 18.75 12 18.75C11.3096 18.75 10.75 18.1904 10.75 17.5C10.75 16.8096 11.3096 16.25 12 16.25Z" fill="black"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 px-10 pb-6 overflow-y-auto">
                  {/* Today Divider */}
                  <div className="flex items-center mb-6">
                    <div className="flex-1 h-px bg-[#E8E6EA]"></div>
                    <span className="px-4 text-xs text-black/70 font-[Alata]">Today</span>
                    <div className="flex-1 h-px bg-[#E8E6EA]"></div>
                  </div>

                  {/* Message List */}
                  <div className="space-y-4">
                    {currentChatMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[250px] ${message.isFromUser ? 'mr-0 ml-6' : 'ml-0 mr-6'}`}>
                          <div
                            className={`rounded-[15px] p-4 ${
                              message.isFromUser
                                ? 'bg-[#F3F3F3] rounded-br-none'
                                : 'bg-[#E94057]/7 rounded-bl-none'
                            }`}
                          >
                            <p className="text-sm font-normal text-black leading-[150%] font-[Alata]">
                              {message.text}
                            </p>
                          </div>
                          <div className={`flex items-center mt-2 ${message.isFromUser ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-xs text-black/40 font-[Alata]">{message.timestamp}</span>
                            {message.isFromUser && message.isRead && (
                              <svg width="16" height="16" viewBox="0 0 16 16" className="ml-2">
                                <path d="M11.8048 5.13807C12.0651 4.87772 12.0651 4.45561 11.8048 4.19526C11.5444 3.93491 11.1223 3.93491 10.8619 4.19526L4.66669 10.3905L1.80476 7.5286C1.54441 7.26825 1.1223 7.26825 0.861949 7.5286C0.6016 7.78894 0.6016 8.21106 0.861949 8.4714L4.19528 11.8047C4.45563 12.0651 4.87774 12.0651 5.13809 11.8047L11.8048 5.13807Z" fill="#E94057"/>
                                <path d="M15.1381 5.13807C15.3984 4.87772 15.3984 4.45561 15.1381 4.19526C14.8777 3.93491 14.4556 3.93491 14.1953 4.19526L7.99688 10.3937C7.73519 10.1862 7.35378 10.2034 7.11195 10.4453C6.8516 10.7056 6.8516 11.1277 7.11195 11.3881L7.52862 11.8047C7.78896 12.0651 8.21107 12.0651 8.47142 11.8047L15.1381 5.13807Z" fill="#E94057"/>
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-10 pt-4 bg-white">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <input
                        id="chat-message-input"
                        name="chatMessage"
                        type="text"
                        placeholder="Your message"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="w-full h-12 pl-4 pr-12 border border-[#E8E6EA] rounded-[15px] bg-white text-sm font-normal placeholder-black placeholder-opacity-40 focus:outline-none focus:border-lovefi-purple"
                      />
                      <button 
                        className="absolute right-3 top-3"
                        onClick={() => console.log("Voice recording")}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M13.75 10V4.58337C13.75 2.51231 12.0711 0.833374 10 0.833374C7.92894 0.833374 6.25002 2.51231 6.25002 4.58337V10C6.25002 12.0711 7.92894 13.75 10 13.75C12.0711 13.75 13.75 12.0711 13.75 10Z" fill="#E94057"/>
                          <path d="M3.75002 8.75004C4.21026 8.75004 4.58335 9.12314 4.58335 9.58337C4.58335 12.5749 7.00847 15 10 15C12.9916 15 15.4167 12.5749 15.4167 9.58337C15.4167 9.12314 15.7898 8.75004 16.25 8.75004C16.7103 8.75004 17.0834 9.12314 17.0834 9.58337C17.0834 13.2135 14.3527 16.2058 10.8334 16.6182V18.3334C10.8334 18.7936 10.4603 19.1667 10 19.1667C9.53978 19.1667 9.16669 18.7936 9.16669 18.3334V16.6182C5.64737 16.2058 2.91669 13.2135 2.91669 9.58337C2.91669 9.12314 3.28978 8.75004 3.75002 8.75004Z" fill="#E94057"/>
                        </svg>
                      </button>
                    </div>
                    
                    {/* Dollar Button */}
                    <button 
                      onClick={handleDollarClick}
                      className="w-12 h-12 border border-[#E8E6EA] rounded-[15px] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <g clipPath="url(#clip0_20_209)">
                          <path 
                            d="M17 1.41663V32.5833M24.0833 7.08329H13.4583C12.1433 7.08329 10.8821 7.60569 9.95226 8.53555C9.02239 9.46542 8.5 10.7266 8.5 12.0416C8.5 13.3567 9.02239 14.6178 9.95226 15.5477C10.8821 16.4776 12.1433 17 13.4583 17H20.5417C21.8567 17 23.1179 17.5224 24.0477 18.4522C24.9776 19.3821 25.5 20.6433 25.5 21.9583C25.5 23.2733 24.9776 24.5345 24.0477 25.4644C23.1179 26.3942 21.8567 26.9166 20.5417 26.9166H8.5" 
                            stroke="#1E1E1E" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_20_209">
                            <rect width="34" height="34" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatedPageWrapper>
  );
}
