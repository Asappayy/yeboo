import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser, Account} from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if(res){
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
          console.log(user)
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
    value={{
      isLogged,
      setIsLogged,
      setUser,
      loading,
      user,
      Account
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;