import axios from 'axios';

const api = axios.create({
    baseURL: 'https://igreja-vida-nova.duckdns.org',
//    baseURL: 'http://localhost:8080',
});

export default api;
