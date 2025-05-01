import { NextRequest, NextResponse } from 'next/server';

// Simulated doctor data since we don't have a database yet
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Amit Kumar',
    specialty: 'General Physician',
    qualification: 'MBBS, MD (Internal Medicine)',
    experience: 15,
    profileImageUrl: '/public/images/doctor1.jpg',
    consultationFee: 800,
    rating: 4.8,
    reviewCount: 124,
    city: 'Mumbai',
    area: 'Andheri East',
    availableToday: true,
    nextAvailability: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    language: 'English, Hindi, Marathi',
    gender: 'Male',
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    specialty: 'General Physician',
    qualification: 'MBBS, DNB (Family Medicine)',
    experience: 8,
    profileImageUrl: '/public/images/doctor2.jpg',
    consultationFee: 700,
    rating: 4.5,
    reviewCount: 98,
    city: 'Delhi',
    area: 'South Extension',
    availableToday: true,
    nextAvailability: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
    language: 'English, Hindi',
    gender: 'Female',
  },
  {
    id: 3,
    name: 'Dr. Rajesh Patel',
    specialty: 'Internal Medicine',
    qualification: 'MBBS, MD (Internal Medicine)',
    experience: 12,
    profileImageUrl: '/public/images/doctor1.jpg',
    consultationFee: 900,
    rating: 4.7,
    reviewCount: 156,
    city: 'Bangalore',
    area: 'Koramangala',
    availableToday: false,
    nextAvailability: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
    language: 'English, Kannada, Hindi',
    gender: 'Male',
  },
  {
    id: 4,
    name: 'Dr. Sneha Reddy',
    specialty: 'General Physician',
    qualification: 'MBBS, MD (General Medicine)',
    experience: 6,
    profileImageUrl: '/public/images/doctor2.jpg',
    consultationFee: 600,
    rating: 4.6,
    reviewCount: 82,
    city: 'Hyderabad',
    area: 'Banjara Hills',
    availableToday: true,
    nextAvailability: new Date(Date.now() + 5400000).toISOString(), // 1.5 hours from now
    language: 'English, Telugu, Hindi',
    gender: 'Female',
  },
  {
    id: 5,
    name: 'Dr. Vikram Singh',
    specialty: 'Internal Medicine',
    qualification: 'MBBS, DNB (Internal Medicine)',
    experience: 10,
    profileImageUrl: '/public/images/doctor1.jpg',
    consultationFee: 850,
    rating: 4.4,
    reviewCount: 110,
    city: 'Mumbai',
    area: 'Powai',
    availableToday: true,
    nextAvailability: new Date(Date.now() + 10800000).toISOString(), // 3 hours from now
    language: 'English, Hindi, Punjabi',
    gender: 'Male',
  },
  {
    id: 6,
    name: 'Dr. Nandini Joshi',
    specialty: 'General Physician',
    qualification: 'MBBS, MD (Internal Medicine)',
    experience: 9,
    profileImageUrl: '/public/images/doctor2.jpg',
    consultationFee: 750,
    rating: 4.9,
    reviewCount: 135,
    city: 'Pune',
    area: 'Aundh',
    availableToday: false,
    nextAvailability: new Date(Date.now() + 172800000).toISOString(), // 48 hours from now
    language: 'English, Marathi, Hindi',
    gender: 'Female',
  },
  {
    id: 7,
    name: 'Dr. Arjun Menon',
    specialty: 'Internal Medicine',
    qualification: 'MBBS, MD (General Medicine)',
    experience: 14,
    profileImageUrl: '/public/images/doctor1.jpg',
    consultationFee: 950,
    rating: 4.7,
    reviewCount: 142,
    city: 'Chennai',
    area: 'Adyar',
    availableToday: true,
    nextAvailability: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    language: 'English, Tamil, Malayalam',
    gender: 'Male',
  },
  {
    id: 8,
    name: 'Dr. Lakshmi Krishnan',
    specialty: 'General Physician',
    qualification: 'MBBS, DNB (Family Medicine)',
    experience: 7,
    profileImageUrl: '/public/images/doctor2.jpg',
    consultationFee: 650,
    rating: 4.6,
    reviewCount: 98,
    city: 'Bangalore',
    area: 'Indiranagar',
    availableToday: true,
    nextAvailability: new Date(Date.now() + 5400000).toISOString(), // 1.5 hours from now
    language: 'English, Kannada, Tamil',
    gender: 'Female',
  },
];

// POST /api/doctors - Add a new doctor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'specialty', 'qualification', 'experience', 'consultationFee', 'city', 'gender'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // In a real app, you would add to the database here
    // For now, we'll just return success
    return NextResponse.json(
      { 
        message: 'Doctor added successfully',
        doctor: {
          id: mockDoctors.length + 1,
          ...body
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding doctor:', error);
    return NextResponse.json(
      { error: 'Failed to add doctor' },
      { status: 500 }
    );
  }
}

// GET /api/doctors - List doctors with filters and pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse pagination params
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Parse filters
    const specialty = searchParams.get('specialty');
    const city = searchParams.get('city');
    const availableToday = searchParams.get('availableToday');
    const gender = searchParams.get('gender');
    const minRating = searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined;
    const minExperience = searchParams.get('minExperience') ? parseInt(searchParams.get('minExperience')!) : undefined;
    const language = searchParams.get('language');
    
    // Apply filters to mock data
    let filteredDoctors = [...mockDoctors];
    
    if (specialty) {
      filteredDoctors = filteredDoctors.filter(doc => doc.specialty === specialty);
    }
    
    if (city) {
      filteredDoctors = filteredDoctors.filter(doc => doc.city === city);
    }
    
    if (availableToday === 'true') {
      filteredDoctors = filteredDoctors.filter(doc => doc.availableToday === true);
    }
    
    if (gender) {
      filteredDoctors = filteredDoctors.filter(doc => doc.gender === gender);
    }
    
    if (minRating) {
      filteredDoctors = filteredDoctors.filter(doc => doc.rating >= minRating);
    }
    
    if (minExperience) {
      filteredDoctors = filteredDoctors.filter(doc => doc.experience >= minExperience);
    }
    
    if (language) {
      filteredDoctors = filteredDoctors.filter(doc => doc.language.includes(language));
    }
    
    // Get total count for pagination
    const totalCount = filteredDoctors.length;
    
    // Sort by rating (highest first)
    filteredDoctors.sort((a, b) => b.rating - a.rating);
    
    // Apply pagination
    const paginatedDoctors = filteredDoctors.slice(skip, skip + limit);
    
    return NextResponse.json({
      doctors: paginatedDoctors,
      pagination: {
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}