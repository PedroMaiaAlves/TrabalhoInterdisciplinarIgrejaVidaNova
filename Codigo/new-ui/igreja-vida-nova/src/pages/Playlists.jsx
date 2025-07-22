import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ModalCreatePlaylist from '../components/ModalCreatePlaylist.jsx';
import { PrimaryButtonStyled } from '../components/styles/ButtonStyled.jsx';
import { MainTextStyled } from '../components/styles/TextStyled.jsx';
import CardPlaylists from '../components/CardPlaylists.jsx';
import api from '../axiosConfig.jsx';


const Playlists = () => {
    const [isPastor, setIsPastor] = useState(false);
    const [openModalCreatePlaylist, setOpenModalCreatePlaylist] = useState(false);
    const [playlistSelecionadas, setEventoSelecionado] = useState(null);
    const [playlists, setPlaylists] = useState([]);


const getEscopos = () => {
        const roles = JSON.parse(localStorage.getItem('roles'));
        if (roles) {
            const isPastor = roles.some(role => role === 'PASTOR');
            setIsPastor(isPastor);
        }
    };

    const getPlaylists = () => {
        api.get('/playlist/listar')
            .then(response => {
                setPlaylists(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar playlist:', error);
            });
    };

    const handleDelete = (playlist) => {
        api.delete(`/playlist/deletar/${playlist.id}`)
            .then(() => {
                getPlaylists();
            })
            .catch(error => {
                console.error('Erro ao deletar evento:', error);
            });
    };

    const handleOpenModalCreatePlaylist = () => setOpenModalCreatePlaylist(true);
    const handleCloseModalCreatePlaylist = () => {
        setOpenModalCreatePlaylist(false);
        getPlaylists();
    };

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false);
        setPlaylistSelecionado(null);
        getPlaylists();
    };

    useEffect(() => {
        getEscopos();
        getPlaylists();
    }, []);

    return(
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
                    <MainTextStyled>Músicas</MainTextStyled>
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
                            onClick={handleOpenModalCreatePlaylist}
                        >
                            Criar Música
                        </PrimaryButtonStyled>
                    )}
                </Container>
                <div style={{ display: 'flex', justifyContent: '', flexWrap: 'wrap', margin: '0px 60px'}}>
                    {playlists.map((playlist) => (
                        <CardPlaylists
                            key={playlist.id}
                            playlist={playlist}
                            isPastor={isPastor}
                            handleDelete={() => handleDelete(playlist)}
                            handleOpenModalEdit={() => handleOpenModalEdit(playlist)}
                        />
                    ))}
                </div>
            </Container>

            <ModalCreatePlaylist
                open={openModalCreatePlaylist}
                handleClose={handleCloseModalCreatePlaylist}
            />

        </>
    )
}

export default Playlists