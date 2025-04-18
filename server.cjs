const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Статические файлы из папки dist (куда Vite собирает проект)
app.use(express.static(path.join(__dirname, 'dist')));

// Обрабатываем все GET-запросы, отправляя index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 