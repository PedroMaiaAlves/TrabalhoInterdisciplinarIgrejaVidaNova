import { Container } from '@mui/material';
import React from 'react';
import CardCerimonia from '../components/CardCerimonia';
import ModalCreateCerimonia from '../components/ModalCreateCerimonia';
import { PrimaryButtonStyled } from '../components/styles/ButtonStyled';
import { MainTextStyled } from '../components/styles/TextStyled';
import api from '../axiosConfig';

const Cerimonias = () => {

    const [isPastor, setIsPastor] = React.useState();
    const [cerimonias, setCerimonias] = React.useState([]);
    const [openModalCreateCerimonia, setOpenModalCreateCerimonia] = React.useState(false);

    const getCerimonias = () => {
        api.get('/cerimonia/listar')
            .then(response => {
                setCerimonias(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar as cerimonias:', error);
            });
    }

    const handleOpenModalCreateCerimonia = () => setOpenModalCreateCerimonia(true);
    const handleCloseModalCreateCerimonia = () => {
        setOpenModalCreateCerimonia(false);
        if (isPastor) {
            getCerimonias();
        } else {
            getUserCerimonias();
        }
    };

    const getUserCerimonias = () => {
        const userId = localStorage.getItem('userId');
        api.get(`/cerimonia/listarPorUsuario/${userId}`)
            .then(response => {
                setCerimonias(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar as cerimonias:', error);
            });
    }

    const handleAcceptCerimonia = (cerimoniaId) => {
        api.patch(`/cerimonia/atualizarStatus/${cerimoniaId}`, {
            statusType: 'ACEITO'
        })
            .then(response => {
                console.log('Cerimonia aceita com sucesso:', response.data);
                getCerimonias();
            })
            .catch(error => {
                console.error('Erro ao aceitar a cerimonia:', error);
            });
    }

    const handleRecuseCerimonia = (cerimoniaId) => {
        api.patch(`/cerimonia/atualizarStatus/${cerimoniaId}`, {
            statusType: 'RECUSADO'
        })
            .then(response => {
                console.log('Cerimonia recusada com sucesso:', response.data);
                getCerimonias();
            })
            .catch(error => {
                console.error('Erro ao recusar a cerimonia:', error);
            });
    }

    const getEscopos = () => {
        const roles = JSON.parse(localStorage.getItem('roles'));
        if (roles) {
            const isPastor = roles.some(role => role === 'PASTOR');
            setIsPastor(isPastor);
        }
    };

    React.useEffect(() => {
        getEscopos();
    }, []);

    React.useEffect(() => {
        if (isPastor) {
            getCerimonias();
        } else {
            getUserCerimonias();
        }
    }, [isPastor]);

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
                    <MainTextStyled>Cerimonias</MainTextStyled>
                    <PrimaryButtonStyled
                        backgroundColor='#1E984F'
                        color='white'
                        width='170px'
                        height='32px'
                        fontSize='16px'
                        fontWeight='bold'
                        style ={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onClick={handleOpenModalCreateCerimonia}
                    >
                        Solicitar Cerimonia
                    </PrimaryButtonStyled>
                </Container>
                <Container item sx={{ display: 'flex', gap: '35px', flexWrap: 'wrap' }}>
                    {cerimonias.map((cerimonia) => (
                        <CardCerimonia 
                            key={cerimonia.id}
                            cerimonia={cerimonia}
                            isPastor={isPastor}
                            handleAcceptCerimonia={() => handleAcceptCerimonia(cerimonia.id)}
                            handleRecuseCerimonia={() => handleRecuseCerimonia(cerimonia.id)}
                        />
                    ))}
                </Container>
            </Container>

            <ModalCreateCerimonia
                open={openModalCreateCerimonia}
                handleClose={handleCloseModalCreateCerimonia}
            />
        </>
    )
}

export default Cerimonias;