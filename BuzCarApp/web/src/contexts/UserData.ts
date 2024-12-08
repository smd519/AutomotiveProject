import { useContext, createContext } from 'react';
import { ROLE_MAP } from 'src/constants';

export type UserType = {
  firstName: string;
  lastName: string;
  role: keyof typeof ROLE_MAP;
};

type UserDataContextType = {
  user?: UserType;
  setUser: (user: UserType) => void;
};

export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const useUserData = () => {
  const { user, setUser } = useContext(UserDataContext) as UserDataContextType;
  return {
    user: {
      ...user,
      allowedActions: Object.values(ROLE_MAP[user?.role as keyof typeof ROLE_MAP] || []),
    },
    setUser,
  };
};
