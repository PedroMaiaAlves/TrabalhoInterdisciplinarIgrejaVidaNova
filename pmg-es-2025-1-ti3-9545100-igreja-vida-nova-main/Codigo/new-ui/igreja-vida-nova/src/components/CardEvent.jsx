import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Chip, Button } from '@mui/material';
import { MainTextStyled, SecondTextStyled } from './styles/TextStyled';
import api from '../axiosConfig';

const CardEvent = (props) => {
    const { evento, isPastor, handleOpenModalEdit, handleDelete, getEventos } = props;

    const separarData = (date) => date.split("T")[0];
    const separarHorario = (date) => date.split("T")[1].slice(0, 5);

    const getStatusChip = (status) => {
        switch (status) {
            case 'PROCESSANDO':
                return <Chip label="Pendente" color="warning" size="small" />;
            case 'ACEITO':
                return <Chip label="Aceito" color="success" size="small" />;
            case 'RECUSADO':
                return <Chip label="Recusado" color="error" size="small" />;
            default:
                return null;
        }
    };

    const atualizarStatus = (novoStatus) => {
        const dto = { statusType: novoStatus };

        api.patch(`/evento/atualizarStatus/${evento.id}`, dto)
            .then(() => {
                getEventos();
                alert(`Status do evento atualizado para: ${novoStatus}`);
            })
            .catch(error => {
                console.error(`Erro ao atualizar status do evento: ${error}`);
                alert('Erro ao atualizar o status do evento.');
            });
    };

    const imagemSrc = evento.fotoBase64
        ? `data:image/jpeg;base64,${evento.fotoBase64}`
        : "https://igreja-vida-nova.s3.us-east-2.amazonaws.com/images/backgroundImage.png";

    return (
        <div
            style={{
                backgroundColor: '#FFFFFF',
                width: '342px',
                padding: '16px',
                borderRadius: '12px',
            }}
        >
            <img
                src={imagemSrc}
                alt="Imagem do evento"
                style={{ width: '311px', height: '186px', marginBottom: '14px', objectFit: 'cover', borderRadius: '16px' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <MainTextStyled color='#030B16' fontSize='16px'>{evento.tema}</MainTextStyled>
                {isPastor && (
                    <div>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: 'black', fontSize: '25px', marginRight: '5px' }}
                            onClick={handleOpenModalEdit}
                        />
                        <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: 'red', fontSize: '25px' }}
                            onClick={handleDelete}
                        />
                    </div>
                )}
            </div>

            {evento.status && (
                <div style={{ marginTop: '12px' }}>
                    {getStatusChip(evento.status)}
                </div>
            )}

            <div style={{ marginTop: '25px' }}>
                <SecondTextStyled fontSize='14px'>Data: {separarData(evento.data)}</SecondTextStyled>
                <SecondTextStyled fontSize='14px'>Horário: {separarHorario(evento.data)}</SecondTextStyled>
                {evento.endereco && (
                    <SecondTextStyled fontSize='14px'>Local: {evento.endereco}</SecondTextStyled>
                )}
            </div>

            {isPastor && evento.status === 'PROCESSANDO' && (
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => atualizarStatus('ACEITO')}
                    >
                        Aceitar
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => atualizarStatus('RECUSADO')}
                    >
                        Recusar
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CardEvent;
