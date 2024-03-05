import { JSX } from "react";

import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import { Stack, Box } from "@mui/material";

import { GameCard } from "@/components/GameCard";
import { SpadeIcon } from "@/Icons/Card";

export const Home = (): JSX.Element => {
    return (
        <Box sx={{ mx: "1rem" }}>
            <Stack spacing={2}>
                <GameCard
                    headline="King's Cup"
                    subheader="Time to get lit!"
                    body="Unleash the good times at your in-person gatherings with King's Cup! No need for a deck!"
                    pageSlug="kings-cup"
                    colour="error"
                    icon={<SpadeIcon fontSize="large" />}
                />
                <GameCard
                    headline="Charades"
                    subheader="Time to act!"
                    body="Yes, it may be a little cringe, but this version should get everyone laughing!"
                    pageSlug="charades"
                    colour="warning"
                    icon={<ChatBubbleOutlineRoundedIcon fontSize="large" />}
                />
                <GameCard
                    headline="Trivia"
                    subheader="Test your knowledge!"
                    body="Not gonna lie, these are hard, I didn't even write them!"
                    pageSlug="trivia"
                    colour="info"
                    icon={<HourglassTopRoundedIcon fontSize="large" />}
                />

                {/* <GameCard
                    headline="Cahütte"
                    body="Welcome to the home page!"
                    pageSlug=""
                    colour="success"
                    icon={<ChatBubbleOutlineRoundedIcon fontSize="large" />}
                /> */}
            </Stack>
        </Box>
    );
};

export default Home;
