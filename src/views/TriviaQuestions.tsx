import { JSX, useState, useEffect, useCallback } from "react";

import { Typography, Stack, Paper } from "@mui/material";

import { PageWrapper } from "@/components/PageWrapper";
import { PopupModal } from "@/components/PopupModal";

const init = 60;

type TTriviaCategory = {
    id: number;
    name: string;
};

const TriviaCategory: { [key: string]: TTriviaCategory } = {
    GENERAL_KNOWLEDGE: { id: 9, name: "General Knowledge" },
    BOOKS: { id: 10, name: "Books" },
    FILM: { id: 11, name: "Film" },
    MUSIC: { id: 12, name: "Music" },
    MUSICALS_THEATRES: { id: 13, name: "Theatre" },
    TELEVISION: { id: 14, name: "Television" },
    VIDEO_GAMES: { id: 15, name: "Video Games" },
    BOARD_GAMES: { id: 16, name: "Board Games" },
    SCIENCE_NATURE: { id: 17, name: "Science & Nature" },
    COMPUTERS: { id: 18, name: "Computers" },
    MATHEMATICS: { id: 19, name: "Maths" },
    MYTHOLOGY: { id: 20, name: "Mythology" },
    SPORT: { id: 21, name: "Sports" },
    GEOGRAPHY: { id: 22, name: "Geography" },
    HISTORY: { id: 23, name: "History" },
    POLITICS: { id: 24, name: "Politics" },
    ART: { id: 25, name: "Art" },
    CELEBRITIES: { id: 26, name: "Celebrities" },
    ANIMALS: { id: 27, name: "Animals" },
    VEHICLES: { id: 28, name: "Vehicles" },
    COMICS: { id: 29, name: "Comics" },
    GADGETS: { id: 30, name: "Tech" },
    JAPANESE_ANIME_MANGA: {
        id: 31,
        name: "Anime",
    },
    CARTOON_ANIMATIONS: { id: 32, name: "Cartoons" },
};

function decodeHTMLEntities(str: string): string | null | undefined {
    if (str && typeof str === "string") {
        var element = document.createElement("div");
        str = str.replace(/<\/?[^>]+(>|$)/g, "");
        element.innerHTML = str;
        return element.textContent;
    }
}

type QuestionResponse = {
    type: "multiple" | boolean;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

const shuffleArray = (array: string[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ];
    }
    return shuffledArray;
};

export const TriviaQuestions = (): JSX.Element => {
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

    const [open, setOpen] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [countdown, setCountdown] = useState<number>(init);
    const [cancel, setCancel] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [questions, setQuestions] = useState<QuestionResponse>();
    const [triviaCategory, setTriviaCategory] = useState<TTriviaCategory>({
        id: 0,
        name: "",
    });

    const randomTriviaCategory = (): void => {
        const categories = Object.values(TriviaCategory);
        const randomIndex = Math.floor(Math.random() * categories.length);

        const randomCategory = categories[randomIndex];
        setTriviaCategory({
            id: randomCategory.id,
            name: randomCategory.name,
        });
    };

    const fetchQuestions = async (): Promise<void> => {
        try {
            const response = await fetch(
                `https://opentdb.com/api.php?amount=1&category=${triviaCategory.id}&difficulty=easy`
            );
            const data = await response.json();
            if (data.response_code === 0) {
                const results = data.results[0];
                setQuestions(results);
            }
            if (data.response_code === 1) {
                setError("Failed to fetch question, please try again.");
            }
        } catch (error) {
            setError("Failed to fetch question, please try again.");
            console.error("Failed to fetch question, please try again.", error);
        }
    };

    const handleStartTimeout = (): void => {
        if (!cancel) {
            fetchQuestions();
            setCancel(true);
            setCountdown(init);
            const newIntervalId = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            setIntervalId(newIntervalId);
            setTimeout(() => {
                stopTimer();
            }, 10000);
        }
        // setShuffledOptions([]);
        // // setQuestions(undefined);
        stopTimer();
    };

    const stopTimer = useCallback((): void => {
        if (intervalId) {
            clearInterval(intervalId);
            setCancel(false);
            setCountdown(init);
            setIntervalId(null);
        }
    }, [intervalId]);

    useEffect(() => {
        randomTriviaCategory();
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            stopTimer();
            randomTriviaCategory();
        }
    }, [countdown, stopTimer]);

    useEffect(() => {
        if (questions) {
            const allOptions = [
                questions.correct_answer,
                ...questions.incorrect_answers,
            ];
            const shuffledOptions = shuffleArray(allOptions);
            setShuffledOptions(shuffledOptions);
        }
    }, [questions]);

    const setColorForAnswer = (answer: string): string => {
        if (!cancel) {
            if (answer === questions?.correct_answer) {
                return "success.main";
            }
            return "error.main";
        }
        return "white";
    };

    return (
        <>
            <PopupModal
                open={open}
                onClose={() => setOpen(false)}
                title="Lit Trivia"
                rules={[
                    "Tap the screen to get a new question.",
                    `Everyone has ${init} seconds to answer the question.`,
                    "The person who answers correctly can choose who finishes their drink.",
                ]}
            />
            <PageWrapper
                color={cancel ? "primary" : "warning"}
                onClick={handleStartTimeout}>
                <Typography textAlign="center" color="white" variant="h1">
                    Trivia
                </Typography>
                <Typography textAlign="center" color="white" variant="h3">
                    Category:&nbsp;{triviaCategory.name}
                </Typography>
                {!cancel && (
                    <Typography textAlign="center" color="white" variant="h3">
                        Tap anywhere for a new question
                    </Typography>
                )}
                {questions && (
                    <>
                        <Typography
                            textAlign="center"
                            sx={{ color: "white" }}
                            variant="h3">
                            {decodeHTMLEntities(questions.question)}
                        </Typography>
                        <Stack spacing={2} sx={{ py: 2 }}>
                            {shuffledOptions.map((item, index) => (
                                <Typography
                                    variant="h3"
                                    textAlign="center"
                                    key={index}
                                    sx={{ color: setColorForAnswer(item) }}>
                                    {decodeHTMLEntities(item)}
                                </Typography>
                            ))}
                        </Stack>
                    </>
                )}
                {error && (
                    <Typography textAlign="center" color="error" variant="h4">
                        {error}
                    </Typography>
                )}
                <Paper sx={{ p: 1, borderRadius: 200, width: 100 }}>
                    <Typography variant="h6" textAlign="center">
                        {countdown}
                    </Typography>
                </Paper>
            </PageWrapper>
        </>
    );
};

export default TriviaQuestions;
