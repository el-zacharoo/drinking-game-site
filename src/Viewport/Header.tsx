import { useState, useEffect, JSX } from "react";

import CloseIcon from "@mui/icons-material/Close";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/auth/userContext";

const appName = import.meta.env.VITE_APP_NAME || "";

const Header = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <AppBar
            id="header"
            color="transparent"
            position="relative"
            elevation={0}>
            <Toolbar
                sx={{ height: "10vh" }}
                component={Stack}
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Link
                    variant="h4"
                    onClick={() => navigate("/", { state: { data: "home" } })}
                    component="button"
                    sx={{ cursor: "pointer" }}
                    underline="none"
                    color="inherit">
                    {appName}
                </Link>
                <OpenedMenu handleNavigate={navigate} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;

type OpenedMenuProps = {
    handleNavigate: (path: string) => void;
};

const OpenedMenu = (props: OpenedMenuProps): JSX.Element => {
    const { handleNavigate } = props;
    const [open, setOpen] = useState<boolean>(false);
    const { state, getUser, signOut } = useUser();

    const navigateFn = (path: string): void => {
        handleNavigate(path);
        setOpen(false);
    };

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const boxShadow =
        "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 5px 8px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px";

    useEffect(() => {
        getUser();
    }, [getUser]);

    const menuItems = [
        { name: "Home", fn: () => navigateFn("/") },
        { name: "Account", fn: () => navigateFn("/account") },
        { name: "logout", fn: signOut },
    ];

    const loggedOutMenuItems = [
        { name: "Home", fn: () => navigateFn("/") },
        { name: "Login", fn: () => navigateFn("/sign-in") },
        { name: "Create an account", fn: () => navigateFn("/register") },
    ];

    return (
        <Box>
            <IconButton size="large" onClick={handleOpen} color="inherit">
                {state?.user ? (
                    <Avatar src={state.user.picture} />
                ) : (
                    <MenuRoundedIcon fontSize="large" />
                )}
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        height: "80vh",
                        width: "90%",
                        transform: "translate(5%, 10%)",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Avatar
                            onClick={handleClose}
                            sx={{
                                width: 75,
                                height: 75,
                                bgcolor: "primary.main",
                                cursor: "pointer",
                                boxShadow,
                                "&:hover": {
                                    backgroundColor: "primary.light",
                                },
                            }}>
                            <CloseIcon fontSize="large" />
                        </Avatar>
                    </Box>
                    <List
                        sx={{
                            height: "80vh",
                            backgroundColor: "primary.main",
                            borderRadius: "8px",
                            mt: 1,
                            boxShadow,
                        }}>
                        {state.user &&
                            menuItems.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemButton
                                        sx={{
                                            color: "white",
                                            borderRadius: "8px",
                                            "&:hover": {
                                                backgroundColor:
                                                    "primary.light",
                                            },
                                        }}
                                        onClick={() => item.fn()}>
                                        {item.name}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        {!state.user &&
                            loggedOutMenuItems.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemButton
                                        sx={{
                                            color: "white",
                                            borderRadius: "8px",
                                            "&:hover": {
                                                backgroundColor:
                                                    "primary.light",
                                            },
                                        }}
                                        onClick={() => item.fn()}>
                                        {item.name}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                    </List>
                </Box>
            </Modal>
        </Box>
    );
};
