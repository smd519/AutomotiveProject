import { useState, useMemo, ReactNode } from 'react';
import { type UserType, UserDataContext } from './UserData';

type UserDataProviderProps = {
  children: ReactNode;
};

export const UserDataProvider = ({ children }: UserDataProviderProps) => {
  const [user, setUser] = useState<UserType | undefined>();
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};
