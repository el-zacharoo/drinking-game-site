import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { useUser } from "@/auth/userContext";

const SignIn = () => {
    const { signIn, state } = useUser();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        grant_type: "password",
        audience: import.meta.env.VITE_AUTH_AUDIENCE || "",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        signIn(credentials);
    };

    console.log(state);

    return (
        <Dialog open={true} fullWidth={true}>
            <DialogTitle variant="h1" component={Typography}>
                Sign In
            </DialogTitle>

            <form onSubmit={onSubmit}>
                <Grid sx={{ p: 2 }} spacing={2} container>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="username"
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            type="password"
                            fullWidth
                            name="password"
                            label="Password"
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <Button type="submit" fullWidth variant="contained">
                            Sign In
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    );
};
export default SignIn;
