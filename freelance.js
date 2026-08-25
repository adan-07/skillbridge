const WORKER_URL = "https://skillbridge.adan-mudassar07.workers.dev";

document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("skillbridge_user")) || { priorSkills: ["Web Development"] };
  const freelanceOutput = document.getElementById("freelance-output");

  const selectedSkill = (user.priorSkills && user.priorSkills.length > 0) ? user.priorSkills[0] : "Web Development";
  const prompt = `Give 4 actionable freelancing tips for finding clients on Upwork/Fiverr for a beginner in ${selectedSkill}. Return HTML bullet points only.`;

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are SkillBridge Career & Freelance Coach." },
          { role: "user", content: prompt }
        ],
        temperature: 0.6
      })
    });

    const data = await response.json();
    freelanceOutput.innerHTML = data.choices[0].message.content;

  } catch (error) {
    console.error("Freelance Error:", error);
    freelanceOutput.innerHTML = `
      <h3>🚀 Quick Freelance Strategy:</h3>
      <ul>
        <li><b>Portfolio First:</b> Publish 2-3 mini-projects on GitHub/Live links.</li>
        <li><b>Niche Proposals:</b> Target small, specific jobs to get your first 5-star review.</li>
        <li><b>Free Value Pitch:</b> Explain briefly in your proposal how you will solve their specific problem.</li>
        <li><b>Competitive Pricing:</b> Start with reasonable pricing until you build social proof.</li>
      </ul>`;
  }
});