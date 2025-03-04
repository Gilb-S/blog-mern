import { createContext, useState } from "react";


// context to grab 
export const UserContext = createContext();

// create custom user provider

const UserProvider = ({children}) => {
  const [user, setUser] = useState({
    email: localStorage.getItem('email'),
    posts: []
  });
  // provide the value that is user and setuser
  return <UserContext.Provider value={{user, setUser}}>
    {children}
  </UserContext.Provider>
}


export default UserProvider;