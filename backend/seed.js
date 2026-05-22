const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const email = 'kholofelo.makhubepetsi@ump.ac.za';
    const password = 'Kholo@2021';
       //CFERI_Admin_2026
    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    
    if (admin) {
      console.log('ℹ️ Admin exists, updating password...');
      admin.password = password; // Will be hashed by pre-save hook
      await admin.save();
      console.log('✅ Admin password updated!');
    } else {
      // Create new admin
      admin = new Admin({
        name: 'Admin User',
        email,
        password
      });
      await admin.save();
      console.log('✅ Admin created successfully!');
    }
    
    console.log('Email:', email);
    console.log('Password:', password);
    
    await mongoose.disconnect();
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

createAdmin();