import React from 'react';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext'; 

const Orders = () => {
  const { token } = useContext(AuthContext);


  const getAllOrders = async () => {
    const { data } = await axios.get(`http://talabat-nahla-api.runasp.net/Api/Order`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  };

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getAllOrders,
    enabled: !!token,
  });


  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-teal-600 font-bold">جاري تحميل طلباتك...</p>
      </div>
    );
  }


  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center" dir="rtl">
        <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">لا توجد طلبات بعد!</h2>
          <p className="text-gray-500 mb-8">
            يبدو أنكِ لم تقومي بإجراء أي عمليات شراء حتى الآن. ابدأي بالتسوق وستظهر طلباتكِ هنا.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-teal-600 text-white px-10 py-3 rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100"
          >
            ابدأ التسوق الآن
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-10 text-right" dir="rtl">
      <h2 className="text-2xl font-bold mb-8 text-teal-900 border-r-4 border-teal-600 pr-4">سجل طلباتي</h2>
      
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition hover:shadow-md">
            <div>
              <p className="text-xs text-gray-400 font-mono">رقم الطلب: #{order.id.slice(0, 8)}</p>
              <p className="text-lg font-bold text-gray-800 mt-1">{order.total} EGP</p>
              <p className="text-xs text-gray-500">{new Date(order.orderDate).toLocaleDateString('ar-EG')}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="bg-teal-50 text-teal-700 px-4 py-1 rounded-full text-xs font-bold">
                {order.deliveryMethod}
              </span>
       
<Link 
  to={`/orderdetails/${order.id}`} 
  className="bg-teal-900 text-white px-6 py-2 rounded-xl text-sm font-bold"
>
  تفاصيل الطلب
</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;