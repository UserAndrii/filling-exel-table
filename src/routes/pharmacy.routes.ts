import multer from "multer";
import { Router } from "express";

import {
  createPharmacy,
  getAllPharmacies,
  getPharmacyById,
  updatePharmacy,
} from "../controllers/pharmacy.controller";

const router = Router();

/**
 * @swagger
 * /api/pharmacies:
 *   get:
 *     summary: Get all pharmacies
 *     tags: [Pharmacies]
 *     responses:
 *       200:
 *         description: List of pharmacies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "688d340c48cd147ca6a4aa8f"
 *                   city:
 *                     type: string
 *                     example: "Львів"
 *                   region:
 *                     type: string
 *                     example: "Львівська"
 *                   respondent:
 *                     type: string
 *                     example: "Вербовська Лілія Олексіївна"
 *                   pharmacyName:
 *                     type: string
 *                     example: "Аптека Копійка"
 *                   fullAddress:
 *                     type: string
 *                     example: "м.Львів,пр.Червоної Калини 64"
 *                   address:
 *                     type: string
 *                     example: "пр.Червоної Калини 64"
 *                   edrpou:
 *                     type: string
 *                     example: "39234989"
 *                   phone:
 *                     type: string
 *                     example: "063-030-1943"
 *                   experience:
 *                     type: string
 *                     example: "10+"
 *                   position:
 *                     type: string
 *                     example: "завідуюча аптеки"
 *                   ageCategory:
 *                     type: string
 *                     example: "31-45"
 *                   pharmacyType:
 *                     type: string
 *                     example: "Мережева аптека"
 *                   dailyPatients:
 *                     type: string
 *                     example: "20-30"
 *                   employeeCount:
 *                     type: string
 *                     example: "3-5 спеціалістів"
 */
router.get("/", getAllPharmacies);

/**
 * @swagger
 * /api/pharmacies/{id}:
 *   get:
 *     summary: Get a pharmacy by ID
 *     tags: [Pharmacies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the pharmacy
 *     responses:
 *       200:
 *         description: Pharmacy data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "688d340c48cd147ca6a4aa8f"
 *                 city:
 *                   type: string
 *                   example: "Львів"
 *                 region:
 *                   type: string
 *                   example: "Львівська"
 *                 respondent:
 *                   type: string
 *                   example: "Вербовська Лілія Олексіївна"
 *                 pharmacyName:
 *                   type: string
 *                   example: "Аптека Копійка"
 *                 fullAddress:
 *                   type: string
 *                   example: "м.Львів,пр.Червоної Калини 64"
 *                 address:
 *                   type: string
 *                   example: "пр.Червоної Калини 64"
 *                 edrpou:
 *                   type: string
 *                   example: "39234989"
 *                 phone:
 *                   type: string
 *                   example: "063-030-1943"
 *                 experience:
 *                   type: string
 *                   example: "10+"
 *                 position:
 *                   type: string
 *                   example: "завідуюча аптеки"
 *                 ageCategory:
 *                   type: string
 *                   example: "31-45"
 *                 pharmacyType:
 *                   type: string
 *                   example: "Мережева аптека"
 *                 dailyPatients:
 *                   type: string
 *                   example: "20-30"
 *                 employeeCount:
 *                   type: string
 *                   example: "3-5 спеціалістів"
 *       404:
 *         description: Pharmacy not found
 *       400:
 *         description: Invalid ID format
 */
router.get("/:id", getPharmacyById);

/**
 * @swagger
 * /api/pharmacies:
 *   post:
 *     summary: Create a new pharmacy
 *     tags: [Pharmacies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *                 example: "Львів"
 *               region:
 *                 type: string
 *                 example: "Львівська"
 *               respondent:
 *                 type: string
 *                 example: "Вербовська Лілія Олексіївна"
 *               pharmacyName:
 *                 type: string
 *                 example: "Аптека Копійка"
 *               fullAddress:
 *                 type: string
 *                 example: "м.Львів,пр.Червоної Калини 64"
 *               address:
 *                 type: string
 *                 example: "пр.Червоної Калини 64"
 *               edrpou:
 *                 type: string
 *                 example: "39234989"
 *               phone:
 *                 type: string
 *                 example: "063-030-1943"
 *               experience:
 *                 type: string
 *                 example: "10+"
 *               position:
 *                 type: string
 *                 example: "завідуюча аптеки"
 *               ageCategory:
 *                 type: string
 *                 example: "31-45"
 *               pharmacyType:
 *                 type: string
 *                 example: "Мережева аптека"
 *               dailyPatients:
 *                 type: string
 *                 example: "20-30"
 *               employeeCount:
 *                 type: string
 *                 example: "3-5 спеціалістів"
 *     responses:
 *       201:
 *         description: Pharmacy created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "688d340c48cd147ca6a4aa8f"
 *                 city:
 *                   type: string
 *                   example: "Львів"
 *                 region:
 *                   type: string
 *                   example: "Львівська"
 *                 respondent:
 *                   type: string
 *                   example: "Вербовська Лілія Олексіївна"
 *                 pharmacyName:
 *                   type: string
 *                   example: "Аптека Копійка"
 *                 fullAddress:
 *                   type: string
 *                   example: "м.Львів,пр.Червоної Калини 64"
 *                 address:
 *                   type: string
 *                   example: "пр.Червоної Калини 64"
 *                 edrpou:
 *                   type: string
 *                   example: "39234989"
 *                 phone:
 *                   type: string
 *                   example: "063-030-1943"
 *                 experience:
 *                   type: string
 *                   example: "10+"
 *                 position:
 *                   type: string
 *                   example: "завідуюча аптеки"
 *                 ageCategory:
 *                   type: string
 *                   example: "31-45"
 *                 pharmacyType:
 *                   type: string
 *                   example: "Мережева аптека"
 *                 dailyPatients:
 *                   type: string
 *                   example: "20-30"
 *                 employeeCount:
 *                   type: string
 *                   example: "3-5 спеціалістів"
 *       500:
 *         description: Server error
 */
router.post("/pharmacies", createPharmacy);

/**
 * @swagger
 * /api/pharmacies/{id}:
 *   patch:
 *     summary: Update a pharmacy by ID
 *     tags: [Pharmacies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pharmacy ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Only fields to update
 *             example:
 *               phone: "097-123-4567"
 *               experience: "5-10"
 *     responses:
 *       200:
 *         description: Pharmacy updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "688d340c48cd147ca6a4aa8f"
 *                 city:
 *                   type: string
 *                   example: "Львів"
 *                 region:
 *                   type: string
 *                   example: "Львівська"
 *                 respondent:
 *                   type: string
 *                   example: "Вербовська Лілія Олексіївна"
 *                 pharmacyName:
 *                   type: string
 *                   example: "Аптека Копійка"
 *                 fullAddress:
 *                   type: string
 *                   example: "м.Львів,пр.Червоної Калини 64"
 *                 address:
 *                   type: string
 *                   example: "пр.Червоної Калини 64"
 *                 edrpou:
 *                   type: string
 *                   example: "39234989"
 *                 phone:
 *                   type: string
 *                   example: "097-123-4567"
 *                 experience:
 *                   type: string
 *                   example: "5-10"
 *                 position:
 *                   type: string
 *                   example: "завідуюча аптеки"
 *                 ageCategory:
 *                   type: string
 *                   example: "31-45"
 *                 pharmacyType:
 *                   type: string
 *                   example: "Мережева аптека"
 *                 dailyPatients:
 *                   type: string
 *                   example: "20-30"
 *                 employeeCount:
 *                   type: string
 *                   example: "3-5 спеціалістів"
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Pharmacy not found
 *       500:
 *         description: Server error
 */

router.patch("/pharmacies/:id", updatePharmacy);

export default router;
