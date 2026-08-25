document.addEventListener("DOMContentLoaded", () => {
  const WORKER_URL = "https://skillbridge.adan-mudassar07.workers.dev";
  const user = JSON.parse(localStorage.getItem("skillbridge_user")) || { name: "Student", skillLevel: "beginner" };

  // Create UI Widget
  if (!document.getElementById("ai-widget-btn")) {
    const widgetHTML = `
      <div id="ai-widget-btn" style="position: fixed !important; top: 20px !important; right: 20px !important; bottom: auto !important; left: auto !important; background-color: #6366f1 !important; color: #ffffff !important; border-radius: 50% !important; width: 52px !important; height: 52px !important; display: flex !important; justify-content: center !important; align-items: center !important; cursor: pointer !important; box-shadow: 0 8px 24px rgba(0,0,0,0.6) !important; z-index: 9999999 !important; border: 2px solid #ffffff !important;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>

      <div id="ai-chat-popup" style="display: none; position: fixed !important; top: 82px !important; right: 20px !important; bottom: auto !important; left: auto !important; width: calc(100vw - 40px) !important; max-width: 360px !important; height: 460px !important; background: #121212 !important; border: 1px solid #262626 !important; border-radius: 14px !important; box-shadow: 0 20px 40px rgba(0,0,0,0.9) !important; z-index: 9999999 !important; flex-direction: column !important; overflow: hidden !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;">
        <div style="background: #18181b; color: #ffffff; padding: 14px; font-weight: 600; font-size: 0.9rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #262626;">
          <span>🤖 AI Mentor</span>
          <span id="close-widget-btn" style="cursor: pointer; font-size: 16px; color: #a1a1aa;">✕</span>
        </div>

        <div id="widget-chat-box" style="flex: 1; padding: 14px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: #0a0a0a;">
          <div style="align-self: flex-start; background: #18181b; color: #f4f4f5; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; max-width: 85%; border: 1px solid #262626;">
            Hello ${user.name}! Ask me anything about your current module or code.
          </div>
        </div>

        <form id="widget-chat-form" style="display: flex; padding: 10px; background: #121212; border-top: 1px solid #262626;">
          <input type="text" id="widget-user-input" placeholder="Type a question..." style="flex: 1; padding: 10px 12px; background: #18181b; border: 1px solid #262626; border-radius: 8px; color: #ffffff; outline: none; font-size: 0.85rem;" required>
          <button type="submit" style="margin-left: 8px; padding: 10px 14px; background: #ffffff; color: #000000; border: none; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.85rem;">Send</button>
        </form>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);
  }

  const widgetBtn = document.getElementById("ai-widget-btn");
  const chatPopup = document.getElementById("ai-chat-popup");
  const closeBtn = document.getElementById("close-widget-btn");
  const chatForm = document.getElementById("widget-chat-form");
  const userInput = document.getElementById("widget-user-input");
  const chatBox = document.getElementById("widget-chat-box");

  widgetBtn.addEventListener("click", () => {
    chatPopup.style.display = chatPopup.style.display === "none" ? "flex" : "none";
  });

  closeBtn.addEventListener("click", () => {
    chatPopup.style.display = "none";
  });

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = userInput.value.trim();
    if (!query) return;

    appendMessage(query, "user");
    userInput.value = "";

    const loadingMsg = appendMessage("<i>Thinking...</i>", "ai");

    try {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: `You are SkillBridge AI Mentor for a ${user.skillLevel || 'beginner'} student. Keep responses concise.` },
            { role: "user", content: query }
          ]
        })
      });

      const data = await response.json();

      if (data.choices && Array.isArray(data.choices) && data.choices[0]?.message?.content) {
        loadingMsg.innerHTML = data.choices[0].message.content;
      } else if (data.error) {
        const errDetails = typeof data.error === 'object' ? (data.error.message || JSON.stringify(data.error)) : data.error;
        loadingMsg.innerHTML = `<span style="color:#ff6b6b;">API Error: ${errDetails}</span>`;
      } else {
        loadingMsg.innerHTML = '<span style="color:#ff6b6b;">Invalid response structure.</span>';
      }

    } catch (error) {
      console.error("Widget Fetch Error:", error);
      loadingMsg.innerHTML = `<span style="color:#ff6b6b;">Network Error: ${error.message}</span>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
  });

  function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.style.maxWidth = "85%";
    msgDiv.style.padding = "10px 12px";
    msgDiv.style.borderRadius = "8px";
    msgDiv.style.fontSize = "0.85rem";
    msgDiv.style.lineHeight = "1.4";

    if (sender === "user") {
      msgDiv.style.alignSelf = "flex-end";
      msgDiv.style.background = "#ffffff";
      msgDiv.style.color = "#000000";
    } else {
      msgDiv.style.alignSelf = "flex-start";
      msgDiv.style.background = "#18181b";
      msgDiv.style.color = "#f4f4f5";
      msgDiv.style.border = "1px solid #262626";
    }

    msgDiv.innerHTML = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return msgDiv;
  }
});