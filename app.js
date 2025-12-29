function showPage(pageId) {
  const contentArea = document.getElementById("contentArea")
  const pages = contentArea.querySelectorAll(".content-page")

  pages.forEach((page) => page.classList.remove("active"))

  const targetPage = document.getElementById(pageId)
  if (targetPage) {
    targetPage.classList.add("active")
    const heading = targetPage.querySelector("h2")
    if (heading) {
      document.getElementById("pageTitle").textContent = heading.textContent
    }
  }

  updateActiveNav(pageId)
}

function updateActiveNav(pageId) {
  const navButtons = document.querySelectorAll(".nav-button")
  navButtons.forEach((btn) => btn.classList.remove("active"))

  const activeBtn = Array.from(navButtons).find((btn) => {
    const onclick = btn.getAttribute("onclick")
    return onclick && onclick.includes(`'${pageId}'`)
  })

  if (activeBtn) {
    activeBtn.classList.add("active")
  }
}

function openGCashPaymentModal(bookingId, amount) {
  document.getElementById("gcashBookingId").textContent = bookingId
  document.getElementById("gcashAmount").textContent = amount.toFixed(2)
  document.getElementById("paymentSuccess").style.display = "none"
  document.getElementById("gcashPhone").value = ""
  document.getElementById("gcashPin").value = ""
  document.getElementById("gcashModal").classList.add("active")
}

function closeGCashModal() {
  document.getElementById("gcashModal").classList.remove("active")
}

function processGCashPayment() {
  const phone = document.getElementById("gcashPhone").value
  const pin = document.getElementById("gcashPin").value
  const bookingId = document.getElementById("gcashBookingId").textContent
  const amount = Number.parseFloat(document.getElementById("gcashAmount").textContent)

  if (!phone || !pin) {
    alert("Please fill in all payment details")
    return
  }

  if (pin.length !== 4) {
    alert("PIN must be 4 digits")
    return
  }

  const result = window.payments.processPayment("gcash", bookingId, amount, {
    phone: phone,
    pin: pin,
  })

  if (result.success) {
    document.getElementById("paymentSuccess").style.display = "block"
    document.getElementById("gcashRef").textContent = result.transactionRef

    setTimeout(() => {
      closeGCashModal()
      alert("Payment successful! Booking confirmed.")
    }, 1500)
  } else {
    alert("Payment failed: " + result.message)
  }
}

function openIDScannerModal() {
  document.getElementById("idScannerModal").classList.add("active")
}

function closeIDScannerModal() {
  document.getElementById("idScannerModal").classList.remove("active")
  stopCameraScanning()
}

function switchIDTab(tabName) {
  const tabs = document.querySelectorAll(".scanner-content")
  tabs.forEach((tab) => tab.classList.remove("active"))

  const buttons = document.querySelectorAll(".tab-button")
  buttons.forEach((btn) => btn.classList.remove("active"))

  const targetTab = document.getElementById(tabName + "Tab")
  if (targetTab) {
    targetTab.classList.add("active")
  }

  const activeBtn = Array.from(buttons).find((btn) => {
    const onclick = btn.getAttribute("onclick")
    return onclick && onclick.includes(`'${tabName}'`)
  })

  if (activeBtn) {
    activeBtn.classList.add("active")
  }
}

function startCameraScanning() {
  const video = document.getElementById("videoElement")
  const placeholder = document.getElementById("cameraPlaceholder")

  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      video.srcObject = stream
      video.style.display = "block"
      placeholder.style.display = "none"
      document.querySelector("#startBtn") ? (document.querySelector("#startBtn").style.display = "none") : ""
      document.getElementById("captureBtn").style.display = "inline-block"
      document.getElementById("stopBtn").style.display = "inline-block"
    })
    .catch((err) => {
      alert("Unable to access camera: " + err.message)
    })
}

function captureIDPhoto() {
  const video = document.getElementById("videoElement")
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  context.drawImage(video, 0, 0)

  const imageData = canvas.toDataURL("image/png")
  processScannedIDImage(imageData)
}

function stopCameraScanning() {
  const video = document.getElementById("videoElement")
  if (video.srcObject) {
    video.srcObject.getTracks().forEach((track) => track.stop())
  }
  video.style.display = "none"
  document.getElementById("cameraPlaceholder").style.display = "flex"
  document.getElementById("captureBtn").style.display = "none"
  document.getElementById("stopBtn").style.display = "none"
}

function processIDImage(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    processScannedIDImage(e.target.result)
  }
  reader.readAsDataURL(file)
}

function processScannedIDImage(imageData) {
  // Simulate OCR data extraction
  const licenseData = {
    licenseNumber: "D" + Math.floor(Math.random() * 100000),
    name: "John Sample",
    expiry: "2025-12-31",
    class: "non-professional",
  }

  displayScannedIDData(licenseData)
}

function displayScannedIDData(data) {
  document.getElementById("displayLicense").textContent = data.licenseNumber
  document.getElementById("displayScannedName").textContent = data.name
  document.getElementById("displayScannedExpiry").textContent = data.expiry
  document.getElementById("displayScannedClass").textContent = data.class

  const expiryDate = new Date(data.expiry)
  const today = new Date()
  const isValid = expiryDate > today

  const validationMsg = document.getElementById("validationMsg")
  if (isValid) {
    validationMsg.textContent = "✓ License is valid"
    validationMsg.className = "validation-message valid"
  } else {
    validationMsg.textContent = "✗ License has expired"
    validationMsg.className = "validation-message invalid"
  }

  document.getElementById("scannedDataBox").style.display = "block"
  window.scannedIDData = data
}

function verifyAndConfirmID() {
  if (!window.scannedIDData) {
    alert("No ID data to verify")
    return
  }

  const data = window.scannedIDData
  const expiryDate = new Date(data.expiry)
  const today = new Date()

  if (expiryDate <= today) {
    alert("License has expired")
    return
  }

  alert("ID verified successfully!\nLicense: " + data.licenseNumber)
  closeIDScannerModal()
}
