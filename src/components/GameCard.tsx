import { JSX } from "react";

import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Icon as MuiIcon,
    Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type ColorIndex =
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info";

type GameCardProps = {
    name: string;
    body: string;
    pageSlug: string;
    colour: ColorIndex;
    icon: JSX.Element;
};

export const GameCard = (props: GameCardProps): JSX.Element => {
    const { name, body, pageSlug, colour, icon } = props;

    const navigate = useNavigate();

    return (
        <Card elevation={0} sx={{ backgroundColor: `${colour}.main` }}>
            <CardActionArea onClick={() => navigate(`/${pageSlug}`)}>
                <CardContent component={Stack} spacing={2}>
                    <Stack spacing={1} direction="row">
                        <Typography
                            sx={{
                                color: `${colour}.contrastText`,
                            }}
                            variant="h3">
                            {name}
                        </Typography>
                        <MuiIcon
                            fontSize="large"
                            sx={{
                                color: `${colour}.contrastText`,
                            }}>
                            {icon}
                        </MuiIcon>
                    </Stack>
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
