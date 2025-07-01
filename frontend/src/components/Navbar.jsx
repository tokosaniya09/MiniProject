"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Menu } from 'lucide-react';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      const fetchUser = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/users/me");
          const data = await res.json();
          if (data?.data) {
            localStorage.setItem("user", JSON.stringify(data.data));
            setUser(data.data);
          }
        } catch (error) {
          console.error("Failed to fetch user", error);
        }
      };
      fetchUser();
    }
  }, []);

  // console.log("user from navbar", user);


  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/users/logout");
      localStorage.removeItem("user");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleLinkClick = (href) => {
    setMenuOpen(false);
    router.push(href);
  };


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  
  return (
    <nav className="navbar">
      <div className="navbar_div">
        <img src="/images/logo_black.png" className="logo_navbar" alt="logo" />

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu />
        </div>

        <div className={`navbar_options ${menuOpen ? "open" : ""}`}>
          <Link href="/" onClick={() => handleLinkClick("/")}>Home</Link>
          <Link href="/myCalls" onClick={() => handleLinkClick("/myCalls")}>My Calls</Link>
          <Link href="/volunteers" onClick={() => handleLinkClick("volunteers")}>Find a Listener</Link>
          <Link href="/chatbot" onClick={() => handleLinkClick("/talkToChatbot")}>Bot</Link>
          <Link href="/game" onClick={() => handleLinkClick("/game")}>Game</Link>
        </div>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <img
              src={user.image || "/images/default.jpg"}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => router.push("/profile")}
            />
          </div>
        ) : (
          <Link href="/login" className="login" onClick={() => handleLinkClick("/login")}>
            Login
          </Link>
        )}

      </div>
    </nav>
  );
}
