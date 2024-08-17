import { Outlet, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import SearchProvider from './Providers/SearchProvider';
import Footer from './Components/Footer';



const App = () => {
    const location = useLocation()
    if(location.pathname !== '/login' || location.pathname !== '/signup' ){
      return (
        <SearchProvider>
          <div>
          <Header/>
          <Outlet/>
          <Footer/>
        </div>
        </SearchProvider>
      );
    }
    return <div>
              <Outlet/>
          </div>
};

export default App;