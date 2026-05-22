const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const dns = require("dns");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

// Use public DNS resolvers for MongoDB Atlas SRV lookup
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

dotenv.config();
const http = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: false,
}));
app.use(express.json({ limit: '10mb' }));

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use('/uploads/newsletter', express.static(path.join(__dirname, 'public', 'newsletter')));
app.use('/uploads/slides', express.static(path.join(__dirname, 'public', 'slides')));
app.use('/uploads/partners', express.static(path.join(__dirname, 'public', 'partners')));

app.get("/", (req, res) => {
  res.send("UMP CFERI Backend Running...");
});

// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/businesses", require("./routes/businessRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/mentors", require("./routes/mentorRoutes"));
app.use("/api/slides", require("./routes/slideRoutes"));
app.use("/api/programs", require("./routes/programRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/partners", require("./routes/partnerRoutes"));
app.use("/api/pages", require("./routes/pageRoutes"));
app.use("/api/settings", require("./routes/settingRoutes"));
app.use("/api/newsletter", require("./routes/newsletterRoutes"));

// Serve React app for all other routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const PORT = parseInt(process.env.PORT, 10) || 5000;

const createAndStartServer = (port) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: false,
    },
    transports: ['websocket', 'polling'],
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use.`);
      // Try next port up to a few attempts
      const next = port + 1;
      if (next <= port + 5) {
        console.log(`Attempting to listen on port ${next} instead...`);
        // Delay slightly before retrying
        setTimeout(() => createAndStartServer(next), 200);
        return;
      }
      console.error('No available ports found. Exiting.');
      process.exit(1);
    }
    console.error('Server error:', err);
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  return server;
};

const ensureAdminUser = async () => {
  try {
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      const email = process.env.DEFAULT_ADMIN_EMAIL || 'kholofelo.makhubepetsi@ump.ac.za';
      const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Kholo@2021';
      const admin = new Admin({
        name: 'Admin User',
        email,
        password,
      });
      await admin.save();
      console.log(`✅ Created default admin user: ${email}`);
    }
  } catch (error) {
    console.error('Failed to create default admin user:', error.message);
  }
};

// Connect to the database before starting the server
connectDB().then(async () => {
  await ensureAdminUser();
  createAndStartServer(PORT);
});