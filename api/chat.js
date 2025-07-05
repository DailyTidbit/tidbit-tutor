
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You're Tidbit Tutor, a friendly, helpful guide to AI tips from DailyTidbit.org. Keep answers short, clear, and beginner-friendly. Ask follow-up questions if the user seems stuck."
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || "Hmm, something went wrong." });
  } catch (err) {
    res.status(500).json({ error: "Request failed" });
  }
}
