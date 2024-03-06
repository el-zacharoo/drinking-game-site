import { JSX } from "react";

import {
    Typography,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    DialogTitle,
    Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type TPopupModal = {
    title: string;
    rules: string[];
    onClose: () => void;
    open: boolean;
    game?: string;
    variant: "rules" | "pause";
};

export const PopupModal = (props: TPopupModal): JSX.Element => {
    const { title } = props;

    return (
        <Dialog {...props}>
            <DialogTitle variant="h1" component={Typography}>
                {title}
            </DialogTitle>
            {props.variant === "rules" && <RulesModule {...props} />}
            {props.variant === "pause" && <PauseModal {...props} />}
        </Dialog>
    );
};

export default PopupModal;

const RulesModule = ({ rules, onClose }: TPopupModal): JSX.Element => {
    return (
        <>
            <DialogContent>
                <ol>
                    {rules.map((rule, index) => (
                        <Typography gutterBottom key={index} variant="h3">
                            <li>{rule}</li>
                        </Typography>
                    ))}
                </ol>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onClose}>
                    Get started
                </Button>
            </DialogActions>
        </>
    );
};

const PauseModal = ({ onClose, game }: TPopupModal): JSX.Element => {
    const navigate = useNavigate();
    const restart = game || "";

    const restartGame = (): void => {
        localStorage.removeItem(restart);
        onClose();
    };

    const onQuit = (): void => {
        localStorage.removeItem(restart);
        navigate("/");
    };

    return (
        <DialogContent>
            <Stack spacing={2}>
                <Button color="success" variant="contained" onClick={onClose}>
                    Resume
                </Button>
                <Button variant="contained" onClick={restartGame}>
                    Restart
                </Button>
                <Button variant="contained" color="error" onClick={onQuit}>
                    Quit
                </Button>
            </Stack>
        </DialogContent>
    );
};
