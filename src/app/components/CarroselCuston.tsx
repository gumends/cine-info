import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface IData {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
}[]

interface IProps {
    data: IData[];
    altura?: string;
    largura?: string;
    margin?: string;
    padding?: string;
    backgroundColor?: string;
    borderRadius?: string;
    cor?: string;
    fontSize?: string;
    fontColor?: string;
    fontWeight?: string;
}

function CarroselCuston(props: IProps) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {props.data.map((data: IData) => (
                    <Card key={data.id}
                    sx={{
                        mx: 2,
                        p: 2,
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease-in-out',
                        height: '100%',
                      }}
                    >
                        <CardMedia
                            sx={{ height: 240 }}
                            image={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                            title={data.name}
                        />
                        <CardContent>
                            <Typography sx={{ fontSize: 20, mt: 1 }} gutterBottom variant="h5" component="div">
                                {data.name}
                            </Typography>
                            <Typography sx={{ fontSize: 12 }} gutterBottom variant="body2" component="div">
                                {data.character}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
                }
            </Slider>
        </div>
    );
}

export default CarroselCuston;
