import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardDoacao from '../components/CardDoacao';
import ModalCreateDoacao from '../components/ModalCreateDoacao';
import ModalEditDoacao from '../components/ModalEditDoacao';
import { PrimaryButtonStyled } from '../components/styles/ButtonStyled';
import { MainTextStyled } from '../components/styles/TextStyled';
import api from '../axiosConfig';

const Doacoes = () => {
    const [isPastor, setIsPastor] = useState(false);
    const [openModalCreateEvent, setOpenModalCreateEvent] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [doacaoSelecionada, setDoacaoSelecionada] = useState(null);
    const [doacoes, setDoacoes] = useState([]);

    const getEscopos = () => {
        const roles = JSON.parse(localStorage.getItem('roles'));
        if (roles) {
            const isPastor = roles.some(role => role === 'PASTOR');
            setIsPastor(isPastor);
        }
    };

    const getDoacoes = () => {
        api.get('/doacao/listar')
            .then(response => {
                setDoacoes(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar eventos:', error);
            });
    };

    const handleDelete = (doacao) => {
        api.delete(`/doacao/${doacao.id}`)
            .then(() => {
                getDoacoes();
            })
            .catch(error => {
                console.error('Erro ao deletar doacao:', error);
            });
    };

    const handleOpenModalCreateEvent = () => setOpenModalCreateEvent(true);
    const handleCloseModalCreateEvent = () => {
        setOpenModalCreateEvent(false);
        getDoacoes();
    };

    const handleOpenModalEdit = (doacao) => {
        setDoacaoSelecionada(doacao);
        setOpenModalEdit(true);
    };

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false);
        setDoacaoSelecionada(null);
        getDoacoes();
    };

    useEffect(() => {
        getEscopos();
        getDoacoes();
    }, []);

    return (
        <>
            <Container disableGutters maxWidth={false} sx={{ marginTop: '61px', marginBottom: '61px' }}>
                <Container
                    item
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '61px',
                        alignItems: 'center',
                    }}
                >
                    <MainTextStyled>Doações</MainTextStyled>
                    {isPastor && (
                        <PrimaryButtonStyled
                            backgroundColor='#1E984F'
                            color='white'
                            width='160px'
                            height='32px'
                            fontSize='16px'
                            fontWeight='bold'
                            style ={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onClick={handleOpenModalCreateEvent}
                        >
                            Criar Doação
                        </PrimaryButtonStyled>
                    )}
                </Container>
                <Container item sx={{ display: 'flex', gap: '35px', flexWrap: 'wrap' }}>
                    {doacoes.map((doacao) => (
                        <CardDoacao
                            key={doacao.id}
                            doacao={doacao}
                            isPastor={isPastor}
                            handleDelete={() => handleDelete(doacao)}
                            handleOpenModalEdit={() => handleOpenModalEdit(doacao)}
                            getDoacoes={() => getDoacoes()}
                        />
                    ))}
                </Container>
            </Container>

            <ModalCreateDoacao
                open={openModalCreateEvent}
                handleClose={handleCloseModalCreateEvent}
            />

            {doacaoSelecionada && (
                <ModalEditDoacao
                    open={openModalEdit}
                    handleClose={handleCloseModalEdit}
                    doacao={doacaoSelecionada}
                />
            )}
        </>
    );
};

export default Doacoes;
