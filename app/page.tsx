'use client';
import Image from 'next/image'

import Codearea from './components/CodeArea/Codearea';
import SendDataButton from './components/SendDataButton/SendDataButton';
import { useState } from 'react';

export default function Home() {

  const [code, setCode] = useState('');

  return (<>
  
  <form method="POST">
  <Codearea changeCode={setCode}></Codearea>
  <SendDataButton code={code}></SendDataButton>
  </form>
  
  </>);
}
