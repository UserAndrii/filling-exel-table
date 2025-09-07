import * as XLSX from "xlsx";
import * as ExcelJS from "exceljs";

import { Pharmacy } from "../models/pharmacy.model";
import { formatCellValue } from "../utils/formatCellValue";
import { normalizeStringValue } from "../utils/normalizeStringValue";

export interface CellMatch {
  cell: string;
  value: string;
  sheetName: string;
}

export const extractLabeledCells = (buffer: Buffer): CellMatch[] => {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const result: CellMatch[] = [];

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    let sheetLabels = 0;

    for (const cellAddress in worksheet) {
      if (cellAddress[0] === "!") continue;
      const cellValue = worksheet[cellAddress].v;

      if (typeof cellValue === "string" && cellValue.startsWith("@")) {
        result.push({
          cell: cellAddress,
          value: cellValue,
          sheetName: sheetName,
        });
        sheetLabels++;
      }
    }
  });
  return result;
};

export const fillExcelWithPharmacyDataExcelJS = async (
  buffer: Buffer,
  labeledCells: CellMatch[],
  markerFieldNames: string[] = []
): Promise<Buffer> => {
  const pharmacies = await Pharmacy.find();

  if (pharmacies.length === 0) {
    throw new Error("No pharmacies found in the database");
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const firstSheetName = workbook.worksheets[0].name;
  const firstSheetCells = labeledCells.filter(
    (cell) => cell.sheetName === firstSheetName
  );

  const cellMap: Record<string, string> = {};
  firstSheetCells.forEach(({ cell, value }) => {
    const fieldName = value.substring(1);
    cellMap[fieldName] = cell;
  });

  workbook.worksheets.forEach((worksheet, index) => {
    if (index >= pharmacies.length) return;

    const rawPharmacy = pharmacies[index].toObject();
    const { _id, __v, ...pharmacy } = rawPharmacy;

    Object.entries(pharmacy).forEach(([fieldName, fieldValue]) => {
      if (
        cellMap[fieldName] &&
        (typeof fieldValue === "string" ||
          typeof fieldValue === "number" ||
          typeof fieldValue === "boolean") &&
        fieldValue !== ""
      ) {
        const cellAddress = cellMap[fieldName];
        const cell = worksheet.getCell(cellAddress);
        cell.value = formatCellValue(fieldValue);
      }
    });

    markerFieldNames.forEach((markerFieldName) => {
      const markerValue = (pharmacy as any)[markerFieldName];
      if (
        markerValue === null ||
        markerValue === undefined ||
        markerValue === ""
      ) {
        return;
      }

      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
          const cellVal = cell.value;
          if (
            typeof cellVal === "string" &&
            normalizeStringValue(cellVal) ===
              normalizeStringValue(String(markerValue))
          ) {
            if (colNumber > 1) {
              const leftCell = worksheet.getCell(rowNumber, colNumber - 1);
              leftCell.value = "1";
            }
          }
        });
      });
    });
  });

  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
};
