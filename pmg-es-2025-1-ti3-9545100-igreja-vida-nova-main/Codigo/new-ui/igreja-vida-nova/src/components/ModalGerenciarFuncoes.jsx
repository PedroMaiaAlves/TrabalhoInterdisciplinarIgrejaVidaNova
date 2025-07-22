import { faCheck, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import InputText from './InputText';
import { PrimaryButtonStyled } from './styles/ButtonStyled';
import { MainTextStyled } from './styles/TextStyled';
import api from '../axiosConfig';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#F6F6F6',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
  maxHeight: '800px', overflowY: 'auto', scrollbarWidth: 'none'
};


const ModalGerenciarFuncoes = (props) => {

    const [funcoes, setFuncoes] = React.useState([]);
    const [editingId, setEditingId] = React.useState(null); 
    const [editedValues, setEditedValues] = React.useState({});

    const getFuncoes = () => {
        api.get('/funcao/listar')
                .then(response => {
                    setFuncoes(response.data);
                })
                .catch(error => {
                    console.error('Erro ao buscar eventos:', error);
                });
    }

    const handleEditClick = (id) => {
        setEditingId(id);
        const funcao = funcoes.find(f => f.id === id);
        setEditedValues({ ...editedValues, [id]: funcao?.nomeFuncao || '' });
    };

    const handleInputChange = (id, value) => {
        setEditedValues({ ...editedValues, [id]: value });
    };

    const handleEditSave = (id) => {
        api.put(`/funcao/${id}`, { 
            id: id,
            nomeFuncao: editedValues[id] 
        })
        .then(() => {
            const updatedFuncoes = funcoes.map(funcao => 
                funcao.id === id ? { ...funcao, nomeFuncao: editedValues[id] } : funcao
            );
            setFuncoes(updatedFuncoes);
            setEditingId(null);
        })
        .catch(error => {
            console.error('Erro ao atualizar função:', error);
        });
    };

    const handleDelete = (id) => {
        api.delete(`/funcao/${id}`, { 
            id: id
        })
        .then(() => {
            getFuncoes();
        })
        .catch(error => {
            console.error('Erro ao deletar função:', error);
        });
    }

    const handleCreateFuncao = () => {
        const newFuncao = { nomeFuncao: 'Nova Função' };
        api.post('/funcao/criar', newFuncao)
            .then(() => {
                getFuncoes();
            })
            .catch(error => {
                console.error('Erro ao criar função:', error);
            });
    }

    React.useEffect(() => {
        getFuncoes();
    }, []);
    
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            >
            <Box sx={style}>
                <MainTextStyled color='#030B16' fontSize='34px' fontWeight='bold' style={{textAlign: 'center'}}>Gerenciar Funções</MainTextStyled>
                <div 
                    style={{
                        backgroundColor: '#FFFFFF',
                        margin: '19px 62px',
                        borderRadius: '20px',
                        padding: '38px',
                        textAlign: 'center',
                    }}
                >
                    <PrimaryButtonStyled 
                        backgroundColor='#1E984F'
                        color='white'
                        width='109px'
                        height='32px'
                        fontSize='16px'
                        fontWeight='bold'
                        style ={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onClick={handleCreateFuncao}
                    >
                        Criar Funcao
                    </PrimaryButtonStyled>
                    {funcoes.map((funcao) => (
                        <div key={funcao.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                            <InputText
                                value={editingId === funcao.id ? editedValues[funcao.id] : funcao.nomeFuncao}
                                width='400px'
                                readOnly={editingId !== funcao.id}
                                onChange={(e) => handleInputChange(funcao.id, e.target.value)}
                            />
                            {editingId === funcao.id ? (
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    style={{
                                        color: 'green',
                                        fontSize: '25px',
                                        marginTop: '28px',
                                        marginLeft: '12px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleEditSave(funcao.id)}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    style={{
                                        color: 'black',
                                        fontSize: '25px',
                                        marginTop: '28px',
                                        marginLeft: '12px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleEditClick(funcao.id)}
                                />
                            )}
                            <FontAwesomeIcon
                                icon={faTrash}
                                style={{
                                    color: 'red',
                                    fontSize: '25px',
                                    marginTop: '28px',
                                    marginLeft: '6px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleDelete(funcao.id)}
                            />
                        </div>
                    ))}
                </div>
            </Box>
        </Modal>
    );
}

export default ModalGerenciarFuncoes;
