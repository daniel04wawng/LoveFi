import { useNavigate } from "react-router-dom";
import SignUp from "../components/SignUp";

export default function Index() {
  const navigate = useNavigate();

  const handleEmailSignUp = () => {
    console.log("Email sign up clicked");
    navigate("/wallet-connect");
  };

  const handlePhoneSignUp = () => {
    console.log("Phone sign up clicked");
    navigate("/wallet-connect");
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    // TODO: Implement Facebook login logic
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // TODO: Implement Google login logic
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
    // TODO: Implement Apple login logic
  };

  return (
    <SignUp
      onEmailSignUp={handleEmailSignUp}
      onPhoneSignUp={handlePhoneSignUp}
      onFacebookLogin={handleFacebookLogin}
      onGoogleLogin={handleGoogleLogin}
      onAppleLogin={handleAppleLogin}
    />
  );
}
