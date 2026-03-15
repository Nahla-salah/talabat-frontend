import React, { useEffect, useState, useContext } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { CartContext } from '../../Context/CartContext'

const BrandsPage = () => {
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedBrandId, setSelectedBrandId] = useState(null);
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
        axios.get('https://talabat-nahla-api.runasp.net/Api/Product/Brands')
            .then(res => setBrands(res.data))
            .catch(err => console.error("Error Brands:", err));
    }, []);

  
    useEffect(() => {
        setLoading(true);
        const url = selectedBrandId 
            ? `http://talabat-nahla-api.runasp.net/Api/Product?brandId=${selectedBrandId}` 
            : `http://talabat-nahla-api.runasp.net/Api/Product`;

        axios.get(url)
            .then(res => {
                setProducts(res.data.data || res.data); 
                setLoading(false);
            })
            .catch(err => {
                console.error("Error Products:", err);
                setLoading(false);
            });
    }, [selectedBrandId]);

    return (
        <div className="flex min-h-screen bg-gray-50">
        
            <div className="w-64 bg-white shadow-md p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Brands</h2>
                <ul className="space-y-2">
                    <li 
                        onClick={() => setSelectedBrandId(null)}
                        className={`cursor-pointer p-3 rounded-lg transition ${!selectedBrandId ? 'bg-orange-500 text-white' : 'hover:bg-orange-100 text-gray-600'}`}
                    >
                        All Products
                    </li>
                    {brands.map((brand) => (
                        <li 
                            key={brand.id}
                            onClick={() => setSelectedBrandId(brand.id)}
                            className={`cursor-pointer p-3 rounded-lg transition ${selectedBrandId === brand.id ? 'bg-orange-500 text-white' : 'hover:bg-orange-100 text-gray-600'}`}
                        >
                            {brand.name}
                        </li>
                    ))}
                </ul>
            </div>

          
            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {selectedBrandId ? `Products - ${brands.find(b => b.id === selectedBrandId)?.name}` : "All Products"}
                    </h1>
                    <span className="text-gray-500">{products.length} Items Found</span>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 border border-gray-100">
                                <div className="h-48 mb-4 overflow-hidden rounded-lg">
                                    <img 
                                        src={product.pictureUrl} 
                                        alt={product.name} 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
                                <p className="text-sm text-gray-500 mb-3">{product.brandName}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-orange-600 font-bold">{product.price} EGP</span>
                                    <button onClick={() => handleAdd(product)} className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm hover:bg-orange-600 transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandsPage;