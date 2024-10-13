import { Component } from "react";
import Flicking from "@egjs/react-flicking";
import { Perspective } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/react-flicking/dist/flicking-inline.css";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Popular } from "@/types/popular.type";

interface PopularResponse {
    results: Popular[];
}

export function DemoComponent(props: PopularResponse) {
    const _plugins = [new Perspective({ rotate: -1, scale: 2, perspective: 1000 })];

    return <Flicking circular={true} align="center" plugins={_plugins}>
        {props.results.map((item: Popular) => (
            <Card key={item.id} sx={{ maxWidth: 500 }}>
                <CardMedia
                    component="img"
                    height="240"
                    image={`https://image.tmdb.org/t/p/original${item.backdrop_path}.jpg`}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {item.overview}
                    </Typography>
                </CardContent>
            </Card>
        ))}
    </Flicking>;

}