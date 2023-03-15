import styled from 'styled-components';

// Colors
export const primaryColor = '#379237';
export const primaryVariantColor = '#1B6929';
export const secondaryColor = '#D1E20C';

export const errorColor = '#F93636';

export const containerColor = '#F5F5F5';

// Default styles
export const boxShadow = '0px 5px 10px rgba(0, 0, 0, 0.25)';

export const Container = styled.div`
  padding: 24px;
  box-shadow: ${boxShadow};
  border: 0;
  border-radius: 20px;

  background: ${containerColor};
`;
