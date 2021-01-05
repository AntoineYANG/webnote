/*
 * @Author: Kanata You 
 * @Date: 2021-01-04 20:13:15 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-05 17:24:05
 */

import React, { useState } from "react";
import styleinject from "styleinject-y";
import ButtonCard from "../presentational/ButtonCard";
import Logo from "../presentational/Logo";
import { containerHandler } from "../App.server";
import ButtonGroup from "../container/ButtonGroup";


const Home: React.FC = () => {
    const [fading, fade] = useState(false);

    return (
        <div className={ "rc-Home" + (fading ? " fading" : "") } >
            <Logo />
            <ButtonGroup>
                <ButtonCard key="user"
                    text="User" onClick={ () => {
                        fade(true);
                        setTimeout(() => {
                            containerHandler.setPath!("/user");
                        }, 400);
                    } } />
                <ButtonCard key="start"
                    text="Start" onClick={ () => {
                        fade(true);
                        setTimeout(() => {
                            containerHandler.setPath!("/editor");
                        }, 400);
                    } } />
                <ButtonCard key="group"
                    text="Group" onClick={ () => {
                        fade(true);
                        setTimeout(() => {
                            containerHandler.setPath!("/group");
                        }, 400);
                    } } />
            </ButtonGroup>
        </div>
    );
};

styleinject(".rc-Home", {
    display:                "flex",
    flexDirection:          "column",
    alignItems:             "center",
    justifyContent:         "center",
    width:                  "100vw",
    height:                 "100vh",
    color:                  "var(--Inkacy-color)",
    overflow:               "hidden"
});
styleinject(".rc-Home > *", {
    animation:              "rc-enter 0.4s ease-out"
});
styleinject(".rc-Home > *:nth-child(2)", {
    animation:              "rc-enter 0.6s ease-out"
});
styleinject(".rc-Home.fading", {
    animation:              "rc-fadeout 0.4s ease-in"
});

const style = document.createElement("style");
style.type = "text/css";
style.id = "animation";
document.head.appendChild(style);
const sheet = style.sheet as CSSStyleSheet;
sheet.insertRule(
    `@keyframes rc-enter {`
  +     `0%     { filter: blur(8px); opacity: 0; transform: translateY(20vh); }`
  +     `100%   { opacity: 1; }`
  + `}`
);
sheet.insertRule(
    `@keyframes rc-fadeout {`
  +     `0%     { filter: blur(0);     }`
  +     `50%    { filter: blur(1vmin); opacity: 1; }`
  +     `100%   { filter: blur(2vmin); opacity: 0; }`
  + `}`
);

export default Home;
