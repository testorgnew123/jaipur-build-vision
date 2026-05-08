-- Run this once in your NeonDB SQL editor (neon.tech > SQL Editor)

CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  password   TEXT NOT NULL,
  name       TEXT NOT NULL,
  role       TEXT NOT NULL CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
  id           SERIAL PRIMARY KEY,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  excerpt      TEXT NOT NULL,
  cover        TEXT NOT NULL,
  author       TEXT NOT NULL,
  published_at DATE NOT NULL,
  reading_time TEXT NOT NULL,
  tags         TEXT[] NOT NULL DEFAULT '{}',
  content      TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scheduled_visits (
  id           SERIAL PRIMARY KEY,
  client_name  TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  notes        TEXT,
  status       TEXT NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending','confirmed','completed','cancelled')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Seed super_admin ─────────────────────────────────────────────────────────
-- Generate bcrypt hash first:
--   node -e "require('bcryptjs').hash('yourpassword', 10).then(console.log)"
-- Then replace the hash below:

INSERT INTO users (email, password, name, role)
VALUES (
  'admin@singlestop.co.in',
  '$2a$10$REPLACE_THIS_WITH_BCRYPT_HASH_OF_YOUR_PASSWORD',
  'Super Admin',
  'super_admin'
)
ON CONFLICT (email) DO NOTHING;

-- ─── Seed existing blog posts ─────────────────────────────────────────────────
-- Run this to migrate your static posts.ts data into the database.
-- (Edit content/cover URLs as needed.)

INSERT INTO posts (slug, title, excerpt, cover, author, published_at, reading_time, tags, content)
VALUES
(
  'construction-cost-jaipur-2025',
  'Construction Cost in Jaipur 2025: Complete Rate Analysis',
  'Detailed breakdown of construction costs in Jaipur ranging from ₹1,650 to ₹3,800 per sq.ft depending on quality tier.',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200',
  'SingleStop Team',
  '2025-02-12',
  '8 min read',
  ARRAY['construction', 'costs', 'jaipur'],
  '<p>Construction costs in Jaipur vary significantly based on quality tier, location, and specification...</p>'
),
(
  'vastu-tips-modern-homes',
  '10 Vastu Tips for Modern Homes in Jaipur',
  'Practical Vastu Shastra principles adapted for contemporary residential construction in Jaipur.',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200',
  'SingleStop Team',
  '2025-01-20',
  '6 min read',
  ARRAY['vastu', 'design', 'tips'],
  '<p>Vastu Shastra is an ancient Indian science of architecture that guides spatial arrangement...</p>'
),
(
  'nri-construction-guide',
  'NRI Guide: Building Your Dream Home in Jaipur from Abroad',
  'Step-by-step guide for Non-Resident Indians looking to build or renovate property in Jaipur remotely.',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200',
  'SingleStop Team',
  '2025-01-05',
  '10 min read',
  ARRAY['nri', 'guide', 'remote'],
  '<p>Building a home from abroad requires careful planning, trusted partners, and clear communication...</p>'
),
(
  'choosing-the-right-marble',
  'Choosing the Right Marble for Your Jaipur Home',
  'Expert guide to selecting marble varieties — Makrana, Italian, Rajasthani — for different applications.',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
  'SingleStop Team',
  '2024-12-18',
  '5 min read',
  ARRAY['materials', 'marble', 'interior'],
  '<p>Marble selection is one of the most important decisions in premium home construction...</p>'
)
ON CONFLICT (slug) DO NOTHING;
