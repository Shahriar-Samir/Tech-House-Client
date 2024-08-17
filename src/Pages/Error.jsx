import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate()
  
    return (
        <div className='h-[100vh] w-full flex items-center justify-center bg-green-300 flex-col'>
              <Helmet>
        <title>Page not found</title>
    </Helmet>
            <h1 className='text-xl font-semibold'>404 error. Page not found.</h1>
            <button onClick={()=>{navigate('/')}} className='mt-3 btn'>Go back to homepage</button>
        </div>
    );
};

export default Error;