import { JSX } from "react";

import { SvgIcon, SvgIconProps } from "@mui/material";

export const HeartsIcon = (props: SvgIconProps): JSX.Element => (
    <SvgIcon {...props} viewBox="0 0 32 32">
        <path d="M27.267 11.489c0.21 6.687-10.266 11.384-11.25 15.056-1.075-4.011-11.060-8.078-11.283-15.056-0.214-6.701 8.047-8.155 11.283-2.55 3.316-5.743 11.043-4.039 11.25 2.55z" />
    </SvgIcon>
);

export default HeartsIcon;
