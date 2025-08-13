import axios from 'axios';

const api = axios.create({
  // Automatically append `/api` to your backend base URL
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

export default api;
