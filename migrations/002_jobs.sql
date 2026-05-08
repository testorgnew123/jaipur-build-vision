-- Run this once in your NeonDB SQL editor (neon.tech > SQL Editor)

CREATE TABLE IF NOT EXISTS jobs (
  id           SERIAL PRIMARY KEY,
  title        TEXT NOT NULL,
  type         TEXT NOT NULL DEFAULT 'Full-time',
  experience   TEXT NOT NULL,
  location     TEXT NOT NULL DEFAULT 'Jaipur, Rajasthan',
  description  TEXT NOT NULL,
  skills       TEXT[] NOT NULL DEFAULT '{}',
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS jobs_active_idx ON jobs (is_active, created_at DESC);

-- Seed the existing hardcoded roles
INSERT INTO jobs (title, type, experience, location, description, skills, is_active)
VALUES
(
  'Site Engineer',
  'Full-time',
  '2–5 years',
  'Jaipur, Rajasthan',
  'Oversee day-to-day construction activities on residential sites. Coordinate with vendors, ensure quality standards, and report progress via our live dashboard.',
  ARRAY['Civil Engineering', 'Site Supervision', 'AutoCAD', 'MS Project'],
  TRUE
),
(
  'Architect',
  'Full-time',
  '3–7 years',
  'Jaipur, Rajasthan',
  'Design bespoke residential and commercial projects from concept to construction drawings. Vastu knowledge preferred. Work with a collaborative in-house team.',
  ARRAY['Revit / AutoCAD', '3D Rendering', 'Vastu', 'Statutory Drawings'],
  TRUE
),
(
  'Interior Designer',
  'Full-time',
  '2–5 years',
  'Jaipur, Rajasthan',
  'Create stunning interiors for premium homes. Handle client briefs, material selection, modular kitchen design, and on-site coordination.',
  ARRAY['SketchUp / 3ds Max', 'Material Sourcing', 'Space Planning', 'Client Management'],
  TRUE
),
(
  'Business Development Executive',
  'Full-time',
  '1–4 years',
  'Jaipur, Rajasthan',
  'Generate and manage leads, conduct site visits, and convert prospects. Join a high-growth sales team with strong incentives and a great brand to sell.',
  ARRAY['Real Estate / Construction Sales', 'CRM', 'Lead Generation', 'Communication'],
  TRUE
)
ON CONFLICT DO NOTHING;
