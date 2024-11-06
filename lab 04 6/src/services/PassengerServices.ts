import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.instantwebtools.net/v1/passenger',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getPassengers(perPage: number, page: number) {
    return apiClient.get(`?_limit=${perPage}&_page=${page}`).then(response => ({
      totalPassengers: parseInt(response.headers['x-total-count'], 10),
      totalPages: Math.ceil(parseInt(response.headers['x-total-count'], 10) / perPage),
      data: response.data
    }));
  },

  getPassenger(_id: string) {
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
};