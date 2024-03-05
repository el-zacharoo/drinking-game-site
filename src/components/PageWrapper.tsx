import React, { JSX } from "react";

import { Box, CardActionArea, Stack } from "@mui/material";

type TPagewrapper = {
    color: string;
    onClick: () => void;
    children: React.ReactNode;
};

export const PageWrapper = (props: TPagewrapper): JSX.Element => {
    const { color, onClick, children } = props;
    return (
        <Box
            onClick={() => onClick()}
            component={CardActionArea}
            sx={{
                backgroundColor: `${color}.main`,
                height: "90vh",
            }}>
            <Stack
                sx={{ my: 1 }}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                {children}
            </Stack>
        </Box>
    );
};

export default PageWrapper;
