const express = require("express");
require("dotenv").config(); // To access the environment variables
const path = require("path");
const cors = require("cors");

const connectDB = require("./config/dbconfig");
const userRouter = require("./routes/userRoute");
const movieRouter = require("./routes/movieRoute");
const theatreRouter = require("./routes/theatreRoute");
const showRouter = require("./routes/showRoute");
const bookingRouter = require("./routes/bookingRoute");

const app = express();
// app.use(
//   cors({
//     origin: "*", // Allow only your frontend origin
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true, // Allow credentials such as cookies, authorization headers
//   })
// );
app.use(
  cors({
    origin: "*", // Allow only your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const clientBuildPath = path.join(__dirname, "../client/build");
console.log(clientBuildPath);

app.use(express.static(clientBuildPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.use("/api/bookings/verify", express.raw({ type: "application/json" }));
app.use(express.json());
connectDB();

/** Routes */
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(8082, () => {
  console.log("Server is running on port 8082");
});
