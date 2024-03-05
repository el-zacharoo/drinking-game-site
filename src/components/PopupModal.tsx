import { JSX } from "react";

import {
    Typography,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    DialogTitle,
} from "@mui/material";

type TPopupModal = {
    title: string;
    rules: string[];
    onClose: () => void;
    open: boolean;
};

export const PopupModal = (props: TPopupModal): JSX.Element => {
    const { title, rules, onClose } = props;

    return (
        <Dialog {...props}>
            <DialogTitle variant="h1" component={Typography}>
                {title}
            </DialogTitle>
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
        </Dialog>
    );
};

export default PopupModal;
