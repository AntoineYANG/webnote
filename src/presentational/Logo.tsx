/*
 * @Author: Kanata You 
 * @Date: 2021-01-05 01:09:03 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-05 01:36:44
 */

import React from "react";
import styleinject from "styleinject-y";


const Logo: React.FC = () => (
    <div key="logo" className="rc-Logo" >
        <label>
            Inkacy
        </label>
    </div>
);

styleinject(".rc-Logo", {
    fontSize:               "4rem",
    fontFamily:             "Century Gothic",
    margin:                 "8vh 0 12vh",
    background:             "repeating-linear-gradient(-37deg, "
                            + "var(--Inkacy-active), "
                            + "var(--Inkacy-color) 10%, "
                            + "var(--Inkacy-color) 14%, "
                            + "var(--Inkacy-backgroundActive) 24%)",
    backgroundSize:         "100% 100%",
    WebkitTextFillColor:    "transparent",
    WebkitBackgroundClip:   "text"
});

export default Logo;
