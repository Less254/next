import { put, del, list } from '@vercel/blob'
import { sql } from '@vercel/postgres'

// Vercel Blob Storage for file uploads
export const uploadToVercelBlob = async (
  file: File | Buffer,
  filename: string,
  contentType?: string
): Promise<string> => {
  try {
    const blob = await put(filename, file, {
      access: 'public',
      contentType: contentType || 'application/octet-stream'
    })
    
    return blob.url
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error)
    throw new Error('Failed to upload file')
  }
}

// Delete file from Vercel Blob
export const deleteFromVercelBlob = async (url: string): Promise<void> => {
  try {
    await del(url)
  } catch (error) {
    console.error('Error deleting from Vercel Blob:', error)
    throw new Error('Failed to delete file')
  }
}

// List files in Vercel Blob
export const listVercelBlobFiles = async (prefix?: string) => {
  try {
    const { blobs } = await list({
      prefix: prefix || ''
    })
    
    return blobs
  } catch (error) {
    console.error('Error listing Vercel Blob files:', error)
    throw new Error('Failed to list files')
  }
}

// Vercel Postgres database utilities
export const executeQuery = async (query: string, params?: any[]) => {
  try {
    const result = await sql.query(query, params)
    return result
  } catch (error) {
    console.error('Database query error:', error)
    throw new Error('Database operation failed')
  }
}

// Initialize database tables for Vercel Postgres
export const initializeDatabase = async () => {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255),
        role VARCHAR(50) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create events table
    await sql`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date TIMESTAMP NOT NULL,
        venue VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        capacity INTEGER NOT NULL,
        sold INTEGER DEFAULT 0,
        status VARCHAR(50) DEFAULT 'active',
        image_url VARCHAR(500),
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create tickets table
    await sql`
      CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMARY KEY,
        ticket_number VARCHAR(100) UNIQUE NOT NULL,
        event_id INTEGER REFERENCES events(id),
        user_id INTEGER REFERENCES users(id),
        buyer_name VARCHAR(255) NOT NULL,
        buyer_email VARCHAR(255) NOT NULL,
        buyer_phone VARCHAR(50),
        price DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'valid',
        qr_code_url VARCHAR(500),
        barcode_url VARCHAR(500),
        used_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(100),
        gender VARCHAR(50),
        sizes TEXT[], -- Array of available sizes
        colors TEXT[], -- Array of available colors
        stock INTEGER DEFAULT 0,
        image_urls TEXT[], -- Array of image URLs
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create orders table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(50),
        payment_id VARCHAR(255),
        shipping_address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        event_type VARCHAR(100) NOT NULL,
        event_date DATE NOT NULL,
        guest_count INTEGER NOT NULL,
        budget_range VARCHAR(50),
        venue_preference VARCHAR(100),
        notes TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    console.log('Database tables initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    throw new Error('Failed to initialize database')
  }
}

// Get database connection info
export const getDatabaseInfo = async () => {
  try {
    const result = await sql`SELECT version()`
    return result.rows[0]
  } catch (error) {
    console.error('Error getting database info:', error)
    throw new Error('Failed to get database info')
  }
}
