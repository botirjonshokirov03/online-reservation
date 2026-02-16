# Tisky - Online Reservation System

A full-stack online event ticketing platform built with Node.js, Express, MongoDB, Next.js, TypeScript, and Tailwind CSS.

## Features

### Backend
- **Authentication & Authorization**: JWT-based authentication with role-based access (admin/user)
- **User Management**: Register, login, profile management
- **Ceremony Management**: Admins can create and manage ceremonies/events
- **Ticket System**: Multiple ticket types (fan-zone, balcony, VIP, standard) with inventory tracking
- **Transaction Processing**: Complete purchase flow with transaction history
- **RESTful API**: Well-structured API endpoints with proper error handling

### Frontend
- **Modern UI/UX**: Beautiful, responsive design with light/dark mode
- **Landing Page**: Hero section, features, upcoming events
- **Event Browsing**: Browse all ceremonies with filtering
- **Shopping Cart**: Add tickets to cart with quantity management
- **Wishlist**: Save favorite events (requires login)
- **User Profile**: View purchased tickets and transaction history
- **Authentication**: Login and registration pages
- **State Management**: Zustand for cart, wishlist, and auth with persistence

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Axios (API calls)
- next-themes (dark mode)
- React Icons
- Swiper (carousels)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update MongoDB URI if needed
- Change JWT_SECRET in production

4. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- The `.env.local` file is already configured for local development
- Update `NEXT_PUBLIC_API_URL` if your backend runs on a different port

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Ceremonies
- `GET /api/ceremonies` - Get all ceremonies
- `GET /api/ceremonies/upcoming` - Get upcoming ceremonies
- `GET /api/ceremonies/:id` - Get ceremony by ID
- `POST /api/ceremonies` - Create ceremony (admin only)
- `PUT /api/ceremonies/:id` - Update ceremony (admin only)
- `DELETE /api/ceremonies/:id` - Delete ceremony (admin only)

### Tickets
- `GET /api/tickets/ceremony/:ceremonyId` - Get tickets for a ceremony
- `GET /api/tickets/:id` - Get ticket by ID
- `POST /api/tickets` - Create ticket (admin only)
- `PUT /api/tickets/:id` - Update ticket (admin only)
- `DELETE /api/tickets/:id` - Delete ticket (admin only)

### Transactions
- `POST /api/transactions` - Create transaction (protected)
- `GET /api/transactions/my-transactions` - Get user's transactions (protected)
- `GET /api/transactions/:id` - Get transaction by ID (protected)
- `GET /api/transactions` - Get all transactions (admin only)
- `PUT /api/transactions/:id` - Update transaction status (admin only)

## User Roles

### Admin
- Create and manage ceremonies
- Create and manage tickets
- View all transactions
- All user permissions

### User
- Browse ceremonies
- Purchase tickets
- View profile and purchased tickets
- Add items to cart and wishlist

## Project Structure

```
online-reservation/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── ceremonyController.js
│   │   │   ├── ticketController.js
│   │   │   └── transactionController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Ceremony.js
│   │   │   ├── Ticket.js
│   │   │   └── Transaction.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── ceremonyRoutes.js
│   │   │   ├── ticketRoutes.js
│   │   │   └── transactionRoutes.js
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   └── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── app/
    │   ├── app/
    │   │   └── page.tsx
    │   ├── cart/
    │   │   └── page.tsx
    │   ├── login/
    │   │   └── page.tsx
    │   ├── profile/
    │   │   └── page.tsx
    │   ├── register/
    │   │   └── page.tsx
    │   ├── wishlist/
    │   │   └── page.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── Footer.tsx
    │   ├── Navbar.tsx
    │   ├── ThemeProvider.tsx
    │   └── ThemeToggle.tsx
    ├── lib/
    │   └── api.ts
    ├── store/
    │   ├── authStore.ts
    │   ├── cartStore.ts
    │   └── wishlistStore.ts
    ├── public/
    │   └── images/
    ├── .env.local
    └── package.json
```

## Features to Implement Next

- Admin dashboard for managing ceremonies and tickets
- Payment gateway integration
- Email notifications
- QR code generation for tickets
- Ceremony details page with ticket selection
- Search and filter functionality
- Reviews and ratings
- Mobile app version

## Contributing

This is a student project. Feel free to fork and modify as needed.

## License

MIT
