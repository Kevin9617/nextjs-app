'use client'
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import FloorPlans from "./FloorPlans";
import LocationField from "./LocationField";
import PropertyMediaUploader from "./PropertyMediaUploader";

const initialPlan = {
  planTitle: "",
  planBedrooms: "",
  planBathrooms: "",
  planPrice: "",
  pricePostfix: "",
  planSize: "",
  planImage: "",
  planDescription: "",
};

const initialForm = {
  propertyTitle: "",
  propertyDescription: "",
  type: "",
  status: "",
  price: "",
  area: "",
  rooms: "",
  address: "",
  state: "",
  city: "",
  neighborhood: "",
  zip: "",
  country: "",
  propertyId: "",
  areaSize: "",
  sizePrefix: "",
  landArea: "",
  landAreaSizePostfix: "",
  bedrooms: "",
  bathrooms: "",
  garages: "",
  garagesSize: "",
  yearBuilt: "",
  videoUrl: "",
  virtualTour: "",
  media_image1: "",
  media_image2: "",
  media_image3: "",
  media_image4: "",
  media_image5: "",
  attachment1: "",
  attachment2: "",
  planDescription: "",
  planBedrooms: "",
  planBathrooms: "",
  planPrice: "",
  planSize: "",
  planImage: "",
  pricePostfix: "",
  planTitle: "",
  slug: "",
};

