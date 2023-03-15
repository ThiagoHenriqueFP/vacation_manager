import React, { ReactNode } from 'react';

import { DefaultButton } from './styled';

interface IButton {
  children?: ReactNode;
  cover?: boolean;
  icon?: any;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({children, cover, color, icon, onClick}: IButton) {
  return(
    <DefaultButton cover={cover}
      color={color}
      onClick={onClick}>
      {children} {icon}
    </DefaultButton>
  );
}
