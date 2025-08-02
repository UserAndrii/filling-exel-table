import multer from "multer";
import express from "express";

import { uploadExcel } from "../controllers/excel.controller";

const router = express.Router();
const upload = multer();

/**
 * @swagger
 * /api/excel/upload:
 *   post:
 *     summary: Upload and process Excel file with pharmacy data
 *     tags: [Excel Processing]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: Excel file (.xlsx) containing labeled cells (e.g., @address, @phone, @respondent)
 *       - in: formData
 *         name: markerFieldNames
 *         type: string
 *         required: false
 *         description: Comma-separated list of field names for marker matching (e.g., "experience,position,ageCategory")
 *         example: "experience,position,ageCategory"
 *     responses:
 *       200:
 *         description: Successfully processed Excel file
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Type:
 *             description: Excel file MIME type
 *             schema:
 *               type: string
 *               example: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
 *           Content-Disposition:
 *             description: File attachment header
 *             schema:
 *               type: string
 *               example: "attachment; filename=filled-pharmacies.xlsx"
 *           Content-Length:
 *             description: File size in bytes
 *             schema:
 *               type: integer
 *               example: 15432
 *       400:
 *         description: Bad request - file not provided or no labeled cells found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   examples:
 *                     no_file:
 *                       value: "File was not sent"
 *                       summary: No file provided
 *                     no_labels:
 *                       value: "No labeled cells found in Excel file. Make sure cells contain labels starting with '@'"
 *                       summary: No labeled cells found
 *       500:
 *         description: Internal server error during Excel processing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Excel file processing error"
 *                 details:
 *                   type: string
 *                   example: "No pharmacies found in the database"
 *     description: |
 *       This endpoint processes Excel files containing labeled cells and fills them with pharmacy data from MongoDB.
 *
 *       **Supported labeled cells:**
 *       - `@region` - Pharmacy region
 *       - `@respondent` - Responsible person name
 *       - `@pharmacyName` - Pharmacy name
 *       - `@address` - Pharmacy address
 *       - `@edrpou` - EDRPOU code
 *       - `@phone` - Phone number
 *       - `@experience` - Work experience
 *       - `@position` - Position title
 *       - `@ageCategory` - Age category
 *       - `@networkPharmacy` - Network pharmacy (true/false)
 *       - `@dailyPatients` - Daily patients count
 *
 *       **How it works:**
 *       1. Upload Excel file with labeled cells (cells containing text starting with '@')
 *       2. System extracts all labeled cells from all worksheets
 *       3. Fetches pharmacy data from MongoDB
 *       4. Each worksheet gets filled with data from corresponding pharmacy
 *       5. If `markerFieldNames` provided, system searches for those field values in cells and marks adjacent cells
 *       6. Returns processed Excel file ready for download
 *
 *       **Marker Fields Feature:**
 *       When `markerFieldNames` parameter is provided, the system will:
 *       - Search all worksheet cells for text containing pharmacy field values
 *       - When found, mark the cell to the left with "1"
 *       - Useful for survey-style forms or questionnaires
 *
 *       **Example Usage:**
 *       - Basic: Upload file with labeled cells
 *       - Advanced: Upload file + markerFieldNames="experience,position" to enable marker matching
 */
router.post("/upload", upload.single("file"), uploadExcel);

export default router;
