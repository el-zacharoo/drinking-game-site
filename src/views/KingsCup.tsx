import { Button } from "@mui/material";
import { JSX, useState } from "react";

type TKingsCup = {
    [key: string]: string;
};

const kingsCupObj: { [key: string]: TKingsCup } = {
    ACE: {
        value: "ACE",
        name: "Waterfall",
        description:
            "Everyone starts drinking, and no one can stop until the person to their left stops.",
    },
    TWO: {
        value: "TWO",
        name: "You",
        description: "Pick someone to drink.",
    },
    THREE: {
        value: "THREE",
        name: "Me",
        description: "You drink",
    },
    FOUR: {
        value: "FOUR",
        name: "Floor",
        description: "Everyone touches the floor, last person drinks.",
    },
    FIVE: {
        value: "FIVE",
        name: "Guys",
        description: "Guys drink.",
    },
    SIX: {
        value: "SIX",
        name: "Chicks",
        description: "Chicks drink.",
    },
    SEVEN: {
        value: "SEVEN",
        name: "Heaven",
        description: "Last person to raise their hand drinks.",
    },
    EIGHT: {
        value: "EIGHT",
        name: "Mate",
        description: "Pick someone to drink with you.",
    },
    NINE: {
        value: "NINE",
        name: "Rhyme",
        description:
            "Pick a word, and everyone has to rhyme with it, first person who can't think of anything, drinks.",
    },
    TEN: {
        value: "TEN",
        name: "Categories",
        description:
            "Pick a category, and everyone has to say something from that category, first person who can't think of anything, drinks.",
    },
    JACK: {
        value: "JACK",
        name: "Never Have I Ever",
        description: "Play never have I ever.",
    },
    QUEEN: {
        value: "QUEEN",
        name: "Questions",
        description:
            "Start by asking someone a question, and they ask someone else a question, first person who can't think of anything, drinks.",
    },
    KING: {
        value: "KING",
        name: "King's Cup",
        description: "Pour some of your drink into the King's Cup.",
    },
};

const suit = ["HEARTS", "DIAMONDS", "CLUBS", "SPADES"];

export const KingsCup = (): JSX.Element => {
    const [kingsCup, setKingsCup] = useState<TKingsCup>({
        name: "",
        description: "",
        value: "",
        suit: "",
    });
    const random = (): void => {
        const categories = Object.values(kingsCupObj);
        const randomIndex = Math.floor(Math.random() * categories.length);
        const randomSuit = suit[Math.floor(Math.random() * suit.length)];

        const randomCategory = categories[randomIndex];
        setKingsCup({
            value: randomCategory.value,
            name: randomCategory.name,
            description: randomCategory.description,
            suit: randomSuit,
        });
    };

    return (
        <>
            <Button onClick={random}>Draw a card</Button>
            {kingsCup.value && (
                <>
                    <p>{kingsCup.name}</p>
                    <p>{kingsCup.description}</p>
                    <p>
                        {kingsCup.value} of {kingsCup.suit}
                    </p>
                </>
            )}
        </>
    );
};

export default KingsCup;
