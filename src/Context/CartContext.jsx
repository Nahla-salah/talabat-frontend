import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [basket, setBasket] = useState(null);
  const baseUrl = "http://localhost:8050/Api/Basket";

  const displayCart = async () => {
  
    const storedBasketId = localStorage.getItem("basketId");

    if (!storedBasketId) {
      console.log("Cart is empty (No ID found)");
      setBasket(null);
      return;
    }

    try {
      const { data } = await axios.get(`${baseUrl}/${storedBasketId}`);
      setBasket(data);
    } catch (error) {
      if (error.response?.status === 404) {
        console.log("Basket not found on server, clearing local ID");
        localStorage.removeItem("basketId");
        setBasket(null);
      }
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    displayCart();
  }, []);

  const addToCart = async (product) => {
  
    let currentBasketId = localStorage.getItem("basketId");
    
    if (!currentBasketId) {
  
      currentBasketId = `Basket_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("basketId", currentBasketId);
    }

    let items = basket?.items ? [...basket.items] : [];
    const itemIndex = items.findIndex((i) => i.id === product.id);

    if (itemIndex === -1) {
      items.push({
        id: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
        pictureUrl: product.pictureUrl,
      });
    } else {
      items[itemIndex].quantity++;
    }

    try {
      const res = await axios.post(baseUrl, {
        id: currentBasketId, 
        items,
      });

      setBasket(res.data);
      toast.success("Product added to cart");
      return true;
    } catch (error) {
      toast.error("Failed to add product");
      return false;
    }
  };

  const updateQuantity = async (id, delta) => {
    const currentBasketId = localStorage.getItem("basketId");
    if (!basket || !currentBasketId) return;

    let items = [...basket.items];
    const itemIndex = items.findIndex((i) => i.id === id);

    if (itemIndex !== -1) {
      items[itemIndex].quantity += delta;

      if (items[itemIndex].quantity <= 0) {
        removeFromCart(id);
        return;
      }

      try {
        const res = await axios.post(baseUrl, {
          id: currentBasketId,
          items,
        });
        setBasket(res.data);
        toast.success("Quantity updated", { duration: 1000 });
      } catch (error) {
        toast.error("Failed to update quantity");
      }
    }
  };

  const removeFromCart = async (id) => {
    const currentBasketId = localStorage.getItem("basketId");
    if (!basket || !currentBasketId) return;

    const items = basket.items.filter((i) => i.id !== id);

    try {
      const res = await axios.post(baseUrl, {
        id: currentBasketId,
        items,
      });
      setBasket(res.data);
      toast.success("Product removed from cart");
    } catch (error) {
      toast.error("Failed to remove product");
    }
  };

  const clearCart = async () => {
    const currentBasketId = localStorage.getItem("basketId");
    if (!currentBasketId) return;

    try {
      await axios.delete(`${baseUrl}/${currentBasketId}`);
      setBasket(null);
      localStorage.removeItem("basketId");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  const totalPrice =
    basket?.items?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) || 0;

  return (
    <CartContext.Provider
      value={{
        basket,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        displayCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};