import { JSX } from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
    Typography,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    DialogTitle,
    MenuList,
    Divider,
    MenuItem,
    ListItemIcon,
    ListItemText,
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

type TPauseModal = {
    name: string;
    icon: JSX.Element;
    action: () => void;
    color: string;
};

export const PopupModal = (props: TPopupModal): JSX.Element => {
    const { title } = props;

    return (
        <Dialog fullWidth={true} {...props}>
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

    const pauseArr: TPauseModal[] = [
        {
            name: "Resume",
            icon: <PlayArrowIcon />,
            action: onClose,
            color: "success",
        },
        {
            name: "Restart",
            icon: <RestartAltIcon />,
            action: restartGame,
            color: "primary",
        },
        {
            name: "Quit",
            icon: <LogoutIcon />,
            action: onQuit,
            color: "error",
        },
    ];

    return (
        <>
            <Divider />
            <MenuList>
                {pauseArr.map((item, index) => (
                    <MenuItem
                        key={index}
                        sx={{ color: `${item.color}.main`, height: 50 }}
                        onClick={item.action}>
                        <ListItemIcon sx={{ color: `${item.color}.main` }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </MenuItem>
                ))}
            </MenuList>
        </>
    );
};
