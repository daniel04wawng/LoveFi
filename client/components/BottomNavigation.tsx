import { useNavigate, useLocation } from "react-router-dom";

interface Tab {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  console.log("BottomNavigation rendering, current path:", location.pathname);

  const tabs: Tab[] = [
    {
      id: "matching",
      label: "Matching",
      path: "/matching",
      icon: "♥",
    },
    {
      id: "messages", 
      label: "Messages",
      path: "/messages",
      icon: "💬",
    },
    {
      id: "profile",
      label: "Profile", 
      path: "/profile",
      icon: "👤",
    },
  ];

  const handleTabClick = (tab: Tab) => {
    console.log("Navigating to:", tab.path);
    navigate(tab.path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 shadow-xl z-[99999]">
      <div className="w-full max-w-sm mx-auto">
        <div className="grid grid-cols-3 gap-0 py-4 px-4">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-lovefi-purple bg-lovefi-purple/10"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <div className="text-2xl mb-1 leading-none">
                  {tab.icon}
                </div>
                <span className="text-xs font-[Alata] font-medium text-center">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
