import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthProvider = (props) => {
  const userToken = Cookies.get("token");


  const [userIsLoggedIn, setUserIsLoggedIn] = useState(!!userToken);
  

  useEffect(() => {
    localStorage.setItem("userIsLoggedIn", userIsLoggedIn.toString());
  }, [userIsLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        userIsLoggedIn,
        setUserIsLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
