'use client';
import Flicking from "@egjs/react-flicking";
import { Perspective } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/react-flicking/dist/flicking-inline.css";
import {Card, CardContent, CardMedia, Chip, Tooltip, Typography } from '@mui/material'
import { Popular } from "@/types/popular.type";
import { AutoPlay } from "@egjs/flicking-plugins";
import { Inter } from "next/font/google";
import { useRouter } from 'next/navigation';

interface PopularResponse {
    results: Popular[];
}

const inter = Inter({ subsets: ['latin'] })

export function DemoComponent(props: PopularResponse) {

    const router = useRouter();

    const _plugins = [
        new Perspective({ rotate: -1, scale: 2, perspective: 1000 }),
        new AutoPlay({ duration: 4000, direction: "NEXT", stopOnHover: true, delayAfterHover: 1000 }),
    ];

    return <Flicking circular={true} align="center" plugins={_plugins}>
        {props.results.map((item: Popular) => (
            <Tooltip key={item.id} sx={{ ...inter.style }} title={item.overview} placement="bottom-start">
                <Card
                    sx={{
                        maxWidth: 500,
                        maxHeight: 500,
                        cursor: 'pointer',
                    }}
                    onClick={() => {router.push(`/filme?id=${item.id}`)}}
                >
                    <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/original${item.backdrop_path}.jpg`}
                        alt="green iguana"
                    />
                    <CardContent sx={{ position: 'relative' }}>
                        <Chip
                            color="success"
                            variant="outlined"
                            label={item.original_language}
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                ...inter.style,
                                position: 'absolute',
                                top: -10,
                                right: 0
                            }}
                        />
                        <Typography gutterBottom variant="h5" component="div" sx={{
                            fontWeight: 'bold',
                            ...inter.style,
                            mt: 2
                        }}>
                            {item.title}
                        </Typography>
                        <Chip
                            color="default"
                            variant="outlined"
                            label={new Date(item.release_date).toLocaleDateString()}
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                ...inter.style,
                            }}
                        />
                    </CardContent>
                </Card>
            </Tooltip>
        ))}
    </Flicking>;

}