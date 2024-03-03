import { lazy, Suspense, JSX } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Outline } from "@/components/Outline";
import { theme } from "@/theme";
import Viewport from "@/Viewport";

const TriviaQuestions = lazy(() => import("@/views/TriviaQuestions"));
const WordGenerator = lazy(() => import("@/views/WordGenerator"));

const queryClient = new QueryClient();

const App = (): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Suspense fallback={<Outline />}>
                        <Viewport>
                            <Routes>
                                <Route
                                    path="/trivia"
                                    element={<TriviaQuestions />}
                                />
                                <Route
                                    path="/word-generator"
                                    element={<WordGenerator />}
                                />
                            </Routes>
                        </Viewport>
                    </Suspense>
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
