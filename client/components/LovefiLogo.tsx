interface LovefiLogoProps {
  size?: number;
  className?: string;
}

export default function LovefiLogo({ size = 275, className = "" }: LovefiLogoProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Logo Icon - Heart with pixelated top */}
      <div 
        className="rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, #8D7DFF 0%, #C160FF 100%)"
        }}
      >
        <svg 
          width={size * 0.4} 
          height={size * 0.4} 
          viewBox="0 0 110 110" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pixelated crown/top part */}
          <rect x="42" y="20" width="8" height="8" fill="white"/>
          <rect x="34" y="28" width="8" height="8" fill="white"/>
          <rect x="42" y="28" width="8" height="8" fill="white"/>
          <rect x="50" y="28" width="8" height="8" fill="white"/>
          <rect x="58" y="28" width="8" height="8" fill="white"/>
          <rect x="66" y="28" width="8" height="8" fill="white"/>
          <rect x="58" y="20" width="8" height="8" fill="white"/>
          
          {/* Heart shape */}
          <path 
            d="M55 36C47 28 34 28 34 44C34 60 55 80 55 80C55 80 76 60 76 44C76 28 63 28 55 36Z" 
            stroke="white" 
            strokeWidth="6" 
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      {/* LoveFi Text */}
      <h1 className="text-4xl font-normal mt-4 bg-gradient-to-r from-lovefi-purple to-lovefi-purple-pink bg-clip-text text-transparent">
        LoveFi
      </h1>
    </div>
  );
}
