import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUtensils } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import { AuthContext } from '../../Context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
  const {token,setToken}  = useContext(AuthContext)
    

function Logout(){

localStorage.removeItem("Token")
setToken(null)
navigate("/login")

}


  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
        
       <Link to="/" className="flex items-center gap-2 group">

  <MdOutlineFastfood className="text-3xl text-green-600 group-hover:scale-110 transition-transform" />
  <span className="text-2xl font-bold text-gray-800 tracking-tight">
    Talabat
  </span>
</Link>

  
      {token ?     <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={({isActive}) => isActive ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-500 transition"}>Home</NavLink>
            <NavLink to="/brands" className={({isActive}) => isActive ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-500 transition"}>Brands</NavLink>
            <NavLink to="/categories" className={({isActive}) => isActive ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-500 transition"}>Categories</NavLink>
              <NavLink to="/cart"  className={({isActive}) => isActive ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-500 transition"}>  <span>Cart</span></NavLink>
              <NavLink to="/orders"  className={({isActive}) => isActive ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-500 transition"}>  <span>Orders</span></NavLink>
          </div> : ""}

     
     {token ?  <button onClick={Logout}  className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md">Log Out</button>  :     <div className="hidden md:flex items-center gap-4">
            <Link to="/home" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">Login</Link>
            <Link to="/register" className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md">Register</Link>
          </div>}

    
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

   
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-white animate-fade-in">
            <NavLink to="/" className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded-md">Home</NavLink>
            <NavLink to="/brands" className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded-md">Brands</NavLink>
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <Link to="/login" className="text-center py-2 text-gray-700 border border-gray-300 rounded-md">Login</Link>
              <Link to="/register" className="text-center py-2 bg-green-600 text-white rounded-md">Register</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;