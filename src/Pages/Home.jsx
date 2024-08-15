import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const Home = () => {
    const {logOut} = useContext(AuthContext)
    
    const logout = ()=>{
        logOut()
    }

    return (
        <div>
            home
            <button onClick={logout}>logout</button>
        </div>
    );
};

export default Home;