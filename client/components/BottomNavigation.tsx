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
        <div className="w-6 h-6 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 18l-1.45-1.32C5.4 13.36 2 10.28 2 6.5 2 3.42 4.42 1 7.5 1c1.74 0 3.41.81 4.5 2.09C13.09 1.81 14.76 1 16.5 1 19.58 1 22 3.42 22 6.5c0 3.78-3.4 6.86-8.55 11.54L10 18z" transform="scale(0.9) translate(1,1)"/>
          </svg>
        </div>
      ),
    },
    {
      id: "messages",
      label: "Messages",
      path: "/messages",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M18 0H2C0.9 0 0 0.9 0 2V20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0Z" transform="scale(0.9) translate(1,1)"/>
            <circle cx="6" cy="8" r="1"/>
            <circle cx="10" cy="8" r="1"/>
            <circle cx="14" cy="8" r="1"/>
          </svg>
        </div>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <circle cx="10" cy="5" r="3"/>
            <path d="M10 11c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" transform="translate(0,1)"/>
          </svg>
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
