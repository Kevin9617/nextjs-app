const FloorPlans = ({ form, setForm }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="planTitle">Plan Title</label>
          <input
            type="text"
            className="form-control"
            id="planTitle"
            value={form.planTitle}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="planBedrooms">Plan Bedrooms</label>
          <input
            type="text"
            className="form-control"
            id="planBedrooms"
            value={form.planBedrooms}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="planBathrooms">Plan Bathrooms</label>
          <input
            type="text"
            className="form-control"
            id="planBathrooms"
            value={form.planBathrooms}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="planPrice">Plan Price</label>
          <input
            type="text"
            className="form-control"
            id="planPrice"
            value={form.planPrice}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="pricePostfix">Price Postfix</label>
          <input
            type="text"
            className="form-control"
            id="pricePostfix"
            value={form.pricePostfix}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="planSize">Plan Size</label>
          <input
            type="text"
            className="form-control"
            id="planSize"
            value={form.planSize}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="planImage">Plan Image</label>
          <input
            type="text"
            className="form-control"
            id="planImage"
            value={form.planImage}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col-xl-12">
        <div className="my_profile_setting_textarea mt30-991">
          <label htmlFor="planDescription">Plan Description</label>
          <textarea
            className="form-control"
            id="planDescription"
            rows="7"
            value={form.planDescription}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default FloorPlans;