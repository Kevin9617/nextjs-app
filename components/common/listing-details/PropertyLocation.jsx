import Image from "next/image";

const PropertyLocation = ({ property }) => {
  // Use property.map_url if available, otherwise fallback
  const mapSrc = property?.map_url ||
    (property?.lat && property?.lng
      ? `https://maps.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`
      : "https://www.google.com/maps/d/embed?mid=1tJl0-uRax4AKBfbh1eLPLX5WzOk&hl=en&ehbc=2E312F");

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
              src="/assets/images/header-logo.png"
              alt="header-logo.png"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default PropertyLocation;
