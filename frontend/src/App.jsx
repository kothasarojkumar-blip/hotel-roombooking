import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom'

const rooms = [
  {
    id: 'room-1',
    name: 'Deluxe Garden Room',
    type: 'Deluxe',
    description: 'A comfortable room with a lush garden view, natural light, and a calm atmosphere for a relaxing stay.',
    pricePerNight: 3500,
    capacity: 2,
    bedType: 'King Bed',
    amenities: ['WiFi', 'Air Conditioning', 'TV', 'Breakfast'],
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'],
    totalInventory: 5,
    status: 'Available',
  },
  {
    id: 'room-2',
    name: 'Standard Single Room',
    type: 'Standard',
    description: 'Compact, cozy, and thoughtfully designed for solo travelers seeking comfort and convenience.',
    pricePerNight: 2200,
    capacity: 1,
    bedType: 'Single Bed',
    amenities: ['WiFi', 'Air Conditioning', 'Desk'],
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'],
    totalInventory: 4,
    status: 'Available',
  },
  {
    id: 'room-3',
    name: 'Premium King Room',
    type: 'Premium',
    description: 'An elevated city stay with spacious interiors, a premium bed, and refined modern touches.',
    pricePerNight: 4800,
    capacity: 2,
    bedType: 'King Bed',
    amenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Room Service'],
    images: ['https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'],
    totalInventory: 3,
    status: 'Available',
  },
  {
    id: 'room-4',
    name: 'Executive Business Suite',
    type: 'Suite',
    description: 'Designed for professionals and long stays with elegant interiors, dedicated workspace, and full amenities.',
    pricePerNight: 6200,
    capacity: 3,
    bedType: 'Queen + Sofa Bed',
    amenities: ['WiFi', 'Air Conditioning', 'Workspace', 'Coffee Station'],
    images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'],
    totalInventory: 2,
    status: 'Available',
  },
  {
    id: 'room-5',
    name: 'Family Suite',
    type: 'Family',
    description: 'A spacious family-friendly suite with comfortable sleeping arrangements and a welcoming layout.',
    pricePerNight: 7100,
    capacity: 4,
    bedType: 'Two Queen Beds',
    amenities: ['WiFi', 'Air Conditioning', 'TV', 'Kitchenette', 'Breakfast'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'],
    totalInventory: 2,
    status: 'Available',
  },
  {
    id: 'room-6',
    name: 'Luxury Sea View Suite',
    type: 'Luxury',
    description: 'Breathtaking views, elevated comfort, and thoughtful luxury details for unforgettable getaways.',
    pricePerNight: 9800,
    capacity: 2,
    bedType: 'King Bed',
    amenities: ['WiFi', 'Air Conditioning', 'Private Balcony', 'Spa Access'],
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'],
    totalInventory: 2,
    status: 'Available',
  },
  {
    id: 'room-7',
    name: 'Honeymoon Suite',
    type: 'Luxury',
    description: 'Romantic indulgence with a private ambience, elegant décor, and a serene atmosphere for two.',
    pricePerNight: 10400,
    capacity: 2,
    bedType: 'King Bed',
    amenities: ['WiFi', 'Air Conditioning', 'Jacuzzi', 'Champagne Setup'],
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'],
    totalInventory: 1,
    status: 'Limited',
  },
  {
    id: 'room-8',
    name: 'Presidential Suite',
    type: 'Presidential',
    description: 'Our most exclusive accommodation, offering refined luxury, privacy, and personalized service.',
    pricePerNight: 15500,
    capacity: 4,
    bedType: 'King Bed + Lounge',
    amenities: ['WiFi', 'Air Conditioning', 'Butler Service', 'Private Dining'],
    images: ['https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80'],
    totalInventory: 1,
    status: 'Limited',
  },
]

const amenities = ['WiFi', 'Air Conditioning', 'TV', 'Breakfast', 'Room Service', 'Spa Access', 'Private Balcony', 'Kitchenette', 'Workspace', 'Mini Bar']

const testimonials = [
  {
    name: 'Priya Sharma',
    text: 'The room was spotless and the service felt genuinely warm and personalized. Every detail was thoughtfully handled.',
  },
  {
    name: 'Rahul Mehta',
    text: 'The booking process was smooth, and the stay exceeded expectations. The sea view suite was incredible.',
  },
  {
    name: 'Aisha Khan',
    text: 'StayEase made our anniversary trip effortless. The ambiance and comfort were outstanding from check-in to check-out.',
  },
]

const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

const getNightCount = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 1
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diff = end.getTime() - start.getTime()
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)))
}

const defaultBooking = {
  fullName: '',
  email: '',
  phone: '',
  guests: 2,
  rooms: 1,
  specialRequests: '',
  checkIn: '',
  checkOut: '',
}

function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" aria-label="StayEase home">
          <span className="brand-mark">S</span>
          <span>StayEase</span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/rooms">Rooms</NavLink>
          <NavLink to="/bookings">My Bookings</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
      </div>
    </header>
  )
}

function HomePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const query = new URLSearchParams({
      checkin: form.checkIn,
      checkout: form.checkOut,
      guests: form.guests,
      rooms: form.rooms,
    })
    navigate(`/rooms?${query.toString()}`)
  }

  return (
    <div className="page-shell">
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Luxury stays, reimagined</p>
            <h1>Find Your Perfect Stay</h1>
            <p className="subheadline">Comfort, luxury, and unforgettable experiences.</p>

            <form className="search-panel" onSubmit={handleSubmit}>
              <label>
                <span>Check-in</span>
                <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange} required />
              </label>
              <label>
                <span>Check-out</span>
                <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange} required />
              </label>
              <label>
                <span>Guests</span>
                <select name="guests" value={form.guests} onChange={handleChange}>
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </label>
              <label>
                <span>Rooms</span>
                <select name="rooms" value={form.rooms} onChange={handleChange}>
                  <option value={1}>1 Room</option>
                  <option value={2}>2 Rooms</option>
                  <option value={3}>3 Rooms</option>
                </select>
              </label>
              <button type="submit" className="primary-btn">Search Hotels</button>
            </form>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <p className="eyebrow dark">Featured rooms</p>
          <h2>Curated stays for every kind of traveler</h2>
        </div>

        <div className="room-grid">
          {rooms.slice(0, 4).map((room) => (
            <article className="room-card" key={room.id}>
              <img src={room.images[0]} alt={room.name} />
              <div className="room-card-body">
                <div className="room-card-head">
                  <h3>{room.name}</h3>
                  <span>{room.type}</span>
                </div>
                <p>{room.description}</p>
                <div className="meta-row">
                  <strong>{formatPrice(room.pricePerNight)}</strong>
                  <span>per night</span>
                </div>
                <div className="card-links">
                  <Link to={`/rooms/${room.id}`} className="text-link">View Details</Link>
                  <Link to={`/booking/${room.id}`} className="primary-btn small">Book Now</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow dark">Hotel amenities</p>
            <h2>Everything you need for a seamless stay</h2>
          </div>
          <div className="amenities-grid">
            {amenities.map((item) => (
              <div className="amenity-item" key={item}>
                <span className="amenity-icon">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <p className="eyebrow dark">Why choose StayEase</p>
          <h2>Thoughtful comfort, built for memorable trips</h2>
        </div>
        <div className="features-grid">
          <div className="feature-box">
            <h3>Best rates guaranteed</h3>
            <p>Transparent pricing and flexible options that make your stay more rewarding.</p>
          </div>
          <div className="feature-box">
            <h3>Prime locations</h3>
            <p>Stay in vibrant city hubs or serene escapes close to local attractions.</p>
          </div>
          <div className="feature-box">
            <h3>Concierge support</h3>
            <p>From airport transfers to local recommendations, our team supports every step.</p>
          </div>
        </div>
      </section>

      <section className="section container testimonials-section">
        <div className="section-heading">
          <p className="eyebrow dark">Customer testimonials</p>
          <h2>Guests love their StayEase experience</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <div className="testimonial-card" key={item.name}>
              <div className="stars">★★★★★</div>
              <p>“{item.text}”</p>
              <strong>{item.name}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function RoomsPage() {
  const [searchParams] = useSearchParams()
  const [selectedType, setSelectedType] = useState('All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [guests, setGuests] = useState(searchParams.get('guests') || '2')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [selectedAmenity, setSelectedAmenity] = useState('All')
  const [sortBy, setSortBy] = useState('recommended')

  const filteredRooms = useMemo(() => {
    const queryGuests = Number(guests || 2)
    const queryRooms = Number(searchParams.get('rooms') || 1)

    let results = rooms.filter((room) => {
      const matchesType = selectedType === 'All' || room.type === selectedType
      const matchesMin = !minPrice || room.pricePerNight >= Number(minPrice)
      const matchesMax = !maxPrice || room.pricePerNight <= Number(maxPrice)
      const matchesGuests = room.capacity >= queryGuests
      const matchesInventory = !availableOnly || room.totalInventory >= queryRooms
      const matchesAmenity = selectedAmenity === 'All' || room.amenities.includes(selectedAmenity)
      return matchesType && matchesMin && matchesMax && matchesGuests && matchesInventory && matchesAmenity
    })

    results = [...results].sort((a, b) => {
      if (sortBy === 'low-high') return a.pricePerNight - b.pricePerNight
      if (sortBy === 'high-low') return b.pricePerNight - a.pricePerNight
      return b.capacity - a.capacity
    })

    return results
  }, [availableOnly, guests, maxPrice, minPrice, queryRooms, searchParams, selectedAmenity, selectedType, sortBy])

  const queryRooms = Number(searchParams.get('rooms') || 1)

  return (
    <section className="container section">
      <div className="section-heading left">
        <p className="eyebrow dark">Rooms</p>
        <h2>Available stays for your dates</h2>
      </div>

      <div className="filters-panel">
        <div className="filter-grid">
          <label>
            <span>Room type</span>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="All">All</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Premium">Premium</option>
              <option value="Suite">Suite</option>
              <option value="Family">Family</option>
              <option value="Luxury">Luxury</option>
              <option value="Presidential">Presidential</option>
            </select>
          </label>

          <label>
            <span>Min price</span>
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="2000" />
          </label>

          <label>
            <span>Max price</span>
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="15000" />
          </label>

          <label>
            <span>Guests</span>
            <select value={guests} onChange={(e) => setGuests(e.target.value)}>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
            </select>
          </label>

          <label>
            <span>Amenities</span>
            <select value={selectedAmenity} onChange={(e) => setSelectedAmenity(e.target.value)}>
              <option value="All">All</option>
              {amenities.map((amenity) => (
                <option key={amenity} value={amenity}>{amenity}</option>
              ))}
            </select>
          </label>

          <label className="checkbox-row">
            <input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} />
            <span>Available rooms</span>
          </label>
        </div>

        <div className="sort-row">
          <label>
            <span>Sort by</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </label>
        </div>
      </div>

      {filteredRooms.length > 0 ? (
        <div className="room-grid listing-grid">
          {filteredRooms.map((room) => (
            <article className="room-card" key={room.id}>
              <img src={room.images[0]} alt={room.name} />
              <div className="room-card-body">
                <div className="room-card-head">
                  <h3>{room.name}</h3>
                  <span>{room.type}</span>
                </div>
                <p>{room.description}</p>
                <ul className="detail-list">
                  <li><strong>Price:</strong> {formatPrice(room.pricePerNight)}/night</li>
                  <li><strong>Capacity:</strong> Up to {room.capacity} guests</li>
                  <li><strong>Bed:</strong> {room.bedType}</li>
                  <li><strong>Status:</strong> {room.totalInventory >= queryRooms ? 'Available' : 'Limited'}</li>
                </ul>
                <div className="amenity-tags">
                  {room.amenities.slice(0, 3).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="card-links">
                  <Link to={`/rooms/${room.id}`} className="text-link">View Details</Link>
                  <Link to={`/booking/${room.id}`} className="primary-btn small">Book Now</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No rooms match your selected filters.</h3>
          <p>Please adjust your stay details and try again.</p>
        </div>
      )}
    </section>
  )
}

function RoomDetailsPage() {
  const { id } = useParams()
  const room = rooms.find((item) => item.id === id) || rooms[0]
  const [bookingForm, setBookingForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
  })

  const nights = getNightCount(bookingForm.checkIn, bookingForm.checkOut)
  const totalPrice = nights * Number(bookingForm.rooms || 1) * room.pricePerNight

  return (
    <section className="container section details-layout">
      <div className="details-main">
        <img className="detail-image" src={room.images[0]} alt={room.name} />
        <div className="detail-copy">
          <p className="eyebrow dark">{room.type}</p>
          <h2>{room.name}</h2>
          <p>{room.description}</p>
          <div className="detail-stats">
            <div><strong>Price per night</strong><span>{formatPrice(room.pricePerNight)}</span></div>
            <div><strong>Max occupancy</strong><span>{room.capacity} guests</span></div>
            <div><strong>Bed configuration</strong><span>{room.bedType}</span></div>
          </div>
          <div className="amenity-tags detail-tags">
            {room.amenities.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <aside className="booking-panel">
        <h3>Book this room</h3>
        <div className="booking-form-grid">
          <label>
            <span>Check-in</span>
            <input type="date" value={bookingForm.checkIn} onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })} />
          </label>
          <label>
            <span>Check-out</span>
            <input type="date" value={bookingForm.checkOut} onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })} />
          </label>
          <label>
            <span>Guests</span>
            <select value={bookingForm.guests} onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}>
              {[1, 2, 3, 4].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Rooms</span>
            <select value={bookingForm.rooms} onChange={(e) => setBookingForm({ ...bookingForm, rooms: e.target.value })}>
              {[1, 2, 3].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="booking-summary">
          <div><span>{nights} nights</span><strong>{formatPrice(totalPrice)}</strong></div>
          <div><span>Room availability</span><strong>{room.totalInventory > 0 ? 'Available' : 'Sold Out'}</strong></div>
        </div>
        <Link to={`/booking/${room.id}`} className="primary-btn block">Book Now</Link>
      </aside>
    </section>
  )
}

function BookingPage() {
  const { id } = useParams()
  const room = rooms.find((item) => item.id === id) || rooms[0]
  const [form, setForm] = useState(defaultBooking)
  const [message, setMessage] = useState('')

  const checkInValue = new Date(form.checkIn)
  const checkOutValue = new Date(form.checkOut)
  const nights = getNightCount(form.checkIn, form.checkOut)
  const total = nights * Number(form.rooms || 1) * room.pricePerNight

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.fullName || !form.email || !form.phone || !form.checkIn || !form.checkOut) {
      setMessage('Please complete all required booking details.')
      return
    }

    if (checkOutValue <= checkInValue) {
      setMessage('Check-out must be later than check-in.')
      return
    }

    if (Number(form.guests) > room.capacity * Number(form.rooms || 1)) {
      setMessage('Guest count exceeds the selected room capacity.')
      return
    }

    const bookingId = `BK-${Date.now().toString().slice(-6)}`
    const newBooking = {
      id: bookingId,
      customerName: form.fullName,
      email: form.email,
      phone: form.phone,
      roomId: room.id,
      roomName: room.name,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: Number(form.guests),
      rooms: Number(form.rooms),
      totalAmount: total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      specialRequests: form.specialRequests,
    }

    const stored = JSON.parse(localStorage.getItem('stayease-bookings') || '[]')
    localStorage.setItem('stayease-bookings', JSON.stringify([newBooking, ...stored]))
    setMessage(`Booking confirmed! Your booking ID is ${bookingId}.`)
    setForm(defaultBooking)
  }

  return (
    <section className="container section booking-layout">
      <div className="booking-form-wrap">
        <div className="section-heading left">
          <p className="eyebrow dark">Booking</p>
          <h2>Complete your reservation</h2>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="two-col">
            <label>
              <span>Full name</span>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />
            </label>
            <label>
              <span>Email address</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
          </div>

          <div className="two-col">
            <label>
              <span>Phone number</span>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
            </label>
            <label>
              <span>Selected room</span>
              <input type="text" value={room.name} readOnly />
            </label>
          </div>

          <div className="two-col">
            <label>
              <span>Check-in</span>
              <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange} required />
            </label>
            <label>
              <span>Check-out</span>
              <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange} required />
            </label>
          </div>

          <div className="two-col">
            <label>
              <span>Number of guests</span>
              <select name="guests" value={form.guests} onChange={handleChange}>
                {[1, 2, 3, 4].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Number of rooms</span>
              <select name="rooms" value={form.rooms} onChange={handleChange}>
                {[1, 2, 3].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          <label>
            <span>Special requests</span>
            <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows={4} />
          </label>

          <button type="submit" className="primary-btn">Confirm booking</button>
          {message && <p className="status-message">{message}</p>}
        </form>
      </div>

      <aside className="summary-panel">
        <h3>Booking summary</h3>
        <div className="summary-row">
          <span>Room</span>
          <strong>{room.name}</strong>
        </div>
        <div className="summary-row">
          <span>Stay</span>
          <strong>{form.checkIn || '—'} to {form.checkOut || '—'}</strong>
        </div>
        <div className="summary-row">
          <span>Guests</span>
          <strong>{form.guests}</strong>
        </div>
        <div className="summary-row">
          <span>Rooms</span>
          <strong>{form.rooms}</strong>
        </div>
        <div className="summary-row total">
          <span>Total amount</span>
          <strong>{formatPrice(total)}</strong>
        </div>
      </aside>
    </section>
  )
}

function MyBookingsPage() {
  const [bookings, setBookings] = useState(() => JSON.parse(localStorage.getItem('stayease-bookings') || '[]'))
  const [lookupId, setLookupId] = useState('')
  const [email, setEmail] = useState('')

  const filteredBookings = bookings.filter((booking) => {
    const matchesId = !lookupId || booking.id.toLowerCase().includes(lookupId.toLowerCase())
    const matchesEmail = !email || booking.email.toLowerCase().includes(email.toLowerCase())
    return matchesId && matchesEmail
  })

  const handleCancel = (id) => {
    const updated = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: 'cancelled' } : booking,
    )
    setBookings(updated)
    localStorage.setItem('stayease-bookings', JSON.stringify(updated))
  }

  return (
    <section className="container section">
      <div className="section-heading left">
        <p className="eyebrow dark">My bookings</p>
        <h2>Find and manage your reservations</h2>
      </div>

      <div className="lookup-panel">
        <input type="text" value={lookupId} onChange={(e) => setLookupId(e.target.value)} placeholder="Booking ID" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
      </div>

      {filteredBookings.length ? (
        <div className="booking-list">
          {filteredBookings.map((booking) => (
            <article className="booking-item" key={booking.id}>
              <div className="booking-head">
                <div>
                  <p className="eyebrow dark">{booking.id}</p>
                  <h3>{booking.roomName}</h3>
                </div>
                <span className={`status-badge ${booking.status}`}>{booking.status}</span>
              </div>
              <div className="booking-grid">
                <div><strong>Customer:</strong> {booking.customerName}</div>
                <div><strong>Check-in:</strong> {booking.checkIn}</div>
                <div><strong>Check-out:</strong> {booking.checkOut}</div>
                <div><strong>Guests:</strong> {booking.guests}</div>
                <div><strong>Total:</strong> {formatPrice(booking.totalAmount)}</div>
                <div><strong>Booked:</strong> {new Date(booking.createdAt).toLocaleDateString()}</div>
              </div>
              {booking.status === 'confirmed' && (
                <button type="button" className="secondary-btn" onClick={() => handleCancel(booking.id)}>
                  Cancel Booking
                </button>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No matching bookings found.</h3>
        </div>
      )}
    </section>
  )
}

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const users = JSON.parse(localStorage.getItem('stayease-users') || '[]')
    const match = users.find((user) => user.email === form.email)

    if (!match) {
      setMessage('No account found for this email.')
      return
    }

    localStorage.setItem('stayease-token', 'demo-token')
    setMessage('Login successful. You are now signed in.')
  }

  return (
    <section className="container section auth-section">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          <span>Email</span>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </label>
        <button type="submit" className="primary-btn block">Sign In</button>
        {message && <p className="status-message">{message}</p>}
      </form>
    </section>
  )
}

function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    const users = JSON.parse(localStorage.getItem('stayease-users') || '[]')
    if (users.some((user) => user.email === form.email)) {
      setMessage('An account with this email already exists.')
      return
    }

    const newUser = {
      id: `USER-${Date.now()}`,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role: 'customer',
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem('stayease-users', JSON.stringify([...users, newUser]))
    setMessage('Registration successful. You can now log in.')
    setForm({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' })
  }

  return (
    <section className="container section auth-section">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label>
          <span>Full name</span>
          <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label>
          <span>Phone number</span>
          <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </label>
        <label>
          <span>Confirm password</span>
          <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
        </label>
        <button type="submit" className="primary-btn block">Create account</button>
        {message && <p className="status-message">{message}</p>}
      </form>
    </section>
  )
}

function AdminPage() {
  const bookings = JSON.parse(localStorage.getItem('stayease-bookings') || '[]')
  const stats = {
    totalRooms: rooms.length,
    availableRooms: rooms.filter((room) => room.totalInventory > 0).length,
    totalBookings: bookings.length,
    confirmed: bookings.filter((item) => item.status === 'confirmed').length,
    cancelled: bookings.filter((item) => item.status === 'cancelled').length,
    revenue: bookings.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0),
  }

  return (
    <section className="container section admin-shell">
      <div className="section-heading left">
        <p className="eyebrow dark">Admin dashboard</p>
        <h2>Hotel operations overview</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-box"><span>Total rooms</span><strong>{stats.totalRooms}</strong></div>
        <div className="stat-box"><span>Available rooms</span><strong>{stats.availableRooms}</strong></div>
        <div className="stat-box"><span>Total bookings</span><strong>{stats.totalBookings}</strong></div>
        <div className="stat-box"><span>Confirmed bookings</span><strong>{stats.confirmed}</strong></div>
        <div className="stat-box"><span>Cancelled bookings</span><strong>{stats.cancelled}</strong></div>
        <div className="stat-box"><span>Estimated revenue</span><strong>{formatPrice(stats.revenue)}</strong></div>
      </div>

      <div className="admin-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Room</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length ? (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.roomName}</td>
                  <td>{formatPrice(booking.totalAmount)}</td>
                  <td><span className={`status-badge ${booking.status}`}>{booking.status}</span></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No bookings yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>StayEase</h3>
          <p>Experience refined hospitality tailored to modern travelers.</p>
        </div>
        <div>
          <h4>Useful links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/bookings">My Bookings</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>+91 98765 43210</li>
            <li>hello@stayease.com</li>
            <li>17 Palm Avenue, Mumbai</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/:id" element={<RoomDetailsPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
