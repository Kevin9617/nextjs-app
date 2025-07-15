const PropertyDetails = ({ property }) => {
  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Property ID : <span>{property?.propertyId ?? '-'}</span>
            </p>
          </li>
          <li>
            <p>
              Price : <span>${property?.price ?? '-'}</span>
            </p>
          </li>
          <li>
            <p>
              Property Size : <span>{property?.areaSize ?? '-'} Sq Ft</span>
            </p>
          </li>
          <li>
            <p>
              Year Built : <span>{property?.yearBuilt ?? '-'}</span>
            </p>
          </li>
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Bedrooms : <span>{property?.bedrooms ?? '-'}</span>
            </p>
          </li>
          <li>
            <p>
              Bathrooms : <span>{property?.bathrooms ?? '-'}</span>
            </p>
          </li>
          <li>
            <p>
              Garage : <span>{property?.garages ?? '-'}</span>
            </p>
          </li>
          <li>
            <p>
              Garage Size : <span>{property?.garagesSize ?? '-'} SqFt</span>
            </p>
          </li>
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Property Type : <span>{property?.type ?? '-'}</span>
            </p>
          </li>
          <li>
            <p>
              Property Status : <span>{property?.status ?? '-'}</span>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PropertyDetails;
