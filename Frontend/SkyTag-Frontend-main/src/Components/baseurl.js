import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://43.204.92.123:4003/flight_ims_api', 
  baseURL: 'http://localhost:4004/flight_ims_api', 

  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance
