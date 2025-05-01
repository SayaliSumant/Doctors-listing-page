# Apollo247 Doctors Listing Clone

This project is a clone of the Apollo247 doctors listing page, focusing on the General Physician & Internal Medicine specialty. It's built with Next.js and includes a backend with REST APIs for managing doctor data.

## Features

- **Doctor Listing Page**: A clone of the Apollo247 General Physician & Internal Medicine listing page
- **Filtering System**: Filter doctors by specialty, city, availability, gender, rating, experience, and language
- **Pagination**: Page through doctor results
- **REST APIs**: Backend APIs for adding doctors and listing doctors with filters
- **SEO Optimized**: Includes Next-SEO for better search engine visibility
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **SEO**: Next-SEO

## Installation

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- PostgreSQL database

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

3. **Set up the environment variables**

Create a `.env` file in the root directory with the following content:

```
DATABASE_URL="postgresql://username:password@localhost:5432/apollo_clone"
```

Replace `username`, `password` with your database credentials.

4. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Push the database schema
npx prisma db push

# Seed the database with sample data
npx prisma db seed
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
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page (redirects to doctor listing)
├── components/               # React components
│   ├── DoctorCard.tsx        # Doctor card component
│   ├── DoctorFilters.tsx     # Filter sidebar component
│   ├── Header.tsx            # Header component
│   └── Pagination.tsx        # Pagination component
├── prisma/                   # Prisma ORM files
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seed script
├── public/                   # Static files
│   └── images/               # Image assets
├── .env                      # Environment variables
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
├── tailwind.config.js        # Tailwind CSS configuration
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

## SEO Implementation

This project implements several SEO best practices:

1. **Meta Tags**: Using Next-SEO to add proper title, description, and OpenGraph tags
2. **Semantic HTML**: Using proper heading hierarchy and semantic elements
3. **Canonical URLs**: Setting canonical URLs to prevent duplicate content
4. **Responsive Design**: Ensuring the site works well on all devices
5. **Sitemap Generation**: Automatic sitemap generation with next-sitemap
6. **Robots.txt**: Custom robots.txt configuration
7. **Image Optimization**: Using Next.js Image component for optimized loading
8. **Performance**: Optimized for Core Web Vitals and fast loading

## Off-Page SEO Strategies

To improve off-page SEO for this Apollo247 clone, consider implementing the following strategies:

1. **Backlink Building**:
   - Reach out to health blogs and medical directories for link placement
   - Create shareable medical content that naturally attracts backlinks
   - Guest posting on relevant healthcare websites

2. **Social Media Presence**:
   - Create and maintain profiles on Facebook, Twitter, LinkedIn, and Instagram
   - Share doctor profiles, health tips, and promotions regularly
   - Encourage patients to share their positive experiences

3. **Local SEO**:
   - Create and optimize Google My Business listings for each clinic location
   - Ensure consistent NAP (Name, Address, Phone) information across all platforms
   - Encourage patient reviews on Google, Practo, and other health platforms

4. **Content Marketing**:
   - Create a health blog with valuable medical information
   - Develop downloadable health guides and resources
   - Host webinars with doctors on common health topics

5. **Influencer Partnerships**:
   - Collaborate with health influencers and medical professionals
   - Invite guest doctors to write for your blog
   - Partner with health-related brands for co-marketing opportunities

6. **Structured Data**:
   - Implement Schema.org markup for doctors, medical organizations, and services
   - Add FAQ schema for common questions
   - Use review schema to showcase positive patient feedback

7. **Mobile Optimization**:
   - Ensure the site is fully responsive and mobile-friendly
   - Optimize for voice search with conversational keywords
   - Improve page speed for better mobile experience

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project is inspired by Apollo247's doctor listing page
- Thanks to the Next.js and Prisma teams for their excellent documentation