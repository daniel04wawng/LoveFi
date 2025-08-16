import { useNavigate } from "react-router-dom";
import WalletConnect from "../components/WalletConnect";

export default function WalletConnectPage() {
  const navigate = useNavigate();

  const handleContinue = (walletData: { name: string; logo?: string }) => {
    console.log("Wallet connected:", walletData);
    // TODO: Here you would typically:
    // 1. Save wallet data to backend
    // 2. Update user profile/state
    // 3. Navigate to next step in onboarding
    
    // For now, just log the data
    // navigate("/next-step"); // Navigate to next onboarding step
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <WalletConnect
      onContinue={handleContinue}
      onBack={handleBack}
    />
  );
}
