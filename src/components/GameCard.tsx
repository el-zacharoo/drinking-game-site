import { JSX } from "react";

import {
    Card,
    CardHeader,
    CardActionArea,
    CardContent,
    Typography,
    Icon as MuiIcon,
    Stack,
    PaletteOptions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type GameCardProps = {
    headline: string;
    subheader: string;
    body: string;
    pageSlug: string;
    colour: keyof PaletteOptions;
    icon: JSX.Element;
};

export const GameCard = (props: GameCardProps): JSX.Element => {
    const { headline, body, subheader, pageSlug, colour, icon } = props;

    const navigate = useNavigate();

    return (
        <Card
            id={pageSlug}
            elevation={0}
            sx={{ backgroundColor: `${colour}.main` }}>
            <CardActionArea onClick={() => navigate(`/${pageSlug}`)}>
                <CardHeader
                    avatar={
                        <MuiIcon
                            fontSize="large"
                            sx={{
                                color: `${colour}.contrastText`,
                            }}>
                            {icon}
                        </MuiIcon>
                    }
                    title={
                        <Typography
                            sx={{
                                color: `${colour}.contrastText`,
                            }}
                            variant="h3">
                            {headline}
                        </Typography>
                    }
                    subheader={
                        <Typography
                            sx={{
                                color: `${colour}.contrastText`,
                            }}>
                            {subheader}
                        </Typography>
                    }
                />
                <CardContent component={Stack} spacing={2}>
                    <Typography
                        sx={{
                            color: `${colour}.contrastText`,
                        }}>
                        {body}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
