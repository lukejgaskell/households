import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export default createClient(
	'https://kayszsfhxdkdngpcrpgy.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNjA3OTUyNSwiZXhwIjoxOTQxNjU1NTI1fQ.GqmQBXpxzsPi6OLMLK7AqvsCGZ5iO-Px4qPyg-fSV6s'
)
