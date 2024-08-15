import React from 'react';
import axios from 'axios'

const axioPublic = axios.create({
    baseURL: 'http://localhost:5000',
})
const useAxios = () => {
    return axioPublic
};

export default useAxios;