const chatbox = document.getElementById("chatbox");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

const MODEL = "gpt-4o-2024-05-13"; // Mini model

async function callChatGPT(userMessage) {
  try {
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

    if (!response.ok) {
      console.error("API error:", data);
      return "Oops, there was a problem talking to OpenAI.";
    }

    return data.choices?.[0]?.message?.content || "Hmm, something went wrong.";
  } catch (error) {
    console.error("Fetch error:", error);
    return "There was a network error. Please try again.";
  }
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
