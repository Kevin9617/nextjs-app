const LocationField = () => {
  return (
    <>
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyAddress">Address</label>
          <input type="text" className="form-control" id="propertyAddress" />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyState">County / State</label>
          <input type="text" className="form-control" id="propertyState" />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyCity">City</label>
          <input type="text" className="form-control" id="propertyCity" />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="neighborHood">Neighborhood</label>
          <input type="text" className="form-control" id="neighborHood" />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="zipCode">Zip</label>
          <input type="text" className="form-control" id="zipCode" />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Country</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option data-tokens="Turkey">Turkey</option>
            <option data-tokens="Iran">Iran</option>
            <option data-tokens="Iraq">Iraq</option>
            <option data-tokens="Spain">Spain</option>
            <option data-tokens="Greece">Greece</option>
            <option data-tokens="Portugal">Portugal</option>
          </select>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default LocationField;
