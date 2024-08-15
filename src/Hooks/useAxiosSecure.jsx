import React, { useEffect } from 'react';
import axios from 'axios'

const axioSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})
const useAxiosSecure = () => {
    useEffect(()=>{
        axioSecure.interceptors.response.use(res=>{
                return res
        },err=>{
            if(err.response.status === 401 || err.response.status === 403){
                return Promise.reject(err)
            }
        })
    },[])
    return axioSecure
};

export default useAxiosSecure;