import React, { Dispatch, SetStateAction } from "react";
import style from './codearea.module.css'

const Codearea = (params:any) =>
{
    return (<textarea className={style.area} onChange={(event) =>{params.changeCode(event.target.value)}}></textarea>);
}
export default Codearea;