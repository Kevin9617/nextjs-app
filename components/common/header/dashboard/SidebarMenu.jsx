'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SidebarMenu = () => {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        try {
          const res = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
          if (res.ok) {
            const user = await res.json();
            setUserName(user.username || "");
            setUserEmail(user.email || "");
            setUserRole(user.role || "");
            return;
          }
        } catch {}
      }
      setUserName("");
      setUserEmail("");
      setUserRole("");
    }
    fetchUser();
    const handleLogin = fetchUser;
    const handleLogout = () => {
      setUserName("");
      setUserEmail("");
      setUserRole("");
    };
    window.addEventListener("login", handleLogin);
    window.addEventListener("logout", handleLogout);
    return () => {
      window.removeEventListener("login", handleLogin);
      window.removeEventListener("logout", handleLogout);
    };
  }, []);

  const myProperties = [
    { id: 1, name: "General Elements", route: "/my-properties" },
    { id: 2, name: "Advanced Elements", route: "/my-properties" },
    { id: 3, name: "Editors", route: "/my-properties" },
  ];
  const reviews = [
    { id: 1, name: "My Reviews", route: "/my-review" },
    { id: 2, name: "Visitor Reviews", route: "/my-review" },
  ];
  const manageAccount = [
    {
      id: 1,
      name: "My Package",
      route: "/my-package",
      icon: "flaticon-box",
    },
    {
      id: 2,
      name: "My Profile",
      route: "/my-profile",
      icon: "flaticon-user",
    },
    { id: 3, name: "Logout", route: "/login", icon: "flaticon-logout" },
  ];

  const isAdminMyProperties = userRole === 'admin' && pathname === '/my-properties';
  const isAdminMinimalSidebar = userRole === 'admin' && (pathname === '/my-properties' || pathname === '/create-listing');

  if (isAdminMinimalSidebar) {
    return (
      <ul className="sidebar-menu">
        <li className="sidebar_header header">
          <Link href="/">
            <Image
              width={80}
              height={90}
              src="https://meetpine.com/wp-content/uploads/2022/12/Pine_color-for-light-BG.svg"
              alt="PINE logo"
            />
          </Link>
        </li>
        <li>
          <Link href="/create-listing">
            <i className="flaticon-plus"></i>
            <span> Create Listing</span>
          </Link>
        </li>
        <li>
          <Link href="/my-properties">
            <i className="flaticon-home"></i>
            <span> My Properties</span>
          </Link>
        </li>
        <li>
          <a href="/" onClick={e => {
            e.preventDefault();
            localStorage.removeItem("token");
            setUserName("");
            setUserEmail("");
            setUserRole("");
            window.dispatchEvent(new Event("logout"));
            window.location.href = "/";
          }}>
            <i className="flaticon-logout"></i>
            <span> Logout</span>
          </a>
        </li>
      </ul>
    );
  }

  // For all other users/pages, show nothing or an empty sidebar
  return <></>;
};

export default SidebarMenu;
