'use client'

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

const DEMO_IMG = "/assets/images/property/default.jpg";

const ListingGallery2 = ({ property }) => {
  // Collect up to 5 images
  const images = [
    property?.media_image1 ? `/uploads/${property.media_image1}` : null,
    property?.media_image2 ? `/uploads/${property.media_image2}` : null,
    property?.media_image3 ? `/uploads/${property.media_image3}` : null,
    property?.media_image4 ? `/uploads/${property.media_image4}` : null,
    property?.media_image5 ? `/uploads/${property.media_image5}` : null,
  ].map(img => img || DEMO_IMG);

  return (
    <Gallery>
      <div style={{ display: 'flex', gap: 16 }}>
        {/* Left: First image large */}
        <div style={{ flex: 2 }}>
          <Item
            original={images[0]}
            thumbnail={images[0]}
            width={752}
            height={450}
          >
            {({ ref, open }) => (
              <div role="button" ref={ref} onClick={open}>
                <Image
                  width={600}
                  height={400}
                  className="img-fluid w100"
                  src={images[0]}
                  alt="property-image-1"
                  style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 8 }}
                />
              </div>
            )}
          </Item>
        </div>
        {/* Right: 2x2 grid for next 4 images */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 8 }}>
          {images.slice(1, 5).map((img, idx) => (
            <Item
              key={idx}
              original={img}
              thumbnail={img}
              width={376}
              height={195}
            >
              {({ ref, open }) => (
                <div role="button" ref={ref} onClick={open}>
                  <Image
                    width={300}
                    height={195}
                    className="img-fluid w100"
                    src={img}
                    alt={`property-image-${idx + 2}`}
                    style={{ width: '100%', height: 195, objectFit: 'cover', borderRadius: 8 }}
                  />
                </div>
              )}
            </Item>
          ))}
        </div>
      </div>
    </Gallery>
  );
};

export default ListingGallery2;
