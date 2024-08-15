import { Outlet, useLocation } from 'react-router-dom';
import Header from './Components/Header';


const App = () => {
    const location = useLocation()
    if(location.pathname !== '/login' || location.pathname !== '/signup' ){
      return (
        <div>
          <Header/>
          <Outlet/>
        </div>
      );
    }
    return <div>
              <Outlet/>
          </div>
};

export default App;