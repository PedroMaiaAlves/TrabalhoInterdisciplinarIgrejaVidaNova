import React from 'react';
import { InputBoxTextStyled, LabelTextStyled } from './styles/InputTextStyled';

const InputText = (props) => {

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '28px' }}>
                <LabelTextStyled 
                    htmlFor={props.id}
                >
                    {props.label}
                </LabelTextStyled>
                <InputBoxTextStyled 
                    htmlFor={props.id} 
                    type={props.type}
                    value={props.value} 
                    onChange={props.onChange} 
                    placeholder={props.placeholder}
                    width={props.width}
                />
            </div>
        </>
    );
}

export default InputText;