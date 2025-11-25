document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!email.includes("@") || email.indexOf("@") === 0 ||
        !email.includes(".com") ||
        !(email.includes("yahoo") || email.includes("gmail") || email.includes("hotmail") || email.includes("outlook"))) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch("/Webapp-Backend/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userFullName", data.user.fullName);
        localStorage.setItem("userAge", data.user.age);
        alert("Login successful!");
		
        window.location.href = "/Webapp-Backend/dashboard.html";
		
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }

    document.getElementById("loginForm").reset();
  });
});
