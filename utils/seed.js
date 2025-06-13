require('dotenv').config({ path: '../.env' });
const connectDB = require('../config/database');
const seedDatabase = require('./seedData');

async function init() {
    try {
        console.log('Connecting to MongoDB Atlas...');
        await connectDB();
        
        console.log('Starting data seeding...');
        await seedDatabase();
        
        console.log('✅ Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

init();