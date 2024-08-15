import { useEffect } from 'react';
import axios from 'axios'
import useAuth from './useAuth';

const axioSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})
const useAxiosSecure = () => {
    const auth = useAuth()
    useEffect(()=>{
        axioSecure.interceptors.response.use(res=>{
                return res
        },err=>{
            if(err.response.status === 401 || err.response.status === 403){
                    auth?.logOut()
                    .then(()=>{
                        auth?.setLoading(false)
                    })
            }
            return Promise.reject(err)
        })
    },[])
    return axioSecure
};

export default useAxiosSecure;