import styled from 'styled-components';
import { boxShadow, Container } from '../../../config/styles';

export const DashContainer = styled(Container)`
  margin: auto;
  padding: 32px;
  width: 60%;
  height: fit-content;

  display: grid;
  grid-template-rows: min-content;
  grid-auto-rows: minmax(auto);

  /* grid-row-gap: 24px; */
  grid-column-gap: 16px;

  grid-auto-rows: minmax(48px, auto);
  grid-auto-columns: minmax(48px, auto);

  div {
    margin-bottom: 16px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      flex-direction: column;

      padding: 12px;
      margin: 8px;
      background: #fff;
      border-radius: 20px;
      box-shadow: ${boxShadow};

      .medium {
        font-weight: 600;
      }

      .ligth {
        font-weight: 300;
      }

      .space {
        display: flex;
        justify-content: space-between;

      }
    }
  }
`;

export const DashHeader = styled.header`
  grid-column-start: 1;
  grid-column-end: 3;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px;

  h3 {
    margin: 0;
  }

  svg {
    width: 28px;
    height: 28px;
  }
`;

export const ChartContainer = styled(Container)`
  grid-column-start: 1;
  grid-row-start: 2;
  grid-row-end: 3;

  display: flex;
  justify-content: center;

  canvas {
    max-width: 200px;
    max-height: 200px;
    margin: 0;
  }
`;

export const ReportContainer = styled(Container)`
  grid-column-start: 1;
  grid-row-start: 3;

  display: flex;
  flex-direction: column;

  button {
    max-width: fit-content;
    margin: auto;
    color: #fff;

    svg{
      width: 1.3rem;
      height: 1.3rem;
    }
  }
`;

export const ReturnContainer = styled(Container)`
  grid-column-start: 2;
  grid-row-start: 2;
`;

export const ToOutContainer = styled(Container)`
  grid-column-start: 2;
  grid-row-start: 3;
`;

export const Separator = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  .label {
    margin: 8px;
    font-size: 0.8em;
    font-weight: 300;
  }

  input {
      border: none;
    }
`;
