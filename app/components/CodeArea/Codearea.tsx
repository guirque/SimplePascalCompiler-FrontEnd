import React, { Dispatch, SetStateAction } from "react";

import style from './codearea.module.css'
import SendDataButton from "./SendDataButton/SendDataButton";

const Codearea = (params:any) =>
{
    return (
    <main className={style.area}>
        <textarea className={style.textarea}  onChange={(event) =>{params.changeCode(event.target.value)}}>
        </textarea>
        <SendDataButton code={params.code} changeOutput={params.changeOutput}></SendDataButton>
    </main>
    );
}
export default Codearea;