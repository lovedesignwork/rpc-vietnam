-- Supabase SQL Schema for Royal Phuket City Vietnam Landing Page
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Page Views Table
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL DEFAULT '/',
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  country TEXT DEFAULT 'Unknown',
  city TEXT DEFAULT 'Unknown',
  ip_address TEXT,
  device_type TEXT DEFAULT 'desktop',
  browser TEXT DEFAULT 'Unknown',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views(country);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  element_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for events
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_session_id ON events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);

-- Sessions Table (for bounce rate calculation)
CREATE TABLE IF NOT EXISTS sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  duration INTEGER DEFAULT 0,
  has_interacted BOOLEAN DEFAULT FALSE,
  max_scroll INTEGER DEFAULT 0,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for sessions
CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions(session_id);

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT,
  guest_count TEXT,
  event_date DATE,
  setup_type TEXT,
  breakout_needed BOOLEAN DEFAULT FALSE,
  breakout_rooms TEXT,
  technical_needs TEXT[] DEFAULT '{}',
  fnb_needs TEXT[] DEFAULT '{}',
  message TEXT,
  country TEXT DEFAULT 'Unknown',
  city TEXT DEFAULT 'Unknown',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for inquiries
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);

-- Enable Row Level Security (RLS)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies to allow service role to insert/read
-- (Anonymous users cannot access these tables directly)

-- Page Views policies
CREATE POLICY "Service role can insert page_views" ON page_views
  FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Service role can select page_views" ON page_views
  FOR SELECT TO service_role USING (true);

-- Events policies
CREATE POLICY "Service role can insert events" ON events
  FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Service role can select events" ON events
  FOR SELECT TO service_role USING (true);

-- Sessions policies
CREATE POLICY "Service role can all sessions" ON sessions
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Inquiries policies
CREATE POLICY "Service role can insert inquiries" ON inquiries
  FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Service role can select inquiries" ON inquiries
  FOR SELECT TO service_role USING (true);

-- Grant permissions
GRANT ALL ON page_views TO service_role;
GRANT ALL ON events TO service_role;
GRANT ALL ON sessions TO service_role;
GRANT ALL ON inquiries TO service_role;
