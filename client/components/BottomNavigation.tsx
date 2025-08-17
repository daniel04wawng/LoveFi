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
      id: "home",
      label: "Home",
      path: "/matching",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="relative w-[22px] h-[21px]">
            {/* Back card */}
            <div className="absolute top-0 left-0 w-[13px] h-[18px] bg-current rounded-[2px] border border-gray-100 transform -rotate-[15deg]"></div>
            {/* Front card */}
            <div className="absolute top-[3px] left-[9px] w-[13px] h-[18px] bg-current rounded-[2px] border border-gray-100"></div>
          </div>
        </div>
      ),
    },
    {
      id: "matches",
      label: "Matches",
      path: "/matches",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center relative">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.5 4C4.46244 4 2 6.46245 2 9.5C2 15 8.5 20 12 21.1631C15.5 20 22 15 22 9.5C22 6.46245 19.5375 4 16.5 4C14.6399 4 12.9954 4.92345 12 6.3369C11.0046 4.92345 9.36015 4 7.5 4Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Notification dot for matches */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-lovefi-purple rounded-full border-2 border-white"></div>
        </div>
      ),
    },
    {
      id: "messages",
      label: "Messages", 
      path: "/messages",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22 12C22 17.5229 17.5229 22 12 22C9.01325 22 2 22 2 22C2 22 2 14.5361 2 12C2 6.47715 6.47715 2 12 2C17.5229 2 22 6.47715 22 12Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M7 9H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 13H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 17H12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 10C13.933 10 15.5 8.433 15.5 6.5C15.5 4.56701 13.933 3 12 3C10.067 3 8.5 4.56701 8.5 6.5C8.5 8.433 10.067 10 12 10Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 20.4V21H21V20.4C21 18.1598 21 17.0397 20.5641 16.184C20.1806 15.4314 19.5686 14.8195 18.816 14.436C17.9603 14 16.8402 14 14.6 14H9.4C7.1598 14 6.0397 14 5.18405 14.436C4.43139 14.8195 3.81947 15.4314 3.43598 16.184C3 17.0397 3 18.1598 3 20.4Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
    },
  ];

  const handleTabClick = (tab: Tab) => {
    navigate(tab.path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-50 z-50">
      {/* Menu divider */}
      <div className="w-full h-px bg-gray-200"></div>
      
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-around h-12">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`relative flex flex-col items-center justify-center h-12 w-15 transition-colors duration-200 ${
                  isActive
                    ? "text-lovefi-purple"
                    : "text-gray-400"
                }`}
              >
                {/* Active indicator line */}
                {isActive && (
                  <div className="absolute top-0 left-0 w-full h-px bg-lovefi-purple"></div>
                )}
                
                <div className="flex items-center justify-center">
                  {tab.icon}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Home indicator */}
      <div className="w-full h-[34px] bg-gray-50 flex items-center justify-center pt-5 pb-2">
        <div className="w-[134px] h-[5px] bg-black rounded-full"></div>
      </div>
    </div>
  );
}
