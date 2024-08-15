import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Error from './Pages/Error.jsx'
import Signup from './Pages/Signup.jsx'
import Home from './Pages/Home.jsx'
import AuthProvider from './Providers/AuthProvider.jsx'

const router = createBrowserRouter([{
      path:'/',
      element: <App/>,
      errorElement: <Error/>,
      children:[
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/signup',
          element:<Signup/>
        },
        {
          path:'/',
          element:<Home/>
        },
      ]

}])

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
)
