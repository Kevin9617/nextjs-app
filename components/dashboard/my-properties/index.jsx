'use client'
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import TableData from "./TableData";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import { useState } from "react";

const PAGE_SIZE = 10;

const Index = () => {
  const [search, setSearch] = useState(""); // actual search term for API
  const [inputValue, setInputValue] = useState(""); // input field value
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // TableData will call this to update total count
  const handleTotalChange = (newTotal) => {
    setTotal(newTotal);
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Only update search (and trigger API) when Enter is pressed
  const handleSearchInput = (value, enterPressed = false) => {
    setInputValue(value);
    if (enterPressed) {
      setSearch(value);
      setPage(1);
    }
  };

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">My Properties</h2>
                    <p>We are glad to see you again!</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-8 col-xl-8">
                  <div className="candidate_revew_select style2 text-end mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <div className="candidate_revew_search_box course fn-520">
                          <SearchBox
                            value={inputValue}
                            onChange={(val, enter) => handleSearchInput(val, enter)}
                          />
                        </div>
                      </li>
                      {/* End li */}

                      <li className="list-inline-item">
                        <Filtering value={filter} onChange={setFilter} />
                      </li>
                      {/* End li */}
                    </ul>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      <div className="table-responsive mt0">
                        <TableData
                          search={search}
                          filter={filter}
                          page={page}
                          onTotalChange={handleTotalChange}
                        />
                      </div>
                      {/* End .table-responsive */}

                      <div className="mbp_pagination text-center">
                        <div style={{marginBottom: 8, fontWeight: 500}}>
                          {total === 0
                            ? 'No properties found.'
                            : `Showing ${(page-1)*PAGE_SIZE+1}–${Math.min(page*PAGE_SIZE, total)} of ${total} properties (Page ${page} of ${totalPages})`}
                        </div>
                        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                      </div>
                      {/* End .mbp_pagination */}
                    </div>
                    {/* End .property_table */}
                  </div>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2020 Find House. Made with love.</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
