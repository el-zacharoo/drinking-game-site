import { useEffect, JSX } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DateFormatter } from "unix-date-formatter/date";

import { useUser } from "@/auth/userContext";

let dateFormatter: DateFormatter;

const Account = (): JSX.Element => {
    const { state, getUser } = useUser();

    useEffect(() => {
        getUser();
    }, [getUser]);

    dateFormatter = new DateFormatter(state.user && state.user.updatedAt);

    return (
        <Box sx={{ mx: "1rem" }}>
            {state.user && (
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <img
                        style={{ borderRadius: 100, height: 100, width: 100 }}
                        src={state.user.picture}
                        alt="user"
                    />
                    <Typography variant="h3" textAlign="center">
                        {state.user.nickname}
                    </Typography>
                    <Typography variant="h5" textAlign="center">
                        Email: {state.user.email}
                    </Typography>
                    <Typography variant="h5" textAlign="center">
                        Logged in since:{" "}
                        {dateFormatter.formatDateAndTime(
                            "Pacific/Auckland",
                            "en-NZ"
                        )}
                    </Typography>
                </Stack>
            )}
        </Box>
    );
};
export default Account;
