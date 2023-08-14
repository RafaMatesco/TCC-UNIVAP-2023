import React, { createContext, useState, ReactNode } from 'react';

// Defina a tipagem para o contexto
type UserContextType = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;    
};

// Crie o contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
    children: ReactNode;
  };

// Exporte o provedor e o contexto
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState('');

  const value: UserContextType = {
    user,
    setUser
  };

  return (
    <UserContext.Provider value={ value }>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;