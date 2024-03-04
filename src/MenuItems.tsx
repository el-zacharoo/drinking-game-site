import { lazy } from "react";

const Home = lazy(() => import("@/views/Home"));
const TriviaQuestions = lazy(() => import("@/views/TriviaQuestions"));
const WordGenerator = lazy(() => import("@/views/WordGenerator"));
const Drinkalo = lazy(() => import("@/views/Drinkalo"));

export const menuItems = [
    {
        name: "Home",
        pageSlug: "",
        element: <Home />,
    },
    {
        name: "Word Generator",
        pageSlug: "word-generator",
        element: <WordGenerator />,
    },
    {
        name: "Trivia",
        pageSlug: "trivia",
        element: <TriviaQuestions />,
    },
    {
        name: "Drinking Games",
        pageSlug: "drinking-games",
        element: <Drinkalo />,
    },
];
