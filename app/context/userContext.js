'use client';

import { createContext, useState } from 'react';

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState({});

  return (
    <UserContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
