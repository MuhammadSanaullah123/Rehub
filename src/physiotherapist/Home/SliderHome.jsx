import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function SliderHome(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="mainContainerSiderHome">
      <Slider {...settings}>
        {props.data1.map((item) => (
          <div className="homelastDivd4">
            <a href={item?.link}>
              <div
                className="imageTopSliderHome"
                style={{
                  margin: "auto",
                  padding: "10px",
                  // background: props.primaryColor,
                }}
              >
                <img src={item.picture} className="imageTopSliderHomepic" alt="" />
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderHome;
