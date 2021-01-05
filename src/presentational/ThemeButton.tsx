/*
 * @Author: Kanata You 
 * @Date: 2021-01-04 21:15:06 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-05 17:18:12
 */

import React, { useState } from "react";
import styleinject from "styleinject-y";
import { ClientConfigContext } from "../server-container/ClientContext.client";


const ThemeButton: React.FC = () => {
    const [theme, setTheme] = useState(ClientConfigContext.getColorTheme());

    return (
        <div className="rc-ThemeButton"
            tabIndex={ 1 }
            onClick={
                () => {
                    if (theme === "dark") {
                        ClientConfigContext.setColorTheme("light");
                        setTheme("light");
                    } else {
                        ClientConfigContext.setColorTheme("dark");
                        setTheme("dark");
                    }
                }
            } >
            { theme }
        </div>
    );
};

styleinject(".rc-ThemeButton", {
    position:       "fixed",
    right:          "40px",
    top:            "30px",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    width:          "80px",
    height:         "32px",
    background:     "linear-gradient(143deg, "
                    + "var(--Inkacy-backgroundColor) 62%, "
                    + "var(--Inkacy-color))",
    border:         "1.2px solid var(--Inkacy-border)",
    color:          "var(--Inkacy-color)",
    outline:        "none",
    userSelect:     "none",
    cursor:         "pointer",
    transition:     "color 0.6s, background 0.6s, border-color 0.6s"
});
styleinject(".rc-ThemeButton:hover", {
    color:          "var(--Inkacy-backgroundColor)",
    background:     "var(--Inkacy-color)"
});

export default ThemeButton;
