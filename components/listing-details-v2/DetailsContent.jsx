import FloorPlans from "../common/listing-details/FloorPlans";
import PropertyDescriptions from "../common/listing-details/PropertyDescriptions";
import PropertyDetails from "../common/listing-details/PropertyDetails";
import PropertyItem from "../common/listing-details/PropertyItem";
import PropertyLocation from "../common/listing-details/PropertyLocation";

const DetailsContent = ({ property }) => {
  return (
    <>
      <div className="listing_single_description">
        {/* End .lsd_list */}

        <h4 className="mb30">Description</h4>
        <PropertyDescriptions property={property} />
      </div>
      {/* End .listing_single_description */}

      <div className="additional_details">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb15">Property Details</h4>
          </div>
          <PropertyDetails property={property} />
        </div>
      </div>
      {/* End .additional_details */}

      <div className="application_statics mt30">
        <h4 className="mb30">
          Location{" "}
          <small className="float-end">
            {property?.address ? property.address : ''}
            {property?.city ? `, ${property.city}` : ''}
            {property?.state ? `, ${property.state}` : ''}
            {property?.zip ? ` ${property.zip}` : ''}
            {!(property?.address || property?.city || property?.state || property?.zip) ? '-' : ''}
          </small>
        </h4>
        <div className="property_video p0">
          <PropertyLocation property={property} />
        </div>
      </div>
      {/* End .location_area */}

      <div className="application_statics mt30">
        <h4 className="mb30">Floor plans</h4>
        <div className="faq_according style2">
          <FloorPlans property={property} />
        </div>
      </div>
      {/* End .floor_plane */}

    </>
  );
};

export default DetailsContent;
