/*
 * @Author: Kanata You 
 * @Date: 2021-01-04 01:48:46 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-05 14:51:26
 */

import React, { Suspense, lazy } from "react";


const MarkDownComponent = lazy(() => import("../presentational/MarkDown"));

export interface MarkDownEditorProps {
    text: string;
};

const MarkDownEditor: React.FC<MarkDownEditorProps> = props => {
    return (
        <Suspense fallback="loading" >
            <MarkDownComponent text={ props.text } />
        </Suspense>
    );
};

export default MarkDownEditor;
