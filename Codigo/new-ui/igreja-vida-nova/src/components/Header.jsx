import {
    faHouse,
    faTicket,
    faEnvelopeOpen,
    faUser,
    faLongArrowAltLeft,
    faHandHoldingDollar,
    faHandsPraying,
    faWebAwesome,
    faMusic,
    faBars,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import MenuItems from './MenuItems';
import { HeaderBox } from './styles/HeaderStyled';
import { HeaderTitleMenuTextStyled } from './styles/TextStyled';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
    const [activeItem, setActiveItem] = React.useState(location.pathname);
    const [isPastor, setIsPastor] = React.useState(false);
    const [isObreiro, setIsObreiro] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);
    const navigate = useNavigate();

    const getEscopos = () => {
        const roles = JSON.parse(localStorage.getItem('roles'));
        if (roles) {
            const isPastor = roles.some(role => role === 'PASTOR');
            const isObreiro = roles.some(role => role === 'OBREIRO');
            setIsObreiro(isObreiro);
            setIsPastor(isPastor);
        }
    };

    const verifyAuth = () => {
        const publicRoutes = ['/login', '/cadastrar'];
        const currentPath = window.location.pathname;
        const accessToken = localStorage.getItem('access_token');

        const isPublicRoute = publicRoutes.some(route => currentPath.startsWith(route));

        if (!isPublicRoute && !accessToken) {
            navigate('/login', { replace: true });
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        getEscopos();
        verifyAuth();

        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeItem]);

    const handleMenuClick = (path) => {
        setActiveItem(path);
        navigate(path);
        if (isMobile) setIsMobileMenuOpen(false);
    };

    const renderMenuItems = () => (
        <>
            <MenuItems icon={faHouse} text={'Home'} isActive={activeItem === '/'} onClick={() => handleMenuClick('/')} />
            <MenuItems icon={faTicket} text={'Eventos'} isActive={activeItem === '/eventos'} onClick={() => handleMenuClick('/eventos')} />
            <MenuItems icon={faWebAwesome} text={'Cerimonias'} isActive={activeItem === '/cerimonias'} onClick={() => handleMenuClick('/cerimonias')} />
            {isPastor && <MenuItems icon={faEnvelopeOpen} text={'Gerenciar Obreiros'} isActive={activeItem === '/gerenciar-obreiros'} onClick={() => handleMenuClick('/gerenciar-obreiros')} />}
            {isObreiro && <MenuItems icon={faEnvelopeOpen} text={'Minhas Funções'} isActive={activeItem === '/minhas-funcoes'} onClick={() => handleMenuClick('/minhas-funcoes')} />}
            <MenuItems icon={faHandsPraying} text={'Pedir Oração'} isActive={activeItem === '/pedir-oracao'} onClick={() => handleMenuClick('/pedir-oracao')} />
            <MenuItems icon={faHandHoldingDollar} text={'Doações'} isActive={activeItem === '/doacoes'} onClick={() => handleMenuClick('/doacoes')} />
            <MenuItems icon={faMusic} text={'Nossa Playlist'} isActive={activeItem === '/playlists'} onClick={() => handleMenuClick('/playlists')} />
            <MenuItems icon={faUser} text={'Perfil'} isActive={activeItem === '/perfil'} onClick={() => handleMenuClick('/perfil')} />
            {localStorage.getItem('access_token') ? (
                <MenuItems icon={faLongArrowAltLeft} text={'Sair'} onClick={() => {
                    localStorage.clear();
                    navigate('/login');
                }} />
            ) : (
                <MenuItems text={'Entrar'} onClick={() => navigate('/login')} />
            )}
        </>
    );

    return (
        <HeaderBox>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                <HeaderTitleMenuTextStyled style={{ marginRight: '24px' }}> Igreja Vida Nova</HeaderTitleMenuTextStyled>
                {isMobile ? (
                    <button onClick={() => setIsMobileMenuOpen(prev => !prev)} aria-label="Abrir/fechar menu mobile" style={{ background: 'none', border: 'none', fontSize: '24px', zIndex: 1001 }}>
                        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
                    </button>
                ) : (
                    <div style={{ display: 'flex', gap: '32px' }}>{renderMenuItems()}</div>
                )}
            </div>

            {isMobile && isMobileMenuOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    padding: '16px',
                    zIndex: 1000,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    overflowY: 'auto'
                }}>
                    {renderMenuItems()}
                </div>
            )}
        </HeaderBox>
    );
};

export default Header;