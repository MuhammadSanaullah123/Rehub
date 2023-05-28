import React from "react";
import { Link } from "react-router-dom";
//components
import Slider from "react-slick";
import Header from "../../mainLayout/Header/Header";
import Footer from "../../mainLayout/Footer/Footer";
import Reviews from "../../mainLayout/Reviews/Reviews";
import GiveReview from "../../mainLayout/GiveReview/GiveReview";
//assets
import backpic from "../../assets/homepic.png";
import therapy from "../../assets/therapy.png";
import center from "../../assets/center.png";
import backimg3 from "../../assets/backimg3.png";
// import "./App.scss";
import "../../App.scss";

function HomeSlier() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const data = [
    {
      digit: "1",
      picture: therapy,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Loremipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsumdolor sit amet, consectetur adipiscing elit",
    },
    {
      digit: "2",
      picture: therapy,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Loremipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsumdolor sit amet, consectetur adipiscing elit",
    },
    {
      digit: "3",
      picture: therapy,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Loremipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsumdolor sit amet, consectetur adipiscing elit",
    },
    {
      digit: "4",
      picture: therapy,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Loremipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsumdolor sit amet, consectetur adipiscing elit",
    },
  ];

  return (
    <div>
      <Slider {...settings}>
        {data.map((item) => {
          return (
            <div className="">
              <div className="">
                <div className="">{item.digit}</div>
              </div>
              <div className="">
                <img className="" src={therapy} alt="" />
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default HomeSlier;
