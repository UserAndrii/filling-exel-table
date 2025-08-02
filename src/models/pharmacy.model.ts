import { Schema, model } from "mongoose";

const pharmacySchema = new Schema({
  region: String,
  respondent: String,
  pharmacyName: String,
  address: String,
  edrpou: String,
  phone: String,
  experience: String,
  position: String,
  ageCategory: String,
  networkPharmacy: Boolean,
  dailyPatients: String,
});

export const Pharmacy = model("Pharmacy", pharmacySchema, "pharmacies_lviv");
