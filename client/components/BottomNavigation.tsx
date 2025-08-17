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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M19.5 12.572l-7.5 7.428-7.5-7.428a5 5 0 1 1 7.5-6.566 5 5 0 1 1 7.5 6.566z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: "saved",
      label: "Saved",
      path: "/saved",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: "messages",
      label: "Messages",
      path: "/messages",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V8.5C15 9.3 14.3 10 13.5 10S12 9.3 12 8.5V7.5L6 7V9C6 10.7 6.8 12.2 8 13.2V22H16V13.2C17.2 12.2 18 10.7 18 9H21Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  const handleTabClick = (tab: Tab) => {
    navigate(tab.path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-around py-3">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`flex flex-col items-center py-2 px-4 transition-colors duration-200 ${
                  isActive
                    ? "text-lovefi-purple"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="mb-1">{tab.icon}</div>
                <span className="text-xs font-[Alata]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
