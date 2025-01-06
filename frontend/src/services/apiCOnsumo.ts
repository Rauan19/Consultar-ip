import axios from 'axios';

const API_KEY = '17fd55fe512f01';  // Substitua com sua chave de API
const BASE_URL = 'https://ipinfo.io/';

const apiIPInfo = axios.create({
  baseURL: BASE_URL,
  params: {
    token: API_KEY,  // Passando a chave de autenticação via parâmetro token
  },
});

export default apiIPInfo;
