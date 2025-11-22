document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("profile-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const fullName = document.getElementById("full-name").value.trim()
    const age = document.getElementById("age").value.trim()

    if (!fullName) {
      alert("Please enter your full name")
      return
    }

    if (!age) {
      alert("Please enter your age")
      return
    }

    if (age < 18 || age > 100) {
      alert("Please enter a valid age (18-100)")
      return
    }
    if(!age === null){
    alert("Please enter a valid age (18-100)")
      return
    }


    localStorage.setItem("userFullName", fullName)
    localStorage.setItem("userAge", age)

    alert("Profile updated successfully!")

    document.getElementById("full-name").value = ""
    document.getElementById("age").value = ""
  })
})