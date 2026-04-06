-- Migration: 009_add_service_category_column
-- Description: Add category column to services table and initialize default values

ALTER TABLE services
ADD COLUMN IF NOT EXISTS category VARCHAR(50) NOT NULL DEFAULT 'core';

UPDATE services
SET category = 'core'
WHERE category IS NULL;
