/*
 * @Author: Kanata You 
 * @Date: 2021-01-05 01:27:01 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-05 17:16:50
 */

import React, { useState } from "react";
import styleinject from "styleinject-y";
import ButtonCard from "../presentational/ButtonCard";
import { containerHandler } from "../App.server";
import ButtonGroup from "../container/ButtonGroup";
import { getServerProps } from "../server-container/ServerProxy";
import { ViewRouterHandler, ViewRouter, ViewCase } from "../container/ViewRouter";
import SignIn from "./SignIn";


export interface UserViewState {
    fading: boolean;
};

const User: React.FC = () => {
    const [state, setState] = useState<UserViewState>({
        fading: false
    });

    const pageHandler: ViewRouterHandler = {};
    const sp = getServerProps();

    if (state.fading) {
        setTimeout(() => {
            setState({
                ...state,
                fading: false
            });
        }, 400);
    }

    return (
        <div className={ "rc-User" + (state.fading ? " fading" : "") } >
            <ViewRouter initPath="/" handler={ pageHandler } >
                <ViewCase path="/" >
                    <ButtonGroup
                    style={{
                        flexDirection: "column"
                    }} >
                    {
                        sp?.uid ? (
                            <label key="uname" >
                                <pre>{ "Welcome, " }</pre>
                                <b>{ sp.uname }</b>
                            </label>
                        ) : (
                            [<ButtonCard key="signin"
                            text="Sign in" onClick={ () => {
                                setState({
                                    ...state,
                                    fading: true
                                });
                                setTimeout(() => {
                                    pageHandler.setPath!("/signin");
                                }, 400);
                            } } />,
                            <ButtonCard key="signup"
                            text="Sign up" onClick={ () => {
                                setState({
                                    ...state,
                                    fading: true
                                });
                                setTimeout(() => {
                                    pageHandler.setPath!("/signup");
                                }, 400);
                            } } />]
                        )
                    }
                        <ButtonCard key="home"
                            text="Home" onClick={ () => {
                                setState({
                                    ...state,
                                    fading: true
                                });
                                setTimeout(() => {
                                    containerHandler.setPath!("/");
                                }, 400);
                            } } />
                    </ButtonGroup>
                </ViewCase>
                <ViewCase path="/signin" >
                    <SignIn
                    back={
                        () => {
                            pageHandler.setPath!("/");
                        }
                    } />
                </ViewCase>
            </ViewRouter>
        </div>
    );
};

styleinject(".rc-User", {
    display:                "flex",
    flexDirection:          "column",
    alignItems:             "center",
    justifyContent:         "center",
    width:                  "100vw",
    height:                 "100vh",
    color:                  "var(--Inkacy-color)",
    overflow:               "hidden"
});
styleinject(".rc-User > *", {
    animation:              "rc-enter 0.4s ease-out"
});
styleinject(".rc-User > *:nth-child(2)", {
    animation:              "rc-enter 0.6s ease-out"
});
styleinject(".rc-User.fading", {
    animation:              "rc-fadeout 0.4s ease-in"
});
styleinject(".rc-User > div > label", {
    display:                "flex",
    alignItems:             "center",
    justifyContent:         "center",
    margin:                 "4vh 0 4vh",
    height:                 "10vh",
    fontSize:               "1.8rem"
});

export default User;
