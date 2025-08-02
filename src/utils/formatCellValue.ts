import ExcelJS from "exceljs";

export const formatCellValue = (value: any): ExcelJS.CellValue => {
  if (value instanceof Date) return value;
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  )
    return value;
  if (typeof value === "object" && value !== null && value.toString)
    return value.toString();
  return "";
};
