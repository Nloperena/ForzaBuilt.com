# Product Downloads Folder Structure

This folder contains Safety Data Sheets (SDS) and Technical Data Sheets (TDS) for all Forza products.

## Folder Organization

```
downloads/
├── bond/          # Industrial Adhesives (ForzaBOND)
├── seal/          # Industrial Sealants (ForzaSEAL)
├── tape/          # Industrial Tapes (ForzaTAPE)
└── ruggedred/     # Industrial Cleaning (Rugged Red)
```

## File Naming Convention

Use the following naming convention for consistency:

### SDS Files (Safety Data Sheets)
- Format: `{product-id}-sds.pdf`
- Example: `r160-sds.pdf`, `os2-sds.pdf`, `t215-sds.pdf`

### TDS Files (Technical Data Sheets)
- Format: `{product-id}-tds.pdf`
- Example: `r160-tds.pdf`, `os2-tds.pdf`, `t215-tds.pdf`

## Usage in Code

Products will pull their respective documents from:
- `/downloads/bond/{product-id}-sds.pdf`
- `/downloads/bond/{product-id}-tds.pdf`
- `/downloads/seal/{product-id}-sds.pdf`
- `/downloads/seal/{product-id}-tds.pdf`
- `/downloads/tape/{product-id}-sds.pdf`
- `/downloads/tape/{product-id}-tds.pdf`
- `/downloads/ruggedred/{product-id}-sds.pdf`
- `/downloads/ruggedred/{product-id}-tds.pdf`

## Notes

- All PDFs should be optimized for web delivery
- Keep file sizes reasonable (< 5MB recommended)
- Ensure all PDFs are up-to-date with current regulations
- Files are publicly accessible via direct URL

