/*
 * @Author: Kanata You 
 * @Date: 2021-01-04 20:18:14 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-05 15:33:24
 */

import React, { useState, useEffect } from "react";
import ColorTheme, { injectRoot } from "../constance/ColorTheme";
import ServerProxy from "./ServerProxy";


export type ClientContextState = {
    colorTheme: keyof typeof ColorTheme;
};

export type ClientConfigContextType = {
    getColorTheme: () => ClientContextState["colorTheme"];
    setColorTheme: (colorTheme: ClientContextState["colorTheme"]) => void;
};

export let ClientConfigContext: ClientConfigContextType = {
    getColorTheme: () => "dark",
    setColorTheme: () => {}
};

const ClientContext: React.FC = props => {
    const [state, setState] = useState<ClientContextState>({
        colorTheme: "dark"
    });

    useEffect(() => {
        ClientConfigContext = {
            getColorTheme: () => state.colorTheme,
            setColorTheme: colorTheme => {
                setState({
                    ...state,
                    colorTheme
                });
            }
        };
    }, [state, setState]);

    useEffect(() => {
        injectRoot(ColorTheme[state.colorTheme]);
    }, [state]);

    return (
        <ServerProxy>
            { props.children }
        </ServerProxy>
    );
};

export default ClientContext;
