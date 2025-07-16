# Product Content Scraper

This script scrapes product content from forzabuilt.com and saves it locally for use in the dynamic product pages.

## Setup

1. Install dependencies:
```bash
cd scripts
npm install
```

2. Run the scraper:
```bash
npm run scrape
```

## What it does

- Scrapes all product pages from forzabuilt.com using the URLs in `industrialDatasheet.ts`
- Extracts product titles, descriptions, specifications, and content
- Saves individual product files to `src/data/scrapedProducts/`
- Creates a combined file `allProducts.json`

## Output

The scraper creates:
- Individual product files: `src/data/scrapedProducts/{productId}.json`
- Combined file: `src/data/scrapedProducts/allProducts.json`

## Usage in the app

The product pages will automatically load the scraped content when available, or fall back to mock data for development.

## Notes

- The scraper includes a 1-second delay between requests to be respectful to the server
- If scraping fails, the app will use mock data for development
- The scraped content is used in the individual product pages at `/product/{productId}` 