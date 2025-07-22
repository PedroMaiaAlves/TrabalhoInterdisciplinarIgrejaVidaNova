import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import api from '../axiosConfig';
import InputText from '../components/InputText';
import InputSelect from './InputSelect';
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

const ModalCreateEvent = (props) => {
  const [tipoEvento, setTipoEvento] = React.useState('CULTO');
  const [tema, setTema] = React.useState('');
  const [data, setData] = React.useState('');
  const [endereco, setEndereco] = React.useState('');
  const [tiposDisponiveis, setTiposDisponiveis] = React.useState([]);

  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const handleEventType = (value) => {
    setTipoEvento(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  React.useEffect(() => {
    setTema('');
    setData('');
    setEndereco('');
    setImage(null);
    setPreview(null);

    const tipos = [];
    if (props.isPastor) {
      tipos.push('CULTO');
    }
    tipos.push('VISITA');
    setTiposDisponiveis(tipos);
    setTipoEvento(tipos[0]);
  }, [props.open]);

  const handleCriarEvento = () => {
    const formData = new FormData();
    formData.append('tipo', tipoEvento);
    formData.append('tema', tema);
    formData.append('data', data);
    formData.append('endereco', endereco);
    if (image) {
      formData.append('foto', image);
    }

    api.post('/evento/cadastrar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        props.handleClose();
      })
      .catch((error) => {
        console.error('Erro ao criar evento:', error.response?.data || error);
        alert(`Erro ao criar evento: ${error.response?.data || error.message}`);
      });
  };

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        <MainTextStyled
          color="#030B16"
          fontSize="34px"
          fontWeight="bold"
          style={{ textAlign: 'center' }}
        >
          Criar Evento
        </MainTextStyled>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            margin: '19px 62px',
            borderRadius: '20px',
            padding: '38px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            {preview && (
              <img
                src={preview}
                alt="Preview do evento"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '10px',
                }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <InputSelect
            label="Tipo de Evento"
            value={tipoEvento}
            options={tiposDisponiveis}
            onChange={(e) => handleEventType(e.target.value)}
            width="300px"
          />
          <InputText
            label="Tema"
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            placeholder="Tema do evento"
            width="300px"
          />
          <InputText
            label="Data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            type="datetime-local"
            width="300px"
          />
          <InputText
            label="Endereço"
            placeholder="Endereço do evento"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            width="300px"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PrimaryButtonStyled
            width="180px"
            backgroundColor="#F4C400"
            backgroundColorHover="#CDA502"
            color="black"
            onClick={handleCriarEvento}
          >
            Criar!
          </PrimaryButtonStyled>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCreateEvent;
