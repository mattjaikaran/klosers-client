import axios from 'axios';
import { tokenHeaders } from '../auth';

// global api call for a logged in user
// NOTE - no slash ending API_URL. url/api
const useAxios = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      // add token headers from a logged in user
      ...tokenHeaders(),
    },
  });
};

export default useAxios;

// to use:

// import useAxios from '@/lib/hooks/utils;
// const api = useAxios();
// const response = await api.get('/proposals');

// or better:
// const api = useAxios();
// const onSubmit = (data) => {
//   try {
//     const response = await api.post(url, data);
//     console.log('response', response)
//     return response
//   } catch (error) {
//     console.error('error', error);
//   }
// };
