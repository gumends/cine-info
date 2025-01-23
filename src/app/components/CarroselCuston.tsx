import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
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
}

interface IProps {
    data: IData[]; // Array de objetos do tipo IData
}

function CarroselCuston(props: IProps) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 0,
                dots: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0,
                dots: false
              }
            }
          ]
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {props.data.map((data: IData) => (
                    <div key={data.id} className="itens">
                        <Card
                            sx={{
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease-in-out'
                            }}
                        >
                            <CardMedia
                                sx={{ height: 240 }}
                                image={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                                title={data.name}
                            />
                            <CardContent>
                                <Typography sx={{ fontSize: 20, mt: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} gutterBottom variant="h5" component="div">
                                    {data.name}
                                </Typography>
                                <Typography sx={{ fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} gutterBottom variant="body2" component="div">
                                    {data.character}
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
                                <Button sx={{
                                    width: '100%',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    border: '1px solid rgba(255, 255, 255, 0.5)',
                                    height: '30px',
                                    mt: 1,
                                    '&:hover': {
                                        color: 'rgba(255, 255, 255, 1)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    }
                                }}>Informações</Button>
                            </Box>
                        </Card>
                    </div>
                ))
                }
            </Slider>
        </div>
    );
}

export default CarroselCuston;
