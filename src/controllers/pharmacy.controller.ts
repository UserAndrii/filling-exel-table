import mongoose from "mongoose";
import { Request, Response } from "express";
import { Pharmacy } from "../models/pharmacy.model";

export const getAllPharmacies = async (req: Request, res: Response) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getPharmacyById = async (req: any, res: any) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const pharmacy = await Pharmacy.findById(id);
    if (!pharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }
    res.json(pharmacy);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
