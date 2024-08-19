import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const {signIn,googleSignIn,setLoading} = useContext(AuthContext)
    const navigate = useNavigate()

    const submitHandler = (e)=>{
            e.preventDefault()
            const form = e.target
            const email = form.email.value
            const password = form.password.value
            if(password.length<6){
              toast.error('Password should contain at least six characters')
            }
            else{
              signIn(email,password)
            .then(res=>{
                navigate('/')
            })
            .catch(()=>{
              setLoading(false)
              toast.error('Your given email or password is wrong!')
            })
            }
            
    }
    const googleSigninHandler = ()=>{
        googleSignIn()
        .then(res=>{
        })
    }

    return (
        <div className='w-full h-[100vh] flex justify-center items-center flex-col bg-green-300'>
          <ToastContainer/>
             <Helmet>
                <title>Tech House || Login</title>
            </Helmet>
          <div className='flex items-center gap-4'>
          <h1 className='text-3xl font-bold'>
    Tech House 
    </h1>
    <img src="/tech.png" className="w-[50px] object-cover "/>
          </div>
             <div className='w-11/12 max-w-[400px]'>
                <h1 className='text-center font-bold text-xl mt-3'>Login</h1>
             <form className="card-body p-0 mt-3" onSubmit={submitHandler}>
                <h1 className='text-center font-semibold underline cursor-pointer' onClick={googleSigninHandler}>Signin with Google</h1>
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
        
        <div className="form-control mt-3">
          
          <button className="btn bg-[#4ADE80] hover:bg-[#309756] text-white border-0">Login</button>
          <h1 className=' mt-3 text-center'>Don't have an account? <Link to='/signup' className='underline'>Create an account</Link></h1>
        </div>
      </form>
             </div>
        </div>
    );
};

export default Login;