import Image from "next/image";

const PropertyLocation = ({ property }) => {
  // Use property.map_url if available, otherwise fallback
  let mapSrc = property?.map_url;

  if (!mapSrc) {
    if (property?.lat && property?.lng) {
      mapSrc = `https://maps.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`;
    } else if (property?.address || property?.city || property?.state || property?.zip) {
      // Build address string for Google Maps
      const addressParts = [property.address, property.city, property.state, property.zip].filter(Boolean);
      const addressString = encodeURIComponent(addressParts.join(', '));
      mapSrc = `https://maps.google.com/maps?q=${addressString}&z=15&output=embed`;
    } else {
      mapSrc = "https://www.google.com/maps/d/embed?mid=1tJl0-uRax4AKBfbh1eLPLX5WzOk&hl=en&ehbc=2E312F";
    }
  }

  return (
    <>
      <div className="thumb">
        <div className="h400" id="map-canvas">
          <div className="gmap_canvas ">
            <iframe
              title="map"
              className="gmap_iframe"
              src={mapSrc}
            ></iframe>
          </div>
        </div>
        <div className="overlay_icon">
          <a href="#">
            <Image
              width={40}
              height={45}
              className="map_img_icon"
              src="https://meetpine.com/wp-content/uploads/2022/12/Pine_monochrome_white.svg"
              alt="header-logo.png"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default PropertyLocation;
