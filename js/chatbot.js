/* ================================
   Panda Print Magnets
   Premium Chatbot — 10/10
================================ */

/* Toggle Button */

.chat-toggle {
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  z-index: 999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #7c3aed, #22d3ee);
  box-shadow:
    0 8px 32px rgba(124,58,237,0.5),
    0 0 0 0 rgba(34,211,238,0.4);
  animation: chatPulse 2.8s ease-in-out infinite;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  border: none;
}

.chat-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 14px 44px rgba(124,58,237,0.65), 0 0 0 8px rgba(34,211,238,0.12);
}

.chat-toggle svg { z-index: 2; flex-shrink: 0; }

@keyframes chatPulse {
  0%, 100% { box-shadow: 0 8px 32px rgba(124,58,237,0.5), 0 0 0 0 rgba(34,211,238,0.35); }
  50% { box-shadow: 0 8px 32px rgba(124,58,237,0.5), 0 0 0 10px rgba(34,211,238,0); }
}

/* Notification badge */

.chat-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #f43f5e;
  border: 2px solid #020617;
  font-size: 0.65rem;
  font-weight: 900;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
}

@keyframes badgePop {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Chat Box */

.chat-box {
  position: fixed;
  bottom: 104px;
  right: 28px;
  width: 370px;
  height: 540px;
  border-radius: 28px;
  display: none;
  flex-direction: column;
  overflow: hidden;
  z-index: 998;
  background: rgba(6,10,22,0.97);
  border: 1px solid rgba(103,232,249,0.18);
  box-shadow:
    0 40px 100px rgba(0,0,0,0.7),
    0 0 0 1px rgba(255,255,255,0.04),
    inset 0 1px 0 rgba(255,255,255,0.06);
  transform: translateY(16px) scale(0.97);
  opacity: 0;
  transition: transform 0.35s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s ease;
}

.chat-box.active {
  display: flex;
  transform: translateY(0) scale(1);
  opacity: 1;
}

/* Header */

.chat-header {
  position: relative;
  padding: 18px 18px 16px;
  background: linear-gradient(135deg, #5b21b6 0%, #0e7490 100%);
  overflow: hidden;
  flex-shrink: 0;
}

.chat-header::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(124,58,237,0.6), rgba(34,211,238,0.4));
  mix-blend-mode: overlay;
}

.chat-header::after {
  content: "";
  position: absolute;
  bottom: -20px;
  left: -10px;
  right: -10px;
  height: 40px;
  background: rgba(6,10,22,0.97);
  border-radius: 50%;
  filter: blur(6px);
}

.chat-header-inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-agent {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-avatar {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
  border: 2px solid rgba(255,255,255,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.4rem;
}

.agent-status-dot {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid #0e7490;
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.agent-info strong {
  display: block;
  color: #fff;
  font-size: 0.98rem;
  font-weight: 900;
  letter-spacing: 0.01em;
}

.agent-info small {
  color: rgba(255,255,255,0.78);
  font-size: 0.78rem;
  font-weight: 600;
}

.chat-close-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.14);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  flex-shrink: 0;
}

.chat-close-btn:hover { background: rgba(255,255,255,0.26); }

/* Messages Area */

.chat-messages {
  flex: 1;
  padding: 18px 16px 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: thin;
  scrollbar-color: rgba(103,232,249,0.2) transparent;
}

.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track { background: transparent; }
.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(103,232,249,0.2);
  border-radius: 999px;
}

/* Message Bubbles */

.chat-message {
  max-width: 82%;
  padding: 11px 15px;
  border-radius: 18px;
  font-size: 0.9rem;
  line-height: 1.5;
  animation: msgSlide 0.3s cubic-bezier(0.34,1.2,0.64,1) both;
}

@keyframes msgSlide {
  from { opacity: 0; transform: translateY(10px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.chat-message.bot {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.09);
  color: #e2e8f0;
  border-bottom-left-radius: 6px;
  align-self: flex-start;
}

.chat-message.user {
  background: linear-gradient(135deg, #6d28d9, #0891b2);
  color: #fff;
  border-bottom-right-radius: 6px;
  align-self: flex-end;
  box-shadow: 0 6px 20px rgba(109,40,217,0.35);
}

/* Bot message with avatar */

.bot-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  align-self: flex-start;
  max-width: 88%;
}

.bot-avatar-sm {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c3aed, #22d3ee);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  flex-shrink: 0;
  margin-bottom: 2px;
}

.bot-row .chat-message.bot {
  max-width: 100%;
}

/* Timestamp */

.msg-time {
  font-size: 0.7rem;
  color: rgba(148,163,184,0.6);
  margin-top: 2px;
  padding: 0 4px;
}

.msg-time.right { text-align: right; align-self: flex-end; }
.msg-time.left { align-self: flex-start; padding-left: 36px; }

/* Typing Indicator */

.typing-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  align-self: flex-start;
}

.typing-bubble {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 18px;
  border-bottom-left-radius: 6px;
  padding: 12px 16px;
  display: flex;
  gap: 5px;
  align-items: center;
}

.typing-bubble span {
  display: block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(103,232,249,0.6);
  animation: typingDot 1.3s ease-in-out infinite;
}

.typing-bubble span:nth-child(2) { animation-delay: 0.18s; }
.typing-bubble span:nth-child(3) { animation-delay: 0.36s; }

@keyframes typingDot {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-5px); opacity: 1; }
}

/* Quick Replies */

.quick-replies {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  padding: 0 16px 12px;
  flex-shrink: 0;
}

.quick-replies button {
  border: 1px solid rgba(103,232,249,0.3);
  padding: 7px 13px;
  border-radius: 999px;
  background: rgba(103,232,249,0.07);
  color: #67e8f9;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 750;
  transition: background 0.2s, transform 0.2s, border-color 0.2s;
  white-space: nowrap;
}

.quick-replies button:hover {
  background: rgba(103,232,249,0.18);
  border-color: rgba(103,232,249,0.55);
  transform: translateY(-2px);
}

/* Input Area */

.chat-input-area {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-top: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.03);
  flex-shrink: 0;
}

.chat-input-area input {
  flex: 1;
  padding: 11px 16px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.06);
  color: #f8fafc;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}

.chat-input-area input::placeholder {
  color: rgba(148,163,184,0.6);
}

.chat-input-area input:focus {
  border-color: rgba(34,211,238,0.45);
  background: rgba(255,255,255,0.09);
}

.chat-send-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #7c3aed, #22d3ee);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 6px 20px rgba(124,58,237,0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}

.chat-send-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 28px rgba(124,58,237,0.55);
}

/* Mobile adjustments */

@media (max-width: 480px) {
  .chat-box {
    width: calc(100vw - 24px);
    right: 12px;
    bottom: 96px;
    height: 72vh;
    max-height: 520px;
    border-radius: 24px;
  }

  .chat-toggle {
    right: 16px;
    bottom: 20px;
    width: 56px;
    height: 56px;
  }
}
