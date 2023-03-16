import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


export default function ChartPie (){
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: [
      'Funcionários ativos',
      'Funcionários de férias'
    ],
    datasets: [{
      label: 'Relação funcionários ativos/de ferias',
      data: [4, 2],
      backgroundColor: [
        '#379237',
        '#D1E20C'
      ],
      hoverOffset: 10,
    }]
  };

  return (
    <Doughnut data={data}/>
  );
}
