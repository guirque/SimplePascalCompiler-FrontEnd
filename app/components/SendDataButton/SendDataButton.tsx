'use client';
import React, { BaseSyntheticEvent, MouseEventHandler } from "react";

import style from './SendDataButton.module.css'

interface sendDataButtonParams
{
    code: string
}

const sendCode = async (codeToSend: string) =>
{
    console.log("Code received: ", codeToSend);
    const url = `http://${process.env.SERVER ?? 'localhost'}:${process.env.SERVER_PORT ?? 3000}/LexicalAnalysis`;
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
    console.log(await response.json());
}

const SendDataButton = (params:any) =>
{
    const codeForRequest = JSON.stringify(params.code);
    return (<input type="button" value="Run Phases" id={style.senddatabutton} onClick={(event) => 
        {
            sendCode(codeForRequest);
        }}></input>);
}
export default SendDataButton;