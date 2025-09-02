import axios from 'axios';

const API_URL = 'https://ide-dfdaccffbaeccdbcacadadfbbcbbebfbde.premiumproject.examly.io/proxy/8080/api/auth';

const AuthService = {
  login: (credentials) => axios.post(`${API_URL}/login`, credentials),
};

export default AuthService;