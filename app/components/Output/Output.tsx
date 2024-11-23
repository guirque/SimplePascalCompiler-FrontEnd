import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import style from './Output.module.css'
import PhaseButton from "./PhaseButton/PhaseButton";
import compilationResponse from "@/app/Interfaces/compilationResponse";

const Output = (params:any) =>
{

    const [currentPhase, setCurrentPhase] = useState('Lexical');

    let data: compilationResponse = params.output;
    let outputData = `Click 'Run' to view an output.`;

    if(data.lexical) switch(currentPhase)
    {
        case 'Lexical':
            outputData = JSON.stringify(data.lexical).replace(/},/g, '},\n');
            break;
        case 'Syntactic':
            outputData = JSON.stringify(data.syntatic);
            break;
        case 'Semantic':
            outputData = JSON.stringify(data.semantic);
            break;
    }

    let types = ['Lexical', 'Syntactic', 'Semantic'];
    let elements = types.map((phase)=>
        {
            const colorAttr = (currentPhase == phase) ? 'var(--shade)' :  'var(--darker-shade)';
            return <PhaseButton text={phase} color={colorAttr} currentPhase={currentPhase} changePhase={setCurrentPhase} key={phase}></PhaseButton>
        });
    return (
    <div id={style.outputArea}>  
        <nav id={style.buttons}>
            {elements}
        </nav>
        <pre id={style.output}>
            {outputData}
        </pre>
    </div>);
}
export default Output;