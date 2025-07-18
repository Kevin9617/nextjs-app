import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import MobileMenu from "../common/header/MobileMenu";
import Partners from "../common/Partners";
import Blogs from "../common/Blogs";
import FeaturedProperties from "./FeaturedProperties";
import Header from "./Header";
import WhyChoose from "../common/WhyChoose";
import PopupSignInUp from "../common/PopupSignInUp";

const Index = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Feature Properties --> */}
      <section
        id="feature-property"
        style={{
          backgroundImage: "url('/assets/images/home/1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          padding: '60px 0',
        }}
      >
        {/* Overlay for readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(29,41,62,0.5)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="main-title text-center mb100">
                </div>
              </div>
              <div className="col-lg-12">
                <div className="feature_property_slider gutter-x15">
                  <FeaturedProperties />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default Index;
