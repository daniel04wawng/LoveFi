import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import LovefiLogo from "./LovefiLogo";
import AnimatedPageWrapper from "./AnimatedPageWrapper";

interface SignUpProps {
  onWalletConnect?: (walletData: {
    name: string;
    logo?: string;
    type?: string;
  }) => void;
}

interface WalletInfo {
  name: string;
  logo?: string;
  type?: "metamask" | "coinbase" | "walletconnect" | "phantom" | "other";
}

// Wallet type configurations
const WALLET_CONFIGS = {
  metamask: {
    name: "MetaMask",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjguNSAxNkMxOS4xNjcgMjAuNzUgMTYgMjQgMTYgMjRzLTMuMTY3LTMuMjUtMTIuNS04QzYuNSAxOS43NSA5LjY2NyAyMyAzLjUgMjcuNSA5LjY2NyAyNy41IDEyIDI0IDE2IDI0IDIwIDI0IDI0IDI3LjUgMjguNSAyNy41IDIyLjMzMyAyMyAyNS41IDE5Ljc1IDI4LjUgMTZ6IiBmaWxsPSIjRjY4NTFCIi8+PC9zdmc+",
    color: "#F6851B",
  },
  coinbase: {
    name: "Coinbase Wallet",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzAwNTJGRiIvPjxyZWN0IHg9IjkiIHk9IjkiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgcng9IjMiIGZpbGw9IndoaXRlIi8+PC9zdmc+",
    color: "#0052FF",
  },
  phantom: {
    name: "Phantom",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzRGNDREOCIvPjxwYXRoIGQ9Ik0xMS41IDIyLjVDMTMgMjQgMTUgMjMuNSAxNiAyMmMxLTEuNSAxLjUtMi41IDEuNS0yLjVzMC41IDEgMS41IDIuNWMxIDEuNSAzIDIgNC41IDAuNWMxLjUtMS41IDEuNS00IDAtNS41LTEuNS0xLjUtMy40LTItNC0yLjVzLS44LTEuNS0uOC0xLjVzLS4zIDEtLjggMS41Yy0uNiAwLjUtMi41IDEtNCAyLjUtMS41IDEuNS0xLjUgNC0wIDUuNXoiIGZpbGw9IndoaXRlIi8+PC9zdmc+",
    color: "#4F44D8",
  },
  walletconnect: {
    name: "WalletConnect",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzMzOTlGRiIvPjxwYXRoIGQ9Ik0xMS41IDEzQzEzLjE1IDExLjM1IDE1LjQyIDEwLjUgMTYgMTAuNWMwLjU4IDAgMi44NSAwLjg1IDQuNSAyLjVjMC4zNSAwLjM1IDAuOTIgMC4zNSAxLjI3IDBjMC4zNS0wLjM1IDAuMzUtMC45MiAwLTEuMjdDMjAuNSAxMC40NiAxOC4zNSA5LjUgMTYgOS41czQuNSAwLjk2LTYuNzcgMi4yM2MtMC4zNSAwLjM1LTAuMzUgMC45MiAwIDEuMjdjMC4zNSAwLjM1IDAuOTIgMC4zNSAxLjI3IDB6bS0xLjUgNGMwLjM1IDAuMzUgMC45MiAwLjM1IDEuMjcgMGMyIDIgNC40NiAyIDYuNDYgMGMwLjM1LTAuMzUgMC45Mi0wLjM1IDEuMjcgMGMwLjM1IDAuMzUgMC4zNSAwLjkyIDAgMS4yN2MtMi43IDIuNy02LjMgMi43LTkgMGMtMC4zNS0wLjM1LTAuMzUtMC45MiAwLTEuMjd6IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==",
    color: "#3399FF",
  },
};

