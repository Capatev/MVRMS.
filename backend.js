const backend = {
  vehicles: [
    { id: 1, make: "Honda", model: "Civic", plate: "HC-001", price: 50, available: true, image: "🚗" },
    { id: 2, make: "Toyota", model: "Camry", plate: "TC-002", price: 60, available: true, image: "🚙" },
    { id: 3, make: "Ford", model: "Explorer", plate: "FE-003", price: 80, available: false, image: "🚕" },
    { id: 4, make: "BMW", model: "3 Series", plate: "BM-004", price: 100, available: true, image: "🏎️" },
    { id: 5, make: "Mercedes", model: "C-Class", plate: "MC-005", price: 120, available: true, image: "✨" },
  ],

  bookings: [
    {
      id: "BK001",
      vehicleId: 1,
      clientName: "John Doe",
      pickupDate: "2025-01-15",
      returnDate: "2025-01-20",
      cost: 300,
      status: "confirmed",
      driverId: null,
      paymentMethod: null,
      paymentRef: null,
      paidAmount: 0,
      paymentDate: null,
    },
  ],

  users: [
    { id: 1, name: "John Doe", email: "john@example.com", role: "client", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "admin", status: "active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "staff", status: "active" },
    { id: 4, name: "Sarah Davis", email: "sarah@example.com", role: "driver", status: "active" },
  ],

  pricing: [
    { id: 1, vehicleType: "Economy", dailyRate: 50, weeklyRate: 300, monthlyRate: 1000 },
    { id: 2, vehicleType: "Premium", dailyRate: 100, weeklyRate: 600, monthlyRate: 2000 },
  ],

  drivers: [
    { id: 1, name: "Sarah Davis", license: "DL-001", status: "available", assignedBookings: [] },
    { id: 2, name: "Tom Wilson", license: "DL-002", status: "on-duty", assignedBookings: ["BK001"] },
  ],

  verifiedIDs: [],
  paymentTransactions: [],

  getVehicles: function () {
    return this.vehicles
  },

  getAvailableVehicles: function () {
    return this.vehicles.filter((v) => v.available)
  },

  getVehicle: function (id) {
    return this.vehicles.find((v) => v.id === id)
  },

  addVehicle: function (make, model, plate, price) {
    const vehicle = {
      id: this.vehicles.length + 1,
      make: make,
      model: model,
      plate: plate,
      price: price,
      available: true,
      image: "🚗",
    }
    this.vehicles.push(vehicle)
    return vehicle
  },

  deleteVehicle: function (id) {
    const index = this.vehicles.findIndex((v) => v.id === id)
    if (index > -1) {
      this.vehicles.splice(index, 1)
      return true
    }
    return false
  },

  getBookings: function () {
    return this.bookings
  },

  createBooking: function (vehicleId, clientName, pickupDate, returnDate, driverId = null) {
    const vehicle = this.getVehicle(vehicleId)
    if (!vehicle) return null

    const numDays = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))
    const cost = vehicle.price * Math.max(numDays, 1)

    const booking = {
      id: "BK" + String(this.bookings.length + 1).padStart(3, "0"),
      vehicleId: Number.parseInt(vehicleId),
      clientName: clientName,
      pickupDate: pickupDate,
      returnDate: returnDate,
      status: "pending",
      driverId: driverId,
      cost: cost,
      paymentMethod: null,
      paymentRef: null,
      paidAmount: 0,
      paymentDate: null,
    }
    this.bookings.push(booking)
    return booking
  },

  cancelBooking: function (bookingId) {
    const booking = this.bookings.find((b) => b.id === bookingId)
    if (booking) {
      booking.status = "cancelled"
      return true
    }
    return false
  },

  getUsers: function () {
    return this.users
  },

  getUsersByRole: function (role) {
    return this.users.filter((u) => u.role === role)
  },

  addUser: function (name, email, role) {
    const user = {
      id: this.users.length + 1,
      name: name,
      email: email,
      role: role,
      status: "active",
    }
    this.users.push(user)
    return user
  },

  deleteUser: function (id) {
    const index = this.users.findIndex((u) => u.id === id)
    if (index > -1) {
      this.users.splice(index, 1)
      return true
    }
    return false
  },

  getDrivers: function () {
    return this.drivers
  },

  assignDriver: function (bookingId, driverId) {
    const booking = this.bookings.find((b) => b.id === bookingId)
    const driver = this.drivers.find((d) => d.id === driverId)
    if (booking && driver) {
      booking.driverId = driverId
      driver.assignedBookings.push(bookingId)
      driver.status = "on-duty"
      return true
    }
    return false
  },

  getPricing: function () {
    return this.pricing
  },

  updatePricing: function (id, dailyRate, weeklyRate, monthlyRate) {
    const pricing = this.pricing.find((p) => p.id === id)
    if (pricing) {
      pricing.dailyRate = dailyRate
      pricing.weeklyRate = weeklyRate
      pricing.monthlyRate = monthlyRate
      return true
    }
    return false
  },
}

window.backend = backend
