import { JSX } from "react";

import { SvgIcon, SvgIconProps } from "@mui/material";

export const DiamondsIcon = (props: SvgIconProps): JSX.Element => (
    <SvgIcon {...props} viewBox="0 0 32 32">
        <path d="M16.050 5.438l8.537 10.501-8.537 10.501-8.537-10.501 8.537-10.501z" />
    </SvgIcon>
);

export default DiamondsIcon;
