import axios from 'axios';

export const axiosInstance = axios.create({
  responseType: 'json',
  baseURL: 'https://api.weatherapi.com/v1/',
});

axiosInstance.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => {
    if (response.data) return response.data;
    return response;
  },
  err => {
    if (err.response) {
      const {status, data} = err.response;
      const errorMessage = data.message || 'An error occurred';
    } else {
      // For network or unexpected errors
    }

    return Promise.reject(err);
  },
);

export default function request(options) {
  return axiosInstance(options);
}
