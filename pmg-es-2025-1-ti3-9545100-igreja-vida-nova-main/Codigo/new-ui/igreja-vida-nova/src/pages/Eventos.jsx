import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../axiosConfig';
import CardEvent from '../components/CardEvent';
import ModalCreateEvent from '../components/ModalCreateEvent';
import ModalEditEvent from '../components/ModalEditEvent';
import { PrimaryButtonStyled } from '../components/styles/ButtonStyled';
import { MainTextStyled } from '../components/styles/TextStyled';

const Eventos = () => {
    const [isPastor, setIsPastor] = useState(false);
    const [openModalCreateEvent, setOpenModalCreateEvent] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [eventos, setEventos] = useState([]);

    const getEscopos = () => {
        const roles = JSON.parse(localStorage.getItem('roles'));
        if (roles) {
            const isPastor = roles.some(role => role === 'PASTOR');
            setIsPastor(isPastor);
        }
    };

    const getEventos = () => {
        api.get('/evento/listarEventos')
            .then(response => {
                setEventos(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar eventos:', error);
            });
    };

    const handleDelete = (evento) => {
        api.delete(`/evento/${evento.id}`)
            .then(() => {
                getEventos();
            })
            .catch(error => {
                console.error('Erro ao deletar evento:', error);
            });
    };

    const handleOpenModalCreateEvent = () => setOpenModalCreateEvent(true);
    const handleCloseModalCreateEvent = () => {
        setOpenModalCreateEvent(false);
        getEventos();
    };

    const handleOpenModalEdit = (evento) => {
        setEventoSelecionado(evento);
        setOpenModalEdit(true);
    };

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false);
        setEventoSelecionado(null);
        getEventos();
    };

    useEffect(() => {
        getEscopos();
        getEventos();
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
                    <MainTextStyled>Eventos</MainTextStyled>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px'
                        }}
                    >
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
                                Criar Evento
                            </PrimaryButtonStyled>
                        )}
                        {!isPastor && <PrimaryButtonStyled
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
                            Solicitar Visita
                        </PrimaryButtonStyled>
                        }
                    </div>
                </Container>
                <Container item sx={{ display: 'flex', gap: '35px', flexWrap: 'wrap' }}>
                    {eventos.map((evento) => (
                        <CardEvent
                            key={evento.id}
                            evento={evento}
                            isPastor={isPastor}
                            handleDelete={() => handleDelete(evento)}
                            handleOpenModalEdit={() => handleOpenModalEdit(evento)}
                            getEventos={getEventos}
                        />
                    ))}
                </Container>
            </Container>

            <ModalCreateEvent
                open={openModalCreateEvent}
                isPastor={isPastor}
                handleClose={handleCloseModalCreateEvent}
            />

            {eventoSelecionado && (
                <ModalEditEvent
                    open={openModalEdit}
                    handleClose={handleCloseModalEdit}
                    evento={eventoSelecionado}
                />
            )}
        </>
    );
};

export default Eventos;
