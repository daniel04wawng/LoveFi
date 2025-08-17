import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface Tab {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs: Tab[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/couples-dashboard",
      icon: "💕",
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

  const handleTabClick = (path: string) => {
    console.log("Navigation clicked, going to:", path);
    // Force navigation
    window.location.hash = "";
    navigate(path, { replace: false });
  };

  // Ensure navigation is always visible
  useEffect(() => {
    const navElement = document.querySelector('[data-nav="bottom-navigation"]');
    if (navElement) {
      (navElement as HTMLElement).style.display = "block";
      (navElement as HTMLElement).style.visibility = "visible";
      (navElement as HTMLElement).style.position = "fixed";
      (navElement as HTMLElement).style.bottom = "0";
      (navElement as HTMLElement).style.zIndex = "999999";
    }
  }, [location.pathname]);

  return (
    <div
      data-nav="bottom-navigation"
      className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-gray-400 shadow-2xl"
      style={{
        position: "fixed !important",
        bottom: "0 !important",
        left: "0 !important",
        right: "0 !important",
        zIndex: 999999,
        display: "block !important",
        visibility: "visible !important",
        minHeight: "80px",
        backgroundColor: "white",
        borderTop: "4px solid #9CA3AF",
      }}
    >
      <div className="w-full max-w-sm mx-auto bg-white">
        <div
          className="grid grid-cols-3 gap-0 py-4 px-4 bg-white"
          style={{ backgroundColor: "white" }}
        >
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;

            return (
              <button
                key={tab.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabClick(tab.path);
                }}
                className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-purple-600 bg-purple-100"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
                style={{
                  minHeight: "60px",
                  cursor: "pointer",
                  touchAction: "manipulation",
                  userSelect: "none",
                }}
              >
                <div
                  className="text-2xl mb-1 leading-none"
                  style={{ fontSize: "24px", lineHeight: "1" }}
                >
                  {tab.icon}
                </div>
                <span
                  className="text-xs font-medium text-center"
                  style={{ fontSize: "11px" }}
                >
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
