import { db } from "./firebase-config.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("student-table-body");

  // Real-time listener using onSnapshot
  onSnapshot(collection(db, "users"), (snapshot) => {
    tableBody.innerHTML = "";
    if (snapshot.empty) {
      tableBody.innerHTML = "<tr><td colspan='4'>No students registered yet.</td></tr>";
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${data.name || "N/A"}</td>
        <td>${data.email || "N/A"}</td>
        <td><span style="text-transform: capitalize;">${data.skillLevel || "beginner"}</span></td>
        <td>${data.selectedSkill || "Web Development"}</td>
      `;
      tableBody.appendChild(tr);
    });
  }, (error) => {
    console.error("Admin snapshot error:", error);
    tableBody.innerHTML = "<tr><td colspan='4'>Error loading data. Check Firestore rules.</td></tr>";
  });
});