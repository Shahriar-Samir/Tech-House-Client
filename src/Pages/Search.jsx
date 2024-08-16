import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Components/Loading';
import { useParams } from 'react-router-dom';

const Search = () => {
    const axiosSecure = useAxiosSecure()
    const {value} = useParams()


    const itemsPerPage = 5
    const [currentPage,setCurrentPage] = useState(0)

    const {data:items,isFetching:loading1} = useQuery({
            queryKey: [currentPage],
            initialData: [],
            queryFn: ()=>
                axiosSecure.get(`/search?value=${value}&pages=${itemsPerPage}&count=${currentPage}`)
                .then(res=>{
                    return res.data
                })
    })
    const {data:itemsCount,isFetching:loading2} = useQuery({
            queryKey: ['itemsCount'],
            initialData: {},
            queryFn: ()=>
                axiosSecure.get('/itemsCount')
                .then(res=>{
                    return res.data
                })
    })


    if(loading1 || loading2){
        return <Loading/>
    }
    const totalItems= itemsCount.count
    const totalPagesCount = Math.ceil(totalItems/itemsPerPage)
    const totalPages = [...Array(totalPagesCount).keys()]
    
    const nextPage = ()=>{
        setCurrentPage(currentPage+1)
}
    const prePage = ()=>{
        setCurrentPage(currentPage-1)
}
    const selectPage = (page)=>{
        setCurrentPage(page)
}


    return (
        <div>
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
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="Pre" onClick={prePage} />
                {
                    totalPages.map(btn=>{
                        const btnIndex = btn+1
                        if(currentPage === btn){
                            return <input key={btn} className="join-item btn btn-square" type="radio" name="options" aria-label={btnIndex} checked/>
                        }
                        return <input key={btn} className="join-item btn btn-square" type="radio" name="options" aria-label={btnIndex} onClick={()=> selectPage(btn)}/>
                    })
                }
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="Next" onClick={nextPage}/>
</div>
           </div>
        </div>
    );
};

export default Search;