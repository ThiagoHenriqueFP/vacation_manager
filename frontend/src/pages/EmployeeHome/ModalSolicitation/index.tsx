
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/all';
import { useSelector } from 'react-redux';

import { Field } from '../../../components/DataField/styled';
import { DefaultButton } from '../../../components/DefaultButton/styled';
import axios from '../../../services/axios';
import { RootState } from '../../../store';
import { ContainerModal, ModalBody, Select, Separator} from './styled';

interface IModal {
  isVisible: boolean,
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  canVacation: boolean
}

export default function ModalSolicitation({isVisible, onClose, canVacation}: IModal) {
  const [days, setDays] = useState("0");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [returnDate, setReturnDate] = useState(new Date().toISOString().slice(0, 10));
  const [thirteenth, setThirteenth] = useState(false);

  const state = useSelector((state: RootState) => state.login);

  useEffect(() => {
    const parsedDate = new Date(date);
    parsedDate.setDate(parsedDate.getDate() + parseInt(days));
    setReturnDate(parsedDate.toISOString().slice(0,10));
  }, [days]);

  function handleClick(event: SyntheticEvent){
    event.preventDefault();

    async function submit() {
      const {data} = await axios.get(`employee/${state.employee?.manager_id}`, {
        headers: {
          Authorization: `Bearer ${state.access_token}`
        }
      });

      const body = {
        name: state.employee?.name,
        start: date,
        end: returnDate,
        receiver: data.email
      }

      try{
        await axios.post('/vacation', {
          team_id: state.team?.id,
          employee_id: state.employee?.id,
          date_start: date,
          date_end: returnDate,
          thirteenth
        }, {
          headers: {
            Authorization: `Bearer ${state.access_token}`
          }
        });

        await axios.post('http://localhost:8000/send/workplace', body);

        await axios.post('http://localhost:8000/send/mail', body);
        onClose(false);
      } catch (error) {
        console.log(error);
      }
    }

    submit();
  }

  if(!isVisible)
    return null;

  const isCLT = (
    <Separator>
      <span>Décimo terceiro</span>
      <label htmlFor="yes">Sim</label>
      <Field
        type='radio'
        onChange={() => setThirteenth(true)}
        checked={thirteenth == true}
        name='yes' />
      <label htmlFor="no">Não</label>
      <Field
        type='radio'
        onChange={() => setThirteenth(false)}
        name='no'
        checked={thirteenth == false} />
    </Separator>
  );

  return (
    <ContainerModal>
      <ModalBody onSubmit={handleClick}>
        <AiOutlineClose onClick={() => onClose(false)}/>
        <h3>Solicitar férias</h3>
        <label htmlFor="vacation-start">Data de início das férias</label>
        <Field
          type='date'
          name='vacation-start'
          defaultValue={date}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDate(e.target.value)}/>
        <Select name="days" id="" onChange={e => setDays(e.target.value)}>
          <option disabled selected></option>
          <option value={5}>5 dias</option>
          <option value={10}>10 dias</option>
          <option value={15}>15 dias</option>
          <option value={20}>20 dias</option>
          <option value={30}>30 dias</option>
        </Select>
        <Field type='date' defaultValue={returnDate} value={returnDate} disabled/>
        {state.employee?.type == 0 && isCLT}
        <DefaultButton
          type='submit'
          // disabled={!canVacation}
        >Solicitar férias</DefaultButton>
      </ModalBody>
    </ContainerModal>
  );
}
