import { Box } from "@mui/material";
import React, { Component, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Popular } from '@/types/popular.type';

function CenterMode({ filmes }: { filmes: Popular[] }) {
  const settings = {
    dots: true,
    className: "right",
    centerMode: true,
    infinite: true,
    centerPadding: "90px",
    slidesToShow: 3,
    speed: 500,
  };
  
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {filmes.map((filme) => (
          <div key={filme.id}>
          <Box key={filme.id} sx={{ mx: 2 }}>
            <img src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} alt={filme.title} />
          </Box>
          </div>
        ))}
      </Slider>
    </div>
  );  
}

export default CenterMode;
