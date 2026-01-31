-- Remove gold prices and item from the database
DELETE FROM prices WHERE item_id = (SELECT id FROM items WHERE slug = 'gold');
DELETE FROM items WHERE slug = 'gold';
