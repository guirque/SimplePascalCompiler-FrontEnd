import style from './Console.module.css'
import React, { Dispatch, SetStateAction } from "react";

const Console = (params: any) =>
{
    return (<pre className={style.console}></pre>);
}
export default Console;