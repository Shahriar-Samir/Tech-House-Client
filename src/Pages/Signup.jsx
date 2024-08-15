import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const Signup = () => {
    const {signUp} = useContext(AuthContext)

    const submitHandler = (e)=>{
            e.preventDefault()
            const form = e.target
            const email = form.email.value
            const password = form.password.value
            signUp(email,password)
            .then(res=>{
                console.log(res)
            })
            
    }

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
             <div className='w-11/12 max-w-[400px]'>
                <h1 className='text-center font-semibold text-3xl'>Create a Account</h1>
             <form className="card-body" onSubmit={submitHandler}>
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
        <div className="form-control mt-6">
          <button className="btn btn-primary">Create an account</button>
        </div>
      </form>
             </div>
        </div>
    );
};

export default Signup;