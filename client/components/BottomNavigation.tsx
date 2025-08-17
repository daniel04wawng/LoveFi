import { useNavigate, useLocation } from "react-router-dom";

interface Tab {
  id: string;
  label: string;
  icon: JSX.Element;
  path: string;
}

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs: Tab[] = [
    {
      id: "matching",
      label: "Matching",
      path: "/matching",
      icon: (
        <div className="w-8 h-8 flex items-center justify-center text-2xl">
          ♥
        </div>
      ),
    },
    {
      id: "messages",
      label: "Messages",
      path: "/messages",
      icon: (
        <div className="w-8 h-8 flex items-center justify-center text-2xl">
          💬
        </div>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      icon: (
        <div className="w-8 h-8 flex items-center justify-center text-2xl">
          👤
        </div>
      ),
    },
  ];

  const handleTabClick = (tab: Tab) => {
    console.log("Navigating to:", tab.path); // Debug log
    navigate(tab.path);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E6EA] z-[9999] shadow-lg"
      style={{
        minHeight: '70px',
        display: 'block !important',
        visibility: 'visible !important'
      }}
    >
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-around py-3">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`flex flex-col items-center py-2 px-6 transition-all duration-200 min-w-[80px] ${
                  isActive
                    ? "text-lovefi-purple"
                    : "text-[#ADAFBB] hover:text-gray-700"
                }`}
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                <div className="mb-1">
                  {tab.icon}
                </div>
                <span className="text-xs font-[Alata]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
