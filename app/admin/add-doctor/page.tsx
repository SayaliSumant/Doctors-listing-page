'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

interface DoctorFormData {
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  city: string;
  area: string;
  availableToday: boolean;
  language: string;
  gender: string;
  rating: number;
  reviewCount: number;
}

export default function AddDoctorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<DoctorFormData>({
    name: '',
    specialty: 'General Physician',
    qualification: '',
    experience: 0,
    consultationFee: 0,
    city: '',
    area: '',
    availableToday: true,
    language: '',
    gender: 'Male',
    rating: 4.0,
    reviewCount: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked
      });
    } else if (type === 'number') {
      setFormData({
        ...formData,
        [name]: Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post('/api/doctors', formData);
      
      if (response.status === 201) {
        setSuccessMessage('Doctor added successfully!');
        // Reset form
        setFormData({
          name: '',
          specialty: 'General Physician',
          qualification: '',
          experience: 0,
          consultationFee: 0,
          city: '',
          area: '',
          availableToday: true,
          language: '',
          gender: 'Male',
          rating: 4.0,
          reviewCount: 0
        });
        
        // Redirect to the doctor listing page after a short delay
        setTimeout(() => {
          router.push('/specialties/general-physician-internal-medicine');
        }, 1500);
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      setErrorMessage('Failed to add doctor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  
return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-primary mb-6">Add New Doctor</h1>
          
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
              {successMessage}
            </div>
          )}
          
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>
              
              {/* Specialty */}
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty <span className="text-red-500">*</span>
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-secondary focus:border-secondary"
                  required
                >
                  <option value="General Physician">General Physician</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                </select>
              </div>
              
              {/* Qualification */}
              <div>
                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">
                  Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-secondary focus:border-secondary"
                  placeholder="e.g., MBBS, MD"
                  required
                />
              </div>
              
              {/* Experience */}
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Experience (years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
                  max="60"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>
              
              {/* Consultation Fee */}
              <div>
                <label htmlFor="consultationFee" className="block text-sm font-medium text-gray-700 mb-1">
                  Consultation Fee (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="consultationFee"
                  name="consultationFee"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>
              
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-secondary focus:border-secondary"
                  required
                >
                  <option value="">Select a city</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>
              
              {/* Area */}
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                  Area
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-secondary focus:border-secondary"
                  placeholder="e.g., Andheri East"
                />
              </div>
              
              {/* Available Today */}
              <div>
                <div className="flex items-center h-full">
                  <input
                    type="checkbox"
                    id="availableToday"
                    name="availableToday"
                    checked={formData.availableToday}
                    onChange={handleChange}
                    className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                  />
                  <label htmlFor="availableToday" className="ml-2 text-sm text-gray-700">
                    Available Today
                  </label>
                </div>
              </div>
              
              {/* Language */}
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Languages <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-secondary focus:border-secondary"
                  placeholder="e.g., English, Hindi, Tamil"
                  required
                />
              </div>
              
              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-secondary focus:border-secondary"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              
              {/* Rating */}
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  step="0.1"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-secondary focus:border-secondary"
                />
              </div>
              
              {/* Review Count */}
              <div>
                <label htmlFor="reviewCount" className="block text-sm font-medium text-gray-700 mb-1">
                  Review Count
                </label>
                <input
                  type="number"
                  id="reviewCount"
                  name="reviewCount"
                  value={formData.reviewCount}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-secondary focus:border-secondary"
                />
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-white rounded-md py-2 px-6 font-medium hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
              >
                {loading ? 'Adding...' : 'Add Doctor'}
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/specialties/general-physician-internal-medicine')}
                className="bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-6 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
  
}