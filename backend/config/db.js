const mongoose = require("mongoose");
const dns = require("dns");

// Use public DNS servers globally (cached for all connections)
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);

const connectDB = async () => {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    console.error('MONGODB_URI is not defined in the environment.');
    process.exit(1);
  }

  const maxRetries = 3;
  let attempt = 0;
  const connectOptions = {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
  };

  while (attempt < maxRetries) {
    try {
      attempt += 1;
      const conn = await mongoose.connect(uri, connectOptions);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      const msg = error && error.message ? error.message : String(error);
      console.error(`MongoDB connection attempt ${attempt} failed: ${msg}`);

      // Common SRV DNS timeout - give a helpful hint
      if (msg.includes('querySrv') || msg.includes('ETIMEDOUT')) {
        console.error('DNS SRV lookup failed. Check network/DNS or try a non-SRV connection string.');
        console.error('You can test SRV lookup with:');
        console.error('  nslookup -type=SRV _mongodb._tcp.<your-cluster-host> 8.8.8.8');
      }

      if (attempt >= maxRetries) {
        console.error('All MongoDB connection attempts failed. Exiting.');
        process.exit(1);
      }

      // Wait before retrying (exponential backoff)
      const backoff = 1000 * Math.pow(2, attempt);
      await new Promise((res) => setTimeout(res, backoff));
    }
  }
};

module.exports = connectDB;