import Link from "next/link";
import Social from "./Social";
import SubscribeForm from "./SubscribeForm";

const Footer = () => {
  return (
    <>
      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-12 pr0 pl0">
        <div className="footer_about_widget">
          <h4>About Site</h4>
          <p>
            We’re reimagining how you buy, sell and rent. It’s now easier to get
            into a place you love. So let’s do this, together.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
