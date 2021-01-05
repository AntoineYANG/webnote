/*
 * @Author: Kanata You 
 * @Date: 2021-01-05 16:00:11 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-05 17:01:14
 */

import React, { useState } from "react";
import ButtonGroup from "../container/ButtonGroup";
import ButtonCard from "../presentational/ButtonCard";
import styleinject from "styleinject-y";
import { signin } from "../server-container/ServerProxy";


export interface SignInProps {
    back:   () => void;
};

const SignIn: React.FC<SignInProps> = props => {
    const [info, send] = useState<null | string>(null);

    return (
        <>
            <form className="rc-SignIn" >
                <section key="name" >
                    <label>name</label>
                    <input name="name" type="text" spellCheck="false" autoComplete="username" />
                </section>
                <section key="pwd" >
                    <label>password</label>
                    <input name="pwd" type="password" autoComplete="current-password" />
                </section>
            </form>
            {
                info ? (
                    <div>
                        <label>{ info }</label>
                    </div>
                ) : null
            }
            <ButtonGroup
            style={{
                width: "calc(18rem + 6vw)"
            }} >
                <ButtonCard key="login"
                    text="sign in" onClick={ () => {
                        const inputName = document.getElementsByName("name")[0] as HTMLInputElement;
                        const inputPwd = document.getElementsByName("pwd")[0] as HTMLInputElement;
                        const name = inputName.value;
                        const pwd = inputPwd.value;
                        signin(name, pwd, (s, reason) => {
                            if (s) {
                                props.back();
                            } else {
                                inputName.value = "";
                                inputPwd.value = "";
                                inputName.focus();
                                send(reason);
                            }
                        });
                    } } />
                <ButtonCard key="back"
                    text="back" onClick={ () => {
                        props.back();
                    } } />
            </ButtonGroup>
        </>
    );
};

styleinject("form.rc-SignIn", {
    margin: "10vh 0 4vh",
    width: "calc(18rem + 6vw)",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center"
});
styleinject("form.rc-SignIn section", {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    padding: "2rem 0"
});
styleinject("form.rc-SignIn section label", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "calc(6rem + 2vw)"
});
styleinject("form.rc-SignIn section input", {
    flex: 1
});
styleinject("form.rc-SignIn div, form.rc-SignIn div label", {
    animation: "none"
});

export default SignIn;
