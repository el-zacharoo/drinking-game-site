import { JSX } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const fullYear = new Date().getFullYear();
const appName = String(import.meta.env.VITE_APP_NAME || "");
const copright = String.fromCharCode(169);

const Footer = (): JSX.Element => {
    return (
        <div id="footer">
            <Stack
                id="copyright-block"
                sx={{ backgroundColor: "primary.main", py: 4 }}
                spacing={2}>
                <Typography
                    id="copyright-text"
                    align="center"
                    color="white"
                    variant="body2">
                    {`${copright} Copyright ${fullYear} ${appName}.`}
                </Typography>
            </Stack>
        </div>
    );
};
export default Footer;
