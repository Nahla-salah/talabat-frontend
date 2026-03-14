import Home from './Components/Home/Home'
import About from './Components/About/About'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import Contact from './Components/Contact/Contact'
import Brands from './Components/Brands/Brands'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import Error from './Components/Error/Error'
import Layout from './Components/Layout/Layout'
import CheckOut from './Components/CheckOut/CheckOut'
import Orders from './Components/Orders/Orders'

import HomeSlider from './Components/HomeSlider/HomeSlider'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import AuthContextProvider from './Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import OrderDetails from './Components/OrderDetails/OrderDetails'

const queryClient = new QueryClient()

const App = () => {

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: '/', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: '/home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: '/about', element: <ProtectedRoute><About /></ProtectedRoute> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/checkout', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
        { path: '/contact', element: <ProtectedRoute><Contact /></ProtectedRoute> },
        { path: '/brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: '/categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: '/cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: '/orders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
        
       
        { path: '/orderdetails/:id', element: <ProtectedRoute><OrderDetails /></ProtectedRoute> },
        
        { path: '/homeSlider', element: <ProtectedRoute><HomeSlider /></ProtectedRoute> },
        { path: '/forgot-password', element: <ForgotPassword /> },
        { path: '/*', element: <Error /> }
      ]
    }
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Toaster position="top-right" />
          <RouterProvider router={router} />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App