import styled from 'styled-components';

export const LabelTextStyled = styled.label`
  font-weight: bold;
  color: ${props => props.color || 'darkGreen'};
  font-size: 24px;
  font-family: ${props => props.fontFamily || "'DM Sans', sans-serif"};
`;

export const InputBoxTextStyled = styled.input`
  background-color: #E8EDF5; 
  color: #0F6D47;
  border: none;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 24px;
  outline: none;
  width: ${props => props.width || '600px'};

  &:focus {
    outline: 2px solid #1E984F33; /* Leve realce no foco */
  }
`;

export const InputSelectStyled = styled.select`
  background-color: #E8EDF5; 
  color: #0F6D47;
  border: none;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 24px;
  outline: none;
  width: ${props => props.width || '600px'};

  &:focus {
    outline: 2px solid #1E984F33;
  }
`;