import React, { createContext, useState } from 'react';
// to retreive
export const UserContext = createContext(null);
//to provide
export default ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
