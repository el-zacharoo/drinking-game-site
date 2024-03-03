import { JSX } from "react";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const Outline = (): JSX.Element => {
    return (
        <>
            <Stack justifyContent="center" alignItems="center" sx={{ pt: 10 }}>
                <Skeleton variant="text" width={"60%"} height="5rem" />
                <Skeleton variant="text" width={"40%"} height="5rem" />
                <Skeleton
                    variant="text"
                    width={"40%"}
                    height="2rem"
                    sx={{ m: 5 }}
                />
            </Stack>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={6}
                sx={{ pt: 3 }}>
                <Skeleton variant="rounded" width={"50%"} height={"50rem"} />
                <Skeleton variant="rounded" width={"50%"} height={"30rem"} />
            </Stack>
        </>
    );
};
