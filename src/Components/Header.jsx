import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import {toast} from 'react-toastify'
import { SearchContext } from "../Providers/SearchProvider";


const Header = () => {
    const {logOut,user} = useContext(AuthContext)
    const {searchValue} = useContext(SearchContext)
    
    const search = (e)=>{
      if(e.key === "Enter"){
      if(e.target.value !== ''){
          searchValue(e.target.value)
      }
      if(!e.target.value){
        searchValue('null')
      }
      }
  }

    const logout = ()=>{
      logOut()
      .then()
      .catch(err=>{
        toast.error('Something went wrong')
      })
  }

    return (
        <div className="navbar flex w-full flex-col items-center md:flex-row justify-between py-4 bg-green-400 gap-5">
    <div className="text-3xl font-bold flex gap-3 justify-center text-white text-center w-full ms-5 ">
    <h1>
    Tech House 
    </h1>
    <img src="/tech.png" className="w-[50px] object-cover"/>
    </div>

  <div className="flex gap-5 w-full justify-center flex-col md:flex-row items-center md:justify-end">
  <label className="input input-bordered bg-transparent !border-gray-100 !outline-none text-white flex items-center gap-2 w-full max-w-[500px]">
  <input type="text" className="grow placeholder:text-gray-100" placeholder="Search products" onKeyDown={search}/>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn ">
        <h1>{user?.email? user?.email : 'loading...'}</h1>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li onClick={logout}><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    );
};

export default Header;