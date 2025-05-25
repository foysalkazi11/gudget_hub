/*
  # Seed initial data for smartphone gadgets e-commerce

  1. Categories
  2. Sample products
*/

-- Insert categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Phone Cases', 'phone-cases', 'Protective and stylish cases for your smartphone', 'https://images.pexels.com/photos/3082341/pexels-photo-3082341.jpeg'),
('Headphones', 'headphones', 'Wireless and wired headphones for premium audio experience', 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg'),
('Chargers', 'chargers', 'Fast charging solutions for your devices', 'https://images.pexels.com/photos/5082573/pexels-photo-5082573.jpeg'),
('Screen Protectors', 'screen-protectors', 'Tempered glass and film protectors for your screens', 'https://images.pexels.com/photos/6598/coffee-desk-laptop-notebook.jpg'),
('Power Banks', 'power-banks', 'Portable power solutions for on-the-go charging', 'https://images.pexels.com/photos/4526400/pexels-photo-4526400.jpeg'),
('Bluetooth Speakers', 'bluetooth-speakers', 'Portable speakers with amazing sound quality', 'https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg'),
('Smartphone Stands', 'smartphone-stands', 'Adjustable stands for your smartphones and tablets', 'https://images.pexels.com/photos/193004/pexels-photo-193004.jpeg'),
('Camera Accessories', 'camera-accessories', 'Enhance your smartphone photography', 'https://images.pexels.com/photos/3497065/pexels-photo-3497065.jpeg');

-- Insert sample products
-- Phone Cases
INSERT INTO products (name, slug, description, price, category_id, features, specifications, inventory, image_url, is_featured, rating, reviews_count) VALUES
('Premium Leather Phone Case', 'premium-leather-phone-case', 'Genuine leather case providing elegant protection for your device.', 39.99, 
  (SELECT id FROM categories WHERE slug = 'phone-cases'),
  '["Genuine leather", "Precision cutouts", "Wireless charging compatible", "Microfiber lining"]',
  '{"Material": "Genuine leather", "Compatibility": "iPhone 13/14/15 series", "Colors": "Black, Brown, Navy"}',
  42, 'https://images.pexels.com/photos/1736222/pexels-photo-1736222.jpeg', true, 4.7, 128);

INSERT INTO products (name, slug, description, price, category_id, features, specifications, inventory, image_url, is_new, discount) VALUES
('Carbon Fiber Phone Case', 'carbon-fiber-phone-case', 'Ultra-slim carbon fiber case with maximum protection.', 29.99, 
  (SELECT id FROM categories WHERE slug = 'phone-cases'),
  '["Aerospace-grade carbon fiber", "Military-grade drop protection", "Wireless charging compatible", "Anti-fingerprint"]',
  '{"Material": "Carbon fiber + TPU", "Compatibility": "Samsung Galaxy S22/S23/S24 series", "Colors": "Black, Blue, Red"}',
  65, 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg', true, 0);

-- Headphones
INSERT INTO products (name, slug, description, price, category_id, features, specifications, inventory, image_url, is_featured, discount, rating, reviews_count) VALUES
('Wireless Earbuds Pro', 'wireless-earbuds-pro', 'True wireless earbuds with active noise cancellation and premium sound quality.', 149.99, 
  (SELECT id FROM categories WHERE slug = 'headphones'),
  '["Active Noise Cancellation", "Transparency mode", "8-hour battery life", "Wireless charging case", "IPX5 water resistance"]',
  '{"Battery Life": "8 hours (earbuds) + 24 hours (case)", "Connectivity": "Bluetooth 5.2", "Colors": "Black, White, Blue"}',
  35, 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg', true, 15, 4.9, 342);

INSERT INTO products (name, slug, description, price, category_id, features, specifications, inventory, image_url) VALUES
('Over-Ear Bluetooth Headphones', 'over-ear-bluetooth-headphones', 'Premium over-ear headphones with studio-quality sound.', 199.99, 
  (SELECT id FROM categories WHERE slug = 'headphones'),
  '["40mm dynamic drivers", "Active Noise Cancellation", "30-hour battery life", "Foldable design", "Built-in microphone"]',
  '{"Battery Life": "30 hours", "Connectivity": "Bluetooth 5.0, 3.5mm jack", "Colors": "Black, Silver"}',
  28, 'https://images.pexels.com/photos/1591/technology-music-sound-things.jpg');

-- Chargers
INSERT INTO products (name, slug, description, price, category_id, features, specifications, inventory, image_url, is_featured, is_new, rating, reviews_count) VALUES
('Fast Wireless Charger', 'fast-wireless-charger', '15W fast wireless charging pad with intelligent temperature control.', 49.99, 
  (SELECT id FROM categories WHERE slug = 'chargers'),
  '["15W fast charging", "Multi-coil design", "LED indicator", "Overcharge protection", "Foreign object detection"]',
  '{"Input": "QC 3.0 adapter required", "Output": "15W max", "Compatibility": "All Qi-enabled devices"}',
  18, 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg', true, true, 4.5, 87);

INSERT INTO products (name, slug, description, price, category_id, features, specifications, inventory, image_url, discount) VALUES
('65W GaN Charger', '65w-gan-charger', 'Compact 65W GaN charger with 3 ports for simultaneous charging.', 59.99, 
  (SELECT id FROM categories WHERE slug = 'chargers'),
  '["65W total output", "GaN technology", "2x USB-C, 1x USB-A", "Foldable plug", "Universal compatibility"]',
  '{"Input": "100-240V~50/60Hz 1.5A", "USB-C1 Output": "65W max", "USB-C2 Output": "30W max", "USB-A Output": "12W max"}',
  42, 'https://images.pexels.com/photos/4219862/pexels-photo-4219862.jpeg', 10);

-- Power Banks
INSERT INTO products (name, slug, description, price, category_id, features, specifications, inventory, image_url, is_new, rating, reviews_count) VALUES
('Ultra-Slim Power Bank', 'ultra-slim-power-bank', '10,000mAh power bank with a slim profile and fast charging capabilities.', 59.99, 
  (SELECT id FROM categories WHERE slug = 'power-banks'),
  '["10,000mAh battery", "18W PD fast charging", "Dual USB ports", "USB-C input/output", "LED power indicator"]',
  '{"Capacity": "10,000mAh", "Input": "USB-C PD (18W)", "Output": "USB-A QC3.0, USB-C PD", "Size": "5.5 x 2.7 x 0.5 inches", "Weight": "200g"}',
  55, 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg', false, 4.6, 203);

INSERT INTO products (name, slug, description, price, category_id, features, specifications, inventory, image_url, discount) VALUES
('Rugged Outdoor Power Bank', 'rugged-outdoor-power-bank', '20,000mAh rugged power bank with built-in flashlight for outdoor adventures.', 79.99, 
  (SELECT id FROM categories WHERE slug = 'power-banks'),
  '["20,000mAh capacity", "IP67 waterproof", "Dustproof & shockproof", "Built-in flashlight", "Solar charging capability"]',
  '{"Capacity": "20,000mAh", "Input": "Micro-USB, USB-C, Solar", "Output": "2x USB-A, 1x USB-C", "Features": "LED flashlight, Compass", "Durability": "IP67 rated"}',
  32, 'https://images.pexels.com/photos/9105181/pexels-photo-9105181.jpeg', 20);

-- Screen Protectors
INSERT INTO products (name, slug, description, price, category_id, features, specifications, inventory, image_url, is_featured, discount, rating, reviews_count) VALUES
('Tempered Glass Screen Protector', 'tempered-glass-screen-protector', 'Ultra-clear tempered glass screen protector with easy installation.', 19.99, 
  (SELECT id FROM categories WHERE slug = 'screen-protectors'),
  '["9H hardness", "Oleophobic coating", "99% transparency", "Case-friendly design", "Bubble-free installation"]',
  '{"Material": "Tempered glass", "Thickness": "0.33mm", "Compatibility": "Multiple phone models", "Package": "2-pack with installation kit"}',
  120, 'https://images.pexels.com/photos/193004/pexels-photo-193004.jpeg', true, 25, 4.3, 421);

INSERT INTO products (name, slug, description, price, category_id, features, specifications, inventory, image_url) VALUES
('Privacy Screen Protector', 'privacy-screen-protector', 'Anti-spy tempered glass that blocks side views for privacy.', 24.99, 
  (SELECT id FROM categories WHERE slug = 'screen-protectors'),
  '["Privacy filter", "9H hardness", "Anti-fingerprint", "Edge-to-edge coverage", "Easy installation"]',
  '{"Material": "Tempered glass with privacy filter", "Viewing angle": "30 degrees", "Compatibility": "iPhone models", "Package": "2-pack with alignment frame"}',
  85, 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg');

-- Bluetooth Speakers
INSERT INTO products (name, slug, description, price, category_id, features, specifications, inventory, image_url, is_new) VALUES
('Portable Bluetooth Speaker', 'portable-bluetooth-speaker', 'Compact Bluetooth speaker with surprisingly powerful sound.', 69.99, 
  (SELECT id FROM categories WHERE slug = 'bluetooth-speakers'),
  '["360° sound", "12-hour battery life", "IPX7 waterproof", "Built-in microphone", "Bluetooth 5.0"]',
  '{"Battery": "12 hours playtime", "Waterproof rating": "IPX7", "Connectivity": "Bluetooth 5.0, AUX", "Size": "3.2 x 3.2 x 4.4 inches", "Weight": "540g"}',
  48, 'https://images.pexels.com/photos/592793/pexels-photo-592793.jpeg', true);

-- Camera Accessories
INSERT INTO products (name, slug, description, price, category_id, features, specifications, inventory, image_url) VALUES
('Smartphone Photography Kit', 'smartphone-photography-kit', 'Complete kit with lenses and accessories for smartphone photography.', 49.99, 
  (SELECT id FROM categories WHERE slug = 'camera-accessories'),
  '["Wide-angle lens", "Macro lens", "Fisheye lens", "Mini tripod", "LED light", "Carrying case"]',
  '{"Lens mount": "Universal clip-on", "Compatibility": "Most smartphones", "Materials": "Optical glass lenses, Aluminum housing", "Accessories": "Tripod, cleaning cloth, storage case"}',
  36, 'https://images.pexels.com/photos/1787044/pexels-photo-1787044.jpeg');

-- Smartphone Stands
INSERT INTO products (name, slug, description, price, category_id, features, specifications, inventory, image_url) VALUES
('MagSafe Compatible Car Mount', 'magsafe-compatible-car-mount', 'Magnetic car mount for iPhone with MagSafe compatibility.', 34.99, 
  (SELECT id FROM categories WHERE slug = 'smartphone-stands'),
  '["MagSafe compatible", "Strong magnetic hold", "Adjustable viewing angle", "Dashboard or vent mounting", "One-handed operation"]',
  '{"Compatibility": "iPhone 12 and newer", "Mounting options": "Air vent, dashboard", "Rotation": "360 degrees", "Material": "High-quality plastic and silicone"}',
  62, 'https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg');

-- Add sample reviews
INSERT INTO reviews (product_id, user_id, rating, comment, created_at) VALUES
(
  (SELECT id FROM products WHERE slug = 'premium-leather-phone-case'),
  NULL,
  5,
  'This case is absolutely beautiful! The leather feels premium and it fits my phone perfectly. Highly recommended!',
  NOW() - INTERVAL '15 days'
),
(
  (SELECT id FROM products WHERE slug = 'premium-leather-phone-case'),
  NULL,
  4,
  'Great quality and looks very professional. The only reason I gave 4 stars instead of 5 is that the buttons are a bit stiff at first.',
  NOW() - INTERVAL '10 days'
),
(
  (SELECT id FROM products WHERE slug = 'wireless-earbuds-pro'),
  NULL,
  5,
  'Amazing sound quality and the noise cancellation works incredibly well. Battery life is as advertised too!',
  NOW() - INTERVAL '7 days'
),
(
  (SELECT id FROM products WHERE slug = 'fast-wireless-charger'),
  NULL,
  4,
  'Works perfectly and charges my phone quickly. I like the sleek design too.',
  NOW() - INTERVAL '5 days'
);