import React, { useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Components/Loading';
import Products from './Products';


const Home = () => {
    const {logOut} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const [brands,setBrands] = useState([])

    const allBrands = ["Apple","Dell","Logitech","Samsung","Sony","Corsair","NZXT","Blue Microphones","Herman Miller","Brother","ASUS","Bose","LG","Amazon","Canon","Microsoft","Fitbit","JBL","NVIDIA","Google","MSI","HyperX","SteelSeries","Noctua","Razer","Intel","AMD","Gigabyte"
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
    
    
    const logout = ()=>{
        logOut()
    }
    
    const itemsPerPage = 6
    const [currentPage,setCurrentPage] = useState(0)

    const {data:items,isFetching:loading1} = useQuery({
            queryKey: [currentPage,brands],
            initialData: [],
            queryFn: ()=>
                axiosSecure.get(`/products?pages=${itemsPerPage}&count=${currentPage}&brands=${brands}`)
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


 
  
       

    return (
        <div>
            home
            <button onClick={logout}>logout</button>
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
  <div className="collapse-title text-md font-medium">Price range</div>
  <div className="collapse-content">
    <p>hello</p>
  </div>
</div>
         <div className="collapse bg-base-200 w-full">
         <input type="checkbox" />
  <div className="collapse-title text-md font-medium">Price range</div>
  <div className="collapse-content">
    <p>hello</p>
  </div>
</div>
        </div>
         {loading1 || loading2? <Loading/> : <Products itemsCount={itemsCount} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} items={items}></Products>
         }
         </div>
        </div>
    );
};

export default Home;