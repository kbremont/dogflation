-- Seed gas item and historical prices
-- Source: U.S. Energy Information Administration (EIA) via Alternative Fuels Data Center
-- https://afdc.energy.gov/data/10641

INSERT INTO items (name, slug, color, icon)
VALUES ('Gas (per gallon)', 'gas', '#6366f1', '⛽');

-- Seed gas price data (1985-2025)
WITH item_ids AS (
  SELECT id, slug FROM items WHERE slug = 'gas'
)
INSERT INTO prices (item_id, date, price, source)
SELECT
  i.id,
  p.date,
  p.price,
  p.source
FROM (
  SELECT 'gas' AS slug, '1985-01-01'::date AS date, 1.20 AS price, 'EIA/AFDC' AS source
  UNION ALL SELECT 'gas', '1986-01-01', 0.93, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '1987-01-01', 0.95, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '1988-01-01', 0.95, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '1989-01-01', 1.02, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '1990-01-01', 1.16, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '1991-01-01', 1.14, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '1992-01-01', 1.13, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '1993-01-01', 1.11, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '1994-01-01', 1.11, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '1995-01-01', 1.15, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '1996-01-01', 1.23, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '1997-01-01', 1.23, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '1998-01-01', 1.06, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '1999-01-01', 1.17, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2000-01-01', 1.51, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2001-01-01', 1.46, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2002-01-01', 1.36, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2003-01-01', 1.59, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2004-01-01', 1.88, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2005-01-01', 2.30, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2006-01-01', 2.59, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2007-01-01', 2.80, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2008-01-01', 3.27, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2009-01-01', 2.35, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2010-01-01', 2.79, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2011-01-01', 3.53, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2012-01-01', 3.64, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2013-01-01', 3.53, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2014-01-01', 3.37, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2015-01-01', 2.45, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2016-01-01', 2.14, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2017-01-01', 2.41, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2018-01-01', 2.74, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2019-01-01', 2.64, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2020-01-01', 2.17, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2021-01-01', 3.05, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2022-01-01', 3.95, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2023-01-01', 3.50, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2024-01-01', 3.30, 'EIA/AFDC'
  UNION ALL SELECT 'gas', '2025-01-01', 3.10, 'EIA/AFDC'
) p
JOIN item_ids i ON i.slug = p.slug;
