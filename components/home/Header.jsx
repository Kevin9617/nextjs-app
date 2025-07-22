'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderMenuContent from "../common/header/HeaderMenuContent";
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
      className={`header-nav menu_style_home_one navbar-scrolltofixed stricky main-menu  ${
        navbar ? "stricky-fixed " : "stricky-fixed"
      }`}
    >
      <div className="container-fluid p0" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80}}>
      <Link
  href="https://meetpine.com/"
  className="navbar_brand float-start dn-smd"
  style={{
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    marginTop: '0px', // move upward slightly
  }}
>
    <Image
            width={80}
            height={80}
            className="logo1 contain"
            src="/assets/images/logo.png"
            alt="header-logo.png"
          />
          <Image
            width={80}
            height={80}
            className="logo2 contain"
            src="/assets/images/logo.png"
            alt="header-logo2.png"
          />
        </Link>
        {/* site logo brand */}

        <nav>
          <HeaderMenuContent />
        </nav>
        {/* End .navbar */}
      </div>
    </header>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;
