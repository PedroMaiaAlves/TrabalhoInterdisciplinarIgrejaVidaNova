import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { HeaderMenuTextStyled } from './styles/TextStyled';

const MenuItems = (props) => {
    const activeColor = props.isActive ? '#000000' : '#858D95';

    return (
        <div
            onClick={props.onClick} 
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                color: activeColor
            }}
        >
            <FontAwesomeIcon icon={props.icon} color={props.activeColor} />
            <HeaderMenuTextStyled style={{ color: activeColor }}>
                {props.text}
            </HeaderMenuTextStyled>
        </div>
    );
};

export default MenuItems;
