import { useState, JSX } from "react";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Modal from "@mui/material/Modal";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";

type NavLinks = {
    fields: {
        name: string;
        pageSlug: string;
    };
};

const appName = import.meta.env.VITE_APP_NAME || "";
const menuItems = [
    {
        fields: {
            name: "Home",
            pageSlug: "",
        },
    },
    {
        fields: {
            name: "Word Generator",
            pageSlug: "word-generator",
        },
    },
    {
        fields: {
            name: "Trivia",
            pageSlug: "trivia",
        },
    },
];

const Header = (): JSX.Element => {
    const navigate = useNavigate();

    const handleNavigate = (path: string): void => {
        if (!path) {
            return;
        }
        if (path === "home") {
            navigate("/", { state: { data: path } });
        }
        navigate(`/${path}`, { state: { data: path } });
    };

    return (
        <AppBar
            id="header"
            color="transparent"
            position="relative"
            elevation={0}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link
                        onClick={() =>
                            navigate("/", { state: { data: "home" } })
                        }
                        component="button"
                        sx={{ cursor: "pointer" }}
                        underline="none"
                        color="inherit">
                        {appName}
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        "&:hover": { color: "grey.200" },
                    }}>
                    {menuItems.map((item, index) => (
                        <Button
                            key={index}
                            sx={{
                                mx: 1,
                                "&:hover": {
                                    color: "primary.main",
                                    backgroundColor: "background.default",
                                },
                            }}
                            color="inherit"
                            onClick={() =>
                                handleNavigate(item.fields.pageSlug)
                            }>
                            {item.fields.name}
                        </Button>
                    ))}
                </Box>
                <OpenedMenu
                    menuItems={menuItems}
                    handleNavigate={handleNavigate}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Header;

type OpenedMenuProps = {
    menuItems: NavLinks[];
    handleNavigate: (path: string) => void;
};

const OpenedMenu = (props: OpenedMenuProps): JSX.Element => {
    const { menuItems, handleNavigate } = props;
    const [open, setOpen] = useState<boolean>(false);

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

    return (
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpen} color="inherit">
                <MenuIcon fontSize="large" />
            </IconButton>
            <Modal
                sx={{ display: { xs: "block", md: "none" } }}
                open={open}
                onClose={handleClose}>
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
                        {menuItems.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemButton
                                    sx={{
                                        color: "white",
                                        borderRadius: "8px",
                                        "&:hover": {
                                            backgroundColor: "primary.light",
                                        },
                                    }}
                                    onClick={() =>
                                        navigateFn(item.fields.pageSlug)
                                    }>
                                    {item.fields.name}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>
        </Box>
    );
};
