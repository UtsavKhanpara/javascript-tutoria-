document.addEventListener("DOMContentLoaded", function () {
    function updateAuthButtons() {
        const loginBtn = document.getElementById("login-btn");
        const logoutBtn = document.getElementById("logout-btn");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!loginBtn || !logoutBtn) {
            console.error("Login or Logout button not found!");
            return;
        }

        if (user) {
            loginBtn.style.display = "none";  // 🔥 FIXED: अगर लॉगिन है, तो Login बटन छुपाएं
            logoutBtn.style.display = "inline";  // 🔥 FIXED: Logout बटन दिखाएं
            logoutBtn.addEventListener("click", logout);
        } else {
            loginBtn.style.display = "inline";  // 🔥 FIXED: अगर लॉगिन नहीं, तो Login बटन दिखाएं
            logoutBtn.style.display = "none";  // 🔥 FIXED: Logout बटन छुपाएं
        }
    }

    function logout(event) {
        event.preventDefault();  // 🔥 FIXED: अब पेज रीलोड नहीं होगा
        console.log("Logout Clicked!");  // ✅ Debugging के लिए Console में लॉग करें

        localStorage.removeItem("user");  // 🔥 FIXED: अब सही से डेटा हटेगा
        alert("Logged out successfully!");

        // 🔥 FIXED: अगर कार्ट पेज पर है, तो लॉगिन पेज पर भेजो
        if (window.location.pathname.includes("cart.html")) {
            window.location.href = "login.html";
        } else {
            window.location.href = "index.html";
        }
    }

    updateAuthButtons();
});
