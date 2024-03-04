import { JSX, useState, useEffect } from "react";

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
};

export const PopupModal = (props: TPopupModal): JSX.Element => {
    const { title, rules } = props;
    const [open, setOpen] = useState<boolean>(true);

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
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
                <Button variant="contained" onClick={() => setOpen(false)}>
                    Get started
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PopupModal;
