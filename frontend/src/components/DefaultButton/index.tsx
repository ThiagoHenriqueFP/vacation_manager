import React, { ReactNode } from 'react';

import { DefaultButton } from './styled';

interface IButton {
  children?: ReactNode;
  cover?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({children, cover, onClick}: IButton) {
  return(
    <DefaultButton cover={cover} onClick={onClick}>{children}</DefaultButton>
  );
}
