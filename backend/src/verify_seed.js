require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const User = require('./models/User');
const Venue = require('./models/Venue');
const Ceremony = require('./models/Ceremony');
const connectDB = require('./config/database');

const verifyData = async () => {
    try {
        await connectDB();

        const userCount = await User.countDocuments();
        const venueCount = await Venue.countDocuments();
        const ceremonyCount = await Ceremony.countDocuments();

        console.log(`Users: ${userCount}`);
        console.log(`Venues: ${venueCount}`);
        console.log(`Ceremonies: ${ceremonyCount}`);

        if (userCount === 3 && venueCount === 3 && ceremonyCount === 4) {
            console.log('Verification SUCCESS');
        } else {
            console.log('Verification FAILED');
        }

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

verifyData();
