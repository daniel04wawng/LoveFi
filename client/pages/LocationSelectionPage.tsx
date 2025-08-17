import { useNavigate } from "react-router-dom";
import LocationSelection from "../components/LocationSelection";

export default function LocationSelectionPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    console.log("Location selection completed");
    // Navigate to partner preferences
    navigate("/partner-preferences");
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
