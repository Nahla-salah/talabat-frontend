import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { useQuery } from "@tanstack/react-query";
import HomeSlider from '../../Components/HomeSlider/HomeSlider'

const Home = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useContext(CartContext);

  const navigate = useNavigate();



  const getProducts = async () => {
    const res = await axios.get('http://localhost:8050/Api/Product');
    return res.data;
  };



  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    enabled:true
  });



  const handleAdd = async (product) => {
    const success = await addToCart(product);

    if (success) {
      console.log("Product Added Successfully");
    }
  };


  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-green-500"></div>
      </div>
    );


  if (error) return <p>Error loading products</p>;


  return (
    <div className="container mx-auto px-4 py-8">
         <h1 className='text-center  text-3xl text-green-600'>
        Welcome To The Shop
      </h1>
    <HomeSlider/>
   

      <div className="mb-5 flex justify-center ">
        <input
          type="text"
          placeholder="Search for your favorite food"
          className="w-full max-w-lg p-4  rounded-2xl border border-green-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {filteredProducts.map((product) => (

          <div key={product.id} className="bg-white rounded-3xl shadow-md p-4">

            <img
              src={product.pictureUrl}
              alt={product.name}
              className="w-full h-48 object-contain"
            />

            <h3 className="font-bold">{product.name}</h3>

            <p className="text-orange-600 font-bold">
              {product.price} EGP
            </p>

            <button
              onClick={() => handleAdd(product)}
              className="bg-orange-500 text-white py-2 px-4 rounded-lg mt-3"
            >
              Add to Cart
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Home;