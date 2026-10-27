-- Sample hotels and rooms for development.
-- Run AFTER schema.sql:  mysql -u hotel_user -p hotel_booking < database/sample-data.sql
-- Users (including the admin) are created through the app in Phase 3, so no passwords live in this file.

INSERT INTO hotels (id, name, description, city, address, rating, image_url, amenities) VALUES
(1, 'Grand Charminar Residency', 'A heritage-inspired hotel minutes from the Old City, with a rooftop restaurant and modern comforts.', 'Hyderabad', '12 Abids Road, Hyderabad, Telangana', 4.5, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200', 'Wi-Fi,AC,Parking,Restaurant,Swimming Pool'),
(2, 'Marina Bay Suites', 'Contemporary beachfront suites with sea views, a spa and an all-day dining lounge.', 'Chennai', '45 Marina Beach Road, Chennai, Tamil Nadu', 4.3, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200', 'Wi-Fi,AC,Parking,Restaurant,Spa'),
(3, 'Lakeview Palace Inn', 'Calm lakeside rooms with garden terraces, ideal for families and long weekends.', 'Udaipur', '8 Lake Pichola Road, Udaipur, Rajasthan', 4.7, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200', 'Wi-Fi,AC,Restaurant,Swimming Pool,Garden'),
(4, 'Tech Park Business Hotel', 'Efficient business hotel near the IT corridor with meeting rooms and fast Wi-Fi.', 'Bengaluru', '101 Outer Ring Road, Bengaluru, Karnataka', 4.0, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200', 'Wi-Fi,AC,Parking,Restaurant,Gym'),
(5, 'Backwater Bliss Resort', 'Wooden villas on the Kerala backwaters with ayurvedic spa and houseboat trips.', 'Alleppey', '3 Vembanad Lake Shore, Alleppey, Kerala', 4.6, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200', 'Wi-Fi,AC,Restaurant,Spa,Swimming Pool'),
(6, 'Himalayan Pine Lodge', 'Cosy mountain lodge with fireplace lounges and valley views.', 'Manali', '27 Mall Road, Manali, Himachal Pradesh', 3.9, 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200', 'Wi-Fi,Parking,Restaurant,Heater');

INSERT INTO rooms (hotel_id, room_number, room_type, bed_type, capacity, price_per_night, description, image_url) VALUES
(1, '101', 'Standard', 'Double', 2, 3200.00, 'Comfortable room with city view.', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200'),
(1, '102', 'Standard', 'Twin', 2, 3200.00, 'Two single beds, ideal for colleagues or friends.', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200'),
(1, '201', 'Deluxe', 'King', 3, 4800.00, 'Spacious room with sitting area and rooftop access.', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200'),
(1, '301', 'Suite', 'King', 4, 8500.00, 'Two-room suite with a private balcony.', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200'),
(2, '101', 'Standard', 'Queen', 2, 3900.00, 'Bright room with partial sea view.', 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200'),
(2, '202', 'Deluxe', 'King', 3, 5600.00, 'Sea-facing room with a private balcony.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200'),
(2, '401', 'Suite', 'King', 5, 11000.00, 'Corner suite with living room and ocean panorama.', 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200'),
(3, '101', 'Standard', 'Double', 2, 4200.00, 'Garden-facing room with terrace seating.', 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200'),
(3, '102', 'Family', 'Two Doubles', 4, 6500.00, 'Large family room overlooking the lake.', 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200'),
(3, '301', 'Suite', 'King', 3, 12500.00, 'Palace-style suite with lake views and a private sit-out.', 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200'),
(4, '501', 'Standard', 'Single', 1, 2800.00, 'Compact workspace-ready room for solo travellers.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200'),
(4, '502', 'Deluxe', 'Queen', 2, 3900.00, 'Larger room with desk and ergonomic chair.', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200'),
(4, '801', 'Executive', 'King', 2, 5400.00, 'Executive floor with lounge access.', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200'),
(5, 'V1', 'Villa', 'King', 2, 7200.00, 'Wooden villa with a private deck on the water.', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200'),
(5, 'V2', 'Family Villa', 'Two Doubles', 5, 9800.00, 'Two-bedroom villa with garden and plunge pool.', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'),
(6, '101', 'Standard', 'Double', 2, 2600.00, 'Warm pine-panelled room with a valley view.', 'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=1200'),
(6, '201', 'Deluxe', 'King', 3, 4100.00, 'Room with fireplace and balcony facing the mountains.', 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200');
