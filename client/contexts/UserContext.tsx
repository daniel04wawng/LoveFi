import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface UserData {
  // From wallet connection
  wallet?: {
    name: string;
    logo?: string;
    type?: string;
  };

  // From user info
  firstName?: string;
  lastName?: string;
  birthday?: string;

  // From gender selection
  gender?: "woman" | "man" | "non-binary" | "other";
  customGender?: string;

  // From location selection
  location?: string;
  radius?: number;

  // From partner preferences
  partnerPreferences?: {
    id: string;
    options: string[];
    selected: number;
  }[];

  // From personal interests
  personalInterests?: string[];

  // From photo upload
  photos?: File[];
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({});

  const updateUserData = useCallback((data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  }, []);

  const clearUserData = useCallback(() => {
    setUserData({});
  }, []);

  return (
    <UserContext.Provider value={{ userData, updateUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    console.error("useUser called outside of UserProvider. Make sure your component is wrapped in UserProvider.");
    console.error("Current component stack:", new Error().stack);
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
