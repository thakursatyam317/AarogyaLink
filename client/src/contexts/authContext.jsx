import React, { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const authProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      console.log(`Failed to parser user from localStorage ${error}`);
      return null;
    }
  });

  const [isLogin, setIsLogin] = useState(!!authUser);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:4500/user/profile", {
        withCredentials: true,
      });

      const user = res.data?.user || res.data || null;
      if (user) {
        setAuthUser(user);
        setIsLogin(true);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setAuthUser(null);
        setIsLogin(false);
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Fetch Profile failed:", error);

      setAuthUser(null);
      setIsLogin(false);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  //update the profile

  const updateProfile = async (updatedData) => {
    try {
      const res = await axios.put(
        "http://localhost:4500/user/update",
        updatedData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const updatedUser = res.data?.updatedUser || res.data?.user || res.data;
      if (!updatedUser) throw new Error("No updated user returned");

      setAuthUser(updatedUser);
      setIsLogin(true);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      window.dispatchEvent(new Event("authChange"));

      return updatedUser;
    } catch (error) {
      console.error("Update profile failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setAuthUser(null);
    setIsLogin(false);
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChange"));
  };


  useEffect(()=>{
     if (!authUser) {
      
      fetchProfile();
    } else {
      setLoading(false);
    }

    const handleStorageChange = () => {
      const updatedUserRaw = localStorage.getItem("user");
      if (updatedUserRaw) {
        try {
          const parsed = JSON.parse(updatedUserRaw);
          setAuthUser(parsed);
          setIsLogin(true);
        } catch {
          setAuthUser(null);
          setIsLogin(false);
        }
      } else {
        setAuthUser(null);
        setIsLogin(false);
      }
    };


    const storageListener = (e) => {
    
      handleStorageChange();
    };
    const authChangeListener = () => handleStorageChange();

    window.addEventListener("storage", storageListener);
    window.addEventListener("authChange", authChangeListener);

    return () => {
      window.removeEventListener("storage", storageListener);
      window.removeEventListener("authChange", authChangeListener);
    };
    
  }, []); 



  
  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLogin,
        setIsLogin,
        fetchProfile,
        updateProfile,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );

  


};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
