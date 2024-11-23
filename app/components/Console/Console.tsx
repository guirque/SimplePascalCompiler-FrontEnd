import compilationResponse from '@/app/Interfaces/compilationResponse';
import style from './Console.module.css'
import React, { Dispatch, SetStateAction } from "react";

const Console = (params: any) =>
{

    let output: compilationResponse = params.output;
    const errorMessages = output.errors?.map((errorMsg, i)=> <code className={style.error} key={i}>{errorMsg}</code>);
    const warningMessages = output.warnings?.map((warningMsg, i)=> <code className={style.error} key={i}>{warningMsg}</code>);

    return (
    <pre className={style.console}>
        {errorMessages}
        {warningMessages}
    </pre>);
}
export default Console;