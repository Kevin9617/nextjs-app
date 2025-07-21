'use client'

import Link from "next/link";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import Image from "next/image";

const DEMO_IMG = "/assets/images/property/default.jpg";
const getImageUrl = (filename) => filename ? `/api/image?filename=${filename}` : DEMO_IMG;

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };

  useEffect(() => {
    fetch("/api/my-properties?homepage=1")
      .then((res) => res.json())
      .then((data) => setProperties(data.properties || []));
  }, []);

  let content = properties?.map((item) => (
    <div className="item" key={item.id} style={{ display: 'flex', justifyContent: 'center' }}>
      <Link href={`/${item.slug || item.id}`} style={{ textDecoration: 'none', width: 370, maxWidth: 370, height: 540, display: 'block', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div
          className="feat_property"
          style={{
            width: 370,
            maxWidth: 370,
            height: 540,
            background: '#fff',
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div className="thumb" style={{ width: '95%', height: 280, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222b3a' }}>
            <Image
              width={362}
              height={280}
              className="img-whp cover"
              src={getImageUrl(item.media_image1)}
              alt={item.propertyTitle || 'property'}
              style={{ objectFit: 'cover', width: 362, height: 280, display: 'block', borderRadius: 0, margin: '0 auto' }}
            />
            <div className="thmb_cntnt">
              <ul className="icon mb0">
                <li className="list-inline-item">
                  <a href="#" onClick={e => e.stopPropagation()}>
                    <span className="flaticon-transfer-1"></span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" onClick={e => e.stopPropagation()}>
                    <span className="flaticon-heart"></span>
                  </a>
                </li>
              </ul>
              {/* End .icon */}
              <span className="fp_price" style={{position: 'absolute', left: 16, bottom: 16, color: '#fff', fontWeight: 700, fontSize: 28, textShadow: '0 2px 8px rgba(0,0,0,0.2)'}}>
                ${item.price}<small>/mo</small>
              </span>
            </div>
          </div>
          {/* End .thumb */}
          <div className="details" style={{ padding: '24px 24px 24px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <div className="tc_content">
              <p className="text-thm" style={{color: '#ff5a5f', fontWeight: 600, marginBottom: 4}}>{item.type}</p>
              <h4 style={{fontWeight: 700, fontSize: 22, marginBottom: 8}}>
                {item.propertyTitle}
              </h4>
              <p style={{color: '#6c757d', marginBottom: 12}}>
                <span className="flaticon-placeholder"></span>
                {item.address}, {item.city}, {item.state} {item.zip}
              </p>
              <ul className="prop_details mb0" style={{display: 'flex', gap: 4, color: '#222', fontWeight: 500, justifyContent: 'space-between', minHeight: 24}}>
                <li className="list-inline-item" style={{flex: 1, minWidth: 0}}>Beds: {item.bedrooms ? item.bedrooms : '-'}</li>
                <li className="list-inline-item" style={{flex: 1, minWidth: 0}}>Baths: {item.bathrooms ? item.bathrooms : '-'}</li>
                <li className="list-inline-item" style={{flex: 1, minWidth: 0}}>SqFt: {item.areaSize ? item.areaSize : '-'}</li>
              </ul>
            </div>
            {/* End .tc_content */}
            {/* You can add agent info/footer here if needed */}
          </div>
          {/* End .details */}
        </div>
      </Link>
    </div>
  ));

  return (
    <div style={{ paddingLeft: 2, paddingRight: 2 }}>
      <Slider
        {...settings}
        arrows={false}
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        {content.map((child, idx) => (
          <div key={idx} style={{ marginLeft: 2, marginRight: 2 }}>{child}</div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedProperties;
