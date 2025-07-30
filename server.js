// Імпортуємо модуль http
const http = require('http');

// Створюємо сервер
const server = http.createServer((req, res) => {
  res.statusCode = 200; // Код відповіді
  res.setHeader('Content-Type', 'text/plain'); // Тип контенту
  res.end('Привіт! Сервер працює!'); // Відповідь
});

// Запускаємо сервер на порту 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
