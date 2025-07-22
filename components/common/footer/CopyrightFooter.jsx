import Link from "next/link";

const CopyrightFooter = () => {

  return (
    <div className="row" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div className="col-lg-6 col-xl-6" style={{ flex: '0 0 auto' }}>
        <div className="copyright-widget text-end">
          <p>
            &copy; {new Date().getFullYear()} by{" "}
            <a
              href="https://themeforest.net/user/ib-themes"
              target="_blank"
              rel="noreferrer"
            >
              Pine
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default CopyrightFooter;
