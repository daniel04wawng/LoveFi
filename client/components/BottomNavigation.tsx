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
        <div className="w-6 h-6 flex items-center justify-center text-xl">
          ♥
        </div>
      ),
    },
    {
      id: "messages",
      label: "Messages",
      path: "/messages",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center text-xl">
          💬
        </div>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center text-xl">
          👤
        </div>
      ),
    },
  ];

  const handleTabClick = (tab: Tab) => {
    navigate(tab.path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 z-50 shadow-xl">
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-around py-4 px-2">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`relative flex flex-col items-center py-2 px-4 transition-all duration-200 rounded-lg min-w-[65px] ${
                  isActive
                    ? "text-lovefi-purple bg-lovefi-purple/10"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="mb-1 transform transition-transform duration-200 hover:scale-110">
                  {tab.icon}
                </div>
                <span className="text-xs font-[Alata] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
