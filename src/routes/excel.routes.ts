import multer from "multer";
import express from "express";

import { uploadExcel } from "../controllers/excel.controller";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), uploadExcel);

export default router;
