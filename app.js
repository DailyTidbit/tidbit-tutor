const chatbox = document.getElementById("chatbox");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

// Toggle this line to switch models
const MODEL = "gpt-4o-2024-05-13"; // Mini version
// const MODEL = "gpt-4o"; // Full version if needed

async function callChatGPT(userMessage) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You're Tidbit Tutor, a friendly, helpful guide to AI tips from DailyTidbit.org. Keep answers short, clear, and beginner-friendly. Ask follow-up questions if the user seems stuck."
        },
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

  const aiReply = await callChatGPT(userMessage);
  chatbox.innerHTML += `<div class="ai-msg">${aiReply}</div>`;
  chatbox.scrollTop = chatbox.scrollHeight;
});
