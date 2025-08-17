import MatchingScreen from "../components/MatchingScreen";
import BottomNavigation from "../components/BottomNavigation";

export default function MatchingPage() {
  return (
    <div className="w-full h-screen bg-white relative">
      <div className="pb-20">
        {" "}
        {/* Add padding bottom for fixed navigation */}
        <MatchingScreen />
      </div>
      <BottomNavigation />
    </div>
  );
}
