import styled from 'styled-components';

export const NavContainer = styled.aside`
  background: rgb(55,146,55);
  background: linear-gradient(180deg, rgba(55,146,55,1) 0%, rgba(27,105,41,1) 100%);

  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 300px;
  padding: 80px 32px;

  color: #fff;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
`;

export const Info = styled.span<any>`
  text-align: start;
  font-weight: 500;
  font-size: ${props => props.small ? '0.9rem' : '1rem'};
  margin-bottom:8px;
  text-overflow: clip;
`;

export const Separator = styled.div`
  display: flex;
  flex-direction: column;
  width:200px;
  margin: 16px;

  text-align: start;
`;
