import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; 

const Checkout = () => {
  const { basket, totalPrice, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    street: "",
    deliveryMethodId: ""
  });

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitOrder = async (e) => {
    if (e) e.preventDefault();

    if (!basket || !basket.items || basket.items.length === 0) {
      toast.error("Your Basket Is Empty Now");
      return;
    }

    const token = localStorage.getItem("Token");
    if (!token) {
      toast.error("You Must Login First");
      return;
    }

    const orderData = {
      basketId: basket.id,
      shippingAddress: {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        country: shippingAddress.country,
        city: shippingAddress.city,
        street: shippingAddress.street
      },
      deliveryMethodId: Number(shippingAddress.deliveryMethodId) 
    };

    setLoading(true);

    try {
      const response = await axios.post(
        "http://talabat-nahla-api.runasp.net/Api/Order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );


      if (response.status === 200 || response.status === 201) {
        toast.success("تم تسجيل طلبك بنجاح 🎉");
        const newOrderId = response.data.id; 
        clearCart(); 
        
     
        navigate(`/orderdetails/${newOrderId}`);
      }
    } catch (error) {
      console.error("Order Error:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || "Order Failed!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!basket) return <div className="text-center py-20">Basket Download Now</div>;
  if (basket.items.length === 0) return <div className="text-center py-20">Your Basket Is Empty Now</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 border-b pb-4 text-green-600">Shipping Address</h2>

        <form onSubmit={handleSubmitOrder} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="firstName" placeholder="First Name" required onChange={handleInputChange} className="border rounded-md p-3 w-full focus:ring-2 focus:ring-green-500" />
            <input type="text" name="lastName" placeholder="Last Name" required onChange={handleInputChange} className="border rounded-md p-3 w-full focus:ring-2 focus:ring-green-500" />
          </div>

          <input type="text" name="country" placeholder="Country" required onChange={handleInputChange} className="border rounded-md p-3 w-full focus:ring-2 focus:ring-green-500" />
          <input type="text" name="city" placeholder="City" required onChange={handleInputChange} className="border rounded-md p-3 w-full focus:ring-2 focus:ring-green-500" />
          <input type="text" name="street" placeholder="Street" required onChange={handleInputChange} className="border rounded-md p-3 w-full focus:ring-2 focus:ring-green-500" />
          <input type="number" name="deliveryMethodId" placeholder="رقم طريقة التوصيل (مثلاً 1)" required onChange={handleInputChange} className="border rounded-md p-3 w-full focus:ring-2 focus:ring-green-500" />


          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
          >
            {loading ? "جاري المعالجة..." : `إتمام الطلب (${totalPrice} EGP)`}
          </button>
        </form>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 shadow-md h-fit">
        <h3 className="text-xl font-bold mb-4 border-b pb-2"> Order Summary</h3>
        <div className="space-y-2 text-gray-700">
          <p className="flex justify-between"><span> Number Of Items:</span> <span>{basket.items.length}</span></p>
          <hr className="my-2" />
          <p className="text-2xl font-bold text-black flex justify-between">
            <span>Total:</span> <span>{totalPrice} EGP</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;