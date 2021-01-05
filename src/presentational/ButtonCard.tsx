/*
 * @Author: Kanata You 
 * @Date: 2021-01-05 00:13:26 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-05 15:52:40
 */

import React from "react";
import styleinject from "styleinject-y";


export interface ButtonCardProps {
    text:       string;
    onClick:    () => void;
};

const ButtonCard: React.FC<ButtonCardProps> = props => {
    return (
        <div className="rc-ButtonCard"
          tabIndex={ 1 }
          onClick={ props.onClick } >
            <label>{ props.text }</label>
        </div>
    );
};

styleinject(".rc-ButtonCard", {
    margin:         "0 calc(10px + 4vw)",
    padding:        "1rem 1rem 2rem",
    minWidth:       "140px",
    maxWidth:       "32vw",
    flex:           1,
    fontSize:       "1.2rem",
    color:          "var(--Inkacy-border)",
    userSelect:     "none",
    border:         "1.2px solid var(--Inkacy-border)",
    borderRadius:   "1rem",
    background:     "var(--Inkacy-background)",
    cursor:         "pointer",
    outline:        "none",
    transition:     "color 0.6s, border-color 0.6s, background 0.6s"
});
styleinject(".rc-ButtonCard:hover", {
    color:          "var(--Inkacy-backgroundActive)",
    borderColor:    "var(--Inkacy-backgroundActive)"
});
styleinject(".rc-ButtonCard *", {
    pointerEvents:  "none",
    color:          "inherit",
    transition:     "none"
});

export default ButtonCard;
