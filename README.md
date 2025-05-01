# Apollo247 Doctors Listing Clone

This project is a clone of the Apollo247 doctors listing page, focusing on the General Physician & Internal Medicine specialty. It's built with Next.js and includes a backend with REST APIs for managing doctor data.

## Features

- **Doctor Listing Page**: A clone of the Apollo247 General Physician & Internal Medicine listing page
- **Filtering System**: Filter doctors by specialty, city, availability, gender, rating, experience, and language
- **Pagination**: Page through doctor results
- **REST APIs**: Backend APIs for adding doctors and listing doctors with filters
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes

## Installation

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/apollo-doctors-clone.git
cd apollo-doctors-clone
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

6. **Access the application**

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
apollo-doctors-clone/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   └── doctors/          # Doctor-related APIs
│   ├── specialties/          # Specialty pages
│   │   └── general-physician-internal-medicine/  # Main doctor listing page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page (redirects to doctor listing)
├── components/               # React components
│   ├── DoctorCard.tsx        # Doctor card component
│   ├── DoctorFilters.tsx     # Filter sidebar component
│   ├── Header.tsx            # Header component
│   └── Pagination.tsx        # Pagination component
├── public/                   # Static files
│   └── images/               # Image assets
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

## API Endpoints

### Add Doctor

- **URL**: `/api/doctors`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Dr. John Doe",
    "specialty": "General Physician",
    "qualification": "MBBS, MD",
    "experience": 10,
    "profileImageUrl": "/images/doctors/doctor1.jpg",
    "consultationFee": 800,
    "rating": 4.8,
    "reviewCount": 120,
    "city": "Mumbai",
    "area": "Andheri",
    "availableToday": true,
    "nextAvailability": "2023-05-15T14:30:00Z",
    "language": ["English", "Hindi"],
    "gender": "Male"
  }
  ```
- **Response**: The created doctor object with an `id`

### List Doctors with Filters

- **URL**: `/api/doctors`
- **Method**: `GET`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Results per page (default: 10)
  - `specialty`: Doctor specialty
  - `city`: Doctor city
  - `availableToday`: 'true' to show only doctors available today
  - `gender`: 'Male' or 'Female'
  - `minRating`: Minimum rating (e.g., 4.5)
  - `minExperience`: Minimum years of experience (e.g., 5)
  - `language`: Language spoken by the doctor
- **Response**:
  ```json
  {
    "doctors": [
      {
        "id": 1,
        "name": "Dr. John Doe",
        "specialty": "General Physician",
        "qualification": "MBBS, MD",
        "experience": 10,
        "profileImageUrl": "/images/doctors/doctor1.jpg",
        "consultationFee": 800,
        "rating": 4.8,
        "reviewCount": 120,
        "city": "Mumbai",
        "area": "Andheri",
        "availableToday": true,
        "nextAvailability": "2023-05-15T14:30:00Z",
        "language": ["English", "Hindi"],
        "gender": "Male"
      },
      // More doctors...
    ],
    "pagination": {
      "totalCount": 50,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
  ```
