import { JSX, useState, useEffect } from "react";

import { Button, Typography, Card, Chip, Stack, Divider } from "@mui/material";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import TimerOffOutlinedIcon from "@mui/icons-material/TimerOffOutlined";

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
    MUSICALS_THEATRES: { id: 13, name: "Musicals & Theatres" },
    TELEVISION: { id: 14, name: "Television" },
    VIDEO_GAMES: { id: 15, name: "Video Games" },
    BOARD_GAMES: { id: 16, name: "Board Games" },
    SCIENCE_NATURE: { id: 17, name: "Science & Nature" },
    COMPUTERS: { id: 18, name: "Science: Computers" },
    MATHEMATICS: { id: 19, name: "Science: Mathematics" },
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
    GADGETS: { id: 30, name: "Science: Gadgets" },
    JAPANESE_ANIME_MANGA: {
        id: 31,
        name: "Japanese Anime & Manga",
    },
    CARTOON_ANIMATIONS: { id: 32, name: "Cartoon & Animations" },
};

type QuestionResponse = {
    type: "multiple" | boolean;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

export const TriviaQuestions = (): JSX.Element => {
    const [disabled, setDisabled] = useState<boolean>(true);
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
                console.log(results);
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
        setTimeout(() => {
            setDisabled(false);
        }, 5000);
    };

    const stopTimer = (): void => {
        if (intervalId) {
            clearInterval(intervalId);
            setCancel(false);
            setCountdown(init);
            setIntervalId(null);
            setDisabled(true);
        }
    };

    const nextQuestion = async (id: string) => {
        try {
            await fetchQuestions();
            setDisabled(true);
            setTimeout(() => {
                setDisabled(false);
            }, 5000);
            if (id === "correct") {
                const current = parseInt(
                    localStorage.getItem("correctlyAnswered") || "0"
                );
                const total = current + 1;
                localStorage.setItem("correctlyAnswered", total.toString());
            }
        } catch (error) {
            setError("Failed to fetch question, please try again.");
            console.error("Failed to fetch question, please try again.", error);
        }
    };

    useEffect(() => {
        randomTriviaCategory();
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            stopTimer();
            randomTriviaCategory();
        }
    }, [countdown]);

    return (
        <Stack spacing={2}>
            <Card>
                {localStorage.getItem("correctlyAnswered") &&
                localStorage.getItem("correctlyAnswered") !== "0" ? (
                    <Typography variant="h3" color="success">
                        Correctly Answered:{" "}
                        {localStorage.getItem("correctlyAnswered")}
                    </Typography>
                ) : (
                    <></>
                )}
            </Card>
            <Card sx={{ p: 2 }}>
                <Stack
                    sx={{ my: 1 }}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <Typography variant="h1">Trivia</Typography>
                    <Stack direction="row">
                        <Typography variant="subtitle1">
                            Category:&nbsp;
                        </Typography>
                        <Typography variant="subtitle1">
                            {triviaCategory.name}
                        </Typography>
                    </Stack>
                    {questions && (
                        <>
                            <Typography variant="h4">{`${questions.question}`}</Typography>
                            <Typography
                                sx={{
                                    color: "success.main",
                                }}>{`${questions.correct_answer}`}</Typography>
                            {questions.incorrect_answers.map((item, index) => (
                                <Typography
                                    color="error"
                                    key={index}>{`${item}`}</Typography>
                            ))}
                        </>
                    )}
                    {error && (
                        <Typography color="error" variant="h4">
                            {error}
                        </Typography>
                    )}
                    {!cancel ? (
                        <Button
                            startIcon={<TimerOutlinedIcon />}
                            variant="contained"
                            color="secondary"
                            onClick={handleStartTimeout}>
                            Start Timer
                        </Button>
                    ) : (
                        <Button
                            startIcon={<TimerOffOutlinedIcon />}
                            variant="contained"
                            color="error"
                            onClick={stopTimer}>
                            Cancel Timer
                        </Button>
                    )}
                    <Typography>Time remaining</Typography>
                    <Chip
                        sx={{ width: 100 }}
                        variant="outlined"
                        label={countdown}
                    />
                </Stack>
                <Divider />
                <Stack
                    sx={{ mt: 1 }}
                    direction="row"
                    justifyContent="space-between">
                    <Button
                        id="correct"
                        disabled={disabled}
                        onClick={(e) => nextQuestion(e.currentTarget.id)}
                        variant="contained"
                        color="success">
                        Next Question
                    </Button>
                    <Button
                        id="incorrect"
                        disabled={disabled}
                        onClick={(e) => nextQuestion(e.currentTarget.id)}
                        variant="contained">
                        Skip Question
                    </Button>
                </Stack>
            </Card>
        </Stack>
    );
};

export default TriviaQuestions;
