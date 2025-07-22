import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { MainTextStyled, SecondTextStyled } from './styles/TextStyled';
import { Chip } from '@mui/material';

const CardCerimonia = (props) => {

    return (
        <div
            style={{
                backgroundColor: '#FFFFFF',
                width: '342px',
                padding: '16px',
                borderRadius: '12px',
            }}
        >
            <img src="https://igreja-vida-nova.s3.us-east-2.amazonaws.com/images/backgroundImage.png" alt="Event" style={{ width: '311px', height: '186px', marginBottom: '14px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <MainTextStyled color='#030B16' fontSize='16px'>{props.cerimonia.cerimoniaType}</MainTextStyled>
                {props.isPastor && (
                    <div>
                        {props.cerimonia.status === 'PROCESSANDO' && (
                            <>
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    style={{
                                        color: 'black',
                                        fontSize: '25px',
                                        marginRight: '5px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={props.handleAcceptCerimonia}
                                />
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    style={{
                                        color: 'red',
                                        fontSize: '25px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={props.handleRecuseCerimonia}
                                />
                            </>
                        )}
                    </div>
                )}
            </div>
            <div style={{ marginTop: '25px' }}>
                <SecondTextStyled fontSize='14px'>Data: {props.cerimonia.data}</SecondTextStyled>
                <SecondTextStyled fontSize='14px'>Descrição: {props.cerimonia.descricao}</SecondTextStyled>
                <SecondTextStyled fontSize='14px'>Número de convidados: {props.cerimonia.quantidadeConvidados}</SecondTextStyled>
                <div
                    style={{
                        marginTop: '5px'
                    }}
                >
                    {
                        props.cerimonia.status === 'ACEITO' ? (
                            <Chip label="Aprovado" color="success" />
                        ) : props.cerimonia.status === 'RECUSADO' ? (
                            <Chip label="Recusado" color="error" />
                        ) : props.cerimonia.status === 'PROCESSANDO' ? (
                            <Chip label="Em Análise" color="warning" />
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
};

export default CardCerimonia;
