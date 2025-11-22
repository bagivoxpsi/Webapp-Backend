document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("email-form").addEventListener("submit", (e) => {
        e.preventDefault()

        const newEmail = document.getElementById("new-email").value.trim()

        if (!newEmail) {
            alert("Please enter a new email address")
            return
        }

        if (!newEmail.includes("@")) {
            alert("Please enter a valid email address")
            return
        }

        if (newEmail.indexOf("@") === 0) {
            alert("Should have a name before '@'")
            return
        }

        if (!(newEmail.includes("yahoo") || newEmail.includes("gmail") || newEmail.includes("hotmail") || newEmail.includes("outlook"))) {
            alert("Please enter a valid email address (yahoo, gmail etc.)")
            return
        }

        if (!newEmail.includes(".com")) {
            alert("Please enter a valid email address")
            return
        }

        localStorage.setItem("userEmail", newEmail)

        alert("Email updated successfully!")

        document.getElementById("new-email").value = ""
    })

    document.getElementById("password-form").addEventListener("submit", (e) => {
        e.preventDefault()

        const currentPassword = document.getElementById("current-password").value.trim()
        const newPassword = document.getElementById("new-password").value.trim()
        const confirmPassword = document.getElementById("confirm-password").value.trim()


        if (!currentPassword || !newPassword || !confirmPassword) {
            alert("Please fill in all password fields")
            return
        }

        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!")
            return
        }


        localStorage.setItem("userPassword", newPassword)

        alert("Password updated successfully!")

        document.getElementById("current-password").value = ""
        document.getElementById("new-password").value = ""
        document.getElementById("confirm-password").value = ""
    })
})