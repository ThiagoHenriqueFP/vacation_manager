import React from 'react';

import { Header } from './styled';

interface IHeader {
  title: string;
}

export default function GlobalHeader({title}: IHeader)  {
  return (
    <Header><span>{title}</span></Header>
  );
}
