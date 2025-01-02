import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Popular } from '@/types/popular.type';
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {filmes.map((filme) => (
          <Box 
          key={filme.id} 
          sx={{ mx: 2, p: 2.5, cursor: 'pointer', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' }}}
          onClick={() => { router.push(`/filmes/detalhes?id=${filme.id}`) }}
          >
            <img src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} alt={filme.title} />
          </Box>
        ))}
      </Slider>
    </div>
  );  
}

export default CenterMode;
