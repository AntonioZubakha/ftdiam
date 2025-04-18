const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для обработки JSON-данных
app.use(express.json());

// Путь к файлу с данными - используем постоянное хранилище Render, если оно доступно
const dataDirectory = process.env.NODE_ENV === 'production' && fs.existsSync('/data') 
  ? '/data' 
  : path.join(__dirname, 'data');

const dataFilePath = path.join(dataDirectory, 'analytics.json');

// Проверка наличия директории и файла
const ensureAnalyticsFile = () => {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }
  
  if (!fs.existsSync(dataFilePath)) {
    // Список отслеживаемых кнопок
    const TRACKED_BUTTONS = [
      { id: 'home_get_in_touch', name: 'Get in touch (Home)', clicks: 0 },
      { id: 'intro_contact_us', name: 'Contact Us (Intro)', clicks: 0 },
      { id: 'tech_request_quotation', name: 'Request a Quotation (Technology)', clicks: 0 },
      { id: 'request_analysis', name: 'Request Analysis Documentation (Quality)', clicks: 0 },
      { id: 'product_contact_tailored', name: 'Let\'s Talk Solutions (Products)', clicks: 0 }
    ];
    
    const defaultData = {
      visitorStats: {
        total: 0,
        unique: 0,
        ids: []
      },
      buttonClicks: TRACKED_BUTTONS
    };
    
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
    console.log(`Created analytics file at ${dataFilePath}`);
  }
};

// Инициализация файла статистики при запуске
ensureAnalyticsFile();
console.log(`Using analytics file at: ${dataFilePath}`);

// Получение данных из файла
const getAnalyticsData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading analytics data:', error);
    return {
      visitorStats: { total: 0, unique: 0, ids: [] },
      buttonClicks: []
    };
  }
};

// Сохранение данных в файл
const saveAnalyticsData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving analytics data:', error);
  }
};

// API эндпоинты для статистики
app.get('/api/analytics', (req, res) => {
  const data = getAnalyticsData();
  res.json(data);
});

// Обновление статистики посещений
app.post('/api/analytics/visitor', (req, res) => {
  const { visitorId, isUnique } = req.body;
  const data = getAnalyticsData();
  
  // Увеличиваем общее количество посещений
  data.visitorStats.total += 1;
  
  // Проверяем уникального посетителя
  if (isUnique && !data.visitorStats.ids.includes(visitorId)) {
    data.visitorStats.unique += 1;
    data.visitorStats.ids.push(visitorId);
  }
  
  saveAnalyticsData(data);
  res.json({ success: true });
});

// Обновление статистики кликов по кнопкам
app.post('/api/analytics/button', (req, res) => {
  const { buttonId } = req.body;
  const data = getAnalyticsData();
  
  const buttonIndex = data.buttonClicks.findIndex(btn => btn.id === buttonId);
  if (buttonIndex !== -1) {
    data.buttonClicks[buttonIndex].clicks += 1;
    saveAnalyticsData(data);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, error: 'Button not found' });
  }
});

// Сброс статистики (только для админа)
app.post('/api/analytics/reset', (req, res) => {
  const { login, password } = req.body;
  
  // Проверка учетных данных
  if (login === 'Qwerty' && password === 'MegaDanik') {
    const data = getAnalyticsData();
    
    // Сбрасываем счетчики
    data.visitorStats.total = 0;
    data.visitorStats.unique = 0;
    data.visitorStats.ids = [];
    
    data.buttonClicks.forEach(button => {
      button.clicks = 0;
    });
    
    saveAnalyticsData(data);
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: 'Unauthorized' });
  }
});

// Статические файлы из папки dist (куда Vite собирает проект)
app.use(express.static(path.join(__dirname, 'dist')));

// Обрабатываем все GET-запросы, отправляя index.html (кроме API)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 