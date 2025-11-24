document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault()

  const fullName = document.getElementById("fullName").value.trim()
  const email = document.getElementById("email").value.trim()
  const age = document.getElementById("age").value
  const password = document.getElementById("password").value.trim()

  if (!validateForm(fullName, email, age, password)) {
    return
  }

  try {
    const response = await fetch("/Webapp-Backend/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ fullName, email, age: Number.parseInt(age), password }),
    })

    const data = await response.json()

    if (data.status === "success") {
      // Store user data in localStorage
      localStorage.setItem("userEmail", data.user.email)
      localStorage.setItem("userId", data.user.id)
      localStorage.setItem("userFullName", data.user.fullName)
      localStorage.setItem("userAge", data.user.age)

      alert("Registration submitted successfully!")

      // Redirect to dashboard
      window.location.href = "../dashboard.html"
    } else {
      alert(data.message || "Signup failed")
    }
  } catch (error) {
    console.error("Signup error:", error)
    alert("An error occurred during signup")
  }
})

function validateForm(fullName, email, age, password) {
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
    alert("Email must end with @gmail.com, @hotmail.com, @outlook.com, or @yahoo.com")
    return false
  }

  if (!age) {
    alert("Age is required")
    return false
  }

  const ageNum = Number.parseInt(age)
  if (ageNum < 18 || ageNum > 100) {
    alert("Age must be between 18 and 100")
    return false
  }

  if (!password) {
    alert("Password is required")
    return false
  }

  return true
}
