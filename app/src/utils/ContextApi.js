import React, { createContext, useEffect, useState } from "react";
import { url } from "../enviroment";
import axios from "axios";

export const DataContext = createContext();
export default function ContextApi(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [authToken, setAuthToken] = useState({
    authToken: null,
    isAuthenticated: false,
  });
  const handleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };
  const handleLoggedOut = async () => {
    try {
      const verify = await axios.get(`${url}/logout`, {
        headers: {
          "jwt-token": sessionStorage.getItem("jwt-token"),
        },
      });

      setAuthToken({
        ...authToken,
        authToken: null,
        isAuthenticated: false,
      });
      setIsAdmin(false);
      console.log(verify.data);
      sessionStorage.removeItem("jwt-token");

      setLoggedIn(false);
    } catch (error) {
      console.log(error?.response?.data, error?.response?.status);
    }
  };

  const getAuthToken = async () => {
    try {
      let auth = sessionStorage.getItem("jwt-token");
      const verify = await axios.get(`${url}/verify`, {
        headers: {
          "jwt-token": auth,
        },
      });
      if (verify.status === 201) {
        setAuthToken({
          ...authToken,
          authToken: auth,
          isAuthenticated: true,
        });
        setIsAdmin(verify?.data);
        setLoggedIn(true);
        console.log("token verified");
      } else {
        sessionStorage.removeItem("jwt-token");
        setLoggedIn(false);
      }
    } catch (error) {
      try {
        if (error?.response?.status === 406) {
          let auth = sessionStorage.getItem("jwt-token");
          const refreshToken = await axios.get(`${url}/refresh`, {
            headers: {
              "jwt-token": auth,
            },
          });
          if (refreshToken.status === 200) {
            sessionStorage.setItem("jwt-token", refreshToken?.data?.token);
            setAuthToken({
              ...authToken,
              authToken: refreshToken?.data?.token,
              isAuthenticated: true,
            });
            setIsAdmin(refreshToken?.data?.role);
          }
          alert("token refreshed");
        } else {
          console.log(error.response.data);
        }
      } catch (err) {
        console.log(err, "error for refresh token route hit");
      }
    }
  };

  useEffect(() => {
    getAuthToken();
  }, [loggedIn]);

  return (
    <>
      <DataContext.Provider
        value={{
          loggedIn,
          authToken,
          handleLoggedIn,
          handleLoggedOut,
          isAdmin,
        }}
      >
        {props.children}
      </DataContext.Provider>
    </>
  );
}
