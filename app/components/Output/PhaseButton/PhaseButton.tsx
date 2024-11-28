import React, { Dispatch, SetStateAction, SyntheticEvent, useEffect } from "react";

import style from './PhaseButton.module.css'

const PhaseButton = (params:any) =>
{
    
    const changeState = (e:SyntheticEvent)=>
    {
        e.preventDefault();
        params.changePhase(params.text);
    }

    return (<>
    <button style={{backgroundColor: params.color}} className={style.phasebutton} id={params.text} onClick={changeState}>
        {params.text}
    </button>
    </>);
}
export default PhaseButton;