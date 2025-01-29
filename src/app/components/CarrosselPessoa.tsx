import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as images from '@/assets/Screenshot 2025-01-23 at 23-11-57 404 Image Placeholder.png';
import { useRouter } from "next/navigation";
import { IFilme } from "@/types/filmes.type";

interface IProps {
    data: IFilme[]; // Array de objetos do tipo IData
    tipo: string
}

function CarrosselPessoa(props: IProps) {
    const router = useRouter();
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
                    dots: false
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false
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
                }
            }
        ]
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {props.data.map((data: IFilme) => (
                    <div key={data.id} className="itens">
                        <Card
                            sx={{
                                transition: 'transform 0.3s ease-in-out',
                                maxHeight: 390,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                <CardMedia
                                    sx={{ height: 240 }}
                                    image={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : images.default.src}
                                    title={data.title}
                                />
                                <CardContent>
                                    <Typography sx={{ fontSize: 20, mt: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} gutterBottom variant="h5" component="div">
                                        {data.title || data.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} gutterBottom variant="body2" component="div">
                                        {data.tagline}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
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
                                }}
                                    onClick={() => { router.push(`${props.tipo}/detalhes?id=${data.id}`) }}
                                >Informações</Button>
                            </Box>
                        </Card>
                    </div>
                ))
                }
            </Slider>
        </div>
    );
}

export default CarrosselPessoa;
