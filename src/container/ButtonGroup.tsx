/*
 * @Author: Kanata You 
 * @Date: 2021-01-05 01:30:29 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-05 01:38:04
 */

import React from "react";
import styleinject from "styleinject-y";


export interface ButtonGroupProps {
    style?: React.CSSProperties;
};

const ButtonGroup: React.FC<ButtonGroupProps> = props => {
    return (
        <div className="rc-ButtonGroup" style={{ ...props.style }}  >
            { props.children }
        </div>
    );
};

styleinject(".rc-ButtonGroup", {
    display:            "flex",
    alignItems:         "center",
    justifyContent:     "space-around",
    flexWrap:           "wrap",
    margin:             "6vh 0",
    width:              "70vw"
});
styleinject(".rc-ButtonGroup > .rc-ButtonCard", {
    margin:             "12px calc(10px + 4vw)"
});

export default ButtonGroup;
