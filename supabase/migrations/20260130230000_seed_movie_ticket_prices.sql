-- Seed movie ticket item and historical prices
-- Source: National Association of Theatre Owners (NATO) via The Numbers

INSERT INTO items (name, slug, color, icon)
VALUES ('Movie Ticket', 'movie-ticket', '#9333ea', '🎬');

-- Seed movie ticket price data (1985-2025)
WITH item_ids AS (
  SELECT id, slug FROM items WHERE slug = 'movie-ticket'
)
INSERT INTO prices (item_id, date, price, source)
SELECT
  i.id,
  p.date,
  p.price,
  p.source
FROM (
  SELECT 'movie-ticket' AS slug, '1985-01-01'::date AS date, 3.55 AS price, 'NATO' AS source
  UNION ALL SELECT 'movie-ticket', '1986-01-01', 3.71, 'NATO'
  UNION ALL SELECT 'movie-ticket', '1987-01-01', 3.91, 'NATO'
  UNION ALL SELECT 'movie-ticket', '1988-01-01', 4.11, 'NATO'
  UNION ALL SELECT 'movie-ticket', '1989-01-01', 3.99, 'NATO'
  UNION ALL SELECT 'movie-ticket', '1990-01-01', 4.22, 'NATO'
  UNION ALL SELECT 'movie-ticket', '1991-01-01', 4.21, 'NATO'
  UNION ALL SELECT 'movie-ticket', '1992-01-01', 4.15, 'NATO'
  UNION ALL SELECT 'movie-ticket', '1993-01-01', 4.14, 'NATO'
  UNION ALL SELECT 'movie-ticket', '1994-01-01', 4.08, 'NATO'
  UNION ALL SELECT 'movie-ticket', '1995-01-01', 4.35, 'NATO'
  UNION ALL SELECT 'movie-ticket', '1996-01-01', 4.42, 'NATO'
  UNION ALL SELECT 'movie-ticket', '1997-01-01', 4.59, 'NATO'
  UNION ALL SELECT 'movie-ticket', '1998-01-01', 4.69, 'NATO'
  UNION ALL SELECT 'movie-ticket', '1999-01-01', 5.08, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2000-01-01', 5.39, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2001-01-01', 5.66, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2002-01-01', 5.81, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2003-01-01', 6.03, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2004-01-01', 6.21, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2005-01-01', 6.41, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2006-01-01', 6.55, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2007-01-01', 6.88, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2008-01-01', 7.18, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2009-01-01', 7.50, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2010-01-01', 7.89, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2011-01-01', 7.93, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2012-01-01', 7.96, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2013-01-01', 8.13, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2014-01-01', 8.17, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2015-01-01', 8.43, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2016-01-01', 8.65, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2017-01-01', 8.97, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2018-01-01', 9.11, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2019-01-01', 9.16, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2020-01-01', 9.18, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2021-01-01', 10.17, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2022-01-01', 10.53, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2023-01-01', 10.94, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2024-01-01', 11.31, 'NATO'
  UNION ALL SELECT 'movie-ticket', '2025-01-01', 11.31, 'NATO'
) p
JOIN item_ids i ON i.slug = p.slug;
