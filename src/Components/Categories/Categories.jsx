import React, { useEffect, useState, useContext } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { CartContext } from '../../Context/CartContext'

const CategoriesPage = () => {
    const [types, setTypes] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedTypeId, setSelectedTypeId] = useState(null);
    const [loading, setLoading] = useState(false);


    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

  
    const handleAdd = async (product) => {
        const success = await addToCart(product);
        if (success) {
            console.log("Product Added Successfully");
          
        }
    };


    useEffect(() => {
        axios.get('http://talabat-nahla-api.runasp.net/Api/Product/Types')
            .then(res => setTypes(res.data))
            .catch(err => console.error("Error Types:", err));
    }, []);

   
    useEffect(() => {
        setLoading(true);
        const url = selectedTypeId 
            ? `http://talabat-nahla-api.runasp.net/api/Product?typeId=${selectedTypeId}` 
            : `http://talabat-nahla-api.runasp.net/api/Product`;

        axios.get(url)
            .then(res => {
                setProducts(res.data.data || res.data); 
                setLoading(false);
            })
            .catch(err => {
                console.error("Error Products:", err);
                setLoading(false);
            });
    }, [selectedTypeId]);

    return (
        <div className="flex min-h-screen bg-gray-50">
          
            <div className="w-64 bg-white shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2 flex items-center">
                    <span className="mr-2"></span> Categories
                </h2>
                <ul className="space-y-2">
                    <li 
                        onClick={() => setSelectedTypeId(null)}
                        className={`cursor-pointer p-3 rounded-lg font-medium transition-all ${!selectedTypeId ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-blue-50 text-gray-600'}`}
                    >
                        All Categories
                    </li>
                    {types.map((type) => (
                        <li 
                            key={type.id}
                            onClick={() => setSelectedTypeId(type.id)}
                            className={`cursor-pointer p-3 rounded-lg transition-all ${selectedTypeId === type.id ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-blue-50 text-gray-600'}`}
                        >
                            {type.name}
                        </li>
                    ))}
                </ul>
            </div>

       
            <div className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {selectedTypeId ? types.find(t => t.id === selectedTypeId)?.name : "Explore All"}
                        </h1>
                        <p className="text-gray-500 mt-1">Found {products.length} products in this category</p>
                    </div>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 group border border-gray-100 flex flex-col justify-between">
                                <div>
                                    <div className="h-44 mb-4 overflow-hidden rounded-xl bg-gray-50">
                                        <img 
                                            src={product.pictureUrl} 
                                            alt={product.name} 
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">{product.typeName}</span>
                                    <h3 className="font-bold text-gray-800 mt-1 mb-2 truncate">{product.name}</h3>
                                </div>
                                
                                <div className="flex justify-between items-center mt-4">
                                    <div>
                                        <span className="text-sm text-gray-400 block">Price</span>
                                        <span className="text-lg font-black text-gray-900">{product.price} <small className="text-xs">EGP</small></span>
                                    </div>
                                   
                                    <button 
                                        onClick={() => handleAdd(product)}
                                        className="bg-blue-600 text-white p-2 w-10 h-10 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-100 flex items-center justify-center font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && products.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-inner mt-10">
                        <span className="text-5xl">🔍</span>
                        <p className="text-gray-400 text-xl mt-4">No products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriesPage;