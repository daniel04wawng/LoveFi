import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface Profile {
  id: string;
  name: string;
  age: number;
  photos: string[];
  distance: number;
  matchPercentage: number;
  cryptoTagline: string;
  commonInterests: string[];
  personalInterests: string[];
  partnerPreferences: string[];
}

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

  // Saved profiles
  savedProfiles?: Profile[];
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  clearUserData: () => void;
  saveProfile: (profile: Profile) => void;
  removeSavedProfile: (profileId: string) => void;
  isSaved: (profileId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData>({});

  const updateUserData = useCallback((data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  }, []);

  const clearUserData = useCallback(() => {
    setUserData({});
  }, []);

  const saveProfile = useCallback((profile: Profile) => {
    setUserData((prev) => {
      const existingProfiles = prev.savedProfiles || [];
      // Check if profile is already saved
      if (existingProfiles.some((p) => p.id === profile.id)) {
        return prev; // Profile already saved, don't add duplicate
      }
      return {
        ...prev,
        savedProfiles: [...existingProfiles, profile],
      };
    });
  }, []);

  const removeSavedProfile = useCallback((profileId: string) => {
    setUserData((prev) => ({
      ...prev,
      savedProfiles: (prev.savedProfiles || []).filter(
        (profile) => profile.id !== profileId
      ),
    }));
  }, []);

  const isSaved = useCallback(
    (profileId: string) => {
      return (userData.savedProfiles || []).some(
        (profile) => profile.id === profileId
      );
    },
    [userData.savedProfiles]
  );

  // UserProvider is ready

  return (
    <UserContext.Provider
      value={{
        userData,
        updateUserData,
        clearUserData,
        saveProfile,
        removeSavedProfile,
        isSaved,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
