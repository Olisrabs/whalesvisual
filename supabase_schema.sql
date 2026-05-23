-- Run this SQL in your Supabase Dashboard SQL Editor

-- 1. Contact Messages Table
CREATE TABLE public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Booking Requests Table
CREATE TABLE public.booking_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    event_type TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    location_needed BOOLEAN NOT NULL,
    location_details TEXT,
    additional_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Gallery Images Table
CREATE TABLE public.gallery_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL,
    img TEXT NOT NULL,
    span TEXT NOT NULL DEFAULT 'row-span-1 col-span-1',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Albums Table
CREATE TABLE public.albums (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    photos INT NOT NULL,
    img TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert dummy data for Gallery Images (Optionally)
INSERT INTO public.gallery_images (category, img, span) VALUES
('Weddings', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop', 'row-span-2 col-span-1'),
('Portraits', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop', 'row-span-1 col-span-1'),
('Corporate', 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop', 'row-span-1 col-span-2'),
('Events', 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop', 'row-span-2 col-span-1'),
('Celebrities', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop', 'row-span-1 col-span-1'),
('Weddings', 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop', 'row-span-1 col-span-1'),
('Portraits', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop', 'row-span-2 col-span-1'),
('Events', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop', 'row-span-1 col-span-2');

-- Insert dummy data for Albums (Optionally)
INSERT INTO public.albums (title, date, photos, img) VALUES
('The Adeyemi Wedding', 'October 2023', 450, 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop'),
('GTBank Gala', 'December 2023', 320, 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop'),
('Lagos Fashion Week', 'November 2023', 600, 'https://images.unsplash.com/photo-1509631179647-0c5000642f13?q=80&w=2070&auto=format&fit=crop');

-- Set up Row Level Security (RLS) to allow public read/insert for anonymous users (since we don't have auth yet)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for anonymous users" ON public.contact_messages FOR INSERT TO anon WITH CHECK (true);

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for anonymous users" ON public.booking_requests FOR INSERT TO anon WITH CHECK (true);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.gallery_images FOR SELECT TO public USING (true);

ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.albums FOR SELECT TO public USING (true);