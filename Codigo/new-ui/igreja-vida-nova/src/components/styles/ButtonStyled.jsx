import styled from 'styled-components';

export const PrimaryButtonStyled = styled.button`
    background-color: ${props => props.backgroundColor || '#0F6D47'};
    color: ${props => props.color || 'white'};
    border: none;
    border-radius: ${props => props.borderRadius || '12px'};
    padding: ${props => props.padding || '12px 14px'};
    font-size: ${props => props.fontSize || '28px;'};
    font-weight: ${props => props.fontWeight || 'medium'};
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    width: ${props => props.width || '600px'};
    height: ${props => props.height || '65px'};
    margin-top: ${props => props.marginTop || '0px'};
    white-space: nowrap;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background-color: ${props => props.backgroundColorHover || '#1E984F'};
    }
`;