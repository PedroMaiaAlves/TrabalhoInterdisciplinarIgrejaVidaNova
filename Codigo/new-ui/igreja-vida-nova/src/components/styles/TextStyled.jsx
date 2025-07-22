import styled from 'styled-components';

export const MainTextStyled = styled.h1`
    color: ${props => props.color || '#1E984F'};
    font-size: ${props => props.fontSize || '64px'};
    font-weight: ${props => props.fontWeight || 'bold'};
    font-family: ${props => props.fontFamily || "'DM Sans', sans-serif"};
`;

export const SecondTextStyled = styled.p`
    color: ${props => props.color || '#4B4C51'};
    font-size: ${props => props.fontSize || '28px'};
    font-weight: ${props => props.fontWeight || 'regular'};
    font-family: ${props => props.fontFamily || "'DM Sans', sans-serif"};
`;

export const LinkTextStyled = styled.a`
    display: inline-block;
    color: ${props => props.color || '#031428'};
    font-size: ${props => props.fontSize || '24px'};
    font-weight: ${props => props.fontWeight || 'bold'};
    font-family: ${props => props.fontFamily || "'DM Sans', sans-serif"};
    margin-top: ${props => props.marginTop || '0px'};
    opacity: 0.8;
    text-decoration: underline;
`;

export const HeaderTitleMenuTextStyled = styled.p`
    color: ${props => props.color || '#030B16'};
    font-size: ${props => props.fontSize || '20px'};
    font-weight: ${props => props.fontWeight || 'medium'};
    font-family: ${props => props.fontFamily || "'DM Sans', sans-serif"};
`
export const HeaderMenuTextStyled = styled.p`
    color: ${props => props.color || '#858D95'};
    font-size: ${props => props.fontSize || '14px'};
    font-weight: ${props => props.fontWeight || 'medium'};
    font-family: ${props => props.fontFamily || "'DM Sans', sans-serif"};
`