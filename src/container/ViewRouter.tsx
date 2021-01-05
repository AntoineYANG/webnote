/*
 * @Author: Kanata You 
 * @Date: 2021-01-04 18:43:24 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-04 20:46:08
 */

import React, { useState, useEffect } from "react";


export type ViewRouterHandler<PATH extends string = string> = {
    setPath?: (path: PATH) => void;
};

export interface ViewRouterProps<PATH extends string> {
    initPath:   PATH;
    handler:    ViewRouterHandler<PATH>;
    children?:  JSX.Element | JSX.Element[];
};

export type ViewRouterState = string;

export const ViewRouter = <PATH extends string>(props: ViewRouterProps<PATH>) => {
    const [path, setPath] = useState(props.initPath);

    useEffect(() => {
        props.handler.setPath = setPath;
    }, [props, setPath]);

    let children: (JSX.Element | null)[] = [];

    if (props.children) {
        const list: JSX.Element[] = (
            [] as JSX.Element[]
        ).concat(props.children);

        children = list.map(element => {
            try {
                const e = element as ReturnType<typeof ViewCase>;
                const p = (e!.props as ViewCaseProps).path;
                const pathRegex = new RegExp(p.split("/**").join("/.*").split("/*").join("/[^/]*"));
                const pf = pathRegex.exec(path);
                if (!pf) {
                    return null;
                }
                return pf[0] === path ? (
                    <>
                        { element }
                    </>
                ) : null;
            } catch {
                console.error(
                    `Child of ViewRouter should have be a ViewCase Component, however found `,
                    element
                );
                return null;
            }
        });
    }

    return (
        <>
            {
                children.map((e, i) => {
                    return Object.assign({}, (
                        <>{ e }</>
                    ), { key: i });
                })
            }
        </>
    );
};


export interface ViewCaseProps {
    path:       string;
};

export const ViewCase: React.FC<ViewCaseProps> = props => {
    return (
        <>
            { props.children }
        </>
    );
};
