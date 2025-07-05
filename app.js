const chatbox = document.getElementById("chatbox");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

async function callChatGPT(userMessage) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userMessage })
  });

  const data = await response.json();
  return data.reply || "Hmm, something went wrong.";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  chatbox.innerHTML += `<div class="user-msg">${userMessage}</div>`;
  input.value = "";

  const aiReply = await callChatGPT(userMessage);
  chatbox.innerHTML += `<div class="ai-msg">${aiReply}</div>`;
  chatbox.scrollTop = chatbox.scrollHeight;
});
