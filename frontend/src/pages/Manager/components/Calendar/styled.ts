import styled from 'styled-components';
import { boxShadow, containerColor } from '../../../../config/styles';

export const SchedulerContainer = styled.div`
  background: ${containerColor};
  margin: auto;
  padding: 32px;
  max-height: 500px;

  box-shadow: ${boxShadow};
  border-radius: 20px;
  overflow-y: scroll;

  color: #000;

  /* > div {
    z-index: 0;
  } */
`;

export const Loading = styled.h1`
  left: 0;
  right: 0;
  top:0;
  bottom: 0;

  margin: auto;

  color: grey;
`;
