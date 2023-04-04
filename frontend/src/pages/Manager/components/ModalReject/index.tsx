
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/all';
import { useSelector } from 'react-redux';

import { Field } from '../../../../components/DataField/styled';
import axios from '../../../../services/axios';
import { RootState } from '../../../../store';
import { ModalContainer, RejectButton, RejectContainer } from './styled';

interface IModal {
  isVisiblie: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  props: any,
}

export default function RejectModal({onClose, isVisiblie, props}: IModal) {
  const state = useSelector((state: RootState) => state.login);
  const [reason, setReason] = useState("");

  async function handleReject(event: SyntheticEvent, id: number)  {
    event.preventDefault();

    if(reason.length < 10){
      console.log("o motivo precisa ter mais de 10 caracteres");
    } else {
      const body = {
        status: -1,
        reason: reason,
      }

      await axios.patch(`/vacation/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${state.access_token}`
          }
        }
      )
      onClose(false);
    }
  }

  if(!isVisiblie) return null;

  return (
    <ModalContainer>
      <RejectContainer>
        <AiOutlineClose onClick={() => onClose(false)}></AiOutlineClose>
        <Field value={reason} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setReason(e.target.value)} placeholder='Motivo da recusa' />
        <RejectButton onClick={(e: React.SyntheticEvent<Element, Event>) => handleReject(e, props)}>Recusar Pedido</RejectButton>
      </RejectContainer>
    </ModalContainer>
  )
}
