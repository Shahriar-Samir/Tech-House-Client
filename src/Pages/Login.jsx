import React from 'react';

const Login = () => {
    
    const submitHandler = (e)=>{
            e.preventDefault()
            const form = e.target
            const email = form.email.value
            const password = form.password.value

            console.log(email, password)
    }

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
             <div className='w-11/12 max-w-[400px]'>
                <h1 className='text-center font-semibold text-3xl'>Login</h1>
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
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
             </div>
        </div>
    );
};

export default Login;