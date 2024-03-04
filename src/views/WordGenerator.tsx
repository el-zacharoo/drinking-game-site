import { JSX, useState, useEffect, useCallback } from "react";

import TimerOffOutlinedIcon from "@mui/icons-material/TimerOffOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Button, Typography, Card, Chip, Stack } from "@mui/material";

const init = 30;

export const WordGenerator = (): JSX.Element => {
    const [countdown, setCountdown] = useState<number>(init);
    const [cancel, setCancel] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<number | null>(null);

    const handleStartTimeout = (): void => {
        setCancel(true);
        setCountdown(init);
        const newIntervalId = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        setIntervalId(newIntervalId);
        setTimeout(() => {
            stopTimer();
        }, 10000);
    };

    const stopTimer = useCallback((): void => {
        if (intervalId) {
            clearInterval(intervalId);
            setCancel(false);
            setCountdown(init);
            setIntervalId(null);
        }
    }, [intervalId]);

    useEffect(() => {
        if (countdown === 0) {
            stopTimer();
        }
    }, [countdown, stopTimer]);

    return (
        <Card>
            <Stack
                sx={{ py: 2 }}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <Typography variant="h4">Word Generator</Typography>
                {!cancel ? (
                    <Button
                        startIcon={<TimerOutlinedIcon />}
                        variant="contained"
                        color="secondary"
                        onClick={handleStartTimeout}>
                        Start Timer
                    </Button>
                ) : (
                    <Button
                        startIcon={<TimerOffOutlinedIcon />}
                        variant="contained"
                        color="error"
                        onClick={stopTimer}>
                        Cancel Timer
                    </Button>
                )}
                <Typography>Time remaining</Typography>
                <Chip
                    sx={{ width: 100 }}
                    variant="outlined"
                    label={countdown}
                />
            </Stack>
        </Card>
    );
};

export default WordGenerator;
