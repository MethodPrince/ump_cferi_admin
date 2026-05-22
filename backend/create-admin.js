const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const dns = require('dns');

// Use public DNS servers for MongoDB Atlas
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);

dotenv.config();

const createAdminDirect = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get the admin collection directly
    const db = mongoose.connection.db;
    const collection = db.collection('admins');

    const normalizedEmail = 'kholofelo.makhubepetsi@ump.ac.za';

    // Check if admin exists (case-insensitive lookup)
    const existing = await collection.findOne({ email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') } });
    
    if (existing) {
      console.log('✅ Admin already exists!');
      console.log('Email:', normalizedEmail);
      console.log('Password: Kholo@2021');
      await mongoose.disconnect();
      process.exit();
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Kholo@2021', salt);

    // Create admin with normalized email
    await collection.insertOne({
      name: 'Admin User',
      email: normalizedEmail,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('✅ Admin created successfully!');
    console.log('Email:', normalizedEmail);
    console.log('Password: Kholo@2021');
    
    await mongoose.disconnect();
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

createAdminDirect();