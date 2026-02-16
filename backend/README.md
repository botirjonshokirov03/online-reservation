# Tisky Backend API

RESTful API for the Tisky online event ticketing platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

3. Start development server:
```bash
npm run dev
```

4. Start production server:
```bash
npm start
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT expiration time (default: 7d)
- `NODE_ENV` - Environment (development/production)

## API Documentation

See main README.md for complete API endpoint documentation.

## Models

### User
- name, email, password, role (user/admin), avatar, phone

### Ceremony
- title, description, image, date, time, location, maxAttendees, currentAttendees, status, createdBy

### Ticket
- ceremony, type (fan-zone/balcony/vip/standard), price, totalQuantity, availableQuantity, section, row, benefits

### Transaction
- user, ceremony, tickets[], totalAmount, status, paymentMethod, transactionId
