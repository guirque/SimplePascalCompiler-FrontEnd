import compilationResponse from '@/app/Interfaces/compilationResponse';
import React, { Dispatch, SetStateAction } from "react";

import style from './Console.module.css'

const Console = (params: any) =>
{

    let output: compilationResponse = params.output;
    const errorMessages = output.errors?.map((errorMsg, i)=> <code className={style.error} key={'error'+i}>{errorMsg}</code>);
    const warningMessages = output.warnings?.map((warningMsg, i)=> <code className={style.warning} key={'warning'+i}>{warningMsg}</code>);
    const consolePrints = output.console?.map((consoleMsg, i)=> <code key={'print'+i}>{consoleMsg}</code>);

    return (
    <pre className={style.console}>
        {errorMessages}
        {warningMessages}
        {consolePrints}
    </pre>);
}
export default Console;