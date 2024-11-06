import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.instantwebtools.net/v1/airlines',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getAirline(_id: string) {
    return apiClient.get(`/${_id}`)
      .then(response => {
        console.log('API Response:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('API Error:', error);
        throw error;
      });
  },
};;