import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Components/Loading';

const Home = () => {
    const {logOut} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const logout = ()=>{
        logOut()
    }

    const {data:items,isLoading} = useQuery({
            queryKey: ['products'],
            initialData: [],
            queryFn: ()=>
                axiosSecure.get('/products')
                .then(res=>{
                    return res.data
                })
    })

   

    if(isLoading){
        return <Loading/>
    }

    return (
        <div>
            home
            <button onClick={logout}>logout</button>
            <div className='mt-5'>
                {items.map(item=>{
                    return <p key={item}>{item}</p>
                })}
            </div>
        </div>
    );
};

export default Home;