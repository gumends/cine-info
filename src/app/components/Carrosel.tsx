import { Box } from "@mui/material";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CenterMode() {
  const settings = {
    dots: true,
    className: "right",
    centerMode: true,
    infinite: true,
    centerPadding: "90px",
    slidesToShow: 3,
    speed: 500,
  };

  const teste = [
    {teste:  1},
    {teste:  2},
    {teste:  3},
    {teste:  4},
    {teste:  5},
    {teste:  6},
    {teste:  7},
    {teste:  8}
  ]
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {
          teste.map((ts, key) => {
            return <Box sx={{ bgcolor: 'red', height: 100 }} key={key} className="">{ts.teste}</Box>;
          })
        }
      </Slider>
    </div>
  );  
}

export default CenterMode;
