import React from 'react';
import axios from 'axios'

const axioPublic = axios.create({
    baseURL: 'https://tech-house-server.vercel.app',
})
const useAxios = () => {
    return axioPublic
};

export default useAxios;