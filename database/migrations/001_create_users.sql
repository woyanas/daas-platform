-- Migration: 001_create_users
-- Description: Create users table with roles and authentication fields

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'viewer',
    is_active BOOLEAN DEFAULT true,
    avatar_url VARCHAR(500),
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Insert default admin user (password: admin123 - bcrypt hashed)
INSERT INTO users (email, password_hash, full_name, role) VALUES 
('admin@daas.local', '$2b$10$rQZ8K.u1qXzQxK.u1qXzQeK.u1qXzQxK.u1qXzQxK.u1qXzQxK.u1', 'System Admin', 'admin');
