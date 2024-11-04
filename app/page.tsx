'use client';
import Image from 'next/image'

import Codearea from './components/CodeArea/Codearea';
import SendDataButton from './components/CodeArea/SendDataButton/SendDataButton';
import { useState } from 'react';
import Nav from './components/Nav/Nav';
import Console from './components/Console/Console';
import Output from './components/Output/Output';

export default function Home() {

  const [code, setCode] = useState('');
  const [output, setOutput] = useState({lexical: '', sintatic: '', semantic: '', exec: ''});

  return (<>
  
  <form method="POST">
  <Nav></Nav>
  <div id='mainArea'>
    <Codearea changeCode={setCode} code={code} changeOutput={setOutput}></Codearea>
    <Output output={output}></Output>
    <Console></Console>
  </div>
  </form>
  
  </>);
}
