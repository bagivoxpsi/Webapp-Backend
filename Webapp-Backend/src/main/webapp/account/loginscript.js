document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()
    
    if (!email || !password) {
      alert("Please fill in all fields")
      return
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address")
      return
    }
    
    if(email.indexOf("@") === 0){
      alert("Should have a name before '@'")
      return;
    }
    
    if (
      !(email.includes("yahoo") || email.includes("gmail") || email.includes("hotmail") || email.includes("outlook"))
    ) {
      alert("Please enter a valid email address (yahoo, gmail etc.)")
      return
    }

    if (!email.includes(".com")) {
      alert("Please enter a valid email address")
      return
    }

    alert("Login successful! Welcome back.")
    console.log("Login attempt:", { email, password })

    document.getElementById("loginForm").reset()
  })
})