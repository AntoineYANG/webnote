/*
 * @Author: Kanata You 
 * @Date: 2021-01-05 17:19:54 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-05 20:12:17
 */

import React, { useState } from "react";
import styleinject from "styleinject-y";
import ButtonGroup from "../container/ButtonGroup";
import ButtonCard from "../presentational/ButtonCard";
import { containerHandler } from "../App.server";
import SearchList from "../container/SearchList";


export interface GroupSearchState {
    fading:     boolean;
    keyword:    string;
};

const GroupSearch: React.FC = () => {
    const [state, setState] = useState<GroupSearchState>({
        fading: false,
        keyword: ""
    });

    if (state.fading) {
        setTimeout(() => {
            setState({
                ...state,
                fading: false
            });
        }, 200);
    }

    return (
        <div className={ "rc-GroupSearch" + (state.fading ? " fading" : "") } >
            <form className="rc-GroupSearch" >
                <section key="search" >
                    <label>search</label>
                    <input name="search" type="text" spellCheck="false" autoComplete="none"
                    onChange={
                        e => {
                            setState({
                                ...state,
                                keyword: e.target.value
                            });
                        }
                    } />
                </section>
            </form>
            <SearchList keyword={ state.keyword } />
            <ButtonGroup
            style={{
                width: "calc(18rem + 6vw)"
            }} >
                <ButtonCard key="home"
                text="Home" onClick={ () => {
                    setState({
                        ...state,
                        fading: true
                    });
                    setTimeout(() => {
                        containerHandler.setPath!("/");
                    }, 200);
                } } />
            </ButtonGroup>
        </div>
    );
};

styleinject(".rc-GroupSearch", {
    display:                "flex",
    flexDirection:          "column",
    alignItems:             "center",
    justifyContent:         "center",
    width:                  "100vw",
    height:                 "100vh",
    color:                  "var(--Inkacy-color)",
    overflow:               "hidden"
});
styleinject("form.rc-GroupSearch", {
    margin: "calc(4vh + 54px) 0 4vh",
    maxWidth: "60vw",
    minWidth: "600px",
    height: "8vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    fontSize: "1.7rem"
});
styleinject("form.rc-GroupSearch section", {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    padding: "2rem 0"
});
styleinject("form.rc-GroupSearch section label", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.4rem calc(1rem + 0.8vw)"
});
styleinject("form.rc-GroupSearch section input", {
    padding: "0 0.6rem",
    flex: 1
});

export default GroupSearch;
