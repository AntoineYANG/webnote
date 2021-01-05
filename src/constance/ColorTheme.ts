/*
 * @Author: Kanata You 
 * @Date: 2021-01-04 20:24:56 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-04 21:48:38
 */

export type CSSValue<K extends keyof React.CSSProperties> = React.CSSProperties[K];

export type ColorThemeType = {
    "--Inkacy-backgroundColor":     CSSValue<"backgroundColor">,
    "--Inkacy-backgroundActive":    CSSValue<"backgroundColor">,
    "--Inkacy-color":               CSSValue<"color">,
    "--Inkacy-active":              CSSValue<"color">,
    "--Inkacy-border":              CSSValue<"borderColor">
};

const ColorTheme = {
    light: {
        "--Inkacy-backgroundColor":     "rgb(250,250,250)",
        "--Inkacy-backgroundActive":    "rgb(89,144,244)",
        "--Inkacy-color":               "rgb(13,13,13)",
        "--Inkacy-active":              "rgb(30,30,131)",
        "--Inkacy-border":              "rgb(24,24,24)"
    },
    dark:   {
        "--Inkacy-backgroundColor":     "rgb(24,24,24)",
        "--Inkacy-backgroundActive":    "rgb(89,141,237)",
        "--Inkacy-color":               "rgb(227,227,227)",
        "--Inkacy-active":              "rgb(30,30,131)",
        "--Inkacy-border":              "rgb(250,250,250)"
    }
};


let style: HTMLStyleElement | null = null;

export const injectRoot = (rules: ColorThemeType) => {
    if (!style) {
        // Initialize
        style = document.createElement("style");
        style.type = "text/css";
        style.id = "ColorTheme";
        document.head.appendChild(style);
    }
    
    const sheet = style.sheet as CSSStyleSheet;
    
    // Clear rules
    while (sheet.rules.length) {
        sheet.removeRule(0);
    }

    // Append rules
    sheet.insertRule(
        `:root { ${
            resolveRootCSSRule(rules).join("\n")
        } }`
    );
    sheet.insertRule(
        `* {\n`
      + `   transition: all 1s;\n`
      + `}`
    );
};

const resolveRootCSSRule = (rules: ColorThemeType) => {
    let ruleList: string[] = [];

    for (const key in rules) {
        if (rules.hasOwnProperty(key)) {
            let name: string = key;
            const value = rules[key as keyof ColorThemeType];
            ruleList.push(`${ name }: ${ value };`);
        }
    }

    return ruleList;
};


export default ColorTheme;
