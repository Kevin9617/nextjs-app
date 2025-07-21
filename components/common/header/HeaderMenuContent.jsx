'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import MyAccount from "./dashboard/MyAccount";
import Image from "next/image";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const HeaderMenuContent = ({ float = "" }) => {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");

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
            setIsLoggedIn(true);
            return;
          }
        } catch {}
      }
      setUserName("");
      setUserEmail("");
      setUserRole("");
      setIsLoggedIn(false);
    }
    fetchUser();
    const handleLogin = fetchUser;
    const handleLogout = () => {
      setIsLoggedIn(false);
      setUserRole("");
      setUserName("");
      setUserEmail("");
    };
    window.addEventListener("login", handleLogin);
    window.addEventListener("logout", handleLogout);
    return () => {
      window.removeEventListener("login", handleLogin);
      window.removeEventListener("logout", handleLogout);
    };
  }, []);

  const property = [
    {
      id: 1,
      title: "User Admin",
      items: [
        {
          name: "Dashboard",
          routerPath: "/my-dashboard",
        },
        {
          name: "My Properties",
          routerPath: "/my-properties",
        },
        {
          name: "My Message",
          routerPath: "/my-message",
        },
        {
          name: "My Review",
          routerPath: "/my-review",
        },
        {
          name: "My Favourites",
          routerPath: "/my-favourites",
        },
        {
          name: "My Profile",
          routerPath: "/my-profile",
        },
        {
          name: "My Package",
          routerPath: "/my-package",
        },
        {
          name: "My Saved Search",
          routerPath: "/my-saved-search",
        },
        {
          name: "Add Property",
          routerPath: "/create-listing",
        },
      ],
    },
    {
      id: 2,
      title: "Listing Single",
      items: [
        {
          name: "Single V1",
          routerPath: "/listing-details-v1",
        },
        {
          name: "Single V2",
          routerPath: "/listing-details-v2",
        },
        {
          name: "Single V3",
          routerPath: "/listing-details-v3",
        },
        {
          name: "Single V4",
          routerPath: "/listing-details-v4",
        },
      ],
    },
  ];

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      {!isLoggedIn ? (
        <li className={`list-inline-item list_s ${float}`}>
          <a
            href="#"
            className="btn flaticon-user"
            data-bs-toggle="modal"
            data-bs-target=".bd-example-modal-lg"
          >
            <span className="dn-lg">Login/Register</span>
          </a>
        </li>
      ) : userRole === 'admin' ? (
        <>
          <li>
            <Link href="/my-properties">Properties</Link>
          </li>
          <li className="user_setting">
            <div className="dropdown">
              <a
                className="btn dropdown-toggle"
                href="#"
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <Image
                  width={45}
                  height={45}
                  className="rounded-circle"
                  src="/assets/images/team/e1.png"
                  alt="e1.png"
                />
                <span style={{ color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  {userName && <span>{userName}</span>}
                </span>
              </a>
              {showDropdown && (
                <div className="dropdown-menu show">
                  <MyAccount onLogout={() => {
                    localStorage.removeItem("token");
                    setUserName("");
                    setUserEmail("");
                    setUserRole("");
                    setIsLoggedIn(false);
                    window.dispatchEvent(new Event("logout"));
                    setShowDropdown(false);
                    window.location.href = "/";
                  }} />
                </div>
              )}
            </div>
          </li>
        </>
      ) : (
        <li className="user_setting">
          <div className="dropdown">
            <a
              className="btn dropdown-toggle"
              href="#"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <Image
                width={45}
                height={45}
                className="rounded-circle"
                src="/assets/images/team/e1.png"
                alt="e1.png"
              />
              <span style={{ color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {userName && <span>{userName}</span>}
              </span>
            </a>
            {showDropdown && (
              <div className="dropdown-menu show">
                <MyAccount onLogout={() => {
                  localStorage.removeItem("token");
                  setUserName("");
                  setUserEmail("");
                  setUserRole("");
                  setIsLoggedIn(false);
                  window.dispatchEvent(new Event("logout"));
                  setShowDropdown(false);
                  window.location.href = "/";
                }} />
              </div>
            )}
          </div>
        </li>
      )}
    </ul>
  );
};

export default HeaderMenuContent;
