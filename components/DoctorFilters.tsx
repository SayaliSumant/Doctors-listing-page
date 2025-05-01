import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  specialty: string;
  city: string;
  availableToday: boolean;
  gender: string;
  minRating: number | null;
  minExperience: number | null;
  language: string;
}

const DoctorFilters: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    specialty: '',
    city: '',
    availableToday: false,
    gender: '',
    minRating: null,
    minExperience: null,
    language: '',
  });

  const handleFilterChange = (name: keyof FilterState, value: any) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      specialty: '',
      city: '',
      availableToday: false,
      gender: '',
      minRating: null,
      minExperience: null,
      language: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
        <button 
          onClick={handleReset}
          className="text-sm text-blue-600 hover:underline hover:text-blue-800 transition"
        >
          Reset All
        </button>
      </div>
  
      {/* Specialty Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
        <select
          value={filters.specialty}
          onChange={(e) => handleFilterChange('specialty', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Specialties</option>
          <option value="General Physician">General Physician</option>
          <option value="Internal Medicine">Internal Medicine</option>
        </select>
      </div>
  
      {/* City Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
        <select
          value={filters.city}
          onChange={(e) => handleFilterChange('city', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Cities</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
          <option value="Pune">Pune</option>
        </select>
      </div>
  
      {/* Available Today */}
      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="availableToday"
            checked={filters.availableToday}
            onChange={(e) => handleFilterChange('availableToday', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="availableToday" className="ml-2 text-sm text-gray-700">
            Available Today
          </label>
        </div>
      </div>
  
      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'All', value: '' },
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' }
          ].map(({ label, value }) => (
            <div key={value} className="flex items-center">
              <input
                type="radio"
                id={value || 'all'}
                name="gender"
                value={value}
                checked={filters.gender === value}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor={value || 'all'} className="ml-2 text-sm text-gray-700">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>
  
      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
        <select
          value={filters.minRating || ''}
          onChange={(e) => handleFilterChange('minRating', e.target.value ? Number(e.target.value) : null)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Any Rating</option>
          <option value="4.5">4.5 & above</option>
          <option value="4">4.0 & above</option>
          <option value="3.5">3.5 & above</option>
        </select>
      </div>
  
      {/* Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
        <select
          value={filters.minExperience || ''}
          onChange={(e) => handleFilterChange('minExperience', e.target.value ? Number(e.target.value) : null)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Any Experience</option>
          <option value="5">5+ years</option>
          <option value="10">10+ years</option>
          <option value="15">15+ years</option>
        </select>
      </div>
  
      {/* Language */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
        <select
          value={filters.language}
          onChange={(e) => handleFilterChange('language', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Any Language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Tamil">Tamil</option>
          <option value="Telugu">Telugu</option>
          <option value="Kannada">Kannada</option>
          <option value="Malayalam">Malayalam</option>
          <option value="Marathi">Marathi</option>
          <option value="Punjabi">Punjabi</option>
        </select>
      </div>
      
    </div>
    
  );
  
};

export default DoctorFilters;