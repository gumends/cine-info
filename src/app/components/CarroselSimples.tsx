import { Popular } from "@/types/popular.type";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IPopular } from "@/types/popular-tv.type";
import { Box } from "@mui/material";

function Responsive({ filmes }: { filmes: Popular[] | IPopular[] }) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 0,
    };
    return (
        <div className="slider-container">
            <Slider {...settings} >
                {filmes.map((data) => (
                    <Box key={data.id} sx={{ p: 2, cursor: 'pointer' }} onClick={() => window.location.href = `/filmes/detalhes?id=${data.id}`} >
                        <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} style={{ borderRadius: '10px' }} alt={(data as Popular).title || (data as IPopular).name} />
                    </Box>
                ))}
            </Slider>
        </div>
    );
}

export default Responsive;
