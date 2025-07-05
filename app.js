const chatbox = document.getElementById("chatbox");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

async function callChatGPT(userMessage) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk-YOUR-OPENAI-KEY-HERE"
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You're Tidbit Tutor, a friendly, helpful guide to AI tips from DailyTidbit.org. Keep answers short, clear, and beginner-friendly. Ask follow-up questions if the user seems stuck." },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Hmm, something went wrong.";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  chatbox.innerHTML += `<div class="user-msg">${userMessage}</div>`;
  input.value = "";

  try {
    const aiReply = await callChatGPT(userMessage);
    chatbox.innerHTML += `<div class="ai-msg">${aiReply}</div>`;
  } catch (error) {
    chatbox.innerHTML += `<div class="ai-msg">There was a network error. Please try again.</div>`;
  }

  chatbox.scrollTop = chatbox.scrollHeight;
});