import React from 'react';
import Image from 'next/image';

interface DoctorProps {
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

const DoctorCard: React.FC<DoctorProps> = ({
  name,
  specialty,
  qualification,
  experience,
  profileImageUrl,
  consultationFee,
  rating,
  reviewCount,
  city,
  area,
  availableToday,
  nextAvailability,
  language,
}) => {
  // Format next availability time if exists
  const formattedAvailability = nextAvailability 
    ? new Date(nextAvailability).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      })
    : null;
    console.log(profileImageUrl);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Doctor Image and Rating */}
        <div className="md:w-1/4 flex flex-col items-center mb-4 md:mb-0">
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-2 border border-gray-200">
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt={name}
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-primary bg-opacity-10 flex items-center justify-center rounded-full">
                <span className="text-primary text-xl font-semibold">{name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center mt-1">
            <div className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
              
              {rating.toFixed(1)} ({reviewCount})
            </div>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="md:w-1/2 md:pl-4">
          <h3 className="text-lg font-medium text-primary">{name}</h3>
          <p className="text-gray-600 text-sm">{specialty}</p>
          <p className="text-gray-500 text-xs mb-2">{qualification}</p>
          <div className="flex items-center space-x-2 mb-1">
            <div className="bg-primary bg-opacity-10 text-primary text-xs px-2 py-0.5 rounded-full">
              {experience} yrs exp
            </div>
            <div className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
              {city}{area ? `, ${area}` : ''}
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-xs text-gray-600">
              <span className="font-medium">Languages:</span> {language}
            </p>
          </div>
        </div>

        {/* Doctor Availability and CTA */}
        <div className="md:w-1/4 mt-4 md:mt-0 flex flex-col items-start md:items-end justify-between">
          <div className="text-right">
            <p className="text-lg font-semibold text-primary">₹{consultationFee}</p>
            <p className="text-xs text-gray-500">Consultation fee</p>
          </div>

          <div className="mt-3 w-full">
            {availableToday ? (
              <div className="mb-2 text-xs text-green-600 flex items-center justify-end">
                Available Today
                {formattedAvailability && ` at ${formattedAvailability}`}
              </div>
            ) : (
              <div className="mb-2 text-xs text-orange-600 flex items-center justify-end">
                Next Available Tomorrow
              </div>
            )}
            
            <button className="w-medium bg-secondary text-white rounded-full py-4 text-sm font-medium hover:bg-opacity-90 transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;