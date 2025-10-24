# Missing Products Import Instructions

## Products Ready for Import: 12

### Files Available:

1. **backend-import.json** - Complete JSON array ready for bulk import
2. **missing-products-import.csv** - CSV format for spreadsheet import
3. **Individual JSON files** - One file per product for manual import

### Import Steps:

1. Go to your Heroku product management system
2. Use the bulk import feature (if available)
3. Upload `backend-import.json` or use the CSV file
4. Review each product before publishing
5. Upload product images to Vercel Blob if needed
6. Set `published: true` for each product after review

### Products Included:

- **C150** - C150 – CA COMPLIANT CONTACT ADHESIVE (forza_bond)
- **FRP** - FRP – HYBRID POLYMER ROLLABLE FRP ADHESIVE (forza_bond)
- **I1000** - I1000 – LOW-MEDIUM VISCOSITY LAMINATING ADHESIVE (forza_bond)
- **R529** - R529 – STRUCTURAL ANCHORING EPOXY (forza_bond)
- **S228** - S228 – TAPE PRIMER AND ADHESION PROMOTER (forza_bond)
- **T350** - T350 – THERMAL BREAK TAPE (forza_tape)
- **T461** - T461 – HOT-MELT TRANSFER TAPE (forza_tape)
- **T600** - T600 – FOAM GASKETING TAPE (forza_tape)
- **T715** - T715 – COLD TEMP DOUBLE COATED TAPE (forza_tape)
- **T900** - T900 – BUTYL TAPE (forza_tape)
- **T950** - T950 – FSK BONDING TAPE (forza_tape)
- **T970** - T970 – FOIL BONDING TAPE (forza_tape)

### Data Included Per Product:

- ✅ Product ID
- ✅ Full Name
- ✅ Description
- ✅ Brand (forza_bond/forza_seal/forza_tape)
- ✅ Industry
- ✅ Chemistry (where detected)
- ✅ Image URL (from WordPress)
- ✅ Applications array
- ✅ Benefits array
- ✅ Sizing array
- ⚠️ Technical specs (empty - add from TDS)

### Note:

All products are set to `published: false` by default.
Review each product before publishing to production.

Image URLs point to WordPress - you may want to download and re-upload to Vercel Blob.
