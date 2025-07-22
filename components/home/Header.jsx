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
      <div className="container-fluid p0" style={{display: 'flex', alignItems: 'top', justifyContent: 'space-between', height: 80}}>
        <Link href="https://meetpine.com/" className="navbar_brand float-start dn-smd">
          <Image
            width={80}
            height={80}
            className="logo1 contain"
            src="https://meetpine.com/wp-content/uploads/2022/12/Pine_monochrome_white.svg"
            alt="header-logo.png"
          />
          <Image
            width={80}
            height={80}
            className="logo2 contain"
            src="https://meetpine.com/wp-content/uploads/2022/12/Pine_color-for-light-BG.svg"
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
