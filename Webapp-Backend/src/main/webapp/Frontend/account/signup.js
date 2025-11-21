let users = [];

document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const fullName = document.getElementById("fullName").value.trim()
  const email = document.getElementById("email").value.trim()
  const age = document.getElementById("age").value


  if (!validateForm(fullName, email, age)) {
    return
  }

  const newUser = {
    id: Date.now(),
    fullName: fullName,
    email: email,
    age: age,
  }


  users.push(newUser)


  document.getElementById("welcomeTitle").textContent = `Hello, ${fullName}!`


  alert("Registration submitted successfully!")


  document.getElementById("signupForm").reset()


  renderUserCards()
})


function validateForm(fullName, email, age) {

  if (!fullName) {
    alert("Name is required")
    return false
  }

  if (fullName.length < 2) {
    alert("Name must be at least 2 characters")
    return false
  }


  if (!email) {
    alert("Email is required")
    return false
  }

  if (email.indexOf("@") === 0) {
    alert("Email must have characters before @")
    return false
  }

  const validDomains = ["@gmail.com", "@hotmail.com", "@outlook.com", "@yahoo.com"]
  const hasValidDomain = validDomains.some((domain) => email.includes(domain))

  if (!hasValidDomain) {
    showToast("Email must end with @gmail.com, @hotmail.com, @outlook.com, or @yahoo.com", "danger")
    return false
  }

  if (!age) {
    alert("Age is required")
    return false
  }

  const ageNum = Number.parseInt(age)
  if (ageNum < 18 || ageNum > 100) {
    showToast("Age must be between 18 and 100", "danger")
    return false
  }

  return true
}

function renderUserCards() {
  const container = document.getElementById("userCardsContainer")
  container.innerHTML = ""

  users.forEach((user) => {
    const cardHTML = `
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="card shadow border-0 h-100 user-card">
                    <div class="card-body">
                        <h3 class="card-title h5 fw-bold mb-3">${user.fullName}</h3>
                        <p class="card-text mb-2">
                            <strong>Email:</strong> ${user.email}
                        </p>
                        <p class="card-text mb-0">
                            <strong>Age:</strong> ${user.age}
                        </p>
                    </div>
                </div>
            </div>
        `
    container.innerHTML += cardHTML
  })
}

function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toastContainer")

  const toastId = `toast-${Date.now()}`

  const bgClass = type === "danger" ? "bg-danger" : "bg-success"

  const toastHTML = `
    <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `

  toastContainer.insertAdjacentHTML("beforeend", toastHTML)


  const toastElement = document.getElementById(toastId)
  const toast = new bootstrap.Toast(toastElement, {
    autohide: true,
    delay: 3000,
  })

  toast.show()

  toastElement.addEventListener("hidden.bs.toast", () => {
    toastElement.remove()
  })
}
