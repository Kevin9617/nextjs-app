'use client'

import Link from "next/link";
import { isSinglePageActive } from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MyAccount = ({ onLogout }) => {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        try {
          const res = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
          if (res.ok) {
            const user = await res.json();
            setUserEmail(user.email || "");
            return;
          }
        } catch {}
      }
      setUserEmail("");
    }
    fetchUser();
    const handleLogin = fetchUser;
    const handleLogout = () => setUserEmail("");
    window.addEventListener("login", handleLogin);
    window.addEventListener("logout", handleLogout);
    return () => {
      window.removeEventListener("login", handleLogin);
      window.removeEventListener("logout", handleLogout);
    };
  }, []);

  const profileMenuItems = [
    { id: 1, name: "My Profile", ruterPath: "/my-profile" },
    { id: 2, name: " My Message", ruterPath: "/my-message" },
    { id: 3, name: " My Favourite", ruterPath: "/my-favourites" },
    { id: 4, name: " My Package", ruterPath: "/my-package" },
    { id: 5, name: " Log out", ruterPath: "/login", isLogout: true },
  ];

  return (
    <>
      <div className="user_set_header">
        <Image
          width={40}
          height={40}
          className="float-start"
          src="/assets/images/team/e1.png"
          alt="e1.png"
        />
        <p>
          <span className="address">{userEmail}</span>
        </p>
      </div>
      {/* End user_set_header */}

      <div className="user_setting_content">
        {profileMenuItems.map((item) =>
          item.isLogout ? (
            <a
              href="#"
              key={item.id}
              className="dropdown-item"
              style={{ color: isSinglePageActive(`${item.ruterPath}`, pathname) ? "#ff5a5f" : "#222", transition: 'color 0.2s' }}
              onClick={e => {
                e.preventDefault();
                if (onLogout) onLogout();
              }}
            >
              {item.name}
            </a>
          ) : (
          <Link
            href={item.ruterPath}
            key={item.id}
            className="dropdown-item"
              style={{ color: isSinglePageActive(`${item.ruterPath}`, pathname) ? "#ff5a5f" : "#222", transition: 'color 0.2s' }}
          >
            {item.name}
          </Link>
          )
        )}
      </div>
    </>
  );
};

export default MyAccount;
