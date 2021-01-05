/*
 * @Author: Kanata You 
 * @Date: 2021-01-05 14:38:11 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-05 17:14:19
 */

import React, { useState, useEffect } from "react";
import Logo from "../presentational/Logo";
import axios from "axios";


const ServerProxyLoadingUI: React.FC = () => {
    return (
        <Logo />
    );
};

export interface ServerProxyState {
    uid:    string | null;
    uname:  string;
    code:   0 | 1 | -1;
};

export let signin = (name: string, pwd: string, ended: (state: boolean, reason: string) => void) => {};

export let updateServerProps = () => {};
export let getServerProps: () => (ServerProxyState | undefined) = () => undefined;

const ServerProxy: React.FC = props => {
    const [state, setState] = useState<ServerProxyState>({
        uid: null,
        uname: "",
        code: 0
    });

    updateServerProps = () => {
        setState({
            ...state,
            code: 0
        });
    };
    getServerProps = () => state;
    signin = (name: string, pwd: string, ended: (state: boolean, reason: string) => void) => {
        axios.post("/signin", {
            name, pwd
        }).then(res => {
            const code: 404 | -1 | -2 | 1 = res.data.data.code;
            switch (code) {
                case 404:
                    ended(false, "Falied to connect to server");
                    break;
                case -1:
                    ended(false, "User not found");
                    break;
                case -2:
                    ended(false, "Wrong password");
                    break;
                case 1:
                    ended(true, "done");
                    updateServerProps();
                    break;
            }
        }).catch(reason => {
            console.error(reason);
            ended(false, reason);
        });
    };

    useEffect(() => {
        if (state.code === 0) {
            axios.post("/getSCProps").then(res => {
                const ss = res.data.data as Exclude<ServerProxyState, "code">;
                setState({
                    ...ss,
                    code: 1
                });
            }).catch(reason => {
                console.error(reason);
                setState({
                    ...state,
                    code: -1
                });
            });
        }
    });

    return state.code === 1 ? (
        <>
            { props.children }
        </>
    ) : (
        <ServerProxyLoadingUI />
    );
};


export default ServerProxy;
