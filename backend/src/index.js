const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const { PORT, NODE_ENV, APP_ORIGIN } = require("./constants/envConstants");
const { connectToDatabase } = require("./config/db");

const authRoutes = require("./routes/auth.route");
const eventRoutes = require("./routes/event.route");
const userRoutes = require("./routes/user.route");
const { authenticate } = require("./middleware/authenticate");

const app = express();

app.use(
  cors({
    origin: APP_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// just for testing purpose
app.get("/", (_, res) => {
  return res.status(200).json({
    status: "healthy",
  });
});

app.use("/auth", authRoutes);
app.use("/event", authenticate, eventRoutes);
app.use("/user", authenticate, userRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on Port ${PORT} in ${NODE_ENV} enviroment`);
  await connectToDatabase();
});
