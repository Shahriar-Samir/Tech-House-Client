import { Outlet, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import SearchProvider from './Providers/SearchProvider';
import Footer from './Components/Footer';



const App = () => {
    const location = useLocation()
    if(location.pathname ==='/'){
      return (
        <div>
        <SearchProvider>
          
          <Header/>
          <Outlet/>
          <Footer/>
        </SearchProvider>
        </div>
      );
    }
   
      return <div>
        <SearchProvider>
              <Outlet/>
              </SearchProvider>
          </div>
    
};

export default App;