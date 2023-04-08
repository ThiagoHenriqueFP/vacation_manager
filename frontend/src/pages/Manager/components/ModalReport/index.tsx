import React, { SyntheticEvent, useMemo, useState } from 'react';
import { AiOutlineClose } from 'react-icons/all';
import { useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { RootState } from '../../../../store';
import { IEmployee } from '../../../../types/IEmployee';
import { Select } from '../../ModalRegisterEmployee/styled';
import {
  ModalBackground,
  ModalContainer,
  Separator,
  Type,
  Button
} from './styled';

interface IModal {
  isVisible: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalReport({isVisible, onClose}:IModal) {
  const state = useSelector((state: RootState) => state.login);
  const [type, setType] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [id, setId] = useState(0);
  const [option, setOption] = useState(
    <Type>
      <span>Relatório de equipe com range de datas</span>
      <span className="label">Período: início</span>
      <input type="date" name="start" id="" onChange={e => setStart(e.target.value)}/>
      <span className="label">Período: fim</span>
      <input type="date" name="end" id="" onChange={e => setEnd(e.target.value)}/>
      <br />
      <Button onClick={e => handleSend(e)}>Enviar relatório para email</Button>
    </Type>
  );

  function handleSend(e: SyntheticEvent) {
    e.preventDefault()

    const body = {
      type,
      start,
      end,
      employee_id: id,
      receiver: state.employee?.gmail,
      team_id: state.team?.id,
    }

    axios.post('http://127.0.0.1:8000/send/report', body)
      .then(response => console.log(response))
      .catch(error => console.log(error));

    onClose(false);
  }

  async function search(input: string) {
    const response = await axios.get(`/employee?search=${input}`, {
      headers: {
        Authorization: `Bearer ${state.access_token}`
      }
    });

    const obj: IEmployee[] = response.data;
    const parsed = obj.map((e)=>{
      return {
        value: e.id,
        label: `${e.registration} - ${e.name}`
      }
    });

    return parsed;
  }

  useMemo(() => {
    switch(type) {
      case '1':
        setOption(
         <Type onSubmit={handleSend}>
            <span>Relatório de equipe com range de datas</span>
            <span className="label">Período: início</span>
            <input type="date" name="start" id="" onChange={e => setStart(e.target.value)}/>
            <span className="label">Período: fim</span>
            <input type="date" name="end" id="" onChange={e => setEnd(e.target.value)}/>
            <br />
            <Button type='submit'>Enviar relatório para email</Button>
         </Type>
        )
        break;
      case '2':
        setOption(
         <Type onSubmit={handleSend}>
            <span>Relatorio de equipe</span>
            <br />
            <Button type='submit'>Enviar relatório para email</Button>
         </Type>
        )
        break;
      case '3':
        setOption(
         <Type onSubmit={handleSend}>
            <span>Relatório de Funcionário com range de datas</span>
            <span className="label">Período: início</span>
            <input type="date" name="start" id="" onChange={e => setStart(e.target.value)}/>
            <span className="label">Período: fim</span>
            <input type="date" name="end" id="" onChange={e => setEnd(e.target.value)}/>
            <span className="label">Colaborador</span>
            <AsyncSelect loadOptions={search} onChange={(e) => setId(parseInt(e.value))} />
            <br />
            <Button type='submit'>Enviar relatório para email</Button>
         </Type>
        )
        break;
      default: {
        setOption(option);
        setType('1');
        break;
      }
    }
  }, [type]);

  if(!isVisible) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <AiOutlineClose onClick={() => onClose(false)}/>
        <Separator>
          <h3>Selecione o tipo de relatório</h3>
          <Select onChange={e => setType(e.target.value)}>
            <option value="1">Tipo 1</option>
            <option value="2">Tipo 2</option>
            <option value="3">Tipo 3</option>
          </Select>
        </Separator>
        {option}
      </ModalContainer>
    </ModalBackground>
  );
}
