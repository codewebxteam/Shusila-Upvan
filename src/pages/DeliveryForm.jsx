import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, User, Package, Calendar, CreditCard, Wallet, Banknote, Smartphone, Globe, CheckCircle, Shield, Eye, EyeOff, Copy, Navigation, Locate, Loader, Search, Check, Home } from 'lucide-react';
import { toast } from 'react-hot-toast';

const LOCATIONIQ_API_KEY = 'pk.bfa3faa76274d73841e6a1d6d06f9393';

/* ---------- 1.  REAL GPS → API  (primary) ---------- */
const fetchRealAddress = async (lat, lon) => {
  /* 1-A  LocationIQ first  */
  const url = `https://us1.locationiq.com/v1/reverse.php?key=${LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('LI');
    const d = await r.json();
    /* 1-B  YOUR HARD-CODED OVERRIDE  */
    if (lat > 23.1 && lat < 23.35 && lon > 77.25 && lon < 77.5) {   // Bhopal vicinity
      d.display_name = '218, Sidhartha Nagar, Narela Shankari, Hazrat Nizamuddin Colony, Bhopal, Madhya Pradesh, 462023, India';
      d.address = {
        house_number: '218',
        road: 'Sidhartha Nagar',
        neighbourhood: 'Narela Shankari',
        suburb: 'Hazrat Nizamuddin Colony',
        city: 'Bhopal',
        state: 'Madhya Pradesh',
        postcode: '462023',
        country: 'India'
      };
    }
    return { success: true, data: d };
  } catch {
    /* 1-C  Fallback to OpenStreetMap  */
    const osm = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;
    try {
      const r2 = await fetch(osm, { headers: { 'User-Agent': 'DairyApp' } });
      const d2 = await r2.json();
      /* same override for OSM reply */
      if (lat > 23.1 && lat < 23.35 && lon > 77.25 && lon < 77.5) {
        d2.display_name = '218, Sidhartha Nagar, Narela Shankari, Hazrat Nizamuddin Colony, Bhopal, Madhya Pradesh, 462023, India';
        d2.address = {
          house_number: '218',
          road: 'Sidhartha Nagar',
          neighbourhood: 'Narela Shankari',
          suburb: 'Hazrat Nizamuddin Colony',
          city: 'Bhopal',
          state: 'Madhya Pradesh',
          postcode: '462023',
          country: 'India'
        };
      }
      return { success: true, data: d2 };
    } catch { return { success: false }; }
  }
};

/* ---------- 2.  TEXT SEARCH  ---------- */
const searchRealAddresses = async (q) => {
  if (q.length < 3) return [];
  const liq = `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=5&countrycodes=in`;
  try {
    const r = await fetch(liq); const d = await r.json(); if (Array.isArray(d)) return d.map(p => ({ id: p.place_id, address: p.display_name, city: p.address?.city || p.address?.town, state: p.address?.state, pincode: p.address?.postcode, landmark: p.address?.amenity, lat: p.lat, lon: p.lon }));
  } catch {}
  const osm = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&addressdetails=1&limit=5&countrycodes=in`;
  try { const r2 = await fetch(osm, { headers: { 'User-Agent': 'DairyApp' } }); const d2 = await r2.json(); if (Array.isArray(d2)) return d2.map(p => ({ id: p.place_id, address: p.display_name, city: p.address?.city || p.address?.town, state: p.address?.state, pincode: p.address?.postcode, landmark: p.address?.amenity, lat: p.lat, lon: p.lon })); } catch { return []; }
};

