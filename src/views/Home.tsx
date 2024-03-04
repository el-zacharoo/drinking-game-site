import { JSX } from "react";

import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import SportsBarRoundedIcon from "@mui/icons-material/SportsBarRounded";
import { Stack } from "@mui/material";

import { GameCard } from "../components/GameCard";

export const Home = (): JSX.Element => {
    return (
        <Stack spacing={2}>
            <GameCard
                name="Drinkalo"
                body="A drinking game for the whole gang!"
                pageSlug="drinkalo"
                colour="error"
                icon={<SportsBarRoundedIcon fontSize="large" />}
            />
            <GameCard
                name="Trivia"
                body="Test your knowledge!"
                pageSlug="trivia"
                colour="warning"
                icon={<HourglassTopRoundedIcon fontSize="large" />}
            />
            <GameCard
                name="My word"
                body="Generate a random word!"
                pageSlug="word-generator"
                colour="info"
                icon={<ChatBubbleOutlineRoundedIcon fontSize="large" />}
            />
            <GameCard
                name="Cahütte"
                body="Welcome to the home page!"
                pageSlug=""
                colour="success"
                icon={<ChatBubbleOutlineRoundedIcon fontSize="large" />}
            />
        </Stack>
    );
};

export default Home;
