import { JSX } from "react";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const Outline = (): JSX.Element => {
    return (
        <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Skeleton variant="text" width="100%" height="10rem" />
            <Skeleton variant="text" width="100%" height="10rem" />
            <Skeleton variant="text" width="100%" height="10rem" />
        </Stack>
    );
};