const DeliveryForm = ({ product, quantity, onClose, onSubmit, isFullCart = false, cartItems = [] }) => {
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', address: '', street: '', city: '', state: '', pincode: '', landmark: '', deliveryInstructions: '', deliveryDate: '', deliveryTime: '9 AM - 12 PM', paymentMethod: '', cardNumber: '', cardName: '', cardExpiry: '', cardCVV: '', upiId: '', bankName: '', accountNumber: '', walletType: '' });
  const [loading, setLoading] = useState(false); const [step, setStep] = useState(1); const [showCardCVV, setShowCardCVV] = useState(false); const [showCardDetails, setShowCardDetails] = useState(false); const [showUPIDetails, setShowUPIDetails] = useState(false); const [showNetBanking, setShowNetBanking] = useState(false); const [showWalletDetails, setShowWalletDetails] = useState(false); const [isProcessing, setIsProcessing] = useState(false); const [countdown, setCountdown] = useState(0); const [loadingLocation, setLoadingLocation] = useState(false); const [addressSuggestions, setAddressSuggestions] = useState([]); const [showSuggestions, setShowSuggestions] = useState(false); const [gpsStatus, setGpsStatus] = useState('idle'); const [selectedMethod, setSelectedMethod] = useState(''); const [realAddressData, setRealAddressData] = useState(null);
  const suggestionRef = useRef(null); const searchInputRef = useRef(null);

  const extractStreet = (full) => { if (!full) return ''; const parts = full.split(', '); return parts[1] || parts[0]; };

  const getCurrentLocation = async () => { setSelectedMethod('gps'); setGpsStatus('getting_coords'); setLoadingLocation(true); setRealAddressData(null); toast('📍 Getting your real location...', { duration: 3000 }); if (!navigator.geolocation) { toast.error('Browser does not support GPS'); useDemoLocation(); return; } const t = setTimeout(() => { toast('⏳ GPS taking too long. Using demo address.'); useDemoLocation(); }, 8000); navigator.geolocation.getCurrentPosition(async (pos) => { clearTimeout(t); try { const { latitude: lat, longitude: lon } = pos.coords; setGpsStatus('api_call'); toast('🔄 Fetching address from API...', { duration: 2000 }); const res = await fetchRealAddress(lat, lon); if (res.success) { setGpsStatus('success'); setRealAddressData(res.data); const addr = res.data.display_name || ''; setFormData(p => ({ ...p, address: addr, street: extractStreet(addr), city: res.data.address?.city || res.data.address?.town || res.data.address?.village || '', state: res.data.address?.state || '', pincode: res.data.address?.postcode || '', landmark: res.data.address?.amenity || 'Real GPS Location' })); toast.success(<div className="flex items-center gap-2"><CheckCircle size={20} className="text-green-500" /><div><div className="font-medium">Real address found!</div><div className="text-sm opacity-90">{res.data.address?.city || res.data.address?.town}, {res.data.address?.state}</div></div></div>, { duration: 5000 }); } else { setGpsStatus('error'); toast.error('Could not fetch address. Using demo.'); useDemoLocation(); } } catch { setGpsStatus('error'); toast.error('Error processing location. Using demo.'); useDemoLocation(); } finally { setLoadingLocation(false); } }, (e) => { clearTimeout(t); setLoadingLocation(false); setGpsStatus('error'); const msg = e.code === 1 ? 'Permission denied' : e.code === 2 ? 'GPS unavailable' : e.code === 3 ? 'GPS timeout' : 'Could not get location'; toast.error('📍 ' + msg); setTimeout(() => { toast('🔄 Switching to demo address...'); useDemoLocation(); }, 2000); }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }); };

  const useDemoLocation = () => { setSelectedMethod('demo'); const demos = [{ address: '218, Sidhartha Nagar, Narela Shankari, Hazrat Nizamuddin Colony, Bhopal, Madhya Pradesh, 462023', street: 'Hazrat Nizamuddin Colony', city: 'Bhopal', state: 'Madhya Pradesh', pincode: '462023', landmark: 'T-Point' }, { address: '456, Skyline Tower, Andheri West, Mumbai, Maharashtra 400053', street: 'Andheri West', city: 'Mumbai', state: 'Maharashtra', pincode: '400053', landmark: 'Opposite Metro' }]; const d = demos[Math.floor(Math.random() * demos.length)]; setFormData(p => ({ ...p, ...d })); toast.success('🏠 Demo address loaded'); };

  const autoFillFromPincode = async (pin) => { if (pin.length !== 6) return; try { const r = await fetch(`https://api.postalpincode.in/pincode/${pin}`); const d = await r.json(); if (d[0]?.Status === 'Success' && d[0]?.PostOffice?.[0]) { const po = d[0].PostOffice[0]; setFormData(p => ({ ...p, city: po.District || po.Name, state: po.State })); toast.success(`📮 ${po.District}, ${po.State}`); } } catch { const map = { '400001': { city: 'Mumbai', state: 'Maharashtra' }, '110001': { city: 'New Delhi', state: 'Delhi' } }; if (map[pin]) setFormData(p => ({ ...p, ...map[pin] })); } };

  const handleChange = (e) => { const { name, value } = e.target; setFormData(p => ({ ...p, [name]: value })); if (name === 'address') { const street = extractStreet(value); setFormData(p => ({ ...p, street })); searchRealAddresses(value).then(s => { setAddressSuggestions(s); setShowSuggestions(s.length > 0); }); } if (name === 'pincode' && value.length === 6) autoFillFromPincode(value); };

  const selectAddressSuggestion = (a) => { setShowSuggestions(false); setSelectedMethod('search'); const street = extractStreet(a.address); setFormData(p => ({ ...p, address: a.address, street, city: a.city || '', state: a.state || '', pincode: a.pincode || '', landmark: a.landmark || '' })); toast.success(`📍 ${a.city || 'Location'} selected`); };

  const handleNextStep = () => { if (step === 1) { if (!formData.name || !formData.mobile) return toast.error('Name and mobile required'); if (formData.mobile.length !== 10) return toast.error('10-digit mobile required'); } if (step === 2) { if (!formData.address || !formData.city || !formData.state || !formData.pincode) return toast.error('All address fields required'); if (formData.pincode.length !== 6) return toast.error('6-digit pincode required'); } setStep(s => s + 1); };

  const handlePrevStep = () => setStep(s => s - 1);

  const paymentMethods = [
    { id: 'cash_on_delivery', label: 'Cash on Delivery', icon: <Banknote size={24} className="text-green-600" />, color: 'border-green-200 bg-green-50', activeColor: 'border-green-500 bg-green-100', dummyData: { showForm: false } },
    { id: 'upi', label: 'UPI / QR Code', icon: <Smartphone size={24} className="text-purple-600" />, color: 'border-purple-200 bg-purple-50', activeColor: 'border-purple-500 bg-purple-100', dummyData: { upiId: 'customer.test@oksbi', showForm: true } },
    { id: 'debit_card', label: 'Debit Card', icon: <CreditCard size={24} className="text-blue-600" />, color: 'border-blue-200 bg-blue-50', activeColor: 'border-blue-500 bg-blue-100', dummyData: { cardNumber: '4111 1111 1111 1111', cardName: 'John Customer', showForm: true } },
    { id: 'credit_card', label: 'Credit Card', icon: <CreditCard size={24} className="text-orange-600" />, color: 'border-orange-200 bg-orange-50', activeColor: 'border-orange-500 bg-orange-100', dummyData: { cardNumber: '5555 5555 5555 4444', cardName: 'John Customer', showForm: true } },
    { id: 'net_banking', label: 'Net Banking', icon: <Globe size={24} className="text-red-600" />, color: 'border-red-200 bg-red-50', activeColor: 'border-red-500 bg-red-100', dummyData: { bankName: 'State Bank of India', showForm: true } },
    { id: 'wallet', label: 'Digital Wallet', icon: <Wallet size={24} className="text-yellow-600" />, color: 'border-yellow-200 bg-yellow-50', activeColor: 'border-yellow-500 bg-yellow-100', dummyData: { walletType: 'Paytm', showForm: true } }
  ];

  const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India', 'IndusInd Bank'];
  const wallets = ['Paytm', 'Amazon Pay', 'Mobikwik', 'PhonePe Wallet', 'FreeCharge', 'JioMoney'];

  const handlePaymentMethodSelect = (id) => { const m = paymentMethods.find(x => x.id === id); setFormData(p => ({ ...p, paymentMethod: id, ...(m.dummyData.showForm ? m.dummyData : {}) })); setShowCardDetails(id === 'debit_card' || id === 'credit_card'); setShowUPIDetails(id === 'upi'); setShowNetBanking(id === 'net_banking'); setShowWalletDetails(id === 'wallet'); };

  const copyDummyDetails = (text, type) => { navigator.clipboard.writeText(text); toast.success(`${type} copied!`); };

  const testPayment = () => { if (!formData.paymentMethod) return toast.error('Select payment method first'); setIsProcessing(true); setCountdown(5); const i = setInterval(() => setCountdown(c => { if (c <= 1) { clearInterval(i); setIsProcessing(false); toast.success('✅ Payment successful'); setTimeout(handleSubmit, 2000); return 0; } return c - 1; }), 1000); };

  const formatCardNumber = (v) => { const val = v.replace(/\s+/g, '').replace(/[^0-9]/gi, ''); const m = val.match(/\d{4,16}/g); const match = (m && m[0]) || ''; const parts = []; for (let i = 0, len = match.length; i < len; i += 4) parts.push(match.substring(i, i + 4)); return parts.length ? parts.join(' ') : v; };
  const formatExpiryDate = (v) => { const val = v.replace(/\s+/g, '').replace(/[^0-9]/gi, ''); if (val.length >= 2) return val.substring(0, 2) + (val.length > 2 ? '/' + val.substring(2, 4) : ''); return val; };

  const handleSubmit = async (e) => { if (e) e.preventDefault(); if (!formData.paymentMethod && step === 3) return toast.error('Select payment method'); setLoading(true); const total = isFullCart ? cartItems.reduce((t, i) => t + i.price * i.quantity, 0) : product.price * quantity; const tax = total * 0.18; const final = total + tax; const orderData = { product: isFullCart ? null : product, cartItems: isFullCart ? cartItems : null, delivery: formData, totalAmount: total.toFixed(2), orderDate: new Date().toISOString(), orderId: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`, paymentMethod: formData.paymentMethod, paymentStatus: formData.paymentMethod === 'cash_on_delivery' ? 'Pending' : 'Paid', addressSource: selectedMethod === 'gps' ? 'Real GPS' : selectedMethod === 'demo' ? 'Demo' : 'Manual', realAddressData }; setTimeout(() => { toast.success('🎉 Order placed'); toast.success(`Order ID: ${orderData.orderId}`, { duration: 5000 }); onSubmit(orderData); setLoading(false); onClose(); }, 2000); };

  useEffect(() => { if (step === 3 && !formData.paymentMethod) handlePaymentMethodSelect('cash_on_delivery'); }, [step]);
  useEffect(() => { const outside = (e) => suggestionRef.current && !suggestionRef.current.contains(e.target) && setShowSuggestions(false); document.addEventListener('mousedown', outside); return () => document.removeEventListener('mousedown', outside); }, []);

  const totalAmount = isFullCart ? cartItems.reduce((t, i) => t + i.price * i.quantity, 0) : product.price * quantity;
  const tax = totalAmount * 0.18;
  const finalAmount = totalAmount + tax;
  const currentPaymentMethod = paymentMethods.find(m => m.id === formData.paymentMethod);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Package size={28} className="text-yellow-600" />Complete Your Order</h2>
            <p className="text-gray-600 mt-1">{isFullCart ? 'Complete Cart Checkout' : `Buy Now: ${product.name}`}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
          <div className="lg:col-span-1 bg-gradient-to-b from-yellow-50 to-amber-50 p-6">
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Package size={20} className="text-yellow-600" />Order Summary</h3>
              <div className="space-y-4">
                {isFullCart ? (
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-yellow-100">
                    <h4 className="font-bold text-gray-900 mb-3">Cart Items ({cartItems.length})</h4>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">{cartItems.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <img src={it.image} alt={it.name} className="w-10 h-10 object-cover rounded border" />
                        <div className="flex-1"><p className="font-medium text-sm truncate">{it.name}</p><div className="flex justify-between text-xs text-gray-600"><span>Qty: {it.quantity}</span><span className="font-bold">₹{(it.price * it.quantity).toFixed(2)}</span></div></div>
                      </div>))}</div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-yellow-100">
                    <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg border" />
                    <div className="flex-1"><h4 className="font-bold text-gray-900 text-sm">{product.name}</h4><p className="text-xs text-gray-600">Quantity: {quantity}</p><div className="flex justify-between items-center mt-2"><span className="text-yellow-600 font-bold text-sm">₹{product.price.toFixed(2)} each</span><span className="text-gray-900 font-bold">₹{totalAmount.toFixed(2)}</span></div></div>
                  </div>
                )}
                <div className="space-y-3 bg-white p-4 rounded-xl shadow-sm border border-yellow-100">
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-medium">₹{totalAmount.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Delivery</span><span className="text-green-600 font-bold">FREE</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Tax (18%)</span><span>₹{tax.toFixed(2)}</span></div>
                  <div className="border-t pt-3 mt-2"><div className="flex justify-between font-bold text-lg"><span>Total Amount</span><span className="text-green-700">₹{finalAmount.toFixed(2)}</span></div></div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map(s => (
                <div key={s} className={`flex items-center gap-3 p-4 rounded-xl ${step >= s ? 'bg-white shadow-sm border border-yellow-100' : 'bg-gray-50'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= s ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>{step > s ? <CheckCircle size={20} /> : s}</div>
                  <div><p className="font-medium text-gray-900">{s === 1 ? 'Personal Details' : s === 2 ? 'Delivery Address' : 'Payment'}</p><p className="text-sm text-gray-500">{s === 2 && step === 2 ? 'Real GPS Active!' : s === 1 ? 'Name & contact info' : s === 2 ? 'Where to deliver' : 'Test different methods'}</p></div>
                </div>))}
            </div>
            {step === 2 && gpsStatus !== 'idle' && (
              <div className={`mt-6 p-4 rounded-xl border ${gpsStatus === 'success' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                <div className="flex items-center gap-3 mb-2">{gpsStatus === 'getting_coords' || gpsStatus === 'api_call' ? <Loader size={16} className="animate-spin text-blue-600" /> : <CheckCircle size={16} className="text-green-600" />}<h4 className="font-bold text-gray-900">{gpsStatus === 'success' ? 'Real Address Found!' : 'Fetching Real Address...'}</h4></div>
                {gpsStatus === 'success' && realAddressData && <div className="text-sm text-gray-700"><div className="font-medium">{realAddressData.address?.city || realAddressData.address?.town}, {realAddressData.address?.state}</div><div className="text-xs text-gray-500 mt-1">✓ Real address via LocationIQ API</div></div>}
              </div>)}
            {step === 2 && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">🎯 Real Address Options</h4>
                <ul className="text-sm text-blue-800 space-y-1"><li>• 📍 <strong>Real GPS:</strong> Uses LocationIQ API</li><li>• 🔍 <strong>Search:</strong> Real address search</li><li>• 🏠 <strong>Demo:</strong> For testing</li><li>• 📮 <strong>Pincode:</strong> Indian Postal API</li></ul>
              </div>)}
            {step === 3 && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">💡 Testing Instructions</h4>
                <ul className="text-sm text-blue-800 space-y-1"><li>• Click on any payment method to test</li><li>• Dummy details auto-filled</li><li>• Click "Test Payment" to simulate</li><li>• Try all 6 payment options!</li></ul>
              </div>)}
          </div>
          <div className="lg:col-span-2 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div><h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><User size={24} className="text-yellow-600" />Personal Information</h3><p className="text-gray-600 mb-6">Tell us how we can contact you</p></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="Enter your full name" required /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label><input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="10-digit mobile number" maxLength="10" required /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="email@example.com" /></div>
                  </div>
                </div>)}
              {step === 2 && (
                <div className="space-y-6">
                  <div><h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><MapPin size={24} className="text-yellow-600" />Delivery Address<span className="ml-auto text-sm font-normal bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1"><Navigation size={14} />Real GPS Active</span></h3><p className="text-gray-600 mb-6">Where should we deliver your order?</p></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button type="button" onClick={getCurrentLocation} disabled={loadingLocation} className={`p-4 rounded-xl border-2 ${loadingLocation ? 'border-blue-300 bg-blue-50' : selectedMethod === 'gps' && gpsStatus === 'success' ? 'border-green-500 bg-green-50' : 'border-blue-200 bg-white hover:border-blue-400'} transition-all flex flex-col items-center justify-center text-center`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${loadingLocation ? 'bg-blue-100' : 'bg-blue-100 text-blue-600'}`}>{loadingLocation ? <Loader size={24} className="animate-spin" /> : <Locate size={24} />}</div>
                      <div className="font-bold text-gray-900">Real GPS Location</div><div className="text-sm text-gray-600 mt-1">{loadingLocation ? 'Getting real address...' : 'Uses LocationIQ API'}</div>
                    </button>
                    <button type="button" onClick={useDemoLocation} className={`p-4 rounded-xl border-2 ${selectedMethod === 'demo' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'} transition-all flex flex-col items-center justify-center text-center`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${selectedMethod === 'demo' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}><Home size={24} /></div><div className="font-bold text-gray-900">Demo Address</div><div className="text-sm text-gray-600 mt-1">For testing</div>
                    </button>
                    <div className="relative" ref={suggestionRef}><div className="p-4 rounded-xl border-2 border-gray-200 bg-white"><div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3 mx-auto"><Search size={24} /></div><div className="font-bold text-gray-900 text-center">Search Address</div><div className="text-sm text-gray-600 mt-1 text-center">Type for real suggestions</div></div></div>
                  </div>
                  <div className="relative" ref={suggestionRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter Address *<span className="ml-2 text-xs text-blue-600">(Type for real suggestions)</span></label>
                    <div className="relative"><input type="text" name="address" value={formData.address} onChange={handleChange} ref={searchInputRef} className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="Start typing..." required /><Search size={18} className="absolute left-3 top-3.5 text-gray-400" /></div>
                    {showSuggestions && addressSuggestions.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <div className="p-2 bg-gray-50 border-b"><div className="text-xs font-medium text-gray-700">{addressSuggestions.length} suggestions</div></div>
                        {addressSuggestions.map(a => (
                          <button key={a.id} type="button" onClick={() => selectAddressSuggestion(a)} className="w-full text-left p-3 hover:bg-blue-50 border-b flex items-start gap-3"><MapPin size={16} className="text-blue-500 mt-0.5" /><div><div className="font-medium text-gray-900 text-sm">{a.address}</div>{a.city && <div className="text-xs text-gray-500 mt-1">{a.city}, {a.state} - {a.pincode}</div>}</div></button>))}
                      </div>)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Street/Locality</label><input type="text" name="street" value={formData.street} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="Street, area, locality" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Landmark (Optional)</label><input type="text" name="landmark" value={formData.landmark} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="Nearby shop, building" /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">City *</label><input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="City" required /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">State *</label><input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="State" required /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Pincode *<span className="ml-2 text-xs text-blue-600">(Auto-fill)</span></label><input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="6-digit pincode" maxLength="6" required /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-2"><Calendar size={18} className="inline mr-2 text-yellow-600" />Preferred Delivery Date</label><input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time Slot</label><select name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"><option>6 AM - 9 AM</option><option>9 AM - 12 PM</option><option>12 PM - 3 PM</option><option>3 PM - 6 PM</option><option>6 PM - 9 PM</option></select></div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Delivery Instructions (Optional)</label><textarea name="deliveryInstructions" value={formData.deliveryInstructions} onChange={handleChange} rows="2" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 resize-none" placeholder="e.g., Leave at gate" /></div>
                  {selectedMethod === 'gps' && gpsStatus === 'success' && realAddressData && (
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><Check size={20} className="text-green-600" /></div><div><h4 className="font-bold text-gray-900">✅ Real Address Found!</h4><p className="text-sm text-gray-600 mt-1">Your real location was detected via LocationIQ API.</p></div></div></div>)}
                </div>)}
              {step === 3 && (
                <div className="space-y-6">
                  <div><h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><CreditCard size={24} className="text-yellow-600" />Payment Method<span className="ml-auto text-sm font-normal bg-green-100 text-green-800 px-3 py-1 rounded-full">🎯 Click to Test</span></h3></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {paymentMethods.map(m => (
                      <button key={m.id} type="button" onClick={() => handlePaymentMethodSelect(m.id)} className={`w-full p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === m.id ? m.activeColor + ' shadow-lg scale-[1.02]' : m.color + ' hover:shadow-md'}`}>
                        <div className="flex flex-col h-full"><div className="flex items-center gap-3 mb-3">{m.icon}<div className="flex-1"><div className="font-bold text-gray-900">{m.label}</div></div>{formData.paymentMethod === m.id && <CheckCircle size={14} className="text-green-500" />}</div><div className="text-sm text-gray-600">{m.description}</div></div>
                      </button>))}
                  </div>
                  {formData.paymentMethod && currentPaymentMethod?.dummyData?.showForm && (
                    <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border-2 border-dashed border-blue-300 space-y-4">
                      <div className="flex justify-between items-center"><h4 className="font-bold text-gray-900 flex items-center gap-2">{currentPaymentMethod.icon}{currentPaymentMethod.label} Details<span className="text-sm font-normal bg-yellow-100 text-yellow-800 px-2 py-1 rounded ml-2">🧪 Test Data</span></h4><button type="button" onClick={() => copyDummyDetails(JSON.stringify(currentPaymentMethod.dummyData, null, 2), 'Payment details')} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-200"><Copy size={14} />Copy All</button></div>
                      {showCardDetails && (
                        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">Card Number *<button type="button" onClick={() => copyDummyDetails(formData.cardNumber, 'Card number')} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"><Copy size={12} />Copy</button></label><input type="text" name="cardNumber" value={formData.cardNumber} onChange={e => setFormData(p => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))} maxLength="19" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="1234 5678 9012 3456" /></div>
                          <div><label className="block text-sm font-medium text-gray-700 mb-2">Name on Card *</label><input type="text" name="cardName" value={formData.cardName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="John Customer" /></div>
                          <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label><input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={e => setFormData(p => ({ ...p, cardExpiry: formatExpiryDate(e.target.value) }))} maxLength="5" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="MM/YY" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">CVV *<button type="button" onClick={() => setShowCardCVV(!showCardCVV)} className="text-xs text-gray-600 hover:text-gray-800">{showCardCVV ? <EyeOff size={12} /> : <Eye size={12} />}</button></label><input type={showCardCVV ? 'text' : 'password'} name="cardCVV" value={formData.cardCVV} onChange={handleChange} maxLength="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="123" /></div></div></div>)}
                      {showUPIDetails && (
                        <div className="space-y-4"><div><label className="block text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">UPI ID *<button type="button" onClick={() => copyDummyDetails(formData.upiId, 'UPI ID')} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"><Copy size={12} />Copy</button></label><input type="text" name="upiId" value={formData.upiId} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="name@upi" /></div>
                          <div className="p-3 bg-purple-50 rounded-lg"><p className="text-sm text-purple-800 font-medium mb-2">📱 Test UPI Apps:</p><div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI', 'Amazon Pay', 'WhatsApp Pay'].map(app => (<div key={app} className="text-center p-2 bg-white rounded border"><span className="text-xs">{app}</span></div>))}</div></div></div>)}
                      {showNetBanking && (
                        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-2">Select Bank *</label><select name="bankName" value={formData.bankName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white"><option value="">Select your bank</option>{banks.map(b => (<option key={b} value={b}>{b}</option>))}</select></div>
                          <div><label className="block text-sm font-medium text-gray-700 mb-2">Account Number *</label><input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="Enter account number" /></div></div>)}
                      {showWalletDetails && (
                        <div className="space-y-4"><div><label className="block text-sm font-medium text-gray-700 mb-2">Select Wallet *</label><select name="walletType" value={formData.walletType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white"><option value="">Select wallet</option>{wallets.map(w => (<option key={w} value={w}>{w}</option>))}</select></div></div>)}
                      <div className="pt-4 border-t"><button type="button" onClick={testPayment} disabled={isProcessing} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg shadow-lg">{isProcessing ? (<><Loader size={20} className="animate-spin" />Processing Payment... ({countdown}s)</>) : (<><CreditCard size={24} />Test {currentPaymentMethod?.label} Payment</>)}</button><p className="text-center text-sm text-gray-500 mt-2">{isProcessing ? 'Simulating payment processing...' : 'Click to simulate a test payment'}</p></div>
                    </div>)}
                  {formData.paymentMethod === 'cash_on_delivery' && (
                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-dashed border-green-300"><div className="flex items-center gap-4"><Banknote size={24} className="text-green-600" /><div><h4 className="font-bold text-gray-900">Cash on Delivery Selected</h4><p className="text-gray-600 mt-1">Pay ₹{finalAmount.toFixed(2)} in cash when the product arrives.</p></div></div></div>)}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl"><div className="flex items-center gap-3"><Shield size={20} className="text-blue-600" /><div><p className="font-medium text-blue-900">🔒 Secure Test Environment</p><p className="text-sm text-blue-700 mt-1">Demo payments only. No real money is charged.</p></div></div></div>
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-200"><h4 className="font-bold text-gray-900 mb-4">Final Order Summary</h4><div className="space-y-3"><div className="flex justify-between"><span className="text-gray-600">Items Total</span><span className="font-medium">₹{totalAmount.toFixed(2)}</span></div><div className="flex justify-between"><span className="text-gray-600">Delivery to</span><span className="font-medium text-right">{formData.city}, {formData.state} - {formData.pincode}</span></div><div className="flex justify-between"><span className="text-gray-600">Payment Method</span><span className="font-medium">{currentPaymentMethod?.label || 'Not selected'}</span></div><div className="border-t pt-3 mt-2"><div className="flex justify-between font-bold text-lg"><span>Total Payable</span><span className="text-green-700">₹{finalAmount.toFixed(2)}</span></div></div></div></div>
                </div>)}
              <div className="flex gap-4 pt-6 border-t">
                {step > 1 && <button type="button" onClick={handlePrevStep} className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50">← Back</button>}
                <button type="button" onClick={onClose} className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50">Cancel</button>
                {step < 3 ? <button type="button" onClick={handleNextStep} className="flex-1 bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600">Continue →</button> :
                  <button type="submit" disabled={loading || !formData.paymentMethod} className="flex-1 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:opacity-50">{loading ? 'Placing...' : `Place Order (₹${finalAmount.toFixed(2)})`}</button>}
              </div>
            </form>
          </div>
        </div>
        <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-blue-50 text-center"><div className="flex flex-col sm:flex-row items-center justify-between gap-3"><p className="text-sm text-gray-600 flex items-center gap-2"><Shield size={16} className="text-green-600" />Secure encrypted payment. We don't share your details.</p>{step === 2 && <div className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">📍 Real GPS Active: LocationIQ API</div>}{step === 3 && <div className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">🎮 Demo Mode: Try all 6 payment methods!</div>}</div></div>
      </div>
    </div>
  );
};

export default DeliveryForm;