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
    centerPadding: "90px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    dotsClass: "slick-dots slick-thumb",
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
              mx: 2,
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
      <style jsx>{`
        /* Dots Customization */
        .slick-dots li button:before {
          font-size: 12px;
          color: #aaa; /* Default dot color */
        }

        .slick-dots li.slick-active button:before {
          color: #ff5722; /* Active dot color */
        }

        /* Arrow Customization */
        .slick-prev:before,
        .slick-next:before {
          font-size: 20px;
          color: #ff5722; /* Arrow color */
        }

        .slick-prev {
          left: -45px; /* Adjust position of previous arrow */
        }

        .slick-next {
          right: -45px; /* Adjust position of next arrow */
        }

        /* Optional: Background behind dots */
        .slick-dots {
          bottom: -25px;
        }
      `}</style>
    </div>
  );
}

export default CenterMode;