const index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  useEffect(() => {
    async function checkRole() {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        router.replace("/");
        return;
      }
      const res = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) {
        router.replace("/");
        return;
      }
      const user = await res.json();
      if (user.role !== "admin") {
        router.replace("/");
      }
    }
    checkRole();
  }, [router]);
  const [form, setForm] = useState(initialForm);
  const [floorPlans, setFloorPlans] = useState([ { ...initialPlan } ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch property data if editing
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/property/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        // Remove fields not in form, and handle floorPlans
        const { floorPlans: fetchedFloorPlans, ...rest } = data;
        setForm(prev => ({ ...prev, ...rest }));
        if (Array.isArray(fetchedFloorPlans) && fetchedFloorPlans.length > 0) {
          setFloorPlans(fetchedFloorPlans.map(plan => ({ ...initialPlan, ...plan })));
        }
      })
      .catch(() => {
        setMessage("Failed to load property data for editing.");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handlePlanChange = (idx, e) => {
    const { id, value } = e.target;
    setFloorPlans((prev) => {
      const updated = [...prev];
      updated[idx][id] = value;
      return updated;
    });
  };

  const handlePlanImageChange = (idx, filename, originalName) => {
    setFloorPlans((prev) => {
      const updated = [...prev];
      updated[idx].planImage = filename;
      updated[idx].planImageOriginal = originalName;
      return updated;
    });
  };

  const addMorePlan = () => {
    setFloorPlans((prev) => [...prev, { ...initialPlan }]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      // Get user email from /api/me
      let email = '';
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        const resMe = await fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } });
        if (resMe.ok) {
          const user = await resMe.json();
          email = user.email;
        }
      }
      let res, data;
      if (slug) {
        // Update existing property
        res = await fetch(`/api/property/${slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, floorPlans, email }),
        });
        data = await res.json();
        if (res.ok && data.success) {
          setMessage("Listing updated successfully!");
        } else {
          setMessage(data.error || "Error updating listing");
        }
      } else {
        // Create new property
        res = await fetch("/api/create-listing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, floorPlans, email }),
        });
        data = await res.json();
        if (data.success) {
          setMessage("Listing created successfully!");
          setForm(initialForm);
          setFloorPlans([ { ...initialPlan } ]);
        } else {
          setMessage(data.error || "Error creating listing");
        }
      }
    } catch (err) {
      setMessage("Network error");
    }
    setLoading(false);
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

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review">
                    <div className="row">
                      <div className="col-lg-12">
                      </div>
                      {/* Property Title */}
                      <div className="col-lg-12">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="propertyTitle">Property Title</label>
                          <input type="text" className="form-control" id="propertyTitle" value={form.propertyTitle} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="slug">Slug</label>
                          <input type="text" className="form-control" id="slug" value={form.slug} onChange={handleChange} />
                        </div>
                      </div>
                      {/* Description */}
                      <div className="col-lg-12">
                        <div className="my_profile_setting_textarea">
                          <label htmlFor="propertyDescription">Description</label>
                          <textarea className="form-control" id="propertyDescription" rows="7" value={form.propertyDescription} onChange={handleChange}></textarea>
                        </div>
                      </div>
                      {/* Type */}
                      <div className="col-lg-6 col-xl-6">
                        <div className="my_profile_setting_input ui_kit_select_search form-group">
                          <label htmlFor="type">Type</label>
                          <select className="selectpicker form-select" id="type" value={form.type} onChange={handleSelectChange}>
                            <option value="">Select Type</option>
                            <option value="Type1">Type1</option>
                            <option value="Type2">Type2</option>
                            <option value="Type3">Type3</option>
                            <option value="Type4">Type4</option>
                            <option value="Type5">Type5</option>
                          </select>
                        </div>
                      </div>
                      {/* Status */}
                      <div className="col-lg-6 col-xl-6">
                        <div className="my_profile_setting_input ui_kit_select_search form-group">
                          <label htmlFor="status">Status</label>
                          <select className="selectpicker form-select" id="status" value={form.status} onChange={handleSelectChange}>
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                          </select>
                        </div>
                      </div>
                      {/* Price */}
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="price">Price</label>
                          <input type="number" className="form-control" id="price" value={form.price} onChange={handleChange} />
                        </div>
                      </div>
                      {/* Area */}
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="area">Area</label>
                          <input type="text" className="form-control" id="area" value={form.area} onChange={handleChange} />
                        </div>
                      </div>
                      {/* Rooms */}
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input ui_kit_select_search form-group">
                          <label htmlFor="rooms">Rooms</label>
                          <select className="selectpicker form-select" id="rooms" value={form.rooms} onChange={handleSelectChange}>
                            <option value="">Select Rooms</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Location Section */}
                  <div className="my_dashboard_review mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Location</h3>
                      </div>
                      <div className="col-lg-12">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="address">Address</label>
                          <input type="text" className="form-control" id="address" value={form.address} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-6">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="state">County / State</label>
                          <input type="text" className="form-control" id="state" value={form.state} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-6">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="city">City</label>
                          <input type="text" className="form-control" id="city" value={form.city} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="neighborhood">Neighborhood</label>
                          <input type="text" className="form-control" id="neighborhood" value={form.neighborhood} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="zip">Zip</label>
                          <input type="text" className="form-control" id="zip" value={form.zip} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="my_profile_setting_input ui_kit_select_search form-group">
                          <label htmlFor="country">Country</label>
                          <select className="selectpicker form-select" id="country" value={form.country} onChange={handleSelectChange}>
                            <option value="">Select Country</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Spain">Spain</option>
                            <option value="Greece">Greece</option>
                            <option value="Portugal">Portugal</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Detailed Info Section */}
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Detailed Information</h3>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="propertyId">Property ID</label>
                          <input type="text" className="form-control" id="propertyId" value={form.propertyId} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="areaSize">Area Size</label>
                          <input type="number" className="form-control" id="areaSize" value={form.areaSize} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="sizePrefix">Size Prefix</label>
                          <input type="text" className="form-control" id="sizePrefix" value={form.sizePrefix} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="landArea">Land Area</label>
                          <input type="text" className="form-control" id="landArea" value={form.landArea} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="landAreaSizePostfix">Land Area Size Postfix</label>
                          <input type="text" className="form-control" id="landAreaSizePostfix" value={form.landAreaSizePostfix} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="bedrooms">Bedrooms</label>
                          <input type="number" className="form-control" id="bedrooms" value={form.bedrooms} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="bathrooms">Bathrooms</label>
                          <input type="number" className="form-control" id="bathrooms" value={form.bathrooms} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="garages">Garages</label>
                          <input type="number" className="form-control" id="garages" value={form.garages} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="garagesSize">Garages Size</label>
                          <input type="number" className="form-control" id="garagesSize" value={form.garagesSize} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="yearBuilt">Year Built</label>
                          <input type="date" className="form-control" id="yearBuilt" value={form.yearBuilt} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="videoUrl">Video URL</label>
                          <input type="text" className="form-control" id="videoUrl" value={form.videoUrl} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="virtualTour">360° Virtual Tour</label>
                          <input type="text" className="form-control" id="virtualTour" value={form.virtualTour} onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Property media</h3>
                    </div>
                    <PropertyMediaUploader form={form} setForm={setForm} maxImages={5} />
                  </div>
                  {/* Floor Plans Section (not included in DB for now) */}
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Floor Plans</h3>
                      <button type="button" className="btn admore_btn mb30" onClick={addMorePlan}>Add More</button>
                    </div>
                    {floorPlans.map((plan, idx) => (
                      <div key={idx}>
                        <FloorPlans
                          form={plan}
                          setForm={(updatedPlan) => {
                            setFloorPlans((prev) => {
                              const arr = [...prev];
                              arr[idx] = { ...arr[idx], ...updatedPlan };
                              return arr;
                            });
                          }}
                          onImageChange={(filename, originalName) => handlePlanImageChange(idx, filename, originalName)}
                        />
                        <div style={{textAlign: 'right', marginBottom: 24}}>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => setFloorPlans(prev => prev.filter((_, i) => i !== idx))}
                            disabled={floorPlans.length === 1}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Send Button */}
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12 text-end">
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                          width: '250px',
                          height: '60px',
                          background: '#ff5a5f',
                          color: 'white',
                          fontSize: '1.3rem',
                          border: 'none',
                          borderRadius: '10px',
                          display: 'block',
                          margin: '0 auto',
                          fontWeight: 500,
                          cursor: loading ? 'not-allowed' : 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
                        }}
                      >
                        {loading ? "Sending..." : "Send"}
                      </button>
                      {message && <div style={{ marginTop: 16, textAlign: 'center' }}>{message}</div>}
                    </div>
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

export default index;
