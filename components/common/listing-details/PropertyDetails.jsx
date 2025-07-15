const PropertyDetails = ({ property }) => {
  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Property ID : <span>{property?.id ?? '-'}</span>
            </p>
          </li>
          <li>
            <p>
              Price : <span>${property?.price ?? '-'}</span>
            </p>
          </li>
          <li>
            <p>
              Property Size : <span>{property?.size ?? '-'} Sq Ft</span>
            </p>
          </li>
          <li>
            <p>
              Year Built : <span>{property?.year_built ?? '-'}</span>
            </p>
          </li>
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Bedrooms : <span>{property?.beds ?? '-'}</span>
            </p>
          </li>
          <li>
            <p>
              Bathrooms : <span>{property?.baths ?? '-'}</span>
            </p>
          </li>
          <li>
            <p>
              Garage : <span>{property?.garage ?? '-'}</span>
            </p>
          </li>
          <li>
            <p>
              Garage Size : <span>{property?.garage_size ?? '-'} SqFt</span>
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
