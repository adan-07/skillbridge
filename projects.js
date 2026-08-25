const WORKER_URL = "https://skillbridge.adan-mudassar07.workers.dev";

document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("skillbridge_user")) || { priorSkills: ["Web Development"], skillLevel: "beginner" };
  const projectsOutput = document.getElementById("projects-output");
  const nextBtn = document.getElementById("next-btn");

  const selectedSkill = (user.priorSkills && user.priorSkills.length > 0) ? user.priorSkills[0] : "Web Development";
  const prompt = `Suggest 3 practical mini-projects for a student learning ${selectedSkill} at a ${user.skillLevel || 'beginner'} level. Return HTML bullet points only.`;

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are SkillBridge Project Advisor." },
          { role: "user", content: prompt }
        ],
        temperature: 0.6
      })
    });

    const data = await response.json();
    projectsOutput.innerHTML = data.choices[0].message.content;
    nextBtn.style.display = "block";

  } catch (error) {
    console.error("Projects Error:", error);
    projectsOutput.innerHTML = `
      <h3>📌 Recommended Mini Projects:</h3>
      <ul>
        <li><b>Portfolio Website:</b> Showcase your projects and skillsets.</li>
        <li><b>Task Management App:</b> Build a CRUD app to organize daily tasks.</li>
        <li><b>API Integration Tool:</b> Connect external APIs to fetch real-time data.</li>
      </ul>`;
    nextBtn.style.display = "block";
  }
});