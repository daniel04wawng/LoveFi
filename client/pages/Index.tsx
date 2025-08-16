import SignUp from "../components/SignUp";

export default function Index() {
  const handleEmailSignUp = () => {
    console.log("Email sign up clicked");
    // TODO: Implement email sign up logic
  };

  const handlePhoneSignUp = () => {
    console.log("Phone sign up clicked");
    // TODO: Implement phone sign up logic
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
