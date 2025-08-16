import { useNavigate } from "react-router-dom";
import LocationSelection from "../components/LocationSelection";

export default function LocationSelectionPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    console.log("Location selection completed");
    // TODO: Navigate to next step in onboarding
    // navigate("/next-step");
  };

  const handleBack = () => {
    navigate("/gender-selection");
  };

  return (
    <LocationSelection
      onContinue={handleContinue}
      onBack={handleBack}
    />
  );
}
