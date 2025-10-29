-- Update FRP Product to display "ForzaBond® FRP"
-- Run this SQL in your Heroku Postgres database

UPDATE products
SET 
    name = 'ForzaBond® FRP – Modified Silane Rollable Flooring Adhesive',
    full_name = 'ForzaBond® FRP – Modified Silane Rollable Flooring Adhesive',
    updated_at = NOW()
WHERE product_id = 'FRP';

-- Verify the update:
SELECT product_id, name, full_name, updated_at 
FROM products 
WHERE product_id = 'FRP';

