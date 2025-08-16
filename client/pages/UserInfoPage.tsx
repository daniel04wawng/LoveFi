import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";

export default function UserInfoPage() {
  const navigate = useNavigate();

  const handleContinue = (userInfo: {
    firstName: string;
    lastName: string;
    birthday: string;
  }) => {
    console.log("User info collected:", userInfo);
    // TODO: Here you would typically:
    // 1. Save user info to backend
    // 2. Update user profile/state
    // 3. Navigate to next step in onboarding

    // Navigate to gender selection
    navigate("/gender-selection");
  };

  const handleBack = () => {
    navigate("/wallet-connect");
  };

  return <UserInfo onContinue={handleContinue} onBack={handleBack} />;
}
