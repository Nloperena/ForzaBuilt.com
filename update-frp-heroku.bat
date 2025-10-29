@echo off
echo Updating FRP product in Heroku database...
echo.

heroku pg:psql -a forza-product-managementsystem-b7c3ff8d3d2d -c "UPDATE products SET name = 'ForzaBond® FRP – Modified Silane Rollable Flooring Adhesive', full_name = 'ForzaBond® FRP – Modified Silane Rollable Flooring Adhesive', updated_at = NOW() WHERE product_id = 'FRP';"

echo.
echo Verifying the update...
echo.

heroku pg:psql -a forza-product-managementsystem-b7c3ff8d3d2d -c "SELECT product_id, name, full_name, updated_at FROM products WHERE product_id = 'FRP';"

echo.
echo Done!
pause

