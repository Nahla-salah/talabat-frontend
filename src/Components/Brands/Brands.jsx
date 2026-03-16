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

    const handleAdd = async (product) => {
        const success = await addToCart(product);
        if (success) { console.log("Product Added Successfully"); }
    };

    useEffect(() => {
        axios.get('/Api/Product/Brands')
            .then(res => setBrands(res.data))
            .catch(err => console.error("Error Brands:", err));
    }, []);

    useEffect(() => {
        setLoading(true);
        const url = selectedBrandId 
            ? `/Api/Product?brandId=${selectedBrandId}` 
            : `/Api/Product`;

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
        // 1. تعديل الحاوية الأساسية لتكون flex-col في الموبايل و flex-row في الشاشات الكبيرة
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        
            {/* 2. تعديل الـ Sidebar ليكون عرض كامل في الموبايل وشريط أفقي */}
            <div className="w-full md:w-64 bg-white shadow-md p-4 md:p-6 sticky top-16 z-40">
                <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-gray-800 border-b pb-2">Brands</h2>
                
                {/* 3. القائمة تصبح flex مع التمرير الأفقي في الموبايل */}
                <ul className="flex md:flex-col overflow-x-auto md:overflow-y-auto gap-2 pb-2 md:pb-0 no-scrollbar">
                    <li 
                        onClick={() => setSelectedBrandId(null)}
                        className={`cursor-pointer p-2 md:p-3 rounded-lg transition whitespace-nowrap text-sm md:text-base ${!selectedBrandId ? 'bg-orange-500 text-white' : 'hover:bg-orange-100 text-gray-600 bg-gray-50 md:bg-transparent'}`}
                    >
                        All Products
                    </li>
                    {brands.map((brand) => (
                        <li 
                            key={brand.id}
                            onClick={() => setSelectedBrandId(brand.id)}
                            className={`cursor-pointer p-2 md:p-3 rounded-lg transition whitespace-nowrap text-sm md:text-base ${selectedBrandId === brand.id ? 'bg-orange-500 text-white' : 'hover:bg-orange-100 text-gray-600 bg-gray-50 md:bg-transparent'}`}
                        >
                            {brand.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* محتوى المنتجات */}
            <div className="flex-1 p-4 md:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {selectedBrandId ? `Products - ${brands.find(b => b.id === selectedBrandId)?.name}` : "All Products"}
                    </h1>
                    <span className="text-sm text-gray-500">{products.length} Items Found</span>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 border border-gray-100 flex flex-col justify-between">
                                <div>
                                    <div className="h-40 md:h-48 mb-4 overflow-hidden rounded-lg">
                                        <img 
                                            src={product.pictureUrl} 
                                            alt={product.name} 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 mb-1 truncate text-sm md:text-base">{product.name}</h3>
                                    <p className="text-xs text-gray-500 mb-3">{product.brandName}</p>
                                </div>
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="text-orange-600 font-bold text-sm md:text-base">{product.price} EGP</span>
                                    <button onClick={() => handleAdd(product)} className="bg-orange-500 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-md text-xs md:text-sm hover:bg-orange-600 transition-colors">
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