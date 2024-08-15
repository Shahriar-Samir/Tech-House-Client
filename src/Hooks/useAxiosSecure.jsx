import React from 'react';
import axios from 'axios'

const axioSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})
const useAxiosSecure = () => {
    return axioSecure
};

export default useAxiosSecure;