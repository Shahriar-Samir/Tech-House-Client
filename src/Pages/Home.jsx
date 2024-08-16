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
           <div className='w-8/12 px-3 mx-auto flex items-center flex-col gap-16'>
           <div className='mt-5 grid grid-cols-3 gap-5 '>
                {items.map(item=>{
                    return <div key={item._id} className="card bg-base-100 shadow-xl">
                    <figure>
                      <img
                        src={item.image}
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.name}</h2>
                      <p>{item.brand}</p>
                      <p>{item.category}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                })}
            </div>
            <div className="join">
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="Pre" />
  <input
    className="join-item btn btn-square"
    type="radio"
    name="options"
    aria-label="1"
    defaultChecked />
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="Next" />
</div>
           </div>
        </div>
    );
};

export default Home;