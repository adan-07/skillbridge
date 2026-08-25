import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("assessment-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    
    // Checked skills collect karein
    const checkedSkills = Array.from(
      document.querySelectorAll('input[name="skills"]:checked')
    ).map((cb) => cb.value);

    // Dynamic Skill Level Calculation Logic
    let calculatedLevel = "beginner";
    if (checkedSkills.length >= 3) {
      calculatedLevel = "advanced";
    } else if (checkedSkills.length >= 1) {
      calculatedLevel = "intermediate";
    }

    const userData = {
      name: name,
      email: email,
      priorSkills: checkedSkills,
      skillLevel: calculatedLevel,
      createdAt: serverTimestamp()
    };

    try {
      // 1. Save user to Firestore 'users' collection
      const docRef = await addDoc(collection(db, "users"), userData);

      // 2. Persist active state in localStorage for smooth navigation
      localStorage.setItem("skillbridge_user", JSON.stringify({
        uid: docRef.id,
        name: name,
        email: email,
        skillLevel: calculatedLevel,
        priorSkills: checkedSkills
      }));

      // 3. Redirect to roadmap page
      window.location.href = "roadmap.html";

    } catch (error) {
      console.error("Error saving assessment: ", error);
      alert("Something went wrong while saving your assessment. Please try again.");
    }
  });
});