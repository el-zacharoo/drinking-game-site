import React, { JSX } from "react";

import { Box } from "@mui/material";

import Header from "./Header";

type ViewportProps = {
    children: React.ReactNode;
};

const Viewport = ({ children }: ViewportProps): JSX.Element => {
    return (
        <>
            <Header />
            <Box sx={{ mx: "1rem" }}>{children}</Box>
        </>
    );
};

export default Viewport;
