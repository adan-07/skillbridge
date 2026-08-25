document.addEventListener("DOMContentLoaded", () => {
  const WORKER_URL = "https://skillbridge.adan-mudassar07.workers.dev";
  
  const form = document.getElementById("assessment-form");
  const submitBtn = document.getElementById("submit-btn");
  const resultSection = document.getElementById("roadmap-result-section");
  const timelineContainer = document.getElementById("roadmap-timeline");
  const pdfBtn = document.getElementById("download-pdf-btn");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("user-name").value.trim();
    
    // Checked Technologies Get Karein
    const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedSkills = Array.from(selectedCheckboxes).map(cb => cb.value);

    // Save user state for AI Mentor Context
    localStorage.setItem("skillbridge_user", JSON.stringify({
      name: fullName,
      skills: selectedSkills
    }));

    submitBtn.innerText = "Analyzing Background...";
    submitBtn.disabled = true;

    try {
      const prompt = `Generate a structured 4-week learning roadmap for student ${fullName} who knows: ${selectedSkills.join(", ") || "Beginner Basics"}. 
Return strictly a valid JSON array of objects without markdown backticks.
Format required:
[
  {"week": "Week 1", "title": "Foundation & Core Concepts", "tasks": ["Learn core syntax", "Build a practice demo"]},
  {"week": "Week 2", "title": "Intermediate Logic & Tools", "tasks": ["Understand functions/APIs", "Solve 3 mini challenges"]},
  {"week": "Week 3", "title": "Hands-on Project Building", "tasks": ["Design project UI", "Integrate logic"]},
  {"week": "Week 4", "title": "Polishing & Deployment", "tasks": ["Code cleanup", "Deploy on GitHub/Netlify"]}
]`;

      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await response.json();
      let rawText = data.choices[0].message.content.trim();

      // Clean JSON string
      rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      const roadmap = JSON.parse(rawText);

      // Render Interactive Timeline
      timelineContainer.innerHTML = roadmap.map((item) => `
        <div style="border-left: 2px solid #ffffff; padding-left: 18px; margin-bottom: 22px; position: relative;">
          <div style="position: absolute; left: -7px; top: 0; width: 12px; height: 12px; background: #ffffff; border-radius: 50%;"></div>
          <span style="color: #a1a1aa; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">${item.week}</span>
          <h3 style="color: #ffffff; margin: 4px 0 10px 0; font-size: 1.05rem;">${item.title}</h3>
          <ul style="color: #d4d4d8; padding-left: 18px; font-size: 0.88rem; margin: 0; line-height: 1.6;">
            ${item.tasks.map(task => `<li>${task}</li>`).join('')}
          </ul>
        </div>
      `).join('');

      resultSection.style.display = "block";
      resultSection.scrollIntoView({ behavior: "smooth" });

    } catch (err) {
      console.error(err);
      alert("Error generating roadmap: " + err.message);
    } finally {
      submitBtn.innerText = "Analyze & Generate Roadmap →";
      submitBtn.disabled = false;
    }
  });

  // PDF Export Function
  pdfBtn.addEventListener("click", () => {
    const element = document.getElementById("roadmap-result-section");
    const opt = {
      margin:       10,
      filename:     'SkillBridge_Roadmap.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  });
});