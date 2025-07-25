import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import ListingGallery2 from "../common/listing-details/ListingGallery2";
import PopupSignInUp from "../common/PopupSignInUp";
import DetailsContent from "./DetailsContent";
import Sidebar from "./Sidebar";

const DEMO_PROPERTY = {
  title: "Luxury Family Home",
  location: "1421 San Pedro St, Los Angeles, CA 90015",
  price: 13000,
  img: "/assets/images/property/1.jpg",
  imgList2: [
    "/assets/images/property/2.jpg",
    "/assets/images/property/3.jpg",
    "/assets/images/property/4.jpg",
    "/assets/images/property/5.jpg"
  ]
};

const index = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Listing Single Property --> */}
      <section className="single_page_listing_style p0 mt85 md-mt0">
        <div className="container-fluid p0">
          <ListingGallery2 property={DEMO_PROPERTY} />
        </div>
      </section>

      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="listing_single_description2 mt30-767 mb30-767">
                <div className="single_property_title">
                  <h2>{DEMO_PROPERTY.title}</h2>
                  <p>{DEMO_PROPERTY.location}</p>
                </div>
                <div className="single_property_social_share style2 static-title">
                  <div className="price">
                    <h2>
                      ${DEMO_PROPERTY.price}
                    </h2>
                  </div>
                </div>
              </div>
              {/* End .listing_single_description2 */}

              <DetailsContent property={DEMO_PROPERTY} />
            </div>
            {/* End details content .col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              <Sidebar />
            </div>
            {/* End sidebar content .col-lg-4 */}
          </div>
          {/* End .row */}
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

export default index;
