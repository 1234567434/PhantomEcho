const ws = new WebSocket('wss://phantomecho-server.onrender.com');
const messages = document.getElementById('messages');
const input = document.getElementById('msg');

let myId = Math.random().toString(36).slice(2,8);

ws.onopen = () => {
  addMsg('PhantomEcho подключён', 'system');
};

ws.onmessage = e => {
  const data = JSON.parse(e.data);
  if (data.type === 'online') {
    document.getElementById('online').textContent = `Онлайн: ${data.count}`;
  } else {
    const isMe = data.id === myId;
    addMsg(data.text, isMe ? 'me' : 'other');
  }
};

function addMsg(text, type) {
  const div = document.createElement('div');
  div.className = `msg ${type}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

document.getElementById('send').onclick = send;
input.addEventListener('keypress', e => e.key==='Enter' && send());

function send() {
  const text = input.value.trim();
  if (text && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({text, id: myId}));
    input.value = '';
  }
}