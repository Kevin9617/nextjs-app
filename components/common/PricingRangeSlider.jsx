"use client";

import { useEffect } from "react";
import { useState } from "react";
import Slider from "rc-slider";
import { useDispatch } from "react-redux";
import { addPrice } from "../../features/properties/propertiesSlice";

const RangeSlider = () => {
  const [price, setPrice] = useState([10000, 20000]);
  const dispath = useDispatch();

  // price add to state
  useEffect(() => {
    dispath(
      addPrice({
        min: price[0],
        max: price[1],
      })
    );
  }, [dispath, price]);

  return (
    <div className="nft__filter-price tp-range-slider tp-range-slider-dark mb-20">
      <div className="nft__filter-price-inner d-flex align-items-center justify-content-between">
        <div className="nft__filter-price-box">
          <div className="d-flex align-items-center">
            <span>$ </span>
            <span>{price[0]}</span>
          </div>
        </div>
        <div className="nft__filter-price-box">
          <div className="d-flex align-items-center">
            <span>$ </span>
            <span>{price[1]}</span>
          </div>
        </div>
      </div>

      <Slider max={20000} min={10000} range value={price} onChange={setPrice} />

      <div className="slider-styled inside-slider" id="nft-slider"></div>
    </div>
  );
};

export default RangeSlider;
