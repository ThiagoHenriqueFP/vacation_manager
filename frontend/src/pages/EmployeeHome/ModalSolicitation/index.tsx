import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/all';
import { useSelector } from 'react-redux';

import { Field } from '../../../components/DataField/styled';
import { DefaultButton } from '../../../components/DefaultButton/styled';
import { RootState } from '../../../store';
import { ContainerModal, ModalBody, Select} from './styled';

interface IModal {
  isVisible: boolean,
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  canVacation: boolean
}

export default function ModalSolicitation({isVisible, onClose, canVacation}: IModal) {
  const [days, setDays] = useState("0");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [returnDate, setReturnDate] = useState(new Date().toISOString().slice(0, 10));

  const state = useSelector((state: RootState) => state.login);

  useEffect(() => {
    const parsedDate = new Date(date);
    parsedDate.setDate(parsedDate.getDate() + parseInt(days));
    setReturnDate(parsedDate.toISOString().slice(0,10));
  }, [days]);

  function handleClick(){
    const body = {
      name: state.employee?.name,
      start: date,
      end: returnDate
    }

    axios.post('localhost:8000/send/workplace', body)
      .then(response => console.log(response))
      .catch(error => console.log(error));

    axios.post('localhost:8000/send/mail', body)
      .then(response => console.log(response))
      .catch(error => console.log(error));

    onClose(false)
  }

  if(!isVisible)
    return null;

  return (
    <ContainerModal>
      <ModalBody>
        <AiOutlineClose onClick={() => onClose(false)}/>
        <h3>Solicitar férias</h3>
        <label htmlFor="vacation-start">Data de início das férias</label>
        <Field
          type='date'
          name='vacation-start'
          defaultValue={date}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDate(e.target.value)}/>
        <Select name="days" id="" onChange={e => setDays(e.target.value)}>
          <option disabled></option>
          <option value={5}>5 dias</option>
          <option value={10}>10 dias</option>
          <option value={15}>15 dias</option>
          <option value={20}>20 dias</option>
          <option value={30}>30 dias</option>
        </Select>
        <Field type='date' defaultValue={returnDate} value={returnDate} disabled/>
        <DefaultButton
          type='submit'
          onClick={handleClick}
          disabled={!canVacation}
        >Solicitar férias</DefaultButton>
      </ModalBody>
    </ContainerModal>
  );
}
