'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderMenuContent from "./HeaderMenuContent";
import Image from "next/image";

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`header-nav menu_style_home_one style2 navbar-scrolltofixed stricky main-menu  `}
    >
      <div className="container-fluid p0" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 100}}>
        {/* Logo: Show PINE logo image only, matching homepage */}
        <Link href="/" className="navbar_brand" style={{display: 'flex', alignItems: 'center', textDecoration: 'none'}}>
          <Image
            width={80}
            height={90}
            className="logo1 img-fluid"
            src="/assets/images/logo.png"
            alt="PINE logo"
            style={{marginRight: 0}}
          />
        </Link>
        {/* Right side: user email if logged in, else Login/Register button */}
        <HeaderMenuContent showUserEmailOnly={true} />
        <style jsx>{`
          .pine-login-btn {
            background: #fff;
            color: #1A3A34;
            border: 2px solid #1A3A34;
            border-radius: 32px;
            padding: 12px 36px;
            font-weight: 700;
            font-size: 18px;
            font-family: 'Montserrat', Arial, sans-serif;
            box-shadow: 0 2px 8px rgba(0,0,0,0.07);
            text-decoration: none;
            letter-spacing: 1px;
            transition: background 0.2s, color 0.2s, border 0.2s;
            margin-left: 24px;
            display: inline-block;
          }
          .pine-login-btn:hover, .pine-login-btn:focus {
            background: #1A3A34;
            color: #fff;
            border: 2px solid #1A3A34;
          }
        `}</style>
      </div>
    </header>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;
