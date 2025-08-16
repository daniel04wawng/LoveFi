import { createContext, useContext, useState, ReactNode } from 'react';

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
  gender?: 'woman' | 'man' | 'non-binary' | 'other';
  customGender?: string;
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({});

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const clearUserData = () => {
    setUserData({});
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
