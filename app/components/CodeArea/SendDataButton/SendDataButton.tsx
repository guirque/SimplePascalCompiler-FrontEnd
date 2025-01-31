'use client';
import React, { BaseSyntheticEvent, MouseEventHandler } from "react";

import style from './SendDataButton.module.css'

// Request
const sendCode = async (codeToSend: string, changeOutput:Function) =>
{
    const url = `http://${process.env.SERVER ?? 'localhost'}:${process.env.SERVER_PORT ?? 3000}/IntermediaryCode`;
    const response = await fetch(url, 
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: codeToSend
            })
        });
    changeOutput(await response.json());
    console.log("Answer received");
}

const SendDataButton = (params:any) =>
{
    const codeForRequest = JSON.stringify(params.code);
    return (
    <div id={style.senddatabutton}>
        <input type="button" value="Run" onClick={(event) => 
            {
                sendCode(codeForRequest, params.changeOutput);
            }}></input>
        <img src="Run.png"></img>
    </div>);
}
export default SendDataButton;