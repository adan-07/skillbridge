import { db } from "./firebase-config.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const WORKER_URL = "https://skillbridge.adan-mudassar07.workers.dev";

document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("skillbridge_user"));

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const welcomeHeader = document.getElementById("welcome-header");
  const userStatus = document.getElementById("user-status");
  const roadmapOutput = document.getElementById("roadmap-output");
  const nextBtn = document.getElementById("next-btn");

  if (welcomeHeader) welcomeHeader.textContent = `🗺️ Welcome, ${user.name}!`;

  const selectedSkill = (user.priorSkills && user.priorSkills.length > 0) ? user.priorSkills[0] : "Web Development";
  if (userStatus) userStatus.textContent = `Level: ${(user.skillLevel || 'beginner').toUpperCase()} | Track: ${selectedSkill}`;

  fetchAIRoadmap(selectedSkill, user.skillLevel || 'beginner');

  async function fetchAIRoadmap(skill, level) {
    if (roadmapOutput) {
      roadmapOutput.innerHTML = "<p>⏳ <i>Generating your customized week-by-week roadmap...</i></p>";
    }

    const prompt = `Generate a 4-week step-by-step learning roadmap for a student learning ${skill} at a ${level} level. Include weekly milestones in HTML bullet points. Return HTML tags only.`;

    try {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are SkillBridge AI Roadmap Generator." },
            { role: "user", content: prompt }
          ],
          temperature: 0.5
        })
      });

      const data = await response.json();
      const generatedText = data.choices[0].message.content;

      if (roadmapOutput) roadmapOutput.innerHTML = generatedText;
      if (nextBtn) nextBtn.style.display = "block";

      if (user.uid) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { selectedSkill: skill, roadmapGenerated: true });
      }

    } catch (error) {
      console.error("Roadmap Error:", error);
      if (roadmapOutput) {
        roadmapOutput.innerHTML = `
          <div>
            <h3>📍 Default 4-Week Track: ${skill}</h3>
            <ul>
              <li><b>Week 1:</b> Fundamentals & Core Concepts</li>
              <li><b>Week 2:</b> Intermediate Practical Exercises</li>
              <li><b>Week 3:</b> Mini Project Creation</li>
              <li><b>Week 4:</b> Portfolio Build</li>
            </ul>
          </div>`;
      }
      if (nextBtn) nextBtn.style.display = "block";
    }
  }
});