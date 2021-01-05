/*
 * @Author: Kanata You 
 * @Date: 2021-01-04 01:37:09 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-04 18:33:26
 */

import React from "react";
import marked from 'marked';
import sanitizeHtml from 'sanitize-html';
import styleinject from 'styleinject-y';


const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
    'img',
    'h1',
    'h2',
    'h3',
]);

const allowedAttributes = Object.assign(
    {},
    sanitizeHtml.defaults.allowedAttributes,
    {
        img: ['alt', 'src'],
    }
);

export interface MarkDownProps {
    text: string;
};

const MarkDown: React.FC<MarkDownProps> = props => {
    const [text, setText] = React.useState<string>(props.text);

    const input = React.useRef() as React.RefObject<HTMLTextAreaElement>;

    React.useLayoutEffect(() => {
        input.current!.value = text;
    });

    return (
        <div className="rc-MarkDown" >
            <textarea className="rc-MarkDown" key="input" ref={ input }
                spellCheck="false"
                onInput={
                    e => {
                        setText(e.currentTarget.value);
                    }
                }
            />
            <section className="rc-MarkDown" key="display"
                spellCheck="false"
                dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(
                        marked(text), {
                            allowedTags,
                            allowedAttributes
                        }
                    )
                }}
            />
        </div>
    );
};

// Additional stylesheet
styleinject("div.rc-MarkDown", {
    display:        "flex",
    alignItems:     "stretch",
    justifyContent: "center",
    width:          "80vw",
    minHeight:      "500px",
    maxHeight:      "90vh"
});
styleinject("textarea.rc-MarkDown, section.rc-MarkDown", {
    display:        "block",
    background:     "1px solid var(--Inkacy-backgroundColor)",
    border:         "1px solid var(--Inkacy-border)",
    color:          "1px solid var(--Inkacy-color)",
    padding:        "0.6rem 1rem",
    width:          "50%",
    textAlign:      "left",
    fontFamily:     "var(--sans-serif)",
    fontSize:       "1rem",
    outline:        "none",
    overflow:       "scroll",
    resize:         "none"
});
styleinject("section.rc-MarkDown", {
    lineHeight:     1.5
});
styleinject("section.rc-MarkDown code", {
    background:     "rgba(127,127,127,0.2)",
    fontFamily:     "var(--monospace)",
    borderRadius:   "0.25rem",
    padding:        "0.12rem 0.4rem"
});
styleinject("section.rc-MarkDown pre code", {
    display:        "block",
    width:          "max-content"
});
styleinject("section.rc-MarkDown h1", {
    display:        "block",
    marginBottom:   "1rem",
    borderBottom:   "1.625px solid var(--Inkacy-border)",
    fontSize:       "1.875rem"
});
styleinject("section.rc-MarkDown h2", {
    display:        "block",
    marginBottom:   "0.7rem",
    borderBottom:   "1.5px solid var(--Inkacy-border)",
    fontSize:       "1.5rem"
});
styleinject("section.rc-MarkDown h3", {
    display:        "block",
    marginBottom:   "0.4rem",
    borderBottom:   "1.375px solid var(--Inkacy-border)",
    fontSize:       "1.375rem"
});

export default MarkDown;
