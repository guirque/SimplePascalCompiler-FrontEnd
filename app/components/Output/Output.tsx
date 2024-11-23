import compilationResponse from "@/app/Interfaces/compilationResponse";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { JsxElement } from "typescript";

import style from './Output.module.css'
import PhaseButton from "./PhaseButton/PhaseButton";

const Output = (params:any) =>
{

    const [currentPhase, setCurrentPhase] = useState('Lexical');

    let data: compilationResponse = params.output;
    let outputData: string | React.JSX.Element[] = `Click 'Run' to view an output.`;
    let elementOutput: Element[];

    if(data.lexical) switch(currentPhase)
    {
        case 'Lexical':
            const size = data.lexical.length;
            outputData = data.lexical.map(
                (aToken: {lexema:string, classification:string, line:number}, i)=>
                {
                    return <code key={`${aToken.lexema}${i}`} className={style.code}>
                        {i != 0 ? '{' : '[{'}
                        <div className={style.propertyHighlight}>{` lexema: `}</div>{aToken.lexema}{','}
                        <div className={style.propertyHighlight}>{` classification: `}</div>{aToken.classification}{','}
                        <div className={style.propertyHighlight}>{` line: `}</div>{aToken.line}
                        {i != size-1 ? '},' : '}]'}
                        </code>
                });
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