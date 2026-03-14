import React from 'react';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { useContext } from 'react';
import { useParams } from 'react-router-dom'; // سحب المتغيرات من الرابط
import { AuthContext } from '../../Context/AuthContext'; 

const OrderDetails = () => {
  const { token } = useContext(AuthContext);
  
  // 1. التقاط الـ ID من الرابط أوتوماتيكياً
  const { id } = useParams(); 

  const getOrderById = async () => {
    // 2. استخدام الـ id المتغير بدلاً من الرقم الثابت
    const { data } = await axios.get(`http://localhost:8050/Api/Order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  };

  const { data: order, isLoading, isError } = useQuery({
    // 3. تحديث الـ queryKey ليشمل الـ id لضمان تحديث البيانات عند تغيير الأوردر
    queryKey: ["singleOrder", id], 
    queryFn: getOrderById,
    enabled: !!token && !!id, 
  });

  if (isLoading) return (
    <div className="py-20 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 mx-auto mb-4"></div>
      <p className="font-bold text-teal-600">جاري تحميل تفاصيل الطلب...</p>
    </div>
  );

  if (isError) return <div className="py-20 text-center text-red-500 font-bold">عفواً، لم نتمكن من العثور على هذا الطلب.</div>;

  return (
    <div className="container mx-auto px-4 py-10 text-right" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        
        {/* رأس البطاقة */}
        <div className="bg-teal-600 p-8 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">تفاصيل الفاتورة</h2>
            <p className="text-xs opacity-80 mt-1 font-mono">ID: {order?.id}</p>
          </div>
          <div className="text-left text-sm">
            <p className="opacity-70">تاريخ الطلب</p>
            <p className="font-bold">
               {order?.orderDate ? new Date(order.orderDate).toLocaleDateString('ar-EG') : 'تاريخ غير متاح'}
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* قائمة الأصناف */}
            <div>
              <h3 className="font-bold text-gray-800 mb-6 border-b-2 border-teal-500 pb-2 w-fit">الأصناف المطلوبة</h3>
              {order?.orderItems?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 mb-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <img 
                    src={`http://localhost:8050/${item.pictureUrl}`} 
                    className="w-16 h-16 rounded-xl object-cover bg-white" 
                    alt={item.productName} 
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{item.productName}</p>
                    <p className="text-sm text-teal-600 font-bold">{item.quantity} × {item.price} EGP</p>
                  </div>
                </div>
              ))}
            </div>

            {/* بيانات الشحن */}
            <div className="space-y-6">
              <div className="bg-teal-50 p-6 rounded-3xl border border-teal-100 shadow-inner">
                <h3 className="font-bold text-teal-900 mb-4 text-sm uppercase">بيانات التوصيل</h3>
                <div className="text-sm text-teal-800 space-y-2">
                  <p><strong>المستلم:</strong> {order?.shippingAddress?.firstName} {order?.shippingAddress?.lastName}</p>
                  <p><strong>العنوان:</strong> {order?.shippingAddress?.city}, {order?.shippingAddress?.street}</p>
                  <p><strong>الدولة:</strong> {order?.shippingAddress?.country}</p>
                  <p className="pt-2 border-t border-teal-100 font-bold">طريقة الشحن: {order?.deliveryMethod}</p>
                </div>
              </div>

              {/* الملخص المالي */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg space-y-3">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>المجموع الفرعي:</span>
                  <span>{order?.subTotal} EGP</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm border-b border-dashed pb-3">
                  <span>مصاريف التوصيل:</span>
                  <span>{order?.total - order?.subTotal} EGP</span>
                </div>
                <div className="flex justify-between text-2xl font-black text-teal-700 pt-2">
                  <span>الإجمالي النهائي:</span>
                  <span>{order?.total} EGP</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;