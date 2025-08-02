import multer from "multer";
import { Router } from "express";

import {
  getAllPharmacies,
  getPharmacyById,
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
 *                   region:
 *                     type: string
 *                     example: "Львівська"
 *                   respondent:
 *                     type: string
 *                     example: "Вербовська Лілія Олексіївна"
 *                   pharmacyName:
 *                     type: string
 *                     example: "Аптека Копійка"
 *                   address:
 *                     type: string
 *                     example: "м.Львів,пр.Червоної Калини 64"
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
 *                   networkPharmacy:
 *                     type: boolean
 *                     example: true
 *                   dailyPatients:
 *                     type: string
 *                     example: "20-30"
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
 *                 region:
 *                   type: string
 *                   example: "Львівська"
 *                 respondent:
 *                   type: string
 *                   example: "Вербовська Лілія Олексіївна"
 *                 pharmacyName:
 *                   type: string
 *                   example: "Аптека Копійка"
 *                 address:
 *                   type: string
 *                   example: "м.Львів,пр.Червоної Калини 64"
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
 *                 networkPharmacy:
 *                   type: boolean
 *                   example: true
 *                 dailyPatients:
 *                   type: string
 *                   example: "20-30"
 *       404:
 *         description: Pharmacy not found
 *       400:
 *         description: Invalid ID format
 */
router.get("/:id", getPharmacyById);

export default router;
