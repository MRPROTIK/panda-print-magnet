document.addEventListener("DOMContentLoaded", () => {

  const chatbotHTML = `
    <button id="chat-toggle" class="chat-toggle" aria-label="Open chat">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"
          stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="chat-badge" id="chat-badge">1</span>
    </button>

    <div id="chat-box" class="chat-box" role="dialog" aria-label="Panda Print chat">
      <div class="chat-header">
        <div class="chat-header-inner">
          <div class="chat-agent">
            <div class="agent-avatar">
              🐼
              <span class="agent-status-dot"></span>
            </div>
            <div class="agent-info">
              <strong>Panda Assistant</strong>
              <small>🟢 Online — replies instantly</small>
            </div>
          </div>
          <button id="chat-close" class="chat-close-btn" type="button" aria-label="Close chat">✕</button>
        </div>
      </div>

      <div id="chat-messages" class="chat-messages"></div>

      <div id="quick-replies-container" class="quick-replies"></div>

      <div class="chat-input-area">
        <input id="chat-input" type="text" placeholder="Ask me anything..." autocomplete="off" />
        <button id="chat-send" class="chat-send-btn" type="button" aria-label="Send message">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", chatbotHTML);

  const toggleBtn  = document.querySelector("#chat-toggle");
  const chatBox    = document.querySelector("#chat-box");
  const closeBtn   = document.querySelector("#chat-close");
  const sendBtn    = document.querySelector("#chat-send");
  const input      = document.querySelector("#chat-input");
  const messages   = document.querySelector("#chat-messages");
  const qrContainer = document.querySelector("#quick-replies-container");
  const badge      = document.querySelector("#chat-badge");

  let chatOpened = false;

  // ── Open / Close ──────────────────────────────────────

  function openChat() {
    chatBox.classList.add("active");
    if (badge) badge.remove();
    if (!chatOpened) {
      chatOpened = true;
      showWelcome();
    }
    setTimeout(() => input.focus(), 300);
  }

  function closeChat() {
    chatBox.classList.remove("active");
  }

  toggleBtn.addEventListener("click", () => {
    chatBox.classList.contains("active") ? closeChat() : openChat();
  });

  closeBtn.addEventListener("click", closeChat);

  // ── Welcome flow ──────────────────────────────────────

  function showWelcome() {
    setTimeout(() => {
      addBotMessage("Hi there! 👋 Welcome to **Panda Print Magnets**.");
    }, 200);

    setTimeout(() => {
      addBotMessage("I can help you with pricing, custom magnets, bulk orders, shipping, and more. What can I help you with today?");
      showQuickReplies([
        "💰 Pricing",
        "🧲 Magnet types",
        "📦 Bulk orders",
        "🚚 Shipping",
        "📸 How to order",
        "🤝 Contact us",
      ]);
    }, 900);
  }

  // ── Quick Replies ─────────────────────────────────────

  function showQuickReplies(options) {
    qrContainer.innerHTML = "";
    options.forEach(label => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = label;
      btn.addEventListener("click", () => {
        qrContainer.innerHTML = "";
        addUserMessage(label);
        handleReply(label);
      });
      qrContainer.appendChild(btn);
    });
  }

  // ── Add messages ──────────────────────────────────────

  function addBotMessage(text, followUpOptions) {
    const row = document.createElement("div");
    row.className = "bot-row";

    const avatarEl = document.createElement("div");
    avatarEl.className = "bot-avatar-sm";
    avatarEl.textContent = "🐼";

    const bubble = document.createElement("div");
    bubble.className = "chat-message bot";
    bubble.innerHTML = formatText(text);

    row.appendChild(avatarEl);
    row.appendChild(bubble);
    messages.appendChild(row);

    const timeEl = document.createElement("div");
    timeEl.className = "msg-time left";
    timeEl.textContent = getTime();
    messages.appendChild(timeEl);

    scrollDown();

    if (followUpOptions) {
      showQuickReplies(followUpOptions);
    }
  }

  function addUserMessage(text) {
    const bubble = document.createElement("div");
    bubble.className = "chat-message user";
    bubble.textContent = text;
    messages.appendChild(bubble);

    const timeEl = document.createElement("div");
    timeEl.className = "msg-time right";
    timeEl.textContent = getTime();
    messages.appendChild(timeEl);

    scrollDown();
  }

  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  function getTime() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function scrollDown() {
    messages.scrollTop = messages.scrollHeight;
  }

  // ── Typing indicator ──────────────────────────────────

  function showTyping() {
    const row = document.createElement("div");
    row.className = "typing-row";
    row.id = "typing-indicator";

    const avatarEl = document.createElement("div");
    avatarEl.className = "bot-avatar-sm";
    avatarEl.textContent = "🐼";

    const bubble = document.createElement("div");
    bubble.className = "typing-bubble";
    bubble.innerHTML = "<span></span><span></span><span></span>";

    row.appendChild(avatarEl);
    row.appendChild(bubble);
    messages.appendChild(row);
    scrollDown();
  }

  function removeTyping() {
    const el = document.querySelector("#typing-indicator");
    if (el) el.remove();
  }

  // ── Send message ──────────────────────────────────────

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    qrContainer.innerHTML = "";
    addUserMessage(text);
    input.value = "";

    showTyping();

    setTimeout(() => {
      removeTyping();
      handleReply(text);
    }, 950);
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });

  // ── Reply logic ───────────────────────────────────────

  function handleReply(msg) {
    const m = msg.toLowerCase();

    // Pricing
    if (m.includes("pric") || m.includes("cost") || m.includes("how much") || m.includes("💰")) {
      addBotMessage(
        "Here's our pricing:\n\n" +
        "🧲 **Classic Magnet** — from $9.99\n" +
        "🖼️ **Collage Magnet** — from $14.99\n" +
        "🎉 **Event Magnet** — from $19.99\n\n" +
        "Bulk orders of 50+ get volume discounts. The more you order, the better the price!",
        ["📦 Bulk pricing", "📸 How to order", "🚚 Shipping info"]
      );
      return;
    }

    // Magnet types
    if (m.includes("type") || m.includes("style") || m.includes("kind") || m.includes("magnet") || m.includes("🧲")) {
      addBotMessage(
        "We offer 3 main magnet styles:\n\n" +
        "🧲 **Classic Magnet** — Clean, simple, perfect for everyday photos\n" +
        "🖼️ **Collage Magnet** — Combine multiple photos in one design\n" +
        "🎉 **Event Magnet** — Ideal for weddings, parties & celebrations\n\n" +
        "All magnets have a premium glossy finish and strong magnetic backing.",
        ["💰 See pricing", "📸 How to order", "📦 Bulk orders"]
      );
      return;
    }

    // Bulk orders
    if (m.includes("bulk") || m.includes("event") || m.includes("wedding") || m.includes("school") || m.includes("business") || m.includes("📦")) {
      addBotMessage(
        "Yes! We love bulk orders 🎉\n\n" +
        "Perfect for:\n" +
        "💒 Weddings & save-the-dates\n" +
        "🏫 Schools & fundraisers\n" +
        "🏢 Corporate gifts & events\n" +
        "🎊 Parties & celebrations\n\n" +
        "**Minimum:** 50 magnets\n" +
        "**Pricing:** Gets better the more you order\n\n" +
        "Visit the Bulk Orders page to request a quote!",
        ["💰 Pricing", "🚚 Shipping", "🤝 Contact us"]
      );
      return;
    }

    // Shipping / delivery
    if (m.includes("ship") || m.includes("deliver") || m.includes("how long") || m.includes("arrival") || m.includes("🚚")) {
      addBotMessage(
        "🚚 **Shipping Info:**\n\n" +
        "Shipping is calculated at checkout based on your location and order size.\n\n" +
        "📦 Standard orders are typically processed within **2–3 business days** before shipping.\n\n" +
        "For bulk/event orders, delivery timelines are confirmed when you request a quote so your magnets arrive on time!",
        ["💰 Pricing", "📸 How to order", "🤝 Contact us"]
      );
      return;
    }

    // How to order
    if (m.includes("order") || m.includes("buy") || m.includes("how do") || m.includes("start") || m.includes("📸")) {
      addBotMessage(
        "Ordering is super easy! Here's how:\n\n" +
        "1️⃣ Go to the **Magnets** page\n" +
        "2️⃣ Choose your magnet style\n" +
        "3️⃣ Click **Customize** and fill in your details\n" +
        "4️⃣ Upload your photo at checkout\n" +
        "5️⃣ Add to cart and complete your order\n\n" +
        "That's it! We handle the rest 🐼",
        ["🧲 Magnet types", "💰 Pricing", "🚚 Shipping"]
      );
      return;
    }

    // Contact
    if (m.includes("contact") || m.includes("talk") || m.includes("human") || m.includes("support") || m.includes("help") || m.includes("🤝")) {
      addBotMessage(
        "We'd love to hear from you! 💬\n\n" +
        "For bulk orders or special requests, use the **Bulk Orders** page to send us your details and we'll get back to you quickly.\n\n" +
        "For general questions, you can also check our **FAQs** page in the footer.",
        ["📦 Bulk orders", "💰 Pricing", "📸 How to order"]
      );
      return;
    }

    // Quality
    if (m.includes("quality") || m.includes("material") || m.includes("finish") || m.includes("durable") || m.includes("last")) {
      addBotMessage(
        "Our magnets are made to last! ✨\n\n" +
        "✅ **Premium glossy finish** — vibrant colours that pop\n" +
        "✅ **Strong magnetic backing** — stays on your fridge\n" +
        "✅ **High-resolution printing** — crisp, detailed images\n" +
        "✅ **Quality checked** — every order inspected before shipping",
        ["💰 Pricing", "📸 How to order", "📦 Bulk orders"]
      );
      return;
    }

    // Photo upload
    if (m.includes("photo") || m.includes("upload") || m.includes("image") || m.includes("picture")) {
      addBotMessage(
        "📸 **Photo Upload:**\n\n" +
        "You upload your photo during the checkout process. Our system accepts JPG, PNG, and HEIC formats.\n\n" +
        "**Tips for best results:**\n" +
        "• Use a high-resolution photo (at least 1MB)\n" +
        "• Good lighting makes colours pop\n" +
        "• Landscape orientation works great for Classic magnets",
        ["🧲 Magnet types", "📸 How to order", "💰 Pricing"]
      );
      return;
    }

    // Greetings
    if (m.includes("hi") || m.includes("hello") || m.includes("hey") || m.includes("hiya")) {
      addBotMessage(
        "Hey there! 👋 Great to have you here.\n\nWhat can I help you with today?",
        ["💰 Pricing", "🧲 Magnet types", "📦 Bulk orders", "🚚 Shipping"]
      );
      return;
    }

    // Thanks
    if (m.includes("thank") || m.includes("thanks") || m.includes("cheers")) {
      addBotMessage(
        "You're so welcome! 🐼 Happy to help.\n\nIs there anything else I can assist you with?",
        ["💰 Pricing", "📸 How to order", "🤝 Contact us"]
      );
      return;
    }

    // Fallback
    addBotMessage(
      "Great question! I want to make sure I give you the right answer. Here are some things I can help with:",
      ["💰 Pricing", "🧲 Magnet types", "📦 Bulk orders", "🚚 Shipping", "📸 How to order", "🤝 Contact us"]
    );
  }

  // ── Auto open after delay ─────────────────────────────

  setTimeout(() => {
    if (!chatBox.classList.contains("active") && badge) {
      badge.style.display = "flex";
    }
  }, 4000);

});
