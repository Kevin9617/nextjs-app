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
      className={`header-nav menu_style_home_one style2 navbar-scrolltofixed stricky main-menu  ${
        navbar ? "stricky-fixed " : ""
      }`}
    >
      <div className="container-fluid p0" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 100}}>
        {/* Logo: Show PINE in bold, modern style */}
        <Link href="/" className="navbar_brand" style={{display: 'flex', alignItems: 'center', textDecoration: 'none'}}>
          <Image
            width={80}
            height={90}
            className="logo1 img-fluid"
            src="/assets/images/header-logo2.png"
            alt="PINE logo"
            style={{marginRight: 16}}
          />
          <span style={{fontWeight: 700, fontSize: 36, letterSpacing: 2, color: '#222', fontFamily: 'Montserrat, Arial, sans-serif'}}>PINE</span>
        </Link>
        {/* Login/Register button styled like For Investors */}
        <a
          href="#"
          className="btn pine-login-btn"
          data-bs-toggle="modal"
          data-bs-target=".bd-example-modal-lg"
          style={{
            background: '#1A3A34',
            color: '#fff',
            borderRadius: 32,
            padding: '12px 36px',
            fontWeight: 600,
            fontSize: 18,
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            textDecoration: 'none',
            letterSpacing: 1,
            transition: 'background 0.2s',
            marginLeft: 24
          }}
        >
          Login/Register
        </a>
      </div>
    </header>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;
