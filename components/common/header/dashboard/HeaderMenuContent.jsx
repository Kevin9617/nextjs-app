
'use client'

import Link from "next/link";

import MyAccount from "./MyAccount";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HeaderMenuContent = ({ float = "" }) => {

  const pathname = usePathname();
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        try {
          const res = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
          if (res.ok) {
            const user = await res.json();
            setUserRole(user.role || "");
            setUserName(user.username || "");
            setUserEmail(user.email || "");
            setIsLoggedIn(true);
            return;
          }
        } catch {}
      }
      setUserRole("");
      setUserName("");
      setUserEmail("");
      setIsLoggedIn(false);
    }
    fetchUser();
    const handleLogin = fetchUser;
    const handleLogout = () => {
      setUserRole("");
      setUserName("");
      setUserEmail("");
      setIsLoggedIn(false);
    };
    window.addEventListener("login", handleLogin);
    window.addEventListener("logout", handleLogout);
    return () => {
      window.removeEventListener("login", handleLogin);
      window.removeEventListener("logout", handleLogout);
    };
  }, []);

  const home = [
    {
      id: 1,
      name: "Home 1",
      routerPath: "/",
    },
    { id: 2, name: "Home 2", routerPath: "/home-2" },
    {
      id: 3,
      name: "Home 3",
      routerPath: "/home-3",
    },
    { id: 4, name: "Home 4", routerPath: "/home-4" },
    { id: 5, name: "Home 5", routerPath: "/home-5" },
    { id: 6, name: "Home 6", routerPath: "/home-6" },
    { id: 7, name: "Home 7", routerPath: "/home-7" },
    { id: 8, name: "Home 8", routerPath: "/home-8" },
    { id: 9, name: "Home 9", routerPath: "/home-9" },
    { id: 10, name: "Home 10", routerPath: "/home-10" },
  ];

  const listing = [
    {
      id: 1,
      title: "Listing Grid",
      items: [
        {
          name: "Grid v1",
          routerPath: "/listing-grid-v1",
        },
        {
          name: "Grid v2",
          routerPath: "/listing-grid-v2",
        },
        {
          name: "Grid v3",
          routerPath: "/listing-grid-v3",
        },
        {
          name: "Grid v4",
          routerPath: "/listing-grid-v4",
        },
        {
          name: "Grid v5",
          routerPath: "/listing-grid-v5",
        },
        {
          name: "Grid v6",
          routerPath: "/listing-grid-v6",
        },
      ],
    },
    {
      id: 2,
      title: "Listing List",
      items: [
        {
          name: "List V1",
          routerPath: "/listing-list-v1",
        },
      ],
    },
    {
      id: 3,
      title: "Listing Style",
      items: [
        {
          name: "Parallax Style",
          routerPath: "/parallax-style",
        },
        {
          name: "Slider Style",
          routerPath: "/slider-style",
        },
        {
          name: "Map Header",
          routerPath: "/map-header",
        },
      ],
    },
    {
      id: 4,
      title: "Listing Half",
      items: [
        {
          name: "Map V1",
          routerPath: "/listing-map-v1",
        },
        {
          name: "Map V2",
          routerPath: "/listing-map-v2",
        },
        {
          name: "Map V3",
          routerPath: "/listing-map-v3",
        },
        {
          name: "Map V4",
          routerPath: "/listing-map-v4",
        },
      ],
    },
    {
      id: 5,
      title: "Agent View",
      items: [
        {
          name: "Agent V1",
          routerPath: "/agent-v1",
        },
        {
          name: "Agent V2",
          routerPath: "/agent-v2",
        },
        {
          name: "Agent Details",
          routerPath: "/agent-details",
        },
      ],
    },
    {
      id: 6,
      title: "Agencies View",
      items: [
        {
          name: "Agencies V1",
          routerPath: "/agency-v1",
        },
        {
          name: "Agencies V2",
          routerPath: "/agency-v2",
        },
        {
          name: "Agencies Details",
          routerPath: "/agency-details",
        },
      ],
    },
  ];

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

  const blog = [
    { id: 1, name: "Blog List 1", routerPath: "/blog-list-1" },
    { id: 2, name: "Blog List 2", routerPath: "/blog-list-2" },
    { id: 3, name: "Blog List 3", routerPath: "/blog-list-3" },
    {
      id: 4,
      name: "Blog Details",
      routerPath: "/blog-details",
    },
  ];

  const pages = [
    { id: 1, name: "About Us", routerPath: "/about-us" },
    { id: 2, name: "Gallery", routerPath: "/gallery" },
    { id: 3, name: "Faq", routerPath: "/faq" },
    { id: 4, name: "LogIn", routerPath: "/login" },
    { id: 5, name: "Compare", routerPath: "/compare" },
    { id: 6, name: "Membership", routerPath: "/membership" },

    { id: 7, name: "Register", routerPath: "/register" },
    { id: 8, name: "Service", routerPath: "/service" },
    { id: 9, name: "404 Page", routerPath: "/404" },
    { id: 10, name: "Terms & Conditions", routerPath: "/terms" },
  ];

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      <li className="user_setting">
        <div className="dropdown">
          <a className="btn dropdown-toggle" href="#" data-bs-toggle="dropdown">
            <Image
              width={45}
              height={45}
              className="rounded-circle"
              src="/assets/images/team/e1.png"
              alt="e1.png"
            />
            <span className="dn-1199 ms-1">{userName}</span>
          </a>
          <div className="dropdown-menu">
            <MyAccount onLogout={() => {
              localStorage.removeItem("token");
              setUserName("");
              setUserEmail("");
              setUserRole("");
              setIsLoggedIn(false);
              window.dispatchEvent(new Event("logout"));
              window.location.href = "/";
            }} />
          </div>
        </div>
      </li>
      {/* End ."user_setting */}

      {userRole === 'admin' && (
        <li className={`list-inline-item add_listing ${float}`}>
          <Link href="/create-listing">
            <span className="flaticon-plus"></span>
            <span className="dn-lg"> Create Listing</span>
          </Link>
        </li>
      )}
      {/* End .dropitem */}

    </ul>
  );
};

export default HeaderMenuContent;
