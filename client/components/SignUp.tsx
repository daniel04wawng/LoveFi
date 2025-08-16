import { Link } from "react-router-dom";
import LovefiLogo from "./LovefiLogo";
import SocialLogin from "./SocialIcons";
import AnimatedPageWrapper from "./AnimatedPageWrapper";

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
    <AnimatedPageWrapper direction="right">
      <div className="h-screen bg-white flex flex-col items-center px-6 sm:px-10 py-8 overflow-hidden">
        <div className="w-full max-w-[295px] flex flex-col items-center h-full justify-between">
          {/* Top Section with Logo */}
          <div className="flex flex-col items-center pt-4">
            {/* Logo Section */}
            <div className="mb-8">
              <LovefiLogo size={240} className="sm:scale-110" />
            </div>

            {/* Heading */}
            <h2 className="text-lg font-alata font-normal text-center text-black mb-8">
              Sign up to continue
            </h2>
          </div>

          {/* Middle Section with Buttons */}
          <div className="w-full space-y-6 flex-grow flex flex-col justify-center">
            {/* Email Button */}
            <button
              onClick={onEmailSignUp}
              className="w-full h-14 rounded-2xl text-white font-alata font-normal text-base transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(90deg, #8D7DFF 0%, #C160FF 100%)"
              }}
            >
              Continue with email
            </button>

            {/* Phone Number Button */}
            <button
              onClick={onPhoneSignUp}
              className="w-full h-14 rounded-2xl border border-gray-100 bg-white text-lovefi-text-secondary font-alata font-normal text-base transition-all hover:bg-gray-50"
            >
              Use phone number
            </button>

            {/* Social Login Section */}
            <div className="w-full space-y-6 pt-6">
              {/* Divider */}
              <div className="flex items-center">
                <div className="flex-1 h-px bg-black opacity-40"></div>
                <span className="px-4 text-xs font-alata font-normal text-black">
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
          </div>

          {/* Bottom Section with Footer Links */}
          <div className="flex items-center justify-center gap-6 text-sm pb-4">
            <Link
              to="/terms"
              className="text-lovefi-text-secondary font-alata hover:opacity-80 transition-opacity"
            >
              Terms of use
            </Link>
            <Link
              to="/privacy"
              className="text-lovefi-text-secondary font-alata hover:opacity-80 transition-opacity"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </AnimatedPageWrapper>
  );
}
