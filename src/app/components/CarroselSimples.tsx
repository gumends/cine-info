import { Popular } from "@/types/popular.type";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IPopular } from "@/types/popular-tv.type";
import { Box } from "@mui/material";

function Responsive({ filmes, tipo }: { filmes: Popular[] | IPopular[], tipo: string }) {
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        infinite: true,
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
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 0,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 0,
                    infinite: true,
                    dots: false
                }
            }
        ]
    };
    return (
        <div className="slider-container">
            <Slider {...settings} >
                {filmes.map((data) => (
                    <Box key={data.id} className="itens" sx={{ cursor: 'pointer', height: { xs: 250, lg: 270, md: 250, sm: 250, xl: 400 } }} onClick={() => window.location.href = `/${tipo}/detalhes?id=${data.id}`} >
                        <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} style={{ borderRadius: '10px', height: '100%' }} alt={(data as Popular).title || (data as IPopular).name} />
                    </Box>
                ))}
            </Slider>
        </div>
    );
}

export default Responsive;
