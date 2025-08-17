import { useNavigate } from "react-router-dom";
import PartnerPreferences from "../components/PartnerPreferences";

export default function PartnerPreferencesPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    console.log("Partner preferences completed");
    // TODO: Navigate to next step in onboarding
    // navigate("/next-step");
  };

  const handleBack = () => {
    navigate("/location-selection");
  };

  return <PartnerPreferences onContinue={handleContinue} onBack={handleBack} />;
}
