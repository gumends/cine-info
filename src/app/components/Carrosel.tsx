import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Popular } from '@/types/popular.type';
import { IPopular } from '@/types/popular-tv.type';
import { useRouter } from "next/navigation";

function CenterMode({ filmes, tipo }: { filmes: Popular[] | IPopular[], tipo: string }) {
  const settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
                centerMode: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 0,
                dots: false,
                infinite: true,
                centerMode: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0,
                dots: false,
                infinite: true,
                centerMode: false
              }
            }
          ]
  };

  const router = useRouter();

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {filmes.map((filme) => (
          <Box
            key={filme.id}
            className="slider-item"
            sx={{
              p: 2,
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out',
              height: '100%',
            }}
            onClick={() => { router.push(`/${tipo}/detalhes?id=${filme.id}`) }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
              alt="poster"
              style={{
                borderRadius: "8px",
                width: "100%",
                height: "430px",
              }}
            />
          </Box>
        ))}
      </Slider>
    </div>
  );
}

export default CenterMode;
