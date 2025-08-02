import {
  extractLabeledCells,
  fillExcelWithPharmacyDataExcelJS,
} from "../services/excel.service";

export const uploadExcel = async (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).json({ error: "File was not sent" });
  }

  try {
    const result = extractLabeledCells(req.file.buffer);

    if (result.length === 0) {
      return res.status(400).json({
        error:
          "No labeled cells found in Excel file. Make sure cells contain labels starting with '@'",
      });
    }

    let markerFieldNames: string[] = [];

    if (Array.isArray(req.body.markerFieldNames)) {
      markerFieldNames = req.body.markerFieldNames;
    } else if (typeof req.body.markerFieldNames === "string") {
      markerFieldNames = req.body.markerFieldNames.split(",");
    } else if (typeof req.query.markerFieldNames === "string") {
      markerFieldNames = req.query.markerFieldNames.split(",");
    }

    const fileBuffer = await fillExcelWithPharmacyDataExcelJS(
      req.file.buffer,
      result,
      markerFieldNames.map((f) => f.trim())
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=filled-pharmacies.xlsx"
    );
    res.setHeader("Content-Length", fileBuffer.length);
    res.send(fileBuffer);
  } catch (error) {
    console.error("Excel processing error:", error);
    return res.status(500).json({
      error: "Excel file processing error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
