import { Suspense, JSX } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Outline } from "@/components/Outline";
import { menuItems } from "@/MenuItems";
import { theme } from "@/theme";
import Viewport from "@/Viewport";

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
                                {menuItems.map((item, index) => (
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
        </ThemeProvider>
    );
};

export default App;
