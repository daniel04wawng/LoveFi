import BottomNavigation from "../components/BottomNavigation";

export default function ProfilePage() {
  return (
    <div className="w-full h-screen bg-white relative">
      <div className="pb-20 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-2xl font-[Alata] text-black mb-4">Profile</h1>
          <p className="text-gray-600 font-[Alata]">
            Your profile settings will appear here
          </p>
        </div>
      </div>
      {/* Inline Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-gray-400 shadow-xl py-4 px-4">
        <div className="grid grid-cols-3 gap-0 max-w-sm mx-auto">
          <button
            onClick={() => window.location.href = '/matching'}
            className="flex flex-col items-center justify-center py-3 px-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            <div className="text-2xl mb-1">♥</div>
            <span className="text-xs font-medium">Matching</span>
          </button>
          <button
            onClick={() => window.location.href = '/messages'}
            className="flex flex-col items-center justify-center py-3 px-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            <div className="text-2xl mb-1">💬</div>
            <span className="text-xs font-medium">Messages</span>
          </button>
          <button
            onClick={() => window.location.href = '/profile'}
            className="flex flex-col items-center justify-center py-3 px-2 rounded-lg text-purple-600 bg-purple-100"
          >
            <div className="text-2xl mb-1">👤</div>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
