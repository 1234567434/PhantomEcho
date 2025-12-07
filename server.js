// server.js — суперлёгкий WebSocket сервер для PhantomEcho
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log("PhantomEcho сервер запущен на ws://localhost:8080");

wss.on('connection', (ws) => {
  console.log("Кто-то подключился");

  ws.on('message', (data) => {
    const msg = JSON.parse(data);
    
    // Рассылаем всем, включая отправителя
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          text: msg.text,
          id: 'other'  // потом будем различать, но пока всем одинаково
        }));
      }
    });
  });
});