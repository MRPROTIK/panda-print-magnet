document.addEventListener("DOMContentLoaded", () => {
  const chatbotHTML = `
    <div id="chat-toggle" class="chat-toggle" aria-label="Open chat">
      <span class="chat-pulse"></span>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"
          stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <div id="chat-box" class="chat-box">
      <div class="chat-header">
        <div class="chat-agent">
          <div class="agent-avatar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2"/>
              <circle cx="9" cy="10" r="1.3" fill="white"/>
              <circle cx="15" cy="10" r="1.3" fill="white"/>
              <path d="M8 15c1.6 1.2 6.4 1.2 8 0" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>

          <div>
            <strong>Panda Assistant</strong>
            <small><span class="online-dot"></span> Online now</small>
          </div>
        </div>

        <button id="chat-close" type="button">✕</button>
      </div>

      <div id="chat-messages" class="chat-messages">
        <div class="chat-message bot">
          Hi 👋 I’m Panda Assistant. Need help choosing photo magnets?
        </div>

        <div class="quick-replies">
          <button type="button" data-question="What is the price?">Price</button>
          <button type="button" data-question="How do I order?">Order</button>
          <button type="button" data-question="Do you do bulk orders?">Bulk Orders</button>
        </div>
      </div>

      <div class="chat-input-area">
        <input id="chat-input" type="text" placeholder="Ask about magnets..." />
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
  const quickButtons = document.querySelectorAll(".quick-replies button");

  toggleBtn.addEventListener("click", () => {
    chatBox.classList.toggle("active");
    input.focus();
  });

  closeBtn.addEventListener("click", () => {
    chatBox.classList.remove("active");
  });

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  quickButtons.forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.question;
      sendMessage();
    });
  });

  setTimeout(() => {
    if (!chatBox.classList.contains("active")) {
      toggleBtn.classList.add("attention");
    }
  }, 3000);

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    showTyping();

    setTimeout(() => {
      removeTyping();
      const reply = getReply(text);
      addMessage("bot", reply);
    }, 900);
  }

  function addMessage(type, text) {
    const div = document.createElement("div");
    div.className = "chat-message " + type;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement("div");
    typing.className = "chat-message bot typing";
    typing.id = "typing-indicator";
    typing.innerHTML = `<span></span><span></span><span></span>`;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const typing = document.querySelector("#typing-indicator");
    if (typing) typing.remove();
  }

  function getReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("price") || msg.includes("cost")) {
      return "Our classic photo magnets start from $9.99. Bulk pricing is available for events and larger orders.";
    }

    if (msg.includes("bulk") || msg.includes("event") || msg.includes("wedding")) {
      return "Yes! We support bulk and event orders for weddings, schools, businesses, and celebrations. Visit the Bulk Orders page to learn more.";
    }

    if (msg.includes("order") || msg.includes("buy")) {
      return "You can start from the Magnets page, choose a style, customize it, then add it to your cart.";
    }

    if (msg.includes("delivery") || msg.includes("shipping")) {
      return "Shipping is calculated later in the final checkout. This demo shows the customer journey first.";
    }

    if (msg.includes("photo") || msg.includes("upload")) {
      return "You’ll be able to upload your photo during checkout. The real upload system can be connected in the final version.";
    }

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return "Hi 👋 How can I help you with your photo magnet order?";
    }

    return "Thanks! I can help with pricing, bulk orders, photo upload, delivery, or choosing the right magnet style.";
  }
});