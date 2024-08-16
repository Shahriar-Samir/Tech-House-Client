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
             <input className="join-item btn btn-square" type="radio" name="options" aria-label="Pre" onClick={prePage} disabled={currentPage===0? true: false} />
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