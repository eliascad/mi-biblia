document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chatbot-toggle');
  const closeBtn = document.getElementById('chatbot-close');
  const clearBtn = document.getElementById('chatbot-clear');
  const chatWindow = document.getElementById('chatbot-window');
  const messagesContainer = document.getElementById('chatbot-messages');
  const inputField = document.getElementById('chatbot-input-field');
  const form = document.getElementById('chatbot-form');
  const quickReplies = document.getElementById('quick-replies');
  let chatHistory = [];

  toggleBtn.addEventListener('click', () => { chatWindow.classList.remove('hidden'); inputField.focus(); });
  closeBtn.addEventListener('click', () => chatWindow.classList.add('hidden'));
  clearBtn.addEventListener('click', resetChat);
  form.addEventListener('submit', (event) => { event.preventDefault(); handleSend(); });
  quickReplies.addEventListener('click', (event) => {
    const button = event.target.closest('[data-message]');
    if (!button) return;
    inputField.value = button.dataset.message;
    handleSend();
  });

  function resetChat() {
    chatHistory = [];
    messagesContainer.innerHTML = '<div class="message bot"><div class="message-content">Hola. Soy el asistente virtual de nuestra forrajeria.<br>En que puedo ayudarte hoy?</div></div>';
    messagesContainer.appendChild(quickReplies);
    quickReplies.style.display = '';
  }

  async function handleSend() {
    const text = inputField.value.trim();
    if (!text) return;
    inputField.value = '';
    quickReplies.style.display = 'none';
    addMessage(text, 'user');
    const typingId = addTypingIndicator();
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, history: chatHistory }) });
      const data = await response.json();
      removeMessage(typingId);
      if (!response.ok) throw new Error(data.error || 'Error de servidor');
      addMessage(data.response, 'bot');
      chatHistory.push({ sender: 'user', text }, { sender: 'bot', text: data.response });
    } catch (error) {
      console.error(error);
      removeMessage(typingId);
      addMessage('No pudimos conectarnos al servidor. Por favor, intenta mas tarde o contactanos por WhatsApp.', 'bot');
    }
  }

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    msgDiv.appendChild(contentDiv);
    messagesContainer.appendChild(msgDiv);
    scrollToBottom();
  }

  function addTypingIndicator() {
    const id = `typing-${Date.now()}`;
    const indicator = document.createElement('div');
    indicator.id = id;
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(indicator);
    scrollToBottom();
    return id;
  }

  function removeMessage(id) { document.getElementById(id)?.remove(); }
  function scrollToBottom() { messagesContainer.scrollTop = messagesContainer.scrollHeight; }
});
