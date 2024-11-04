import style from './Output.module.css'
import React, { Dispatch, SetStateAction, useEffect } from "react";

const Output = (params:any) =>
{

    return (<pre id={style.output}>
        {JSON.stringify(params.output.lexical).replace(/},/g, '},\n')}
    </pre>);
}
export default Output;