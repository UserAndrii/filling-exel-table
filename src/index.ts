import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { connectDB } from "./config/db";
import { setupSwagger } from "./docs/swagger";

import excelRoutes from "./routes/excel.routes";
import pharmacyRoutes from "./routes/pharmacy.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Pharmacy API!");
});

setupSwagger(app);

app.use("/api/excel", excelRoutes);
app.use("/api/pharmacies", pharmacyRoutes);

connectDB(process.env.MONGO_URI || "").then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `🚀 Server running on http://localhost:${process.env.PORT || 3000}`
    );
    console.log(
      `📚 Swagger docs on http://localhost:${process.env.PORT || 3000}/api-docs`
    );
  });
});
