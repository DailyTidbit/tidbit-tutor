
const chatbox = document.getElementById("chatbox");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  chatbox.innerHTML += `<div class="user-msg">${userMessage}</div>`;
  input.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    chatbox.innerHTML += `<div class="ai-msg">${data.reply}</div>`;
  } catch (err) {
    chatbox.innerHTML += `<div class="ai-msg">There was a network error. Please try again.</div>`;
  }

  chatbox.scrollTop = chatbox.scrollHeight;
});
