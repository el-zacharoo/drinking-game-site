import { useState, JSX } from "react";

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
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";

import { menuItems } from "@/MenuItems";

type NavLinks = {
    name: string;
    pageSlug: string;
};

const appName = import.meta.env.VITE_APP_NAME || "";

const Header = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <AppBar
            sx={{ py: 4 }}
            id="header"
            color="transparent"
            position="relative"
            elevation={0}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link
                        variant="h4"
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
                <OpenedMenu menuItems={menuItems} handleNavigate={navigate} />
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
        <Box>
            <IconButton size="large" onClick={handleOpen} color="inherit">
                <MenuRoundedIcon fontSize="large" />
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
                                    onClick={() => navigateFn(item.pageSlug)}>
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
