"use client";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On mount: check localStorage or fetch user from API
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      fetch("http://localhost:5000/api/users/me")
        .then((res) => res.json())
        .then((data) => {
          if (data?.data) {
            localStorage.setItem("user", JSON.stringify(data.data));
            setUser(data.data);
          }
        })
        .catch((err) => console.error("Failed to fetch user:", err));
    }
  }, []);

  // Listen to changes in localStorage (e.g., login/logout from other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
