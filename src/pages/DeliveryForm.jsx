// src/components/DeliveryForm.jsx
import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  Package, 
  Calendar, 
  CreditCard,
  Wallet,
  Banknote,
  Smartphone,
  Globe,
  CheckCircle,
  Shield,
  Eye,
  EyeOff,
  Copy
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const DeliveryForm = ({ 
  product, 
  quantity, 
  onClose, 
  onSubmit, 
  isFullCart = false, 
  cartItems = [] 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    deliveryInstructions: '',
    deliveryDate: '',
    deliveryTime: '9 AM - 12 PM',
    paymentMethod: '',
    
    // Card details
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: '',
    
    // UPI details
    upiId: '',
    
    // Net banking
    bankName: '',
    accountNumber: '',
    
    // Wallet
    walletType: ''
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Personal, 2: Address, 3: Payment
  const [showCardCVV, setShowCardCVV] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showUPIDetails, setShowUPIDetails] = useState(false);
  const [showNetBanking, setShowNetBanking] = useState(false);
  const [showWalletDetails, setShowWalletDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const deliveryTimeSlots = [
    '6 AM - 9 AM',
    '9 AM - 12 PM', 
    '12 PM - 3 PM',
    '3 PM - 6 PM',
    '6 PM - 9 PM'
  ];

  const paymentMethods = [
    { 
      id: 'cash_on_delivery', 
      label: 'Cash on Delivery', 
      icon: <Banknote size={24} className="text-green-600" />, 
      description: 'Pay when item arrives',
      color: 'border-green-200 bg-green-50 hover:bg-green-100',
      activeColor: 'border-green-500 bg-green-100',
      dummyData: {
        showForm: false,
        message: 'No additional details needed. Pay cash when product is delivered.'
      }
    },
    { 
      id: 'upi', 
      label: 'UPI / QR Code', 
      icon: <Smartphone size={24} className="text-purple-600" />, 
      description: 'Pay using UPI apps like GPay, PhonePe',
      color: 'border-purple-200 bg-purple-50 hover:bg-purple-100',
      activeColor: 'border-purple-500 bg-purple-100',
      dummyData: {
        upiId: 'customer.test@oksbi',
        showForm: true,
        message: 'Scan QR code or enter UPI ID'
      }
    },
    { 
      id: 'debit_card', 
      label: 'Debit Card', 
      icon: <CreditCard size={24} className="text-blue-600" />, 
      description: 'Visa, MasterCard, RuPay debit cards',
      color: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
      activeColor: 'border-blue-500 bg-blue-100',
      dummyData: {
        cardNumber: '4111 1111 1111 1111',
        cardName: 'John Customer',
        cardExpiry: '12/28',
        cardCVV: '123',
        showForm: true,
        message: 'Enter your card details'
      }
    },
    { 
      id: 'credit_card', 
      label: 'Credit Card', 
      icon: <CreditCard size={24} className="text-orange-600" />, 
      description: 'All major credit cards accepted',
      color: 'border-orange-200 bg-orange-50 hover:bg-orange-100',
      activeColor: 'border-orange-500 bg-orange-100',
      dummyData: {
        cardNumber: '5555 5555 5555 4444',
        cardName: 'John Customer',
        cardExpiry: '09/27',
        cardCVV: '456',
        showForm: true,
        message: 'Enter your credit card details'
      }
    },
    { 
      id: 'net_banking', 
      label: 'Net Banking', 
      icon: <Globe size={24} className="text-red-600" />, 
      description: 'Direct bank transfer',
      color: 'border-red-200 bg-red-50 hover:bg-red-100',
      activeColor: 'border-red-500 bg-red-100',
      dummyData: {
        bankName: 'State Bank of India',
        accountNumber: '123456789012',
        showForm: true,
        message: 'Select your bank and enter details'
      }
    },
    { 
      id: 'wallet', 
      label: 'Digital Wallet', 
      icon: <Wallet size={24} className="text-yellow-600" />, 
      description: 'Paytm, Amazon Pay, Mobikwik',
      color: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100',
      activeColor: 'border-yellow-500 bg-yellow-100',
      dummyData: {
        walletType: 'Paytm',
        showForm: true,
        message: 'Select your digital wallet'
      }
    }
  ];

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India',
    'IndusInd Bank'
  ];

  const wallets = [
    'Paytm',
    'Amazon Pay',
    'Mobikwik',
    'PhonePe Wallet',
    'FreeCharge',
    'JioMoney'
  ];

  // Helper function for full cart total
  const getCartTotalFromItems = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Auto-fill dummy details when payment method is selected
  const handlePaymentMethodSelect = (methodId) => {
    const method = paymentMethods.find(m => m.id === methodId);
    if (!method) return;

    setFormData(prev => ({
      ...prev,
      paymentMethod: methodId
    }));

    // Auto-fill dummy data for the selected payment method
    if (method.dummyData.showForm) {
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          ...method.dummyData
        }));
      }, 300);
    }

    // Show/hide specific forms
    setShowCardDetails(methodId === 'debit_card' || methodId === 'credit_card');
    setShowUPIDetails(methodId === 'upi');
    setShowNetBanking(methodId === 'net_banking');
    setShowWalletDetails(methodId === 'wallet');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.name || !formData.mobile) {
        toast.error('Please fill name and mobile number');
        return;
      }
      if (formData.mobile.length !== 10) {
        toast.error('Please enter a valid 10-digit mobile number');
        return;
      }
      // Auto-fill dummy address for testing
      setFormData(prev => ({
        ...prev,
        address: '123, Green Valley Apartments',
        street: 'MG Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        landmark: 'Near City Mall',
        deliveryInstructions: 'Please call before delivery'
      }));
    } else if (step === 2) {
      if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
        toast.error('Please fill all address fields');
        return;
      }
      if (formData.pincode.length !== 6) {
        toast.error('Please enter a valid 6-digit pincode');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // Function to copy dummy details
  const copyDummyDetails = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  // Function to test payment (simulated)
  const testPayment = () => {
    if (!formData.paymentMethod) {
      toast.error('Please select a payment method first');
      return;
    }

    setIsProcessing(true);
    setCountdown(5);
    
    // Simulate payment processing
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsProcessing(false);
          
          // Show success message based on payment method
          const method = paymentMethods.find(m => m.id === formData.paymentMethod);
          toast.success(`✅ ${method?.label} payment successful!`);
          toast.success('Processing order...');
          
          // Auto-submit after successful payment
          setTimeout(() => handleSubmit(), 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // For demo, skip validation for empty payment details
    if (!formData.paymentMethod && step === 3) {
      toast.error('Please select a payment method');
      return;
    }

    setLoading(true);

    // Calculate total amount
    const totalAmount = isFullCart 
      ? getCartTotalFromItems(cartItems)
      : (product.price * quantity).toFixed(2);
    
    // Prepare order data
    const orderData = {
      product: isFullCart ? null : product,
      cartItems: isFullCart ? cartItems : null,
      delivery: formData,
      totalAmount: totalAmount,
      orderDate: new Date().toISOString(),
      orderId: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === 'cash_on_delivery' ? 'Pending' : 'Paid'
    };

    // Simulate API call
    setTimeout(() => {
      toast.success('🎉 Order placed successfully!');
      toast.success(`Your order ID: ${orderData.orderId}`, {
        duration: 5000,
        icon: '📦'
      });
      toast.success('You will receive confirmation SMS shortly.', {
        duration: 5000,
        icon: '📱'
      });
      onSubmit(orderData);
      setLoading(false);
      onClose();
    }, 2000);
  };

  // Auto-advance to payment step if user is testing
  useEffect(() => {
    if (step === 3 && !formData.paymentMethod) {
      // Auto-select first payment method for demo
      setTimeout(() => {
        handlePaymentMethodSelect('cash_on_delivery');
      }, 500);
    }
  }, [step]);

  // Calculate amounts
  const totalAmount = isFullCart 
    ? getCartTotalFromItems(cartItems)
    : (product.price * quantity).toFixed(2);
  
  const tax = (parseFloat(totalAmount) * 0.18).toFixed(2);
  const finalAmount = (parseFloat(totalAmount) * 1.18).toFixed(2);

  // Format card number for display
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };

  // Get current payment method details
  const currentPaymentMethod = paymentMethods.find(m => m.id === formData.paymentMethod);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Package size={28} className="text-yellow-600" />
              Complete Your Order
              {step === 3 && <span className="ml-4 text-sm font-normal bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">💳 Test Payment Mode Active</span>}
            </h2>
            <p className="text-gray-600 mt-1">
              {isFullCart ? 'Complete Cart Checkout' : `Buy Now: ${product.name}`}
              {step === 3 && ' - Try different payment methods!'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={loading || isProcessing}
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
          {/* Left Column - Order Summary & Steps */}
          <div className="lg:col-span-1 bg-gradient-to-b from-yellow-50 to-amber-50 p-6">
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={20} className="text-yellow-600" /> Order Summary
              </h3>
              
              <div className="space-y-4">
                {isFullCart ? (
                  // Full cart summary
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-yellow-100">
                    <h4 className="font-bold text-gray-900 mb-3">Cart Items ({cartItems.length})</h4>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 rounded overflow-hidden border">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>Qty: {item.quantity}</span>
                              <span className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Single product summary
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-yellow-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-sm">{product.name}</h4>
                      <p className="text-xs text-gray-600">Quantity: {quantity}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-yellow-600 font-bold text-sm">₹{product.price.toFixed(2)} each</span>
                        <span className="text-gray-900 font-bold">₹{totalAmount}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3 bg-white p-4 rounded-xl shadow-sm border border-yellow-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (18%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="border-t pt-3 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="text-green-700">₹{finalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4">
              <div className={`flex items-center gap-3 p-4 rounded-xl ${step >= 1 ? 'bg-white shadow-sm border border-yellow-100' : 'bg-gray-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > 1 ? <CheckCircle size={20} /> : '1'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">Personal Details</p>
                  <p className="text-sm text-gray-500">Name & contact info</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-3 p-4 rounded-xl ${step >= 2 ? 'bg-white shadow-sm border border-yellow-100' : 'bg-gray-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > 2 ? <CheckCircle size={20} /> : '2'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">Delivery Address</p>
                  <p className="text-sm text-gray-500">Where to deliver</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-3 p-4 rounded-xl ${step >= 3 ? 'bg-white shadow-sm border border-yellow-100' : 'bg-gray-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900">Payment</p>
                  <p className="text-sm text-gray-500">Test different methods</p>
                </div>
              </div>
            </div>

            {/* Payment Testing Info */}
            {step === 3 && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  💡 Testing Instructions
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Click on any payment method to test</li>
                  <li>• Dummy details auto-filled</li>
                  <li>• Click "Test Payment" to simulate</li>
                  <li>• Try all 6 payment options!</li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <User size={24} className="text-yellow-600" /> Personal Information
                    </h3>
                    <p className="text-gray-600 mb-6">Tell us how we can contact you</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                        placeholder="10-digit mobile number"
                        maxLength="10"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Address Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <MapPin size={24} className="text-yellow-600" /> Delivery Address
                    </h3>
                    <p className="text-gray-600 mb-6">Where should we deliver your order?</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Complete Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition resize-none"
                        placeholder="House no., Building, Area, Colony"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street/Locality
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                          placeholder="Street name, locality"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                          placeholder="Nearby landmark"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                          placeholder="Your city"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                          placeholder="Your state"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                          placeholder="6-digit pincode"
                          maxLength="6"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar size={18} className="inline mr-2 text-yellow-600" />
                          Preferred Delivery Date
                        </label>
                        <input
                          type="date"
                          name="deliveryDate"
                          value={formData.deliveryDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Time Slot
                        </label>
                        <select
                          name="deliveryTime"
                          value={formData.deliveryTime}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                        >
                          {deliveryTimeSlots.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Instructions (Optional)
                      </label>
                      <textarea
                        name="deliveryInstructions"
                        value={formData.deliveryInstructions}
                        onChange={handleChange}
                        rows="2"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition resize-none"
                        placeholder="e.g., Leave at gate, Call before delivery, etc."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Method */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <CreditCard size={24} className="text-yellow-600" /> Payment Method
                      <span className="ml-auto text-sm font-normal bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        🎯 Click to Test Different Methods
                      </span>
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {currentPaymentMethod?.dummyData?.message || 'Select a payment method to test'}
                    </p>
                  </div>

                  {/* Payment Methods Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {paymentMethods.map((method) => (
                      <div key={method.id}>
                        <button
                          type="button"
                          onClick={() => handlePaymentMethodSelect(method.id)}
                          className={`w-full block p-4 border-2 rounded-xl cursor-pointer transition-all text-left h-full ${formData.paymentMethod === method.id
                              ? method.activeColor + ' shadow-lg transform scale-[1.02]'
                              : method.color + ' hover:shadow-md hover:scale-[1.01]'
                            }`}
                        >
                          <div className="flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-3">
                              {method.icon}
                              <div className="flex-1">
                                <div className="font-bold text-gray-900">{method.label}</div>
                              </div>
                              {formData.paymentMethod === method.id && (
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
                                  <CheckCircle size={14} className="text-white" />
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 mt-2">{method.description}</div>
                            {formData.paymentMethod === method.id && method.dummyData.showForm && (
                              <div className="mt-3 pt-3 border-t border-dashed">
                                <span className="text-xs text-green-600 font-medium">✅ Dummy details loaded</span>
                              </div>
                            )}
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Selected Payment Method Details */}
                  {formData.paymentMethod && currentPaymentMethod?.dummyData?.showForm && (
                    <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border-2 border-dashed border-blue-300 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                          {currentPaymentMethod.icon}
                          {currentPaymentMethod.label} Details
                          <span className="text-sm font-normal bg-yellow-100 text-yellow-800 px-2 py-1 rounded ml-2">
                            🧪 Test Data
                          </span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => copyDummyDetails(JSON.stringify(currentPaymentMethod.dummyData, null, 2), 'Payment details')}
                          className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-200"
                        >
                          <Copy size={14} /> Copy All
                        </button>
                      </div>

                      {/* Card Details */}
                      {showCardDetails && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
                                Card Number *
                                <button
                                  type="button"
                                  onClick={() => copyDummyDetails(formData.cardNumber, 'Card number')}
                                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                  <Copy size={12} /> Copy
                                </button>
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="cardNumber"
                                  value={formatCardNumber(formData.cardNumber)}
                                  onChange={handleChange}
                                  maxLength="19"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition bg-white"
                                  placeholder="1234 5678 9012 3456"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card *</label>
                              <input
                                type="text"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition bg-white"
                                placeholder="John Customer"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                                <input
                                  type="text"
                                  name="cardExpiry"
                                  value={formatExpiryDate(formData.cardExpiry)}
                                  onChange={handleChange}
                                  maxLength="5"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition bg-white"
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
                                  CVV *
                                  <button
                                    type="button"
                                    onClick={() => setShowCardCVV(!showCardCVV)}
                                    className="text-xs text-gray-600 hover:text-gray-800"
                                  >
                                    {showCardCVV ? <EyeOff size={12} /> : <Eye size={12} />}
                                  </button>
                                </label>
                                <input
                                  type={showCardCVV ? "text" : "password"}
                                  name="cardCVV"
                                  value={formData.cardCVV}
                                  onChange={handleChange}
                                  maxLength="4"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition bg-white"
                                  placeholder="123"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* UPI Details */}
                      {showUPIDetails && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
                              UPI ID *
                              <button
                                type="button"
                                onClick={() => copyDummyDetails(formData.upiId, 'UPI ID')}
                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <Copy size={12} /> Copy
                              </button>
                            </label>
                            <input
                              type="text"
                              name="upiId"
                              value={formData.upiId}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition bg-white"
                              placeholder="name@upi"
                            />
                            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                              <p className="text-sm text-purple-800 font-medium mb-2">📱 Test UPI Apps:</p>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI', 'Amazon Pay', 'WhatsApp Pay'].map(app => (
                                  <div key={app} className="text-center p-2 bg-white rounded border">
                                    <span className="text-xs">{app}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Net Banking Details */}
                      {showNetBanking && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank *</label>
                              <select
                                name="bankName"
                                value={formData.bankName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition bg-white"
                              >
                                <option value="">Select your bank</option>
                                {banks.map((bank) => (
                                  <option key={bank} value={bank}>{bank}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number *</label>
                              <input
                                type="text"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition bg-white"
                                placeholder="Enter account number"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Wallet Details */}
                      {showWalletDetails && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Wallet *</label>
                            <select
                              name="walletType"
                              value={formData.walletType}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition bg-white"
                            >
                              <option value="">Select wallet</option>
                              {wallets.map((wallet) => (
                                <option key={wallet} value={wallet}>{wallet}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Test Payment Button */}
                      <div className="pt-4 border-t">
                        <button
                          type="button"
                          onClick={testPayment}
                          disabled={isProcessing}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg shadow-lg"
                        >
                          {isProcessing ? (
                            <>
                              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Processing Payment... ({countdown}s)
                            </>
                          ) : (
                            <>
                              <CreditCard size={24} />
                              Test {currentPaymentMethod?.label} Payment
                            </>
                          )}
                        </button>
                        <p className="text-center text-sm text-gray-500 mt-2">
                          {isProcessing ? 'Simulating payment processing...' : 'Click to simulate a test payment'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* COD Message */}
                  {formData.paymentMethod === 'cash_on_delivery' && (
                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-dashed border-green-300">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Banknote size={24} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Cash on Delivery Selected</h4>
                          <p className="text-gray-600 mt-1">
                            You'll pay ₹{finalAmount} in cash when the product is delivered.
                            No payment information required now.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">🔒 Secure Test Environment</p>
                        <p className="text-sm text-blue-700 mt-1">
                          This is a demo payment system. No real transactions occur. All data is test data.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary Preview */}
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4">Final Order Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Items Total</span>
                        <span className="font-medium">₹{totalAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery to</span>
                        <span className="font-medium text-right">
                          {formData.city}, {formData.state} - {formData.pincode}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Time</span>
                        <span className="font-medium">{formData.deliveryTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method</span>
                        <span className="font-medium">
                          {currentPaymentMethod?.label || 'Not selected'}
                        </span>
                      </div>
                      <div className="border-t pt-3 mt-2">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total Payable</span>
                          <span className="text-green-700">₹{finalAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={loading || isProcessing}
                  >
                    ← Back
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading || isProcessing}
                >
                  Cancel
                </button>
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || isProcessing || !formData.paymentMethod}
                    className="flex-1 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading || isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {isProcessing ? 'Processing...' : 'Placing Order...'}
                      </>
                    ) : (
                      <>
                        <CheckCircle size={20} />
                        Place Order (₹{finalAmount})
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-blue-50 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Shield size={16} className="text-green-600" />
              Your payment is secure and encrypted. We don't share your details.
            </p>
            {step === 3 && (
              <div className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                🎮 Demo Mode: Try all 6 payment methods!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;