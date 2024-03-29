import styled from 'styled-components';

export const NavContainer = styled.nav`
  background: linear-gradient(180deg, rgba(55,146,55,1) 0%, rgba(27,105,41,1) 100%);

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  left: 0;
  top: 0;

  max-width: 280px;
  min-width: 280px;
  padding: 1.5rem;

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
  font-size: ${props => props.small ? '0.8rem' : '0.9rem'};
  margin-bottom: 8px;
  text-overflow: clip;
`;

export const Separator = styled.div`
  display: flex;
  flex-direction: column;
  width:200px;
  margin: 32px;

  text-align: start;

  a {
    color: inherit;
    margin-bottom: 12px;
    display: flex;
    align-items: center;

  }

  svg {
    margin-right: 16px;
    width: 32px;
    height: 32px;
  }

  .logout {
    display: flex;
    cursor: pointer;
  }
`;
