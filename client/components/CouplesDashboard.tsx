import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedPageWrapper from "./AnimatedPageWrapper";

interface Milestone {
  id: string;
  name: string;
  period: string;
  completed: boolean;
  nftMinted: boolean;
  date?: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  stake: number;
  submittedBy: string;
  status: "pending" | "completed" | "failed";
  dueDate: string;
}

interface FriendBet {
  id: string;
  friendName: string;
  prediction: string;
  stake: number;
  avatar: string;
}

const CouplesDashboard = () => {
  const navigate = useNavigate();
  const [selectedMode] = useState<"short" | "long">("long");
  
  // Mock data - in real app this would come from blockchain/API
  const [jointWalletBalance] = useState(2.41186); // ETH
  const [currentStreak] = useState(9); // days
  const [relationshipDays] = useState(127);
  
  const milestones: Milestone[] = [
    { id: "1", name: "1 Week", period: "7 days", completed: true, nftMinted: true, date: "2024-01-01" },
    { id: "2", name: "1 Month", period: "30 days", completed: true, nftMinted: true, date: "2024-01-24" },
    { id: "3", name: "3 Months", period: "90 days", completed: true, nftMinted: true, date: "2024-03-24" },
    { id: "4", name: "6 Months", period: "180 days", completed: false, nftMinted: false },
    { id: "5", name: "1 Year", period: "365 days", completed: false, nftMinted: false },
    { id: "6", name: "2 Years", period: "730 days", completed: false, nftMinted: false },
  ];

  const challenges: Challenge[] = [
    {
      id: "1",
      title: "Picnic Date",
      description: "Share a picnic selfie together",
      stake: 0.005,
      submittedBy: "Sarah M.",
      status: "pending",
      dueDate: "2024-01-20"
    },
    {
      id: "2", 
      title: "Cook Together",
      description: "Make dinner together and share photo",
      stake: 0.003,
      submittedBy: "Mike R.",
      status: "pending", 
      dueDate: "2024-01-22"
    }
  ];

  const friendBets: FriendBet[] = [
    { id: "1", friendName: "Sarah", prediction: "1 Year", stake: 0.001, avatar: "🙋‍♀️" },
    { id: "2", friendName: "Mike", prediction: "6 Months", stake: 0.001, avatar: "🙋‍♂️" },
    { id: "3", friendName: "Emma", prediction: "2 Years", stake: 0.002, avatar: "👩" },
  ];

  const completedMilestones = milestones.filter(m => m.completed).length;
  const progressPercentage = (completedMilestones / milestones.length) * 100;

  const getWeekProgress = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map((day, index) => ({
      day,
      completed: index < currentStreak % 7 || currentStreak >= 7
    }));
  };

  return (
    <AnimatedPageWrapper direction="left">
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <div className="w-full max-w-[375px] mx-auto h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-12 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lovefi-purple rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">❤️</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-orange-500">🔥</span>
                <span className="text-gray-900 font-alata font-bold">{currentStreak} days</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-alata font-bold text-gray-900">₤{jointWalletBalance.toFixed(2)}</div>
              <div className="text-xs text-gray-500">Joint Wallet</div>
            </div>
          </div>

          {/* Main Circle - Joint Wallet Display */}
          <div className="px-5 py-6">
            <div className="relative">
              {/* Outer Ring with Progress */}
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${progressPercentage * 2.83} 283`}
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8F7CFF" />
                      <stop offset="100%" stopColor="#BE62FF" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full mx-3 my-3 shadow-sm">
                  <div className="text-xs text-gray-500 mb-1">💰 Joint Balance</div>
                  <div className="text-2xl font-alata font-bold mb-1 text-gray-900">
                    {jointWalletBalance.toFixed(3)}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">ETH</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    ✓ Wedding Fund Active
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="px-5 mb-6">
            <div className="flex justify-between items-center gap-2">
              {getWeekProgress().map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <span className="text-xs text-white/60">{day.day}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      day.completed
                        ? "bg-gradient-to-r from-orange-400 to-yellow-400"
                        : "bg-white/10"
                    }`}
                  >
                    {day.completed && <span className="text-white text-sm">✓</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards Section */}
          <div className="px-5 space-y-4 pb-24">
            {/* Friends Betting Card */}
            <button
              onClick={() => navigate("/friends-predictions")}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 text-left hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-alata font-medium">Friends Predictions</h3>
                <span className="text-white/80 text-sm">🎯</span>
              </div>
              <div className="space-y-2">
                {friendBets.slice(0, 2).map((bet) => (
                  <div key={bet.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{bet.avatar}</span>
                      <span className="text-white/90 text-sm">{bet.friendName}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm">{bet.prediction}</div>
                      <div className="text-white/60 text-xs">{bet.stake} ETH</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full mt-3 py-2 bg-white/20 rounded-lg text-white text-sm text-center">
                View All Predictions ({friendBets.length})
              </div>
            </button>

            {/* Milestone Progress Card */}
            <button
              onClick={() => navigate("/milestones")}
              className="w-full bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-4 text-left hover:from-blue-700 hover:to-cyan-600 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-alata font-medium">Milestone Progress</h3>
                <span className="text-white/80 text-sm">🏆</span>
              </div>
              <div className="mb-3">
                <div className="text-white text-lg font-bold">{completedMilestones}/{milestones.length}</div>
                <div className="text-white/80 text-sm">Milestones Achieved</div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </button>

            {/* Active Challenges Card */}
            <button
              onClick={() => navigate("/challenges")}
              className="w-full bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-4 text-left hover:from-orange-600 hover:to-red-600 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-alata font-medium">Active Challenges</h3>
                <span className="text-white/80 text-sm">🎯</span>
              </div>
              <div className="space-y-2">
                {challenges.slice(0, 1).map((challenge) => (
                  <div key={challenge.id}>
                    <div className="text-white font-medium text-sm">{challenge.title}</div>
                    <div className="text-white/80 text-xs">{challenge.description}</div>
                    <div className="flex justify-between mt-1">
                      <span className="text-white/60 text-xs">by {challenge.submittedBy}</span>
                      <span className="text-white text-xs">{challenge.stake} ETH</span>
                    </div>
                  </div>
                ))}
              </div>
              {challenges.length > 1 && (
                <div className="w-full mt-3 py-2 bg-white/20 rounded-lg text-white text-sm text-center">
                  View All Challenges ({challenges.length})
                </div>
              )}
            </button>

            {/* Days Together Card */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-alata font-medium">Days Together</h3>
                  <div className="text-white text-2xl font-bold">{relationshipDays}</div>
                  <div className="text-white/80 text-sm">Keep the streak going! 💕</div>
                </div>
                <div className="text-4xl">😍</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPageWrapper>
  );
};

export default CouplesDashboard;
