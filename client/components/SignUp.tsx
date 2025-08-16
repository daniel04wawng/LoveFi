import { Link } from "react-router-dom";
import LovefiLogo from "./LovefiLogo";
import SocialLogin from "./SocialIcons";

interface SignUpProps {
  onEmailSignUp?: () => void;
  onPhoneSignUp?: () => void;
  onFacebookLogin?: () => void;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
}

export default function SignUp({
  onEmailSignUp,
  onPhoneSignUp,
  onFacebookLogin,
  onGoogleLogin,
  onAppleLogin
}: SignUpProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-10 py-8">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Logo Section */}
        <div className="mb-12 sm:mb-16">
          <LovefiLogo size={275} className="scale-75 sm:scale-100" />
        </div>

        {/* Sign Up Section */}
        <div className="w-full space-y-6 mb-12">
          {/* Heading */}
          <h2 className="text-lg font-normal text-center text-black mb-8">
            Sign up to continue
          </h2>

          {/* Email Button */}
          <button
            onClick={onEmailSignUp}
            className="w-full h-14 rounded-2xl text-white font-normal text-base transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(90deg, #8D7DFF 0%, #C160FF 100%)"
            }}
          >
            Continue with email
          </button>

          {/* Phone Number Button */}
          <button
            onClick={onPhoneSignUp}
            className="w-full h-14 rounded-2xl border border-gray-100 bg-white text-lovefi-text-secondary font-normal text-base transition-all hover:bg-gray-50"
          >
            Use phone number
          </button>
        </div>

        {/* Social Login Section */}
        <div className="w-full space-y-6 mb-12">
          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-1 h-px bg-black opacity-40"></div>
            <span className="px-4 text-xs font-normal text-black">
              or sign up with
            </span>
            <div className="flex-1 h-px bg-black opacity-40"></div>
          </div>

          {/* Social Icons */}
          <SocialLogin
            onFacebookClick={onFacebookLogin}
            onGoogleClick={onGoogleLogin}
            onAppleClick={onAppleLogin}
            className="justify-center"
          />
        </div>

        {/* Footer Links */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <Link 
            to="/terms" 
            className="text-lovefi-text-secondary hover:opacity-80 transition-opacity"
          >
            Terms of use
          </Link>
          <Link 
            to="/privacy" 
            className="text-lovefi-text-secondary hover:opacity-80 transition-opacity"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
