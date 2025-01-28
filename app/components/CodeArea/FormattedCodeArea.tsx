import React, { Dispatch, SetStateAction } from "react";

import style from './formattedarea.module.css'
import SendDataButton from "./SendDataButton/SendDataButton";

// LEXICAL ANALYSIS

type token = 
{
    lexema: string;
    classification: string;
    line: number;
};

// Holds a Regex for each element identifiable. It also sets priorities (what's above is the priority)
const symbols =
{
    STRING: /\".*?\"/,
    ASSIGNMENT: /:=/,
    VARIABLE : /var/,
    SEMICOLON : /\;/,
    COLON: /:/,
    NUMBER : /(\d+\.\d*)|\d+/,
    COMP_OPERATOR: />=|<=|>|<|==|!=/,
    MAT_OPERATOR: /\*|\/|\+|\-/,
    DOT: /\./,
    OPEN_P: /\(/,
    CLOSE_P: /\)/,
    OPEN_B: /\[/,
    CLOSE_B: /\]/,
    COMMA : /\,/,
    EQUAL_SIGN: /=/,
    LOGIC_OPERATOR: /and|or/,
    BLOCK_BEGIN : /begin/,
    BLOCK_END : /end/,
    DECLARATION_CONST : /const/,
    DECLARATION_TYPE : /type/,
    TYPE : /integer|real|char|boolean/,
    TYPE_ARRAY: /array/,
    TYPE_RECORD: /record/,
    FUNCTION: /function/,
    PROCEDURE: /procedure/,
    WHILE: /while/,
    DO: /do/,
    IF: /if/,
    IF_THEN: /then/,
    ELSE: /else/,
    FOR: /for/,
    TO: /to/,
    OF: /of/,
    WRITE: /write/,
    READ: /read/,
    BOOLEAN: /true|false/,
    IDENTIFIER: /[a-zA-Z]([a-zA-Z0-9])*/,
    ERROR: /\S+/
}

const keywords = ['TYPE', 'TYPE_ARRAY', 'TYPE_RECORD', 'WHILE', 'DO', 'TO', 'OF', 'WRITE', 'READ', 'PROCEDURE', 'FUNCTION', 'DECLARATION_CONST', 'DECLARATION_TYPE', 'IF', 'IF_THEN', 'VARIABLE', 'BLOCK_BEGIN', 'BLOCK_END', 'FOR', 'ELSE'];

function generateTokenList(code: string) {
    
    let answer:React.JSX.Element[]= []
    let i = 0;
    let numOfSpaces = 0;

    //Creating Regular Expression from Symbols object
    const listOfRegex = Object.values(symbols).map((regex:RegExp)=>regex.source);
    const languageRegex = new RegExp(`${listOfRegex.join('|')}`, 'ig');
    //console.log(languageRegex);

    //Separating Code into Lines
    let lines = code.split('\n');

    //Matching Lines Against Regular Expression
    const separatedElements = lines?.map((lineOfCode) => lineOfCode.match(languageRegex)); //lines with separated elements

    //For each element, classify it and insert it in token list
    const symbolsList = Object.entries(symbols);
    separatedElements?.forEach((line, lineIndex) => 
    {
        answer.push(<div key={i++} className={style.lineNumber}>{lineIndex+1}</div>);

        if(line?.[0] == 'end') numOfSpaces--; //if the line is nothing more than an 'end', don't tab as you would normally.
            
        for(let j = 0; j < numOfSpaces; j++) answer.push(<span key={i++} className={style.tab}></span>);

        if(line?.[0] == 'end') numOfSpaces++;

        let insertSpace = true;
        line?.forEach((separatedElement) =>
        {
            let classification = 'ERROR';
            //Find classification
            symbolsList.find((pair:[string, RegExp])=>{
                let comparisonRegEx = new RegExp(`^(${pair[1].source})$`);
                if(comparisonRegEx.test(separatedElement))
                    {
                        classification = pair[0];
                        return true;
                    }
            });

            //Insert token
            const newToken: token = 
            {
                lexema: separatedElement,
                classification,
                line: lineIndex+1
            }
            
            // Don't insert a space before this symbol
            if(!['SEMICOLON', 'DOT', 'OPEN_B', 'OPEN_P', 'CLOSE_B', 'CLOSE_P'].includes(newToken.classification) && insertSpace) answer.push(<span key={i++}>&nbsp;</span>);

            insertSpace = true;

            // Don't insert a space after this symbol
            if(['DOT', 'OPEN_B', 'OPEN_P'].includes(newToken.classification)) insertSpace = false;

            let tokenClass:string|undefined; 

            if(newToken.classification == 'IDENTIFIER') tokenClass = 'variable'; 
            else if(newToken.classification == 'ERROR') tokenClass = 'error';
            else if(keywords.includes(newToken.classification)) tokenClass = 'keyword';
            else if(newToken.classification == 'STRING') tokenClass = 'string';
            else if(newToken.classification == 'NUMBER') tokenClass = 'number';
            
            if(tokenClass) answer.push(<code key={i++} className={style[tokenClass]}>{newToken.lexema}</code>)
            else answer.push(<code key={i++}>{newToken.lexema}</code>);

            if(newToken.classification == 'BLOCK_BEGIN' || newToken.classification == 'TYPE_RECORD') numOfSpaces += 1;
            else if(newToken.classification == 'BLOCK_END' && numOfSpaces!=0) numOfSpaces -= 1;
        });
        answer.push(<br key={i++}/>);
    });
    return answer;
}

// ----------------

const FormattedCodeArea = (params:any) =>
{
    return (
    <div className={style.formattedarea}>
        {generateTokenList(params.code)}
    </div>
    );
}
export default FormattedCodeArea;