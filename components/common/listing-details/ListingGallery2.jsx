'use client'

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

const DEMO_IMG = "/assets/images/property/default.jpg";

const getImageUrl = (filename) => filename ? `/api/image?filename=${filename}` : DEMO_IMG;

const ListingGallery2 = ({ property }) => {
  // Collect up to 5 images (filenames only)
  const images = [
    property?.media_image1,
    property?.media_image2,
    property?.media_image3,
    property?.media_image4,
    property?.media_image5,
  ];

  return (
    <Gallery>
      <div style={{ display: 'flex', gap: 16 }}>
        {/* Left: First image large */}
        <div style={{ flex: 2 }}>
          <Item
            original={getImageUrl(images[0])}
            thumbnail={getImageUrl(images[0])}
            width={752}
            height={450}
          >
            {({ ref, open }) => (
              <div role="button" ref={ref} onClick={open}>
                <Image
                  width={600}
                  height={400}
                  className="img-fluid w100"
                  src={getImageUrl(images[0])}
                  alt="property-image-1"
                  style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 8 }}
                />
              </div>
            )}
          </Item>
        </div>
        {/* Right: 2x2 grid for next 4 images */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 8 }}>
          {images.slice(1, 5).map((filename, idx) => (
            <Item
              key={idx}
              original={getImageUrl(filename)}
              thumbnail={getImageUrl(filename)}
              width={752} // changed from 376 to 752
              height={450} // changed from 195 to 450
            >
              {({ ref, open }) => (
                <div role="button" ref={ref} onClick={open}>
                  <Image
                    width={300}
                    height={195}
                    className="img-fluid w100"
                    src={getImageUrl(filename)}
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
