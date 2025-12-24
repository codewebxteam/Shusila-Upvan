import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Milk,
  Sprout,
  Truck
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import DeliveryForm from '../pages/DeliveryForm';

const CartPage = () => {
  const {
    cartItems,
    cartCount,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
    getItemsByType
  } = useCart();

  // ✅ DEBUG: Add these console logs
  console.log("🛒 ALL CART ITEMS:", cartItems);
  console.log("📊 Cart count:", cartCount);

  const dairyItems = getItemsByType('dairy');
  const mushroomItems = getItemsByType('mushroom');

  console.log("🥛 DAIRY ITEMS:", dairyItems);
  console.log("🍄 MUSHROOM ITEMS:", mushroomItems);

  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setCheckoutData({
      product: {
        id: 'full_cart_order',
        name: 'Complete Cart Order',
        price: getCartTotal(),
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400',
        quantity: 1
      },
      quantity: 1,
      isFullCart: true,
      cartItems: cartItems
    });
    setShowDeliveryForm(true);
  };

  const handleOrderSubmit = (orderData) => {
    console.log('Order placed:', orderData);
    toast.success(`Order #${orderData.orderId} placed successfully!`);

    // Clear cart after successful order
    clearCart();
    setShowDeliveryForm(false);
  };
  
  // // ✅ Ab yeh function properly kaam karega
  // // Get items by type
  // const dairyItems = getItemsByType('dairy');
  // const mushroomItems = getItemsByType('mushroom');

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fdfbe9] to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">Add some delicious products to your cart!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/mushrooms"
              className="inline-flex items-center gap-2 bg-[#95e500] text-white font-bold py-3 px-6 rounded-full hover:bg-[#7bc400] transition-colors"
            >
              <Sprout size={20} />
              Browse Mushrooms
            </Link>
            <Link
              to="/diary/milkdiary"
              className="inline-flex items-center gap-2 bg-[#f3cc00] text-white font-bold py-3 px-6 rounded-full hover:bg-[#d9b400] transition-colors"
            >
              <Milk size={20} />
              Browse Dairy Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#fdfbe9] to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h1>
            <div className="flex gap-4">
              <span className="bg-[#95e500] text-white px-3 py-1 rounded-full text-sm font-bold">
                {mushroomItems.length} Mushrooms
              </span>
              <span className="bg-[#f3cc00] text-white px-3 py-1 rounded-full text-sm font-bold">
                {dairyItems.length} Dairy Items
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mushroom Products Section */}
              {mushroomItems.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sprout size={24} className="text-[#95e500]" />
                    <h2 className="text-xl font-bold text-gray-900">Mushroom Products</h2>
                    <span className="bg-[#95e500] text-white text-xs px-2 py-1 rounded-full">
                      {mushroomItems.length} items
                    </span>
                  </div>
                  <div className="space-y-4">
                    {mushroomItems.map((item) => (
                      <CartItemCard
                        key={item.id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={() => removeFromCart(item.id)}                        
                        type="mushroom"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Dairy Products Section */}
              {dairyItems.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Milk size={24} className="text-[#f3cc00]" />
                    <h2 className="text-xl font-bold text-gray-900">Dairy Products</h2>
                    <span className="bg-[#f3cc00] text-white text-xs px-2 py-1 rounded-full">
                      {dairyItems.length} items
                    </span>
                  </div>
                  <div className="space-y-4">
                    {dairyItems.map((item) => (
                      <CartItemCard
                        key={item.id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                      onRemove={() => removeFromCart(item.uniqueId || item.id)}                        
                      type="dairy"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-[#f3cc00]/20 sticky top-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                    <span className="font-bold">₹{getCartTotal().toFixed(2)}</span>
                  </div>

                  {mushroomItems.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Sprout size={14} /> Mushroom Products
                      </span>
                      <span className="font-bold">
                        ₹{mushroomItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                  )}

                  {dairyItems.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Milk size={14} /> Dairy Products
                      </span>
                      <span className="font-bold">
                        ₹{dairyItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18%)</span>
                    <span className="font-bold">₹{(getCartTotal() * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total Amount</span>
                      <span>₹{(getCartTotal() * 1.18).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-[#95e500] to-[#f3cc00] text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all mb-4 flex items-center justify-center gap-2"
                >
                  <Truck size={20} /> Proceed to Checkout (₹{(getCartTotal() * 1.18).toFixed(2)})
                </button>

                <button
                  onClick={clearCart}
                  className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors mb-4"
                >
                  Clear Entire Cart
                </button>

                <div className="flex gap-3">
                  <Link
                    to="/mushrooms"
                    className="flex-1 text-center bg-[#95e500] text-white py-2 rounded-lg hover:bg-[#7bc400] transition-colors text-sm font-medium"
                  >
                    <Sprout size={16} className="inline mr-1" />
                    Add More Mushrooms
                  </Link>
                  <Link
                    to="/diary/milkdiary"
                    className="flex-1 text-center bg-[#f3cc00] text-white py-2 rounded-lg hover:bg-[#d9b400] transition-colors text-sm font-medium"
                  >
                    <Milk size={16} className="inline mr-1" />
                    Add More Dairy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Form Modal for Cart Checkout */}
      {showDeliveryForm && checkoutData && (
        <DeliveryForm
          product={checkoutData.product}
          quantity={checkoutData.quantity}
          onClose={() => {
            setShowDeliveryForm(false);
            setCheckoutData(null);
          }}
          onSubmit={handleOrderSubmit}
          isFullCart={true}
          cartItems={cartItems}
        />
      )}
    </>
  );
};

// Cart Item Component
const CartItemCard = ({ item, onQuantityChange, onRemove, type }) => {
  const bgColor = type === 'mushroom' ? 'bg-[#95e500]/10' : 'bg-[#f3cc00]/10';
  const borderColor = type === 'mushroom' ? 'border-[#95e500]/20' : 'border-[#f3cc00]/20';

  return (
    <div className={`bg-white rounded-xl p-4 shadow-lg border ${borderColor}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${type === 'mushroom' ? 'bg-[#95e500] text-white' : 'bg-[#f3cc00] text-white'}`}>
                  {type === 'mushroom' ? 'MUSHROOM' : 'DAIRY'}
                </span>
                {item.category && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
              {item.description && (
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              )}
            </div>
            <button
              onClick={onRemove}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 rounded-full p-1 ${bgColor}`}>
                <button
                  onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-bold">{item.quantity}</span>
                <button
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-gray-500">×</span>
              <span className="text-xl font-bold text-gray-900">
                ₹{item.price.toFixed(2)}
              </span>
            </div>

            <div className="text-xl font-bold text-gray-900">
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;