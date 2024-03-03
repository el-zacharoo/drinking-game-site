import React, { JSX } from "react";

import Box from "@mui/material/Box";

import Footer from "./Footer";
import Header from "./Header";
import { Container } from "@mui/material";

type ViewportProps = {
    children: React.ReactNode;
};

const Viewport = ({ children }: ViewportProps): JSX.Element => {
    return (
        <>
            <Header />
            <Container sx={{ py: 2, height: "100vh" }} maxWidth="lg">
                {children}
            </Container>
            <Footer />
        </>
    );
};

export default Viewport;
