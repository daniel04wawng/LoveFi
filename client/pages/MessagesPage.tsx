import BottomNavigation from "../components/BottomNavigation";

export default function MessagesPage() {
  return (
    <div className="w-full h-screen bg-white relative">
      <div className="pb-20 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-2xl font-[Alata] text-black mb-4">Messages</h1>
          <p className="text-gray-600 font-[Alata]">Your conversations will appear here</p>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
