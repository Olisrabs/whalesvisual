-- Run this SQL in your Supabase Dashboard SQL Editor

-- 1. Testimonials Table
CREATE TABLE public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    event TEXT NOT NULL,
    quote TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    rating NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Celebrities Table
CREATE TABLE public.celebrities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    img TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert dummy data for Testimonials
INSERT INTO public.testimonials (name, event, quote, avatar_url, rating) VALUES
('Sarah & David M.', 'Wedding, Victoria Island', 'The team at Whales Visual didn''t just take pictures; they captured the very soul of our wedding day. Looking at the album brings tears to our eyes every time.', 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=150&auto=format&fit=crop', 5),
('Adekunle T.', 'Corporate Tech Summit', 'Professional, punctual, and extraordinarily talented. Their corporate event coverage gave our brand the premium aesthetic we had been searching for.', 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=150&auto=format&fit=crop', 5),
('Ngozi O.', 'Personal Brand Shoot', 'I''ve worked with many photographers in Lagos, but Whales Visual stands apart. The portrait session was smooth, and the final edits were absolutely breathtaking.', 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=150&auto=format&fit=crop', 5),
('Chinedu B.', 'Product Campaign', 'Exceptional quality and an incredible eye for detail. They delivered our campaign photos well before the deadline and exceeded all expectations.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop', 4.5);

-- Insert dummy data for Celebrities
INSERT INTO public.celebrities (name, title, img) VALUES
('Tiwa Savage', 'Artist / Performer', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop'),
('GTBank', 'Corporate Gala', 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop'),
('Lagos Fashion Week', 'Runway Coverage', 'https://images.unsplash.com/photo-1509631179647-0c5000642f13?q=80&w=2070&auto=format&fit=crop'),
('Davido', 'Exclusive Studio Session', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop');

-- Set up Row Level Security (RLS) to allow public read
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.testimonials FOR SELECT TO public USING (true);

ALTER TABLE public.celebrities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.celebrities FOR SELECT TO public USING (true);
