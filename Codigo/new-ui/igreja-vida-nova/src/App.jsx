import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import GlobalStyles from './components/GlobalStyles';
import Header from './components/Header';
import Cadastro from './pages/Cadastro';
import Cerimonias from './pages/Cerimonias';
import Doacoes from './pages/Doacoes';
import Eventos from './pages/Eventos';
import GerenciarObreiros from './pages/GerenciarObreiros';
import GerenciarObreirosEvento from './pages/GerenciarObreirosEvento';
import Home from './pages/Home';
import Login from './pages/Login';
import MinhasFuncoes from './pages/MinhasFuncoes';
import PedirOracao from './pages/PedirOracao';
import Perfil from './pages/Perfil';
import Playlists from './pages/Playlists';

const App = () => {
  const location = useLocation();

  const showHeader = location.pathname !== '/login' && location.pathname !== '/cadastrar';

  return (
    <>
      <GlobalStyles />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {showHeader && <Header />}

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/gerenciar-obreiros" element={<GerenciarObreiros />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/gerenciar-obreiros/:id" element={<GerenciarObreirosEvento />} />
            <Route path="/doacoes" element={<Doacoes />} />
            <Route path="/pedir-oracao" element={<PedirOracao />} />
            <Route path="/cerimonias" element={<Cerimonias />} />
            <Route path="/minhas-funcoes" element={<MinhasFuncoes />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default App;
