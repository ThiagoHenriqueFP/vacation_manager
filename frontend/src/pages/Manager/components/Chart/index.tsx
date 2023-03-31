import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';
import axios from '../../../../services/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';


export default function ChartPie (){
  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  const state = useSelector((state: RootState) => state.login);
  const [dataEmployees, setDataEmployees] = useState<number []>([]);

  useEffect(() => {
    async function getData(){

      const out = await axios.get(`/employee/status/true/${state.employee?.id}?count=true`, {
        headers : {
          Authorization: `Bearer ${state.access_token}`
        }
      });

      const active = await axios.get(`/employee/status/false/${state.employee?.id}?count=true`, {
        headers : {
          Authorization: `Bearer ${state.access_token}`
        }
      });

      setDataEmployees([active.data[0]?._count ?? 0, out.data[0]?._count ?? 0]);
    }
    getData();
  }, []);
  const data = {
    labels: [
      'Funcionários ativos',
      'Funcionários de férias'
    ],
    datasets: [{
      label: 'Funcionarios',
      data: dataEmployees,
      backgroundColor: [
        '#379237',
        '#D1E20C'
      ],
      hoverOffset: 10,
    }]
  };

  return (
    <Doughnut
      data={data}
    />
  );
}
