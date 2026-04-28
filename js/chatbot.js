document.addEventListener("DOMContentLoaded", function() {
  var chatbotHTML = '<button id="chat-toggle" class="chat-toggle" aria-label="Open chat" type="button">'
    + '<span class="chat-pulse"></span>'
    + '<svg width="26" height="26" viewBox="0 0 24 24" fill="none">'
    + '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    + '</svg>'
    + '</button>'
    + '<div id="chat-box" class="chat-box" role="dialog" aria-label="Panda Print Magnets chat">'
    + '<div class="chat-header">'
    + '<div class="chat-agent">'
    + '<div class="agent-avatar">'
    + '<svg width="24" height="24" viewBox="0 0 24 24" fill="none">'
    + '<circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.8"/>'
    + '<circle cx="9" cy="10.5" r="1.4" fill="white"/>'
    + '<circle cx="15" cy="10.5" r="1.4" fill="white"/>'
    + '<path d="M8.5 14.5c1.5 1.5 5.5 1.5 7 0" stroke="white" stroke-width="1.8" stroke-linecap="round"/>'
    + '</svg>'
    + '</div>'
    + '<div class="agent-info">'
    + '<strong>Panda Assistant</strong>'
    + '<small><span class="online-dot"></span> Online now</small>'
    + '</div>'
    + '</div>'
    + '<button id="chat-close" type="button" aria-label="Close chat">&#x2715;</button>'
    + '</div>'
    + '<div id="chat-messages" class="chat-messages">'
    + '<div class="chat-message bot">Hi there! I am Panda Assistant. I can help you with pricing, ordering, bulk magnets, delivery, and more.</div>'
    + '<div class="quick-replies">'
    + '<button type="button" data-question="What are your prices?">Pricing</button>'
    + '<button type="button" data-question="How do I place an order?">How to order</button>'
    + '<button type="button" data-question="Do you offer bulk orders?">Bulk orders</button>'
    + '<button type="button" data-question="How long does delivery take?">Delivery</button>'
    + '</div>'
    + '</div>'
    + '<div class="chat-input-area">'
    + '<input id="chat-input" type="text" placeholder="Ask me anything..." autocomplete="off" />'
    + '<button id="chat-send" type="button" aria-label="Send message">'
    + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none">'
    + '<path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    + '</svg>'
    + '</button>'
    + '</div>'
    + '</div>';

  document.body.insertAdjacentHTML("beforeend", chatbotHTML);

  var toggleBtn = document.querySelector("#chat-toggle");
  var chatBox = document.querySelector("#chat-box");
  var closeBtn = document.querySelector("#chat-close");
  var sendBtn = document.querySelector("#chat-send");
  var input = document.querySelector("#chat-input");
  var messages = document.querySelector("#chat-messages");

  toggleBtn.addEventListener("click", function() {
    var isOpen = chatBox.classList.toggle("active");
    if (isOpen) {
      var badge = toggleBtn.querySelector(".chat-badge");
      if (badge) badge.remove();
      toggleBtn.classList.remove("attention");
      setTimeout(function() { input.focus(); }, 100);
    }
  });

  closeBtn.addEventListener("click", function() {
    chatBox.classList.remove("active");
  });

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
  });

  document.querySelectorAll(".quick-replies button").forEach(function(btn) {
    btn.addEventListener("click", function() {
      input.value = btn.dataset.question;
      sendMessage();
    });
  });

  setTimeout(function() {
    if (!chatBox.classList.contains("active")) {
      var badge = document.createElement("span");
      badge.className = "chat-badge";
      badge.textContent = "1";
      toggleBtn.appendChild(badge);
      toggleBtn.classList.add("attention");
    }
  }, 4000);

  function sendMessage() {
    var text = input.value.trim();
    if (!text) return;
    addMessage("user", text);
    input.value = "";
    showTyping();
    setTimeout(function() {
      removeTyping();
      addMessage("bot", getReply(text));
    }, 800);
  }

  function addMessage(type, text) {
    var div = document.createElement("div");
    div.className = "chat-message " + type;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    var typing = document.createElement("div");
    typing.className = "chat-message bot typing";
    typing.id = "typing-indicator";
    typing.innerHTML = "<span></span><span></span><span></span>";
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    var el = document.querySelector("#typing-indicator");
    if (el) el.remove();
  }

  function getReply(msg) {
    var m = msg.toLowerCase();

    if (/^(hi|hello|hey|howdy|sup|yo)\b/.test(m)) {
      return "Hey there! Great to hear from you. I can help with pricing, ordering, bulk requests, and more. What do you need?";
    }
    if (m.indexOf("price") > -1 || m.indexOf("cost") > -1 || m.indexOf("how much") > -1 || m.indexOf("pricing") > -1) {
      return "Our magnets start from: Classic Magnet $9.99, Collage Magnet $14.99, Event Magnet $19.99. Bulk pricing is available for 50+ orders!";
    }
    if (m.indexOf("bulk") > -1 || m.indexOf("wholesale") > -1 || m.indexOf("large order") > -1) {
      return "Yes! We handle bulk orders for weddings, schools, businesses, and events. Minimum 50 magnets. Visit our Bulk Orders page for a custom quote.";
    }
    if (m.indexOf("order") > -1 || m.indexOf("buy") > -1 || m.indexOf("purchase") > -1) {
      return "Ordering is simple: go to the Magnets page, choose your style, click Customize, upload your photo, add to cart, then complete checkout!";
    }
    if (m.indexOf("deliver") > -1 || m.indexOf("shipping") > -1 || m.indexOf("how long") > -1) {
      return "Shipping is calculated at checkout based on your location and order size. Bulk orders get clear delivery timelines when you request a quote.";
    }
    if (m.indexOf("photo") > -1 || m.indexOf("upload") > -1 || m.indexOf("picture") > -1) {
      return "You upload your photo during checkout. We recommend high-resolution images for the best print quality.";
    }
    if (m.indexOf("custom") > -1 || m.indexOf("design") > -1) {
      return "All our magnets are fully custom! Add text, choose layouts, and upload any photo. Design support included with bulk orders.";
    }
    if (m.indexOf("wedding") > -1 || m.indexOf("birthday") > -1 || m.indexOf("event") > -1 || m.indexOf("party") > -1) {
      return "Event magnets are our specialty! Weddings, birthdays, corporate events, school programs, and more. Check our Events page!";
    }
    if (m.indexOf("quality") > -1 || m.indexOf("glossy") > -1 || m.indexOf("finish") > -1) {
      return "All magnets have a premium glossy finish and strong magnetic backing. Built to last!";
    }
    if (m.indexOf("refund") > -1 || m.indexOf("return") > -1 || m.indexOf("guarantee") > -1) {
      return "If something is not right with your order, we will make it right. That is the Panda Promise!";
    }
    if (m.indexOf("contact") > -1 || m.indexOf("human") > -1 || m.indexOf("support") > -1) {
      return "Use the Contact link in our footer or request a quote on the Bulk Orders page. Our team will reply quickly!";
    }
    if (m.indexOf("thank") > -1 || m.indexOf("great") > -1 || m.indexOf("awesome") > -1) {
      return "You are welcome! Is there anything else I can help you with?";
    }
    return "I can help with pricing, ordering, bulk requests, photo upload, delivery, or event magnets. What would you like to know?";
  }
});