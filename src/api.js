import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Change if your backend runs elsewhere
});

export default api; 