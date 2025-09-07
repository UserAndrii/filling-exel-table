import { Schema, model } from "mongoose";

const pharmacySchema = new Schema({
  city: String,
  region: String,
  respondent: String,
  pharmacyName: String,
  fullAddress: String,
  address: String,
  edrpou: String,
  phone: String,
  experience: String,
  position: String,
  ageCategory: String,
  pharmacyType: String,
  dailyPatients: String,
  employeeCount: String,
  institutionType: String,
  institutionName: String,
  dosageForm: String,
  manufacturer: String,
});

export const Pharmacy = model("Pharmacy", pharmacySchema, "pharmacies_lviv");
