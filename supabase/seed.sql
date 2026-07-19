-- =========================================================================
-- StadiumMind AI — Seed Data (FIFA World Cup 2026)
-- =========================================================================

-- Insert MetLife Stadium (Demo Host Venue)
insert into public.stadiums (id, name, location_name, location_lat, location_lng, capacity, zones)
values (
  'stad-001',
  'MetLife Stadium',
  'East Rutherford, NJ',
  40.8135,
  -74.0745,
  82500,
  array['Zone A — North', 'Zone B — East', 'Zone C — South', 'Zone D — West', 'VIP Stand', 'Concourses']
) on conflict (id) do nothing;

-- Insert Mock Matches
insert into public.matches (id, stadium_id, home_team, away_team, status, home_score, away_score, start_time, end_time)
values 
(
  'match-001',
  'stad-001',
  'Brazil',
  'Germany',
  'live',
  1,
  0,
  timezone('utc'::text, now() - interval '67 minutes'),
  null
),
(
  'match-002',
  'stad-001',
  'USA',
  'England',
  'scheduled',
  0,
  0,
  timezone('utc'::text, now() + interval '1 day'),
  null
),
(
  'match-003',
  'stad-001',
  'Mexico',
  'Argentina',
  'completed',
  2,
  2,
  timezone('utc'::text, now() - interval '2 days'),
  timezone('utc'::text, now() - interval '2 days' + interval '2 hours')
) on conflict (id) do nothing;
