/*
 * @Author: Kanata You 
 * @Date: 2021-01-05 18:06:37 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-05 20:12:22
 */

import React, { useState } from "react";
import styleinject from "styleinject-y";
import axios from "axios";
import { getServerProps } from "../server-container/ServerProxy";


export interface SearchListProps {
    keyword:    string;
};

export type MemberInfo = {
    gid: string;
    gname: string;
    masterid: string;
};

export interface SearchListState {
    result: MemberInfo[];
};

let keyword: string | null = null;
let lock: boolean = false;

const SearchList: React.FC<SearchListProps> = props => {
    const [_, update] = useState<void>();
    const [state, setState] = useState<SearchListState>({
        result: []
    });
    
    if (props.keyword !== keyword) {
        if (!lock) {
            if (!props.keyword.length) {
                axios.post("/myGroup", {
                    uid: getServerProps()!.uid
                }).then(res => {
                    const code: 404 | -1 | 1 = res.data.data.code;
                    const data: MemberInfo[] = res.data.data.groups.map(
                        (d: MemberInfo & { gid: [string, string] }) => {
                            return {
                                ...d,
                                gid: d.gid[0]
                            };
                        }
                    );
                    switch (code) {
                        case 404:
                            console.error("Falied to connect to server");
                            break;
                        case -1:
                            setState({
                                result: []
                            });
                            break;
                        case 1:
                            setState({
                                result: data
                            });
                            break;
                    }
                }).catch(reason => {
                    console.error(reason);
                }).finally(() => {
                    keyword = props.keyword;
                    lock = false;
                    update();
                });
            } else {
                axios.post("/searchGroup", {
                    keyword: props.keyword
                }).then(res => {
                    const code: 404 | -1 | 1 = res.data.data.code;
                    const data: MemberInfo[] = res.data.data.groups;
                    switch (code) {
                        case 404:
                            console.error("Falied to connect to server");
                            break;
                        case -1:
                            setState({
                                result: []
                            });
                            break;
                        case 1:
                            setState({
                                result: data
                            });
                            break;
                    }
                }).catch(reason => {
                    console.error(reason);
                }).finally(() => {
                    keyword = props.keyword;
                    lock = false;
                    update();
                });
            }
            lock = true;
        }
    }

    return (
        <section className="rc-SearchList" >
            {
                keyword !== null ? (
                    state.result.length ? (
                        state.result.map(
                            (d, i) => {
                                return (
                                    <div key={ i } className="result" >
                                        <label>
                                            <b>{ d.gname }</b>
                                            <span>{ "(" + d.gid.trimEnd() + ")" }</span>
                                        </label>
                                    </div>
                                );
                            }
                        )
                    ) : (
                        <label>No results.</label>
                    )
                ) : (
                    state.result.length ? (
                        state.result.map(
                            (d, i) => {
                                return (
                                    <div key={ i } className="result" >
                                        <label>
                                            <b>{ d.gname }</b>
                                            <span>{ "(" + d.gid.trimEnd() + ")" }</span>
                                        </label>
                                    </div>
                                );
                            }
                        )
                    ) : (
                        <label>You've joined no groups.</label>
                    )
                )
            }
        </section>
    );
};

styleinject(".rc-SearchList", {
    flex: 1,
    maxWidth: "60vw",
    minWidth: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    borderLeft: "1px solid var(--Inkacy-border)",
    borderRight: "1px solid var(--Inkacy-border)"
});
styleinject(".rc-SearchList .result", {
    margin: "1rem 4vw",
    padding: "0.6rem 4rem 1rem",
    border: "1px solid var(--Inkacy-color)",
    textAlign: "left",
    cursor: "pointer"
});
styleinject(".rc-SearchList .result *", {
    cursor: "pointer"
});
styleinject(".rc-SearchList .result label", {
    display: "flex",
    alignItems: "baseline"
});
styleinject(".rc-SearchList .result label b", {
    fontSize: "120%"
});
styleinject(".rc-SearchList .result label span", {
    marginLeft: "20px"
});

export default SearchList;
