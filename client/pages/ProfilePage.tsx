import BottomNavigation from "../components/BottomNavigation";

export default function ProfilePage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-2xl font-[Alata] text-black mb-4">Profile</h1>
          <p className="text-gray-600 font-[Alata]">
            Your profile settings will appear here
          </p>
        </div>
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
            className="flex flex-col items-center justify-center py-4 px-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            <div className="text-3xl mb-2">💬</div>
            <span className="text-sm font-medium">Messages</span>
          </button>
          <button
            onClick={() => window.location.href = '/profile'}
            className="flex flex-col items-center justify-center py-4 px-2 rounded-lg text-purple-600 bg-purple-100"
          >
            <div className="text-3xl mb-2">👤</div>
            <span className="text-sm font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