export default function SignUp({ onWalletConnect }: SignUpProps) {
  const { updateUserData } = useUser();
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const handleWalletConnect = async (
    walletType: keyof typeof WALLET_CONFIGS,
  ) => {
    setIsConnecting(walletType);

    // Simulate wallet connection
    setTimeout(() => {
      const config = WALLET_CONFIGS[walletType];
      const walletData = {
        name: config.name,
        logo: config.logo,
        type: walletType,
      };

      // Update user context with wallet data
      updateUserData({ wallet: walletData });

      setIsConnecting(null);

      // Call the callback function
      if (onWalletConnect) {
        onWalletConnect(walletData);
      }
    }, 1500);
  };

  return (
    <AnimatedPageWrapper direction="right">
      <div className="h-screen bg-white flex flex-col items-center px-6 sm:px-10 py-8 overflow-hidden">
        <div className="w-full max-w-[295px] flex flex-col items-center h-full justify-between">
          {/* Top Section with Logo */}
          <div className="flex flex-col items-center pt-4">
            {/* Logo Section */}
            <div className="mb-8">
              <LovefiLogo size={200} className="sm:scale-110" />
            </div>

            {/* Heading */}
            <h2 className="text-lg font-alata font-normal text-center text-black mb-4">
              Connect your wallet to continue
            </h2>
            <p className="text-sm font-alata text-center text-gray-600 mb-8">
              Choose your preferred wallet to sign up and start finding your
              true love
            </p>
          </div>

          {/* Middle Section with Wallet Options */}
          <div className="w-full space-y-4 flex-grow flex flex-col justify-center">
            {/* MetaMask */}
            <button
              onClick={() => handleWalletConnect("metamask")}
              disabled={isConnecting !== null}
              className="w-full h-14 rounded-2xl border border-gray-200 bg-white flex items-center justify-center gap-3 font-alata font-normal text-base transition-all hover:bg-gray-50 hover:border-orange-300 disabled:opacity-50"
            >
              {isConnecting === "metamask" ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600">Connecting...</span>
                </div>
              ) : (
                <>
                  <img
                    src={WALLET_CONFIGS.metamask.logo}
                    alt="MetaMask"
                    className="w-6 h-6"
                  />
                  <span className="text-black">Connect with MetaMask</span>
                </>
              )}
            </button>

            {/* Coinbase Wallet */}
            <button
              onClick={() => handleWalletConnect("coinbase")}
              disabled={isConnecting !== null}
              className="w-full h-14 rounded-2xl border border-gray-200 bg-white flex items-center justify-center gap-3 font-alata font-normal text-base transition-all hover:bg-gray-50 hover:border-blue-300 disabled:opacity-50"
            >
              {isConnecting === "coinbase" ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600">Connecting...</span>
                </div>
              ) : (
                <>
                  <img
                    src={WALLET_CONFIGS.coinbase.logo}
                    alt="Coinbase Wallet"
                    className="w-6 h-6"
                  />
                  <span className="text-black">Connect with Coinbase</span>
                </>
              )}
            </button>

            {/* Phantom */}
            <button
              onClick={() => handleWalletConnect("phantom")}
              disabled={isConnecting !== null}
              className="w-full h-14 rounded-2xl border border-gray-200 bg-white flex items-center justify-center gap-3 font-alata font-normal text-base transition-all hover:bg-gray-50 hover:border-purple-300 disabled:opacity-50"
            >
              {isConnecting === "phantom" ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600">Connecting...</span>
                </div>
              ) : (
                <>
                  <img
                    src={WALLET_CONFIGS.phantom.logo}
                    alt="Phantom"
                    className="w-6 h-6"
                  />
                  <span className="text-black">Connect with Phantom</span>
                </>
              )}
            </button>

            {/* WalletConnect */}
            <button
              onClick={() => handleWalletConnect("walletconnect")}
              disabled={isConnecting !== null}
              className="w-full h-14 rounded-2xl text-white font-alata font-normal text-base transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: "linear-gradient(90deg, #8D7DFF 0%, #C160FF 100%)",
              }}
            >
              {isConnecting === "walletconnect" ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <img
                    src={WALLET_CONFIGS.walletconnect.logo}
                    alt="WalletConnect"
                    className="w-6 h-6"
                  />
                  <span>Connect with WalletConnect</span>
                </div>
              )}
            </button>

            {/* Info Text */}
            <div className="w-full pt-4">
              <p className="text-xs font-alata text-center text-gray-500 leading-relaxed">
                Your wallet will be used to verify your identity and secure your
                account. We don't store your private keys.
              </p>
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
