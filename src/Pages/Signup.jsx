import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const {signUp,googleSignIn} = useContext(AuthContext)

    const googleSigninHandler = ()=>{
      googleSignIn()
      .then(res=>{
      })
  }


    const submitHandler = (e)=>{
            e.preventDefault()
            const form = e.target
            const email = form.email.value
            const password = form.password.value
            signUp(email,password)
            .then(res=>{
                
            })
            
    }

    return (
        <div className='w-full h-[100vh] flex justify-center items-center flex-col bg-green-300'>
           <div className='flex items-center gap-4'>
          <h1 className='text-3xl font-bold'>
    Tech House 
    </h1>
    <img src="/tech.png" className="w-[50px] object-cover "/>
          </div>
             <div className='w-11/12 max-w-[400px] '>
                <h1 className='text-center font-bold text-lg mt-4'>Create a Account</h1>
             <form className="card-body p-2" onSubmit={submitHandler}>
             <h1 className='text-center font-semibold underline' onClick={googleSigninHandler}>Signin with Google</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name='password' className="input input-bordered" required />
        </div>
        <div className="form-control mt-2">
        <button className="btn bg-[#4ADE80] hover:bg-[#309756] text-white border-0">Create Account</button>
        <h1 className=' mt-3 text-center'>Already have an account? <Link to='/signup' className='underline'>Login</Link></h1>
        </div>
      </form>
             </div>
        </div>
    );
};

export default Signup;