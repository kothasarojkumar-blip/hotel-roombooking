-- Hotel Room Booking: MySQL 8 schema
-- Run:  mysql -u hotel_user -p hotel_booking < database/schema.sql

CREATE TABLE IF NOT EXISTS users (
    id            BIGINT       NOT NULL AUTO_INCREMENT,
    name          VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    role          VARCHAR(20)  NOT NULL DEFAULT 'CUSTOMER',
    created_at    DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_email (email),
    CONSTRAINT chk_users_role CHECK (role IN ('CUSTOMER', 'ADMIN'))
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS hotels (
    id          BIGINT        NOT NULL AUTO_INCREMENT,
    name        VARCHAR(150)  NOT NULL,
    description TEXT,
    city        VARCHAR(100)  NOT NULL,
    address     VARCHAR(255)  NOT NULL,
    rating      DECIMAL(2,1)  NOT NULL DEFAULT 0.0,
    image_url   VARCHAR(500),
    amenities   VARCHAR(500),               -- comma-separated, e.g. "Wi-Fi,AC,Parking"
    PRIMARY KEY (id),
    KEY idx_hotels_city (city),
    CONSTRAINT chk_hotels_rating CHECK (rating >= 0 AND rating <= 5)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rooms (
    id              BIGINT         NOT NULL AUTO_INCREMENT,
    hotel_id        BIGINT         NOT NULL,
    room_number     VARCHAR(20)    NOT NULL,
    room_type       VARCHAR(50)    NOT NULL,   -- e.g. Standard, Deluxe, Suite
    bed_type        VARCHAR(50)    NOT NULL DEFAULT 'Double',
    capacity        INT            NOT NULL,
    price_per_night DECIMAL(10,2)  NOT NULL,
    description     TEXT,
    image_url       VARCHAR(500),
    available       BOOLEAN        NOT NULL DEFAULT TRUE,  -- admin switch (out of service = FALSE)
    PRIMARY KEY (id),
    UNIQUE KEY uk_rooms_hotel_number (hotel_id, room_number),
    CONSTRAINT fk_rooms_hotel FOREIGN KEY (hotel_id) REFERENCES hotels (id) ON DELETE CASCADE,
    CONSTRAINT chk_rooms_capacity CHECK (capacity > 0),
    CONSTRAINT chk_rooms_price CHECK (price_per_night > 0)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bookings (
    id                BIGINT         NOT NULL AUTO_INCREMENT,
    booking_reference VARCHAR(30)    NOT NULL,
    user_id           BIGINT         NOT NULL,
    room_id           BIGINT         NOT NULL,
    check_in          DATE           NOT NULL,
    check_out         DATE           NOT NULL,
    guests            INT            NOT NULL,
    total_price       DECIMAL(12,2)  NOT NULL,
    status            VARCHAR(20)    NOT NULL DEFAULT 'PENDING',
    guest_name        VARCHAR(100)   NOT NULL,
    guest_email       VARCHAR(150)   NOT NULL,
    guest_phone       VARCHAR(30)    NOT NULL,
    created_at        DATETIME(6)    NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uk_bookings_reference (booking_reference),
    KEY idx_bookings_user (user_id),
    KEY idx_bookings_room_dates (room_id, check_in, check_out),
    CONSTRAINT fk_bookings_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_bookings_room FOREIGN KEY (room_id) REFERENCES rooms (id),
    CONSTRAINT chk_bookings_dates CHECK (check_in < check_out),
    CONSTRAINT chk_bookings_guests CHECK (guests > 0),
    CONSTRAINT chk_bookings_status CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'))
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payments (
    id                    BIGINT         NOT NULL AUTO_INCREMENT,
    booking_id            BIGINT         NOT NULL,
    amount                DECIMAL(12,2)  NOT NULL,
    payment_status        VARCHAR(20)    NOT NULL DEFAULT 'PENDING',
    payment_method        VARCHAR(30)    NOT NULL DEFAULT 'PAY_AT_HOTEL',
    transaction_reference VARCHAR(100),   -- reference from a future payment provider; never card data
    created_at            DATETIME(6)    NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    KEY idx_payments_booking (booking_id),
    CONSTRAINT fk_payments_booking FOREIGN KEY (booking_id) REFERENCES bookings (id) ON DELETE CASCADE,
    CONSTRAINT chk_payments_status CHECK (payment_status IN ('PENDING', 'PAID', 'REFUNDED', 'FAILED'))
) ENGINE=InnoDB;
