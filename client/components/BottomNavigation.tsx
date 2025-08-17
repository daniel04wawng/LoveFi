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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z"
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
            fill="currentColor"
          />
          <circle cx="8" cy="10" r="1" fill="currentColor"/>
          <circle cx="12" cy="10" r="1" fill="currentColor"/>
          <circle cx="16" cy="10" r="1" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 7C13.1 7 14 7.9 14 9C14 10.1 13.1 11 12 11C10.9 11 10 10.1 10 9C10 7.9 10.9 7 12 7ZM12 12C15.31 12 18 14.69 18 18V20H6V18C6 14.69 8.69 12 12 12Z"
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
                className={`flex flex-col items-center py-2 px-3 transition-colors duration-200 min-w-[60px] ${
                  isActive
                    ? "text-lovefi-purple"
                    : "text-gray-600 hover:text-gray-800"
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
