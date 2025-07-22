import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import api from '../axiosConfig';
import InputText from '../components/InputText';
import { PrimaryButtonStyled } from './styles/ButtonStyled';
import { MainTextStyled } from './styles/TextStyled';

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
};

const ModalCreateDoacao = (props) => {
  const [titulo, setTitulo] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [meta, setMeta] = React.useState('');
  const [foto, setFoto] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleCriarDoacao = () => {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('meta', parseFloat(meta));
    if (foto) {
      formData.append('foto', foto);
    }

    api.post('/doacao/cadastrar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        props.handleClose();
      })
      .catch((error) => {
        console.error('Erro ao criar doação:', error.response?.data || error);
        alert(`Erro ao criar doação: ${error.response?.data || error.message}`);
      });
  };


  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        <MainTextStyled color='#030B16' fontSize='34px' fontWeight='bold' style={{ textAlign: 'center' }}>
          Criar Doação
        </MainTextStyled>

        <div style={{
          backgroundColor: '#FFFFFF',
          margin: '19px 62px',
          borderRadius: '20px',
          padding: '38px',
        }}>
          <InputText
            label='Título'
            type='text'
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder='Título da doação'
            width='300px'
          />
          <InputText
            label='Descrição'
            type='text'
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descrição da doação'
            width='300px'
          />
          <InputText
            label='Meta (R$)'
            type='number'
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            placeholder='Valor da meta'
            width='300px'
          />

          <div style={{ marginTop: '16px' }}>
            <label>Imagem da Doação:</label><br />
            <input type="file" accept="image/*" onChange={handleImagemChange} />
          </div>

          {previewUrl && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <img
                src={previewUrl}
                alt="Preview da imagem"
                style={{ width: '200px', height: 'auto', borderRadius: '12px', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PrimaryButtonStyled
            width='180px'
            backgroundColor='#F4C400'
            backgroundColorHover='#CDA502'
            color='black'
            onClick={handleCriarDoacao}
          >
            Criar!
          </PrimaryButtonStyled>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCreateDoacao;
