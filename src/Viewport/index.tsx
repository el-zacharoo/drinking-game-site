import React, { JSX } from "react";

import Header from "./Header";

type ViewportProps = {
    children: React.ReactNode;
};

const Viewport = ({ children }: ViewportProps): JSX.Element => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default Viewport;
