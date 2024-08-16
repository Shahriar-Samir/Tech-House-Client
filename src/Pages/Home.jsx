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
            <div className='mt-5 grid grid-cols-3 mx-auto gap-5 w-full px-3'>
                {items.map(item=>{
                    return <div key={item._id} className="card bg-base-100 shadow-xl">
                    <figure>
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.name}</h2>
                      <p>{item.brand}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                })}
            </div>
        </div>
    );
};

export default Home;