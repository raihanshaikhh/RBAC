import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/mongo-db.js"
import authRoutes from "./src/routes/authRoutes.js";
import roleMiddleware from "./src/middlewares/roleMiddleware.js";
import authMiddleware from "./src/middlewares/authMiddleware.js";
import projectRoutes from "./src/routes/projectRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get(
  "/api/admin-test",
  authMiddleware,
  roleMiddleware(["Admin"]),
  (req, res) => {
    res.json({
      message: "Welcome Admin!",
      user: req.user
    });
  }
);


app.get("/", (req, res) => {
  res.json({
    message: "RBAC API is running"
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start");
  }
};

startServer();