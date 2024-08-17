import React from 'react';

const Products = ({itemsCount,itemsPerPage,setCurrentPage,currentPage,items}) => {
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
        <div className='w-full mx-auto flex items-center flex-col gap-16'>
        <div className='mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5 '>
             {items.map(item=>{
                 return <div key={item._id} className="card bg-base-100 shadow-xl">
                 <figure>
                   <img
                     src={item.image}
                     className='w-full object-cover h-[250px]'
                     alt="Shoes" />
                 </figure>
                 <div className="p-4 ">
                   <h2 className="font-bold">{item.name}</h2>
                   <div className='text-sm text-gray-400 flex flex-col gap-2 mt-3'>
                   <p>{item.description}</p>
                   <p>Brand: {item.brand}</p>
                   <p>Category: {item.category}</p>
                   <p>Rating: {item.rating}/5</p>
                   <p className='text-center text-yellow-400 text-lg font-bold'>${item.price}</p>
                   </div>
                   <div className="card-actions justify-center mt-2">
                     <button className="btn bg-[#4ADE80] hover:bg-[#3bb367] text-white">Buy Now</button>
                   </div>
                 </div>
               </div>
             })
    
             }
         </div>
    <div className="join flex justify-center flex-wrap">
             <input className="join-item btn btn-square " type="radio" name="options" aria-label="Pre" onClick={prePage} disabled={currentPage===0? true: false} />
             {
                 totalPages.map(btn=>{
                     const btnIndex = btn+1
                     if(currentPage === btn){
                         return <input key={btn} className="join-item btn btn-square" type="radio" name="options" aria-label={btnIndex} checked/>
                     }
                     return <input key={btn} className="join-item btn btn-square" type="radio" name="options" aria-label={btnIndex} onClick={()=> selectPage(btn)}/>
                 })
             }
<input className="join-item btn btn-square" type="radio" name="options" aria-label="Next" onClick={nextPage} disabled={currentPage===(totalPagesCount-1)? true: false} />
</div>
        </div>
    );
};

export default Products;