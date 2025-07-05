export default async function handler(req, res) {
  const { userMessage } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
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
  const reply = data.choices?.[0]?.message?.content || "Hmm, something went wrong.";
  res.status(200).json({ reply });
}
