import { Popular } from "@/types/popular.type";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IPopular } from "@/types/popular-tv.type";
import { Box } from "@mui/material";

function Responsive({ filmes, tipo }: { filmes: Popular[] | IPopular[], tipo: string }) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    };
    return (
        <div className="slider-container">
            <Slider {...settings} >
                {filmes.map((data) => (
                    <Box key={data.id} className="itens" sx={{ cursor: 'pointer' }} onClick={() => window.location.href = `/${tipo}/detalhes?id=${data.id}`} >
                        <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} style={{ borderRadius: '10px' }} alt={(data as Popular).title || (data as IPopular).name} />
                    </Box>
                ))}
            </Slider>
        </div>
    );
}

export default Responsive;
