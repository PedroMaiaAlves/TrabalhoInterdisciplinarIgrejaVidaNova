import React from 'react';
import { LabelTextStyled, InputSelectStyled } from './styles/InputTextStyled';

const InputSelect = (props) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '28px' }}>
            <LabelTextStyled
                htmlFor={props.id}
                color={props.labelColor}
                fontFamily={props.labelFontFamily}
            >
                {props.label}
            </LabelTextStyled>

            <InputSelectStyled
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                width={props.width}
            >
                <option value="" disabled>Selecione uma opção</option>
                {props.options.map((option, index) => (
                    <option
                        key={index}
                        value={props.getOptionValue ? props.getOptionValue(option) : option}
                    >
                        {props.getOptionLabel ? props.getOptionLabel(option) : option}
                    </option>
                ))}
            </InputSelectStyled>
        </div>
    );
};

export default InputSelect;
