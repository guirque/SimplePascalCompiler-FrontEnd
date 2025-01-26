import React, { Dispatch, SetStateAction, useState } from "react";

import style from './codearea.module.css'
import FormattedCodeArea from "./FormattedCodeArea";
import SendDataButton from "./SendDataButton/SendDataButton";

const Codearea = (params:any) =>
{

    return (<>
    <main className={style.area}>
        <textarea className={style.textarea}  onChange={(event) =>{params.changeCode(event.target.value)}}>
        </textarea>
        <SendDataButton code={params.code} changeOutput={params.changeOutput}></SendDataButton>
        <FormattedCodeArea code={params.code}></FormattedCodeArea>
    </main>
    </>
    );
}
export default Codearea;