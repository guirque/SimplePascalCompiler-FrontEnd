'use client';
import Image from 'next/image'

import Codearea from './components/CodeArea/Codearea';
import SendDataButton from './components/CodeArea/SendDataButton/SendDataButton';
import { useState } from 'react';
import Nav from './components/Nav/Nav';
import Console from './components/Console/Console';
import Output from './components/Output/Output';

const sampleCode = `const TAM = 10;
type vetor = array [15] of integer;
type exemplo = record
    teste: real
end;
type aluno = record
	nota1 : exemplo;
	nota2 : real
end; 
var A, B, C, D : integer;
var E : vetor;
var F : aluno;
var G : boolean;

function fatorial(a:integer) : integer
var i : integer;
begin
     result := a;
     while a > 1 do
     begin
           a := a -1;
           result := result*a
     end
end

begin
    write "Imprimindo fatorial de 10:";
	A := fatorial(10);
    write A

end`;

export default function Home() {

  const [code, setCode] = useState(sampleCode);
  const [output, setOutput] = useState({lexical: '', syntactic: '', semantic: '', exec: '', errors: [], warnings: []});

  return (<>
  
  <form method="POST">
  <Nav></Nav>
  <div id='mainArea'>
    <Codearea changeCode={setCode} code={code} changeOutput={setOutput}></Codearea>
    <Output output={output}></Output>
    <Console output={output}></Console>
  </div>
  </form>
  
  </>);
}
