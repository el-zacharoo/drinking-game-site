import { Suspense, JSX, lazy } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "@/auth/userContext";
import { Outline } from "@/components/Outline";
import { theme } from "@/theme";
import Viewport from "@/Viewport";

const Home = lazy(() => import("@/views/Home"));
const TriviaQuestions = lazy(() => import("@/views/TriviaQuestions"));
const WordGenerator = lazy(() => import("@/views/WordGenerator"));
const KingsCup = lazy(() => import("@/views/KingsCup"));
const Account = lazy(() => import("@/views/Account"));
const SignUp = lazy(() => import("@/auth/SignUp"));
const SignIn = lazy(() => import("@/auth/SignIn"));

const queryClient = new QueryClient();

export const PageViews = [
    {
        pageSlug: "",
        element: <Home />,
    },
    {
        pageSlug: "word-generator",
        element: <WordGenerator />,
    },
    {
        pageSlug: "trivia",
        element: <TriviaQuestions />,
    },
    {
        pageSlug: "drinking-games",
        element: <KingsCup />,
    },
    {
        pageSlug: "cahutte",
        element: <Home />,
    },
    {
        pageSlug: "kings-cup",
        element: <KingsCup />,
    },
    {
        pageSlug: "account",
        element: <Account />,
    },
    {
        pageSlug: "register",
        element: <SignUp />,
    },
    {
        pageSlug: "sign-in",
        element: <SignIn />,
    },
];

const App = (): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Suspense fallback={<Outline />}>
                            <Viewport>
                                <Routes>
                                    {PageViews.map((item, index) => (
                                        <Route
                                            key={index}
                                            path={`/${item.pageSlug}`}
                                            element={item.element}
                                        />
                                    ))}
                                </Routes>
                            </Viewport>
                        </Suspense>
                    </BrowserRouter>
                </QueryClientProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
