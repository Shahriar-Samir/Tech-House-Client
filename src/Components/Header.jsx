import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const {logOut} = useContext(AuthContext)
    const navigate = useNavigate()

    const search = (e)=>{
        if(e.key === "Enter"){
        if(e.target.value !== ''){
          navigate(`?search=${e.target.value}`)
        }
        if(!e.target.value){
          navigate('/')
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
        <div className="navbar flex w-full justify-between py-4 bg-green-400">
  <div className="w-full">
    <a className="text-2xl font-bold">Tech House</a>
  </div>
  <div className="flex gap-5 w-full justify-end">
  <label className="input input-bordered flex items-center gap-2 w-full max-w-[500px]">
  <input type="text" className="grow" placeholder="Search products" onKeyDown={search}/>
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
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li onClick={logout}><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    );
};

export default Header;