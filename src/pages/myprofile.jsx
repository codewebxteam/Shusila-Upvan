// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit2, 
  CheckCircle, XCircle, Upload, Shield, BadgeCheck 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    joinDate: '',
    farmerType: 'individual',
    verificationStatus: 'pending'
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.displayName || 'Not Set',
        email: user.email || 'No Email',
        phone: user.phoneNumber || '+91-XXXXXXXXXX',
        address: user.address || 'Address not provided',
        joinDate: user.metadata?.creationTime || '2024-01-01',
        farmerType: user.farmerType || 'individual',
        verificationStatus: user.emailVerified ? 'verified' : 'pending'
      });
    }
  }, [user]);

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              {/* Profile Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {profileData.name.charAt(0).toUpperCase()}
                  </div>
                  {profileData.verificationStatus === 'verified' && (
                    <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full">
                      <BadgeCheck size={20} />
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Mail size={14} />
                  {profileData.email}
                </p>
                <div className={`mt-3 px-4 py-1 rounded-full text-sm font-medium ${profileData.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {profileData.verificationStatus === 'verified' ? '✓ Verified Farmer' : 'Pending Verification'}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-amber-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-amber-700">12</div>
                  <div className="text-sm text-gray-600">Orders</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-yellow-700">8</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
              </div>

              {/* Member Since */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar size={18} />
                  <div>
                    <div className="text-sm">Member Since</div>
                    <div className="font-medium">{new Date(profileData.joinDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg hover:shadow-lg transition"
                >
                  <Edit2 size={16} />
                  {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                </button>
              </div>

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User size={16} />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">{profileData.name}</div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg flex justify-between items-center">
                    <span>{profileData.email}</span>
                    {profileData.verificationStatus === 'verified' ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle size={16} />
                        Verified
                      </span>
                    ) : (
                      <button className="text-sm text-amber-600 hover:text-amber-700">
                        Verify Email
                      </button>
                    )}
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">{profileData.phone}</div>
                  )}
                </div>

                {/* Address Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">{profileData.address}</div>
                  )}
                </div>

                {/* Farmer Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Shield size={16} />
                    Farmer Type
                  </label>
                  {isEditing ? (
                    <select
                      value={profileData.farmerType}
                      onChange={(e) => setProfileData({...profileData, farmerType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="individual">Individual Farmer</option>
                      <option value="cooperative">Cooperative Member</option>
                      <option value="commercial">Commercial Farmer</option>
                      <option value="beginner">Beginner</option>
                    </select>
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg capitalize">{profileData.farmerType} Farmer</div>
                  )}
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Security & Privacy</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-amber-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Shield size={20} className="text-amber-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Change Password</div>
                      <div className="text-sm text-gray-600">Update your account password</div>
                    </div>
                  </div>
                  <div className="text-amber-600">→</div>
                </button>

                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-amber-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <BadgeCheck size={20} className="text-yellow-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-600">Add extra security to your account</div>
                    </div>
                  </div>
                  <div className="text-gray-400">Enable</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;