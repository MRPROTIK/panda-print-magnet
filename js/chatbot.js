document.addEventListener("DOMContentLoaded", () => {
  const chatbotHTML = `
    <div id="chat-toggle" class="chat-toggle">💬</div>

    <div id="chat-box" class="chat-box">
      <div class="chat-header">
        <span>Panda Assistant</span>
        <button id="chat-close" type="button">✕</button>
      </div>

      <div id="chat-messages" class="chat-messages">
        <div class="chat-message bot">
          Hi 👋 Need help choosing photo magnets?
        </div>
      </div>

      <div class="chat-input-area">
        <input id="chat-input" type="text" placeholder="Type a message..." />
        <button id="chat-send" type="button">Send</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", chatbotHTML);

  const toggleBtn = document.querySelector("#chat-toggle");
  const chatBox = document.querySelector("#chat-box");
  const closeBtn = document.querySelector("#chat-close");
  const sendBtn = document.querySelector("#chat-send");
  const input = document.querySelector("#chat-input");
  const messages = document.querySelector("#chat-messages");

  toggleBtn.addEventListener("click", () => {
    chatBox.classList.toggle("active");
  });

  closeBtn.addEventListener("click", () => {
    chatBox.classList.remove("active");
  });

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    setTimeout(() => {
      const reply = getReply(text);
      addMessage("bot", reply);
    }, 500);
  }

  function addMessage(type, text) {
    const div = document.createElement("div");
    div.className = "chat-message " + type;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function getReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("price")) return "Bulk pricing depends on quantity. Visit the Bulk Orders page 👍";
    if (msg.includes("order")) return "You can start your order from the Magnets page.";
    if (msg.includes("hello") || msg.includes("hi")) return "Hi 👋 How can I help you?";

    return "Thanks! We’ll help you soon 😊";
  }
});