import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {signIn,googleSignIn,setLoading} = useContext(AuthContext)
    const navigate = useNavigate()

    const submitHandler = (e)=>{
            e.preventDefault()
            const form = e.target
            const email = form.email.value
            const password = form.password.value
            signIn(email,password)
            .then(res=>{
                setLoading(false)
                navigate('/')
            })
            
    }
    const googleSigninHandler = ()=>{
        googleSignIn()
        .then(res=>{
          setLoading(false)
        })
    }

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
             <div className='w-11/12 max-w-[400px]'>
                <h1 className='text-center font-semibold text-3xl'>Login</h1>
             <form className="card-body" onSubmit={submitHandler}>
                <h1 className='text-center font-semibold text-3xl' onClick={googleSigninHandler}>Google</h1>
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
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
             </div>
        </div>
    );
};

export default Login;