import React from 'react';
import { Field } from './styled';

interface IDataField {
  placeholder: string;
  type: string;
  name:string;
  label?: string;
  size?: number;
  value?: string | number;
}

export default function DataField({placeholder, type, name, size, label, value}: IDataField) {
  return(
    <>
      {label
        ? <label htmlFor={name}>{label}</label>
        : ''
      }
      <Field placeholder={placeholder} type={type} size={size} name={name} value={value}/>
    </>
  );
}
