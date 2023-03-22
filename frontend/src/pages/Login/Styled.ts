import styled from 'styled-components';

import Background from '../../assets/backgroundLogin.svg';
import { DefaultButton } from '../../components/DefaultButton/styled';

import { boxShadow, containerColor } from '../../config/styles';

export const LoginContainer = styled.div`
  background: ${containerColor};
  box-shadow: ${boxShadow};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  max-width: 400px;
  margin: auto;

  .form-login {
    display: flex;
    flex-direction:column;
  }
`;

export const Recovery = styled.span`
  margin-top:32px;
  font-size: .8rem;
  font-weight: 300;
  text-decoration-line: underline;
  color: #A8A8A8;
`;

export const Logo = styled.img`
  mix-blend-mode: darken;
`;

export const BackgroundLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  flex: 1;
  margin: 0;
  background-image: url(${Background});
  background-size: cover;
`;

export const ButtonLogin = styled(DefaultButton)`
  max-width: 50%;
  margin: 0 auto 12px;
`;
