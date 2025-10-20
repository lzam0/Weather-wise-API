-- Enable extension to generate UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Table
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Profile Table for Users
CREATE TABLE IF NOT EXISTS profile (
    profile_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    full_name VARCHAR(255),
    location VARCHAR(255),
    unit_preference VARCHAR(50) DEFAULT 'celsius', -- e.g., 'celsius' or 'fahrenheit'
    language VARCHAR(50) DEFAULT 'english',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Example User
WITH new_user AS (
  INSERT INTO users (email, password_hash)
  VALUES ('weatherwise@email.com', '$2b$10$7Qb95rJ8sTgE7ECk8i3y..Z8yOeSxSKKjml2qKmsx.b.KA4PbZzS2') -- Hashed password for 123
  RETURNING user_id
)
INSERT INTO profile (user_id, full_name, location, unit_preference, language)
SELECT user_id, 'Weatherwise Admin', 'Norwich, UK', 'celsius', 'english' FROM new_user;
