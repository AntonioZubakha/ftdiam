// fileAnalytics.js - модуль для хранения статистики в JSON-файле
const fs = require('fs');
const path = require('path');

// Путь к файлу с данными
const dataFilePath = path.join(process.cwd(), 'data', 'analytics.json');

// Убедиться, что директория существует
const ensureDirectoryExists = () => {
  const directory = path.dirname(dataFilePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

// Убедиться, что файл существует
const ensureFileExists = () => {
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
  }
};

// Инициализация - проверка наличия директории и файла
const initialize = () => {
  ensureDirectoryExists();
  ensureFileExists();
};

// Получение данных из файла
const getFileData = () => {
  initialize();
  
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading analytics data:', error);
    
    // Возвращаем данные по умолчанию в случае ошибки
    return {
      visitorStats: {
        total: 0,
        unique: 0,
        ids: []
      },
      buttonClicks: []
    };
  }
};

// Сохранение данных в файл
const saveFileData = (data) => {
  initialize();
  
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving analytics data:', error);
  }
};

// Обновление счетчика посещений
const updateVisitorStats = (visitorId, isUnique = false) => {
  const data = getFileData();
  
  // Увеличиваем общее количество посещений
  data.visitorStats.total += 1;
  
  // Если это уникальный посетитель
  if (isUnique && !data.visitorStats.ids.includes(visitorId)) {
    data.visitorStats.unique += 1;
    data.visitorStats.ids.push(visitorId);
  }
  
  saveFileData(data);
};

// Обновление счетчика кликов по кнопке
const updateButtonClick = (buttonId) => {
  const data = getFileData();
  
  const button = data.buttonClicks.find(btn => btn.id === buttonId);
  if (button) {
    button.clicks += 1;
    saveFileData(data);
  }
};

// Экспорт функций
module.exports = {
  getFileData,
  updateVisitorStats,
  updateButtonClick
}; 