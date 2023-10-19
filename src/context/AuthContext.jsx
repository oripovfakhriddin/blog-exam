import { Fragment, createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

import { ROLE, TOKEN } from "../constants";
import request from "../server/request";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get(TOKEN))
  );
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [role, setRole] = useState(localStorage.getItem(ROLE));

  const getUser = async () => {
    setUserLoading(true);
    let { data } = await request.get("auth/me");
    setUser(data);
    setUserLoading(false);
  };

  useEffect(() => {
    isAuthenticated && getUser();
  }, [isAuthenticated]);

  const state = {
    isAuthenticated,
    role,
    user,
    userLoading,
    setIsAuthenticated,
    setRole,
    getUser,
  };
  return (
    <Fragment>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </Fragment>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
