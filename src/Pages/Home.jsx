import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Components/Loading';
import Products from './Products';
import { ToastContainer } from 'react-toastify';

import { SearchContext } from '../Providers/SearchProvider';


const Home = () => {

    const {value} = useContext(SearchContext)

  
    const axiosSecure = useAxiosSecure()

    const [brands,setBrands] = useState([])
    const [categories,setCategories] = useState([])
    const [sortByDate,setSortByDate] = useState('default')
    const [sortByPrice,setSortByPrice] = useState('default')


    const handleSortByDate = (e)=>{
        setSortByDate(e.target.value)
    }
    const handleSortByPrice = (e)=>{
            setSortByPrice(e.target.value)
    }


    const allBrands = ["Apple","Dell","Logitech","Samsung","Sony","Corsair","NZXT","Blue Microphones","Herman Miller","Brother","ASUS","Bose","LG","Amazon","Canon","Microsoft","Fitbit","JBL","NVIDIA","Google","MSI","HyperX","SteelSeries","Noctua","Razer","Intel","AMD","Gigabyte"
      ]
    const allCategories = ["Laptops","Audio","Smart Home", "Accessories","PC Components",
        "Home Entertainment","Monitors","Tablets","Office Accessories","Cameras",
      ]
      

    const brandsHandler = (e)=>{
        if(e.target.checked){
            setBrands(oldData=>{
                return [...oldData,e.target.name]
            })
        }
        else{
            setBrands(oldData=>{
                const newData = oldData.filter(item=>{
                    return item !== e.target.name
                })
                return [...newData]
            })
        }
       
    }
    const categoriesHandler = (e)=>{
        if(e.target.checked){
            setCategories(oldData=>{
                return [...oldData,e.target.name]
            })
        }
        else{
            setCategories(oldData=>{
                const newData = oldData.filter(item=>{
                    return item !== e.target.name
                })
                return [...newData]
            })
        }
       
    }
    
    
  
    
    const itemsPerPage = 6
    const [currentPage,setCurrentPage] = useState(0)

    useEffect(()=>{
        setCurrentPage(0)
    },[value])

    const {data:items,isFetching:loading1} = useQuery({
            queryKey: [currentPage,brands,categories,sortByDate,sortByPrice,value],
            initialData: [],
            queryFn: ()=>
                axiosSecure.get(`/products?pages=${itemsPerPage}&count=${currentPage}&brands=${brands}&categories=${categories}&sortByPrice=${sortByPrice}&sortByDate=${sortByDate}&value=${value}`)
                .then(res=>{
                    return res.data
                })
    })
    const {data:itemsCount,isFetching:loading2} = useQuery({
            queryKey: [brands,categories,value],
            initialData: {},
            queryFn: ()=>
                axiosSecure.get(`/itemsCount?pages=${itemsPerPage}&count=${currentPage}&brands=${brands}&categories=${categories}&value=${value}`)
                .then(res=>{
                    return res.data
                })
    })

    
  

    return (
        <div className='mt-10'>
           <ToastContainer/>
         <div className='flex gap-5 w-full mx-auto px-4'>
         <div className='w-4/12 max-w-[500px] bg-white flex flex-col items-center mx-auto gap-5 '>
         <div className="collapse bg-base-200 w-full">
  <input type="checkbox" />
  <div className="collapse-title text-md font-medium">Brand</div>
  <div className="collapse-content">

    {allBrands.map(item=>{
        return <div key={item} className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">{item}</span>
<input type="checkbox" name={item} onClick={brandsHandler}   className="checkbox" /> 
          
        </label>
      </div>
    })}

  </div>
</div>
         <div className="collapse bg-base-200 w-full">
  <input type="checkbox" />
  <div className="collapse-title text-md font-medium">Categories</div>
  <div className="collapse-content">
  {allCategories.map(item=>{
        return <div key={item} className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">{item}</span>
<input type="checkbox" name={item} onClick={categoriesHandler}   className="checkbox" /> 
          
        </label>
      </div>
    })}
  </div>
</div>
         <div className="collapse bg-base-200 w-full">
         <input type="checkbox" />
  <div className="collapse-title text-md font-medium">Price range</div>
  <div className="collapse-content">
  <input type="range" min={0} max="100" onChange={(e)=> console.log(e.target.value)} defaultValue={30} className="range" />
  <div className='flex justify-between w-full'>
        <h1>0</h1>

        <h1>12</h1>
  </div>
  </div>
</div>
        </div>
        <div className='w-full'>
            <div className='flex gap-4 w-full'>
               <label>
                Sort By Price:
               <select name='sortByPrice' onChange={handleSortByPrice} className='bg-slate-200 rounded-lg p-2'>
                    <option value='default'>Default</option>
                    <option value='low'>Price {'(Low > High)'}</option>
                    <option value='high'>Price {'High > Low'}</option>
                </select>
               </label>
                <label>
                Sort By Date:
                <select name='sortByDate' onChange={handleSortByDate} className='bg-slate-200 rounded-lg p-2'>
                    <option value='default'>Default</option>
                    <option value='newest'>Newest</option>
                    <option value='oldest'>Oldest</option>
                </select>
                </label>
            </div>
        {loading1 || loading2? <Loading/> : items.length>0? 
        <div>
            <div className='w-full'>
                {value === 'null'? '' : <p className='mt-3 mb-3 text-xl'>Search Results for: {`'${value}'`}</p>}
            </div>
            <Products itemsCount={itemsCount} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} items={items}></Products>
        </div>
        :
        <div className='h-[60vh] w-full flex justify-center items-center'>
        <p className='text-lg w-full max-w-[300px]'>No Products found for {`"${value}"`}</p>
</div>
         }
        </div>

         </div>
        </div>
    );
};

export default Home;