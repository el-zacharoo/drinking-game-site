import { JSX, useEffect, useState } from "react";

import { Typography, SvgIconProps, PaletteOptions } from "@mui/material";

import { PageWrapper } from "@/components/PageWrapper";
import { PopupModal } from "@/components/PopupModal";
import { ClubsIcon } from "@/Icons/Clubs";
import { DiamondsIcon } from "@/Icons/Diamonds";
import { HeartsIcon } from "@/Icons/Hearts";
import { SpadesIcon } from "@/Icons/Spades";

type TKingsCup = {
    [key: string]: string;
};

const kingsCupObj: { [key: string]: TKingsCup } = {
    ACE: {
        value: "Ace",
        name: "Waterfall",
        description:
            "Everyone starts drinking, and no one can stop until the person to their left stops.",
    },
    TWO: {
        value: "Two",
        name: "You",
        description: "Pick someone to drink.",
    },
    THREE: {
        value: "Three",
        name: "Me",
        description: "Finish your drink.",
    },
    FOUR: {
        value: "Four",
        name: "Floor",
        description:
            "Everyone touches the floor, last person finishes their drink",
    },
    FIVE: {
        value: "Five",
        name: "Guys",
        description: "Guys drink.",
    },
    SIX: {
        value: "Six",
        name: "Chicks",
        description: "Chicks drink.",
    },
    SEVEN: {
        value: "Seven",
        name: "Heaven",
        description: "Last person to raise their hand finishes their drink.",
    },
    EIGHT: {
        value: "Eight",
        name: "Mate",
        description:
            "Pick someone to drink when you drink. Lasts until the next 8 is drawn.",
    },
    NINE: {
        value: "Nine",
        name: "Rhyme",
        description:
            "Pick a word, and everyone has to rhyme with it, first person who can't think of anything, drinks.",
    },
    TEN: {
        value: "Ten",
        name: "Categories",
        description:
            "Pick a category, and everyone has to say something from that category, first person who can't think of anything, drinks.",
    },
    JACK: {
        value: "Jack",
        name: "Never Have I Ever",
        description:
            "Everyone puts up 3 fingers, and you go around the circle saying things you've never done. If you've done it, put a finger down. First person to put all 3 fingers down, drinks.",
    },
    QUEEN: {
        value: "Queen",
        name: "Questions",
        description:
            "Start by asking someone a question, and they ask someone else a question, first person who can't think of anything, drinks.",
    },
    KING: {
        value: "King",
        name: "King's Cup",
        description: "Pour some of your drink into the King's Cup.",
    }
};

const suit = ["Hearts", "Diamonds", "Clubs", "Spades"];
const init = {
    name: "",
    description: "",
    value: "",
    suit: "",
    color: "",
};
const gameStateInit = {
    title: "Draw a card to reveal your fate!",
    body: "Tap anywhere to draw a card",
};

const suitColor = (randomSuit: string): string => {
    return randomSuit === "Hearts" || randomSuit === "Diamonds"
        ? "error"
        : "primary";
};

export const KingsCup = (): JSX.Element => {
    const [open, setOpen] = useState<boolean>(true);
    const [kingsCup, setKingsCup] = useState<TKingsCup>(init);
    const [game, setGame] = useState<{ [key: string]: string }>(gameStateInit);
    const drawnCards = JSON.parse(localStorage.getItem("drawnCards") || "[]");
    const gameState = drawnCards.length > 0 && kingsCup === init;

    const randomize = (): void => {
        const categories = Object.values(kingsCupObj);
        const randomIndex = Math.floor(Math.random() * categories.length);
        const randomSuit = suit[Math.floor(Math.random() * suit.length)];
        const randomCategory = categories[randomIndex];

        if (drawnCards.length >= 49) {
            localStorage.removeItem("drawnCards");
            setKingsCup(init);
            setGame({
                title: "You've drawn all the cards!",
                body: "Tap anywhere to start over.",
            });
            return;
        }

        if (drawnCards.includes(`${randomCategory.value + randomSuit}`)) {
            randomize();
            return;
        }
        const updatedDrawnCards = [
            ...drawnCards,
            `${randomCategory.value + randomSuit}`,
        ];

        localStorage.setItem("drawnCards", JSON.stringify(updatedDrawnCards));

        setKingsCup({
            value: randomCategory.value,
            name: randomCategory.name,
            description: randomCategory.description,
            suit: randomSuit,
            color: suitColor(randomSuit),
        });
    };

    useEffect(() => {
        if (gameState) {
            setGame({
                title: "Game in progress!",
                body: "Tap anywhere to draw a card",
            });
        } else {
            setGame(gameStateInit);
        }
    }, [gameState, setKingsCup]);

    const Icon = (props: SvgIconProps): JSX.Element => {
        switch (kingsCup.suit) {
            case "Hearts":
                return <HeartsIcon {...props} />;
            case "Diamonds":
                return <DiamondsIcon {...props} />;
            case "Clubs":
                return <ClubsIcon {...props} />;
            case "Spades":
                return <SpadesIcon {...props} />;
            default:
                console.error("Invalid suit:", kingsCup.suit);
                return <></>;
        }
    };

    return (
        <>
            <PopupModal
                variant={gameState ? "pause" : "rules"}
                open={open}
                game="drawnCards"
                onClose={() => setOpen(false)}
                title={gameState ? "Game in progress!" : "Kings Cup"}
                rules={[
                    "Tap the screen to draw a card.",
                    "Follow the instructions on the card.",
                    "Pass the phone to the next person on your left.",
                    "Tap the screen to draw a card.",
                ]}
            />
            <PageWrapper
                color={kingsCup.color as keyof PaletteOptions}
                onClick={randomize}>
                {kingsCup === init ? (
                    <>
                        <Typography textAlign="center" variant="h1">
                            {game.title}
                        </Typography>
                        <Typography textAlign="center" variant="h3">
                            {game.body}
                        </Typography>
                    </>
                ) : (
                    <>
                        <Icon
                            sx={{
                                color: `${kingsCup.color}.contrastText`,
                                width: 55,
                                height: 55,
                            }}
                        />
                        <Typography
                            sx={{
                                color: `${kingsCup.color}.contrastText`,
                            }}
                            variant="h1">
                            {" "}
                            {kingsCup.value} of {kingsCup.suit}
                        </Typography>
                        <Typography
                            sx={{
                                color: `${kingsCup.color}.contrastText`,
                            }}
                            variant="h3">
                            {kingsCup.name}
                        </Typography>
                        <Typography
                            textAlign="center"
                            variant="h3"
                            sx={{
                                maxWidth: {
                                    xs: "90%",
                                    sm: "80%",
                                    md: "50%",
                                },
                                color: `${kingsCup.color}.contrastText`,
                            }}>
                            {kingsCup.description}
                        </Typography>
                    </>
                )}
            </PageWrapper>
        </>
    );
};

export default KingsCup;
