# Excel Pharmacy Data Filling API

RESTful API service for automatically filling Excel files with pharmacy data from MongoDB database.

## Features

- 📋 Extract labeled cells from Excel files (e.g., `@address`, `@phone`, `@respondent`)
- 🏥 Fill Excel sheets with pharmacy data from MongoDB
- 📊 Support for multiple Excel worksheets
- 🔍 Advanced marker field matching functionality
- 📁 Direct file download from API
- 🔗 Full pharmacy CRUD operations

## API Endpoints

### Excel Processing

#### `POST /api/excel/upload`

Upload and process Excel file with pharmacy data.

**Request:**

- **Content-Type:** `multipart/form-data`
- **Body:**
  - `file` (required): Excel file with labeled cells
  - `markerFieldNames` (optional): Array of field names for marker matching

**Example using Postman:**

```
POST http://localhost:3000/api/excel/upload
Body: form-data
- file: your-excel-file.xlsx
- markerFieldNames: experience,position,ageCategory
```

**Response:** Excel file download with filled pharmacy data

**Labeled Cells Format:**
Your Excel file should contain cells with labels starting with `@`:

- `@city` - Pharmacy city
- `@region` - Pharmacy region
- `@respondent` - Responsible person name
- `@pharmacyName` - Pharmacy name
- `@fullAddress` - Pharmacy full address
- `@address` - Pharmacy address
- `@edrpou` - EDRPOU code
- `@phone` - Phone number
- `@experience` - Work experience
- `@position` - Position title
- `@ageCategory` - Age category
- `@pharmacyType` - The pharmacy type
- `@dailyPatients` - Daily patients count
- `@employeeCount` - Pharmacy employee count

### Pharmacy Management

#### `GET /api/pharmacies`

Get all pharmacies from database.

**Response:**

```json
[
  {
    "_id": "123",
    "city": "Львів",
    "region": "Львівська",
    "respondent": "Вербовська Лілія Олексіївна",
    "pharmacyName": "Аптека Копійка",
    "fullAddress": "м.Львів, пр.Червоної Калини 64",
    "address": "пр.Червоної Калини 64",
    "edrpou": "39234989",
    "phone": "063-030-1943",
    "experience": "10+",
    "position": "завідуюча аптеки",
    "ageCategory": "31-45",
    "pharmacyType": "Мережева аптека",
    "dailyPatients": "20-30",
    "employeeCount": "більше 5"
  }
]
```

#### `GET /api/pharmacies/:id`

Get specific pharmacy by MongoDB ObjectId.

**Parameters:**

- `id` - MongoDB ObjectId

**Response:** Single pharmacy object or 404 if not found.

#### `POST /api/pharmacies`

Create Pharmacy

**Request:**

- **Content-Type:** `application/json`
- **Body:**

```json
{
  "city": "Львів",
  "region": "Львівська",
  "respondent": "Вербовська Лілія Олексіївна",
  "pharmacyName": "Аптека Копійка",
  "address": "м.Львів, пр.Червоної Калини 64",
  "edrpou": "39234989",
  "phone": "063-030-1943",
  "experience": "10+",
  "position": "завідуюча аптеки",
  "ageCategory": "31-45",
  "pharmacyType": "Мережева аптека",
  "dailyPatients": "20-30",
  "employeeCount": "3-5 спеціалістів"
}
```

**Response:** Single pharmacy object

#### `PATCH /api/pharmacies/:id`

Update the existing pharmacy using MongoDB ObjectId. Only the fields that need to be updated can be transferred.

**Parameters:**

- `id` — MongoDB ObjectId

**Request:**

- **Content-Type:** `application/json`
- **Body (example):**

```json
{
  "phone": "097-123-4567",
  "experience": "5-10"
}
```

**Response:** Single pharmacy object

## Response Status Codes

| Code | Description           |
| ---- | --------------------- |
| 201  | Pharmacy created      |
| 200  | Pharmacy updated      |
| 400  | Invalid format ID     |
| 404  | Pharmacy not found    |
| 500  | Internal server error |

## How It Works

1. **Upload Excel File** with labeled cells (e.g., `@address`, `@phone`)
2. **System automatically:**
   - Extracts all labeled cells from all worksheets
   - Fetches pharmacy data from MongoDB
   - Maps each worksheet to corresponding pharmacy data
   - Fills labeled cells with actual pharmacy information
   - Applies marker field matching if specified
   - Returns processed Excel file for download

## Core Services

### `extractLabeledCells(buffer: Buffer)`

```typescript
// Returns array of found labeled cells with sheet information
[
  { cell: "B4", value: "@respondent", sheetName: "Sheet1" },
  { cell: "D8", value: "@phone", sheetName: "Sheet1" },
  { cell: "F15", value: "@address", sheetName: "Sheet1" },
];
```

### `fillExcelWithPharmacyDataExcelJS(buffer, labeledCells, markerFieldNames)`

- Fills Excel file with pharmacy data using ExcelJS library
- Supports advanced cell formatting
- Handles marker field matching for special requirements
- Returns processed file as Buffer

## Marker Field Names Feature

Optional parameter that allows special matching logic:

- Searches for pharmacy field values within worksheet cells
- When found, marks the left adjacent cell with "1"
- Useful for survey-style forms or questionnaires

**Example:**
If `markerFieldNames: ['experience']` and pharmacy has `experience: "10+"`, the system will:

1. Search all cells for text containing "10+"
2. Mark the cell to the left with "1"

## Technology Stack

- **Backend:** Node.js + TypeScript + Express
- **Database:** MongoDB + Mongoose
- **Excel Processing:** SheetJS (XLSX) + ExcelJS
- **File Upload:** Multer
- **Documentation:** Swagger

## Usage Examples

### Basic Excel Processing

```bash
curl -X POST http://localhost:3000/api/excel/upload \
  -F "file=@pharmacy-template.xlsx"
```

### With Marker Fields

```bash
curl -X POST http://localhost:3000/api/excel/upload \
  -F "file=@pharmacy-template.xlsx" \
  -F "markerFieldNames=experience,position,ageCategory"
```

### Get All Pharmacies

```bash
curl http://localhost:3000/api/pharmacies
```

### Get Specific Pharmacy

```bash
curl http://localhost:3000/api/pharmacies/64f1234567890abcdef12345
```

## Error Handling

The API provides comprehensive error handling:

- **400**: Invalid file format or missing labeled cells
- **404**: Pharmacy not found (for specific ID requests)
- **500**: Server errors with detailed error messages

## Response Headers

For Excel file downloads:

```
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename=filled-pharmacies.xlsx
Content-Length: [file-size]
```
