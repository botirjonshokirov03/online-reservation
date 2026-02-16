require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

// Fix DNS issue for MongoDB Atlas
dns.setServers(['8.8.8.8', '8.8.4.4']);

const User = require('./models/User');
const Venue = require('./models/Venue');
const Ceremony = require('./models/Ceremony');
const connectDB = require('./config/database');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        phone: '1234567890',
    },
    {
        name: 'John Doe',
        email: 'user1@example.com',
        password: 'password123',
        role: 'user',
        phone: '0987654321',
    },
    {
        name: 'Jane Smith',
        email: 'user2@example.com',
        password: 'password123',
        role: 'user',
        phone: '1122334455',
    },
];

const venues = [
    {
        name: 'Grand Stadium',
        type: 'stadium',
        location: '123 Stadium Dr',
        description: 'A massive stadium for large events.',
        totalCapacity: 50000,
        sections: [
            { name: 'VIP', capacity: 1000, basePrice: 200, color: '#FFD700' },
            { name: 'Premium', capacity: 5000, basePrice: 100, color: '#C0C0C0' },
            { name: 'General', capacity: 44000, basePrice: 50, color: '#CD7F32' },
        ],
        image: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6d?auto=format&fit=crop&w=1350&q=80',
    },
    {
        name: 'City Theater',
        type: 'theater',
        location: '456 Artsy Ave',
        description: 'Historic theater with great acoustics.',
        totalCapacity: 2000,
        sections: [
            { name: 'Orchestra', capacity: 800, basePrice: 80, color: '#FF4500' },
            { name: 'Mezzanine', capacity: 600, basePrice: 60, color: '#32CD32' },
            { name: 'Balcony', capacity: 600, basePrice: 40, color: '#1E90FF' },
        ],
        image: 'https://images.unsplash.com/photo-1503095392237-fa26b210f871?auto=format&fit=crop&w=1350&q=80',
    },
    {
        name: 'Community Hall',
        type: 'hall',
        location: '789 Local Ln',
        description: 'Perfect for intimate gatherings.',
        totalCapacity: 500,
        sections: [
            { name: 'Main Hall', capacity: 500, basePrice: 20, color: '#8A2BE2' },
        ],
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1350&q=80',
    },
];

const importData = async () => {
    try {
        await connectDB();

        console.log('Clearing existing data...');
        await User.deleteMany();
        await Venue.deleteMany();
        await Ceremony.deleteMany();

        console.log('Importing Users...');
        const createdUsers = await User.create(users);
        const adminUser = createdUsers[0];

        console.log('Importing Venues...');
        const createdVenues = await Venue.create(venues);

        console.log('Importing Ceremonies...');
        const ceremonies = [
            {
                title: 'Summer Music Festival',
                description: 'The biggest music event of the summer!',
                image: 'https://images.unsplash.com/photo-1459749411177-043fef8c7285?auto=format&fit=crop&w=1350&q=80',
                date: new Date('2026-07-15'),
                time: '18:00',
                location: createdVenues[0].location,
                venue: createdVenues[0]._id,
                sectionPricing: createdVenues[0].sections.map(section => ({
                    sectionId: section._id,
                    sectionName: section.name,
                    price: section.basePrice * 1.5, // 50% markup for this event
                    availableTickets: section.capacity,
                    soldTickets: 0,
                })),
                maxAttendees: createdVenues[0].totalCapacity,
                createdBy: adminUser._id,
                status: 'upcoming',
            },
            {
                title: 'Modern Art Gala',
                description: 'A night of fine art and networking.',
                image: 'https://images.unsplash.com/photo-1518998053901-5348d3969105?auto=format&fit=crop&w=1350&q=80',
                date: new Date('2026-09-20'),
                time: '19:30',
                location: createdVenues[1].location,
                venue: createdVenues[1]._id,
                sectionPricing: createdVenues[1].sections.map(section => ({
                    sectionId: section._id,
                    sectionName: section.name,
                    price: section.basePrice * 2,
                    availableTickets: section.capacity,
                    soldTickets: 0,
                })),
                maxAttendees: createdVenues[1].totalCapacity,
                createdBy: adminUser._id,
                status: 'upcoming',
            },
            {
                title: 'Winter Classic',
                description: 'Annual winter sports event.',
                image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&w=1350&q=80',
                date: new Date('2025-12-10'),
                time: '14:00',
                location: createdVenues[0].location,
                venue: createdVenues[0]._id,
                sectionPricing: createdVenues[0].sections.map(section => ({
                    sectionId: section._id,
                    sectionName: section.name,
                    price: section.basePrice,
                    availableTickets: 0, // Sold out or past
                    soldTickets: section.capacity,
                })),
                maxAttendees: createdVenues[0].totalCapacity,
                createdBy: adminUser._id,
                status: 'completed',
            },
            {
                title: 'Tech Conference 2023',
                description: 'Innovation and technology summit.',
                image: 'https://images.unsplash.com/photo-1544531696-60c35eb84b6f?auto=format&fit=crop&w=1350&q=80',
                date: new Date('2023-05-05'),
                time: '09:00',
                location: createdVenues[2].location,
                venue: createdVenues[2]._id,
                sectionPricing: createdVenues[2].sections.map(section => ({
                    sectionId: section._id,
                    sectionName: section.name,
                    price: section.basePrice,
                    availableTickets: 0,
                    soldTickets: section.capacity,
                })),
                maxAttendees: createdVenues[2].totalCapacity,
                createdBy: adminUser._id,
                status: 'completed',
            },
        ];

        await Ceremony.create(ceremonies);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
