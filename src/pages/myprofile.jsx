// src/pages/AccountSettings.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, Mail, Phone, MapPin, Calendar, Lock, Shield, Bell, CreditCard, 
  Globe, Eye, EyeOff, Camera, CheckCircle, XCircle, Upload, Trash2,
  Smartphone, Download, HelpCircle, LogOut, ChevronRight, AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AccountSettings = () => {
  const { user, updateUserProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
    orderUpdates: true,
    priceDrops: true,
    newsletter: false
  });
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    dob: '',
    gender: 'prefer-not-to-say',
    language: 'en',
    currency: 'INR',
    emailVerified: false,
    phoneVerified: false,
    twoFactorEnabled: false,
    accountStatus: 'active'
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.displayName || 'John Doe',
        email: user.email || 'john.doe@example.com',
        phone: user.phoneNumber || '+91 98765 43210',
        address: {
          street: user.address?.street || '123 Main Street',
          city: user.address?.city || 'Mumbai',
          state: user.address?.state || 'Maharashtra',
          zipCode: user.address?.zipCode || '400001',
          country: user.address?.country || 'India'
        },
        dob: user.dob || '1990-01-01',
        gender: user.gender || 'prefer-not-to-say',
        language: user.language || 'en',
        currency: user.currency || 'INR',
        emailVerified: user.emailVerified || false,
        phoneVerified: user.phoneVerified || false,
        twoFactorEnabled: user.twoFactorEnabled || false,
        accountStatus: user.accountStatus || 'active'
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile(profileData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    toast.success('Password changed successfully!');
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success(`Notifications ${!notifications[key] ? 'enabled' : 'disabled'}`);
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.success('Account deletion requested. We\'ll contact you shortly.');
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <Globe size={18} /> },
    { id: 'billing', label: 'Payment Methods', icon: <CreditCard size={18} /> },
    { id: 'privacy', label: 'Privacy', icon: <Eye size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                    <ChevronRight size={16} className="ml-auto" />
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('help')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors mt-2"
                >
                  <HelpCircle size={18} />
                  <span className="font-medium">Help & Support</span>
                </button>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Account Status</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${profileData.accountStatus === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <span className="text-sm font-medium capitalize">{profileData.accountStatus}</span>
                </div>
                <span className="text-xs text-gray-500">Verified</span>
              </div>
              <div className="mt-4 text-xs text-gray-600">
                Last login: Today, 10:30 AM
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                      <p className="text-gray-600 mt-1">Update your personal details</p>
                    </div>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`px-4 py-2 rounded-lg font-medium ${isEditing
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                        } transition-colors`}
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                        {profileData.name.charAt(0).toUpperCase()}
                      </div>
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50">
                          <Camera size={16} />
                        </button>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{profileData.name}</h3>
                      <p className="text-gray-600 text-sm">{profileData.email}</p>
                      {profileData.emailVerified && (
                        <span className="inline-flex items-center gap-1 mt-1 text-sm text-green-600">
                          <CheckCircle size={14} />
                          Email Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-lg">{profileData.name}</div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg">{profileData.email}</div>
                        )}
                        {!profileData.emailVerified && (
                          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                            Verify
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg">{profileData.phone}</div>
                        )}
                        {!profileData.phoneVerified && (
                          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                            Verify
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={profileData.dob}
                          onChange={(e) => setProfileData({...profileData, dob: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-lg">
                          {new Date(profileData.dob).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      {isEditing ? (
                        <select
                          value={profileData.gender}
                          onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-lg capitalize">
                          {profileData.gender.replace(/-/g, ' ')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.address.street}
                            onChange={(e) => setProfileData({
                              ...profileData,
                              address: {...profileData.address, street: e.target.value}
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg">{profileData.address.street}</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.address.city}
                            onChange={(e) => setProfileData({
                              ...profileData,
                              address: {...profileData.address, city: e.target.value}
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg">{profileData.address.city}</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.address.state}
                            onChange={(e) => setProfileData({
                              ...profileData,
                              address: {...profileData.address, state: e.target.value}
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg">{profileData.address.state}</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.address.zipCode}
                            onChange={(e) => setProfileData({
                              ...profileData,
                              address: {...profileData.address, zipCode: e.target.value}
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg">{profileData.address.zipCode}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                {/* Password Change Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Change Password</h2>
                  <p className="text-gray-600 mb-6">Secure your account with a new password</p>
                  
                  <div className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showOldPassword ? "text" : "password"}
                          value={passwordData.oldPassword}
                          onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Password must be at least 8 characters with uppercase, lowercase, and numbers
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mt-4"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">Two-Factor Authentication</h2>
                      <p className="text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-medium ${profileData.twoFactorEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                        {profileData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                      <button
                        onClick={() => setProfileData({...profileData, twoFactorEnabled: !profileData.twoFactorEnabled})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${profileData.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${profileData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                  {!profileData.twoFactorEnabled && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <AlertCircle size={16} className="inline mr-2" />
                        Enable 2FA to protect your account from unauthorized access
                      </p>
                    </div>
                  )}
                </div>

                {/* Session Management */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Active Sessions</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone size={20} className="text-gray-500" />
                        <div>
                          <div className="font-medium">Chrome on Windows</div>
                          <div className="text-sm text-gray-500">Mumbai, India • Current Session</div>
                        </div>
                      </div>
                      <span className="text-sm text-green-600 font-medium">Active now</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone size={20} className="text-gray-500" />
                        <div>
                          <div className="font-medium">Safari on iPhone</div>
                          <div className="text-sm text-gray-500">Delhi, India • 2 hours ago</div>
                        </div>
                      </div>
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                        Log out
                      </button>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Log out from all other devices
                  </button>
                </div>

                {/* Delete Account */}
                <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle size={24} className="text-red-600 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Account</h2>
                      <p className="text-gray-600 mb-4">
                        Once you delete your account, there is no going back. This action is permanent and all your data will be removed.
                      </p>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-6 py-3 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Notification Preferences</h2>
                <p className="text-gray-600 mb-6">Choose how you want to be notified</p>
                
                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'orderUpdates', label: 'Order updates', description: 'Order confirmations, shipping updates, and delivery notifications' },
                        { key: 'priceDrops', label: 'Price drops & deals', description: 'Get notified when prices drop on products you viewed' },
                        { key: 'marketing', label: 'Marketing emails', description: 'Receive promotional emails and special offers' },
                        { key: 'newsletter', label: 'Weekly newsletter', description: 'Weekly digest of the best products and deals' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div>
                            <div className="font-medium text-gray-900">{item.label}</div>
                            <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                          </div>
                          <button
                            onClick={() => handleNotificationToggle(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications[item.key] ? 'bg-blue-600' : 'bg-gray-300'}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Push Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'push', label: 'App notifications', description: 'Receive push notifications on your device' },
                        { key: 'sms', label: 'SMS alerts', description: 'Get order updates via SMS' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div>
                            <div className="font-medium text-gray-900">{item.label}</div>
                            <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                          </div>
                          <button
                            onClick={() => handleNotificationToggle(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications[item.key] ? 'bg-blue-600' : 'bg-gray-300'}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Preferences</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={profileData.language}
                        onChange={(e) => setProfileData({...profileData, language: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="bn">Bengali</option>
                        <option value="ta">Tamil</option>
                        <option value="te">Telugu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={profileData.currency}
                        onChange={(e) => setProfileData({...profileData, currency: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="INR">Indian Rupee (₹)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">British Pound (£)</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
                      <div className="space-y-4">
                        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <span className="font-medium text-gray-900">Download your data</span>
                          <Download size={20} className="text-gray-500" />
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <span className="font-medium text-gray-900">Clear search history</span>
                          <Trash2 size={20} className="text-gray-500" />
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <span className="font-medium text-gray-900">Manage connected devices</span>
                          <Smartphone size={20} className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Help & Support */}
            {activeTab === 'help' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Help & Support</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <HelpCircle size={24} className="text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Help Center</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Find answers to frequently asked questions
                    </p>
                    <button className="text-blue-600 font-medium hover:text-blue-700">
                      Visit Help Center →
                    </button>
                  </div>

                  <div className="p-6 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Phone size={24} className="text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Contact Support</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Get in touch with our support team
                    </p>
                    <button className="text-green-600 font-medium hover:text-green-700">
                      Contact Now →
                    </button>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50">
                      <div className="font-medium text-gray-900">Return Policy</div>
                      <div className="text-sm text-gray-500 mt-1">Learn about returns & refunds</div>
                    </button>
                    
                    <button className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50">
                      <div className="font-medium text-gray-900">Shipping Info</div>
                      <div className="text-sm text-gray-500 mt-1">Track orders & delivery</div>
                    </button>
                    
                    <button className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50">
                      <div className="font-medium text-gray-900">Privacy Policy</div>
                      <div className="text-sm text-gray-500 mt-1">How we protect your data</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-between items-center text-sm text-gray-600">
          <div>
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <div className="flex gap-4">
            <button className="text-gray-600 hover:text-gray-900">
              Terms of Service
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;