import { useNavigate } from "react-router-dom";
import GenderSelection from "../components/GenderSelection";

export default function GenderSelectionPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    console.log("Gender selection completed");
    // TODO: Navigate to next step in onboarding
    // navigate("/next-step");
  };

  const handleBack = () => {
    navigate("/user-info");
  };

  return (
    <GenderSelection
      onContinue={handleContinue}
      onBack={handleBack}
    />
  );
}
