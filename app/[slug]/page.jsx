'use client'
import { useEffect, useState } from "react";
import "photoswipe/dist/photoswipe.css";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/home/Header";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import DetailsContent from "@/components/listing-details-v2/DetailsContent";
import Sidebar from "@/components/listing-details-v2/Sidebar";
import ListingGallery2 from "@/components/common/listing-details/ListingGallery2";
import { useParams } from "next/navigation";

const ListingDynamicDetailsV2 = () => {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/property/${slug}`)
      .then(res => {
        console.log(res);
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProperty(data);
        setNotFound(false);
      })
      .catch(() => {
        setProperty(null);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div style={{padding: 40, textAlign: 'center'}}><h2>Loading...</h2></div>;
  }

  if (notFound || !property) {
    return (
      <div style={{padding: 40, textAlign: 'center'}}>
        <h2>Property Not Found</h2>
        <p>The property you are looking for does not exist.</p>
      </div>
    );
  }

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
          <ListingGallery2 property={property} />
        </div>
      </section>

      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="listing_single_description2 mt30-767 mb30-767">
                <div className="single_property_title">
                  <h2>{property?.title}</h2>
                  <p>{property?.location}</p>
                </div>
                <div className="single_property_social_share style2 static-title">
                  <div className="price">
                    <h2>
                      ${property.price}
                    </h2>
                  </div>
                </div>
              </div>
              {/* End .listing_single_description2 */}
              <DetailsContent property={property} />
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

export default ListingDynamicDetailsV2;
