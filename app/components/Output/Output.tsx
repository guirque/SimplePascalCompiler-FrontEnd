import compilationResponse from "@/app/Interfaces/compilationResponse";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import style from './Output.module.css'
import PhaseButton from "./PhaseButton/PhaseButton";

type token = {lexema:string, classification:string, line:number};
type treeValue = {value: string, type: "TERMINAL" | "NON-TERMINAL"};

class tree 
{
    public children: tree[] = [];
    constructor(public value: treeValue){}

    addChild(node: tree)
    {
        this.children.push(node);
    }
}

function renderTree(node: tree): React.JSX.Element
{
    if(node.children.length >= 1)
    {
        let childrenElements = node.children.map((child:tree)=> renderTree(child));
        return <div className={`${style.node} ${node.value.type == 'NON-TERMINAL' ? style.nonterminal : style.terminal}`} key={node.value.value}><div>{node.value.value}</div> <div className={style.nodechildren}>{childrenElements}</div> </div>;
    }
    else return <div className={`${style.node} ${node.value.type == 'NON-TERMINAL' ? style.nonterminal : style.terminal}`} key={node.value.value}>{node.value.value}</div>;
}

const Output = (params:any) =>
{

    const [currentPhase, setCurrentPhase] = useState('Lexical');

    let data: compilationResponse = params.output;
    let outputData: string | React.JSX.Element[] | React.JSX.Element = `Click 'Run' to view an output.`;

    if(data.lexical) switch(currentPhase)
    {
        case 'Lexical':
            const size = data.lexical.length;
            outputData = data.lexical.map(
                (aToken: token, i)=>
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
            if(!data.syntactic) break;
            outputData = [renderTree(data.syntactic)];
            break;
        case 'Semantic':
            if(!data.semantic) break;
            let headers: React.JSX.Element[] = [];
            let rows: React.JSX.Element[] = [];

            let keys = data.semantic[0] ? Object.keys(data.semantic[0]) : [];
            headers = data.semantic[0] ? keys.map((key, i)=><th key={'key-' + key + i}>{key}</th>) : [<th key={'key-0'}>{'Empty Table'}</th>];
            rows = data.semantic.map((register: any, i:number)=> 
            <tr key={'row-' + i}>
                {
                    keys.map((key, i) =>
                        {
                            return <td key={'data-' + key + i}>{register[key]}</td>
                        })
                }
            </tr>);

            outputData = 
            <table id={style.table}>
                    <style>
                    {
                        `
                            tr:nth-child(even)
                            {
                                background-color: rgba(0, 0, 0, 0.3);
                            }

                            td
                            {
                                padding: 2px;
                            }
                            
                        `
                    }
                    </style>
                <thead>
                    <tr>{headers}</tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>;
            break;
        case 'Interm. Code':
            if(!data.intermediaryCode) break;
            outputData = data.intermediaryCode.map((command:string, i:number)=>
                {
                    let cmdType = undefined;
                    if(command.match(/.+:$/)) cmdType = 'cmdLabel';
                    else if(command.includes('\#')) cmdType = 'cmdComment';
                    
                    if(cmdType) return <code key={'cmd'+i} className={style[cmdType]}>{command}{'\n'}</code>
                    else return <code key={'cmd'+i}>{command}{'\n'}</code>
                });
            break;
    }

    let types = ['Lexical', 'Syntactic', 'Semantic', 'Interm. Code'];
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