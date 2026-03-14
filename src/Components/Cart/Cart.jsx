import React, { useEffect, useContext } from 'react';

import { CartContext } from '../../Context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Checkout from '../CheckOut/CheckOut';  
import img1 from "../../assets/Imgs/Capture.PNG"
import { Link } from 'react-router-dom';

export default function Cart() {
  const { basket, removeFromCart, updateQuantity, totalPrice, displayCart } = useContext(CartContext);

  useEffect(() => {
    
    displayCart();
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-teal-900 text-center mb-10">Shopping Cart</h1>

      {basket?.items?.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          {/* Summary Header */}
          <div className="my-6 font-bold text-xl text-teal-800 flex flex-wrap justify-around items-center bg-teal-50 p-6 rounded-2xl border border-teal-100 shadow-sm">
            <div>Total: <span className='text-red-700'>{totalPrice?.toFixed(2)}</span> EGP</div>
            <div className='text-teal-900'>{basket.items.length} Items</div>
            <Link to="/checkout" className='text-white bg-teal-900 px-8 py-2 rounded-full hover:bg-teal-700 transition shadow-md'>
              Checkout
            </Link>
          </div>

          {/* Items List */}
          <div className="grid gap-6">
            {basket.items.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-center justify-between p-5 rounded-3xl shadow-sm bg-white border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-6 w-full md:w-2/3">
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl p-2 flex-shrink-0">
                    <img
                      src={item.pictureUrl}
                      alt={item.productName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-teal-900 mb-1">{item.productName}</h3>
                    <p className="text-orange-600 font-bold">{item.price} EGP</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 mt-4 md:mt-0">
                  {/* Quantity Controller */}
                  <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="bg-white text-teal-900 w-10 h-10 rounded-xl shadow-sm hover:bg-teal-900 hover:text-white transition flex items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    
                    <span className="mx-5 font-black text-lg text-teal-900">{item.quantity}</span>
                    
                    <button
                      onClick={() => item.quantity > 1 && updateQuantity(item.id, -1)}
                      className="bg-white text-teal-900 w-10 h-10 rounded-xl shadow-sm hover:bg-teal-900 hover:text-white transition flex items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-2"
                    title="Remove item"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm max-w-2xl mx-auto border border-gray-50">
          <img className='mx-auto w-48 mb-8 opacity-80' src={img1} alt="Empty Cart" />
          <h2 className="text-teal-950 font-bold text-3xl mb-3">Your cart is Empty Now !</h2>
          <p className='text-gray-500 font-medium mb-8'>Looks like you haven't added any delicious meals yet.</p>
          <Link to="/" className="inline-block bg-orange-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-600 transition transform hover:-translate-y-1 shadow-lg shadow-orange-100">
            Browse Menu
          </Link>
        </div>
      )}
    </div>
  );
}