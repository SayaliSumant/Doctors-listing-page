'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Header from '@/components/Header';
import DoctorFilters, { FilterState } from '@/components/DoctorFilters';
import DoctorCard from '@/components/DoctorCard';
import Pagination from '@/components/Pagination';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  profileImageUrl: string | null;
  consultationFee: number;
  rating: number;
  reviewCount: number;
  city: string;
  area: string | null;
  availableToday: boolean;
  nextAvailability: string | null;
  language: string;
  gender: string;
}

interface ApiResponse {
  doctors: Doctor[];
  pagination: {
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function DoctorListingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
  });
  const [filters, setFilters] = useState<FilterState>({
    specialty: 'General Physician',
    city: '',
    availableToday: false,
    gender: '',
    minRating: null,
    minExperience: null,
    language: '',
  });

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query params
      const params = new URLSearchParams();
      params.append('page', pagination.currentPage.toString());
      params.append('limit', pagination.limit.toString());
      
      if (filters.specialty) params.append('specialty', filters.specialty);
      if (filters.city) params.append('city', filters.city);
      if (filters.availableToday) params.append('availableToday', 'true');
      if (filters.gender) params.append('gender', filters.gender);
      if (filters.minRating) params.append('minRating', filters.minRating.toString());
      if (filters.minExperience) params.append('minExperience', filters.minExperience.toString());
      if (filters.language) params.append('language', filters.language);
      
      const response = await axios.get<ApiResponse>(`/api/doctors?${params}`);
      setDoctors(response.data.doctors);
      setPagination({
        currentPage: response.data.pagination.page,
        totalPages: response.data.pagination.totalPages,
        totalCount: response.data.pagination.totalCount,
        limit: response.data.pagination.limit,
      });
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to load doctors. Please try again later.');
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors when page loads or filters/pagination changes
  useEffect(() => {
    fetchDoctors();
  }, [pagination.currentPage, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    if (pagination.currentPage !== 1) {
      setPagination({ ...pagination, currentPage: 1 });
    }
  };

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-2xl font-bold text-primary">General Physician & Internal Medicine</h1>
              <p className="text-gray-600 mt-2 text-sm">
                Consult with top General Physicians and Internal Medicine specialists for comprehensive healthcare
              </p>
            </div>
            <Link href="/admin/add-doctor" className="bg-secondary text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-opacity-90 transition-colors">
              Add Doctor
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Mobile View */}
          <div className="md:hidden mb-4">
            <details className="bg-white rounded-lg shadow-md p-4">
              <summary className="text-lg font-medium text-primary cursor-pointer flex items-center justify-between">
                <span>Filters</span>
                
              </summary>
              <div className="mt-4">
                <DoctorFilters onFilterChange={handleFilterChange} />
              </div>
            </details>
          </div>
          
          {/* Left Sidebar - Desktop View */}
          <div className="hidden md:block md:w-1/4 h-fit sticky top-24">
            <DoctorFilters onFilterChange={handleFilterChange} />
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Doctor Count and Sort */}
            <div className="flex justify-between items-center mb-4 bg-white rounded-lg shadow-sm p-4">
              <p className="text-gray-700 text-sm">
                <span className="font-medium">{pagination.totalCount}</span> doctors found
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="border border-gray-300 rounded-md p-1 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent"
                  defaultValue="rating"
                >
                  <option value="rating">Relevance</option>
                  <option value="experience">Experience</option>
                  <option value="fee-low">Fee: Low to High</option>
                  <option value="fee-high">Fee: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Doctors List */}
            <div className="mb-6 space-y-4">
              {loading ? (
                <div className="flex justify-center items-center py-12 bg-white rounded-lg shadow-sm">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              ) : doctors.length === 0 ? (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-8 rounded-md text-center">
                  <p className="text-lg font-medium mb-2">No doctors found</p>
                  <p>Try adjusting your filters to find more doctors</p>
                </div>
              ) : (
                doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} {...doctor} />
                ))
              )}
            </div>
            
            {/* Pagination */}
            {!loading && !error && doctors.length > 0 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </main>
      
      {/* SEO Content Section */}
      <section className="container mx-auto px-4 py-8 bg-gray-50 mt-8 rounded-lg">
        <h2 className="text-xl font-semibold text-primary mb-4">General Physician & Internal Medicine Specialists</h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            General Physicians and Internal Medicine specialists are primary care doctors who diagnose and treat a wide range of health conditions affecting adults. They provide comprehensive healthcare and can manage chronic diseases, acute illnesses, and preventive care.
          </p>
          <h3 className="text-lg font-medium text-primary mt-4 mb-2">When to consult a General Physician?</h3>
          <p>
            You should consult a General Physician for:
          </p>
          <ul className="list-disc pl-5 mt-2 mb-4">
            <li>Persistent fever, cough, or cold</li>
            <li>Chronic conditions like diabetes, hypertension, or thyroid disorders</li>
            <li>Preventive health check-ups</li>
            <li>Unexplained weight loss or fatigue</li>
            <li>General health concerns and guidance</li>
          </ul>
          <p>
            Our platform connects you with experienced General Physicians and Internal Medicine specialists who can provide expert medical advice and personalized treatment plans for your health concerns.
          </p>
        </div>
      </section>
    </>
  );
}