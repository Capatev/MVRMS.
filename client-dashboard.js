const clientDashboard = {
  navItems: [
    { label: "Dashboard", id: "clientDashboard" },
    { label: "Browse Vehicles", id: "browseVehicles" },
    { label: "Make Reservation", id: "makeBooking" },
    { label: "View Bookings", id: "viewBookings" },
    { label: "Verify ID", id: "verifyID" },
    { label: "Rental History", id: "viewRentals" },
    { label: "Make Payment", id: "makePayment" },
  ],

  init: function () {
    this.renderNavMenu()
    this.renderDashboard()
  },

  renderNavMenu: function () {
    const navMenu = document.getElementById("navMenu")
    navMenu.innerHTML = this.navItems
      .map((item) => `<li><button onclick="showPage('${item.id}')" class="nav-button">${item.label}</button></li>`)
      .join("")
  },

  renderDashboard: function () {
    const contentArea = document.getElementById("contentArea")
    contentArea.innerHTML = `
      <div id="clientDashboard" class="content-page active">
        <div class="dashboard-grid">
          <div class="quick-card" onclick="showPage('browseVehicles')">
            <div class="card-icon">🚗</div>
            <h3>Browse Vehicles</h3>
            <p>View available vehicles for rental</p>
          </div>
          <div class="quick-card" onclick="showPage('makeBooking')">
            <div class="card-icon">📅</div>
            <h3>Make Reservation</h3>
            <p>Reserve or book a vehicle</p>
          </div>
          <div class="quick-card" onclick="showPage('viewBookings')">
            <div class="card-icon">📋</div>
            <h3>View Bookings</h3>
            <p>Check your booking status</p>
          </div>
          <div class="quick-card" onclick="showPage('verifyID')">
            <div class="card-icon">📄</div>
            <h3>Verify ID</h3>
            <p>Upload identification documents</p>
          </div>
          <div class="quick-card" onclick="showPage('viewRentals')">
            <div class="card-icon">📱</div>
            <h3>Rental History</h3>
            <p>Check your rental history</p>
          </div>
          <div class="quick-card" onclick="showPage('makePayment')">
            <div class="card-icon">💳</div>
            <h3>Make Payment</h3>
            <p>Process payment for bookings</p>
          </div>
        </div>
      </div>

      <div id="browseVehicles" class="content-page">
        <div class="page-header">
          <h2>Browse Vehicles</h2>
          <button onclick="showPage('clientDashboard')" class="back-button">← Back</button>
        </div>
        <div class="vehicles-grid" id="vehiclesGrid"></div>
      </div>

      <div id="makeBooking" class="content-page">
        <div class="page-header">
          <h2>Make Reservation</h2>
          <button onclick="showPage('clientDashboard')" class="back-button">← Back</button>
        </div>
        <form id="bookingForm" onsubmit="handleBooking(event)" class="form-section">
          <div class="form-row">
            <div class="form-input-group">
              <label for="bookingVehicle" class="form-label">Vehicle</label>
              <select id="bookingVehicle" class="form-input" required>
                <option>Select a vehicle</option>
              </select>
            </div>
            <div class="form-input-group">
              <label for="pickupDate" class="form-label">Pick-up Date</label>
              <input type="date" id="pickupDate" class="form-input" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-input-group">
              <label for="returnDate" class="form-label">Return Date</label>
              <input type="date" id="returnDate" class="form-input" required>
            </div>
            <div class="form-input-group">
              <label for="rentalDays" class="form-label">Rental Days</label>
              <input type="number" id="rentalDays" class="form-input" value="1" min="1" required>
            </div>
          </div>
          <div class="form-input-group form-row full">
            <label for="specialRequests" class="form-label">Special Requests</label>
            <textarea id="specialRequests" class="form-input" placeholder="Any special requirements..."></textarea>
          </div>
          <button type="submit" class="submit-button">Confirm Booking</button>
        </form>
      </div>

      <div id="viewBookings" class="content-page">
        <div class="page-header">
          <h2>Your Bookings</h2>
          <button onclick="showPage('clientDashboard')" class="back-button">← Back</button>
        </div>
        <div class="bookings-grid" id="bookingsList"></div>
      </div>

      <div id="verifyID" class="content-page">
        <div class="page-header">
          <h2>Verify ID</h2>
          <button onclick="showPage('clientDashboard')" class="back-button">← Back</button>
        </div>
        <button onclick="openIDScannerModal()" class="submit-button">Scan ID with Scanner</button>
      </div>

      <div id="viewRentals" class="content-page">
        <div class="page-header">
          <h2>Rental History</h2>
          <button onclick="showPage('clientDashboard')" class="back-button">← Back</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Vehicle</th>
              <th>Pick-up Date</th>
              <th>Return Date</th>
              <th>Cost</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="rentalsBody"></tbody>
        </table>
      </div>

      <div id="makePayment" class="content-page">
        <div class="page-header">
          <h2>Make Payment</h2>
          <button onclick="showPage('clientDashboard')" class="back-button">← Back</button>
        </div>
        <form id="paymentForm" onsubmit="handlePayment(event)" class="form-section">
          <div class="form-input-group">
            <label for="paymentBookingId" class="form-label">Booking ID</label>
            <input type="text" id="paymentBookingId" class="form-input" placeholder="Enter booking ID" required>
          </div>
          <div class="form-input-group">
            <label for="paymentAmount" class="form-label">Amount</label>
            <input type="number" id="paymentAmount" class="form-input" step="0.01" placeholder="Amount to pay" required>
          </div>
          <div class="form-input-group">
            <label for="paymentMethod" class="form-label">Payment Method</label>
            <select id="paymentMethod" class="form-input" required>
              <option value="gcash">GCash</option>
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
            </select>
          </div>
          <button type="submit" class="submit-button">Process Payment</button>
        </form>
      </div>
    `
    this.loadVehicles()
    this.loadBookings()
    this.loadRentals()
  },

  loadVehicles: () => {
    const vehiclesGrid = document.getElementById("vehiclesGrid")
    const vehicles = window.backend.getAvailableVehicles()

    vehiclesGrid.innerHTML = vehicles
      .map(
        (vehicle) => `
        <div class="vehicle-card">
          <div class="vehicle-image">${vehicle.image}</div>
          <div class="vehicle-info">
            <h3>${vehicle.make} ${vehicle.model}</h3>
            <div class="vehicle-price">$${vehicle.price}/day</div>
            <div class="vehicle-details">
              <p>License: ${vehicle.plate}</p>
              <p>Status: ${vehicle.available ? "Available" : "Unavailable"}</p>
            </div>
            <button class="book-button" onclick="showPage('makeBooking')">Book Now</button>
          </div>
        </div>
      `,
      )
      .join("")

    const bookingVehicle = document.getElementById("bookingVehicle")
    if (bookingVehicle) {
      bookingVehicle.innerHTML =
        "<option>Select a vehicle</option>" +
        window.backend
          .getAvailableVehicles()
          .map((v) => `<option value="${v.id}">${v.make} ${v.model} - $${v.price}/day</option>`)
          .join("")
    }
  },

  loadBookings: () => {
    const bookingsList = document.getElementById("bookingsList")
    const bookings = window.backend.getBookings()

    bookingsList.innerHTML = bookings
      .map((booking) => {
        const vehicle = window.backend.getVehicle(booking.vehicleId)
        return `
        <div class="booking-card">
          <div class="booking-header">
            <h3>Booking #${booking.id}</h3>
            <span class="status-badge ${booking.status}">${booking.status.toUpperCase()}</span>
          </div>
          <p><strong>Vehicle:</strong> ${vehicle.make} ${vehicle.model}</p>
          <p><strong>Dates:</strong> ${booking.pickupDate} to ${booking.returnDate}</p>
          <p><strong>Total Cost:</strong> $${booking.cost || "TBD"}</p>
          ${booking.status !== "cancelled" ? `<button class="cancel-booking-button" onclick="handleCancelBooking('${booking.id}')">Cancel Booking</button>` : ""}
        </div>
      `
      })
      .join("")
  },

  loadRentals: () => {
    const rentalsBody = document.getElementById("rentalsBody")
    const bookings = window.backend.getBookings()

    rentalsBody.innerHTML = bookings
      .map((booking) => {
        const vehicle = window.backend.getVehicle(booking.vehicleId)
        return `
        <tr>
          <td>${booking.id}</td>
          <td>${vehicle.make} ${vehicle.model}</td>
          <td>${booking.pickupDate}</td>
          <td>${booking.returnDate}</td>
          <td>$${booking.cost || "N/A"}</td>
          <td><span class="status-badge ${booking.status}">${booking.status.toUpperCase()}</span></td>
        </tr>
      `
      })
      .join("")
  },
}

function showPage(pageId) {
  const contentPages = document.querySelectorAll(".content-page")
  contentPages.forEach((page) => {
    page.style.display = page.id === pageId ? "block" : "none"
  })
}

function handleBooking(event) {
  event.preventDefault()
  const vehicleId = document.getElementById("bookingVehicle").value
  const pickupDate = document.getElementById("pickupDate").value
  const returnDate = document.getElementById("returnDate").value

  if (vehicleId && pickupDate && returnDate) {
    const booking = window.backend.createBooking(vehicleId, window.auth.currentUser, pickupDate, returnDate)
    alert("Booking created successfully! Booking ID: " + booking.id)
    document.getElementById("bookingForm").reset()
    clientDashboard.loadBookings()
    clientDashboard.loadRentals()
    showPage("viewBookings")
  }
}

function handleCancelBooking(bookingId) {
  if (confirm("Are you sure you want to cancel this booking?")) {
    window.backend.cancelBooking(bookingId)
    alert("Booking cancelled successfully!")
    clientDashboard.loadBookings()
  }
}

function handlePayment(event) {
  event.preventDefault()
  const bookingId = document.getElementById("paymentBookingId").value
  const amount = document.getElementById("paymentAmount").value
  const method = document.getElementById("paymentMethod").value

  if (method === "gcash") {
    openGCashPaymentModal(bookingId, amount)
  } else {
    alert("Payment of $" + amount + " processed successfully!")
    document.getElementById("paymentForm").reset()
  }
}

function openGCashPaymentModal(bookingId, amount) {
  alert("Open GCash Payment Modal for Booking ID: " + bookingId + " and Amount: $" + amount)
}

window.clientDashboard = clientDashboard
