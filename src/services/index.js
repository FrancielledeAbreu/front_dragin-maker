import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;


export const searchContacts = (name, cpf) => {
  let url = 'api/v1/contacts/search?';

  if (name) url += `name=${name}`;
  if (cpf) {
    if (name) url += `&`;
    url += `cpf=${cpf}`;
  }

  return api.get(url);
};
