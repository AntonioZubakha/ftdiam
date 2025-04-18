import { ButtonClickCount, VisitorCount, AdminPageData } from '../interfaces/AnalyticsDataTypes';

const STORAGE_KEY = 'ftdiam_analytics';
const VISITOR_ID_KEY = 'ftdiam_visitor_id';

// Список отслеживаемых кнопок
const TRACKED_BUTTONS = [
  { id: 'home_get_in_touch', name: 'Get in touch (Home)' },
  { id: 'intro_contact_us', name: 'Contact Us (Intro)' },
  { id: 'tech_request_quotation', name: 'Request a Quotation (Technology)' },
  { id: 'request_analysis', name: 'Request Analysis Documentation (Quality)' },
  { id: 'product_contact_tailored', name: 'Let\'s Talk Solutions (Products)' }
];

// API-адрес для статистики
const API_URL = '/api/analytics';

// Функция для выполнения запроса к API
const fetchAPI = async (endpoint: string, method: string = 'GET', data?: any) => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    return null;
  }
};

// Инициализация или получение уникального ID посетителя
const getVisitorId = (): string => {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  
  if (!visitorId) {
    visitorId = 'v_' + Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  
  return visitorId;
};

// Инициализация хранилища аналитики
const initializeAnalytics = async (): Promise<AdminPageData> => {
  try {
    // Пробуем получить данные с сервера
    const apiData = await fetchAPI('');
    
    if (apiData) {
      return apiData as AdminPageData;
    }
  } catch (error) {
    console.error('Error fetching analytics data:', error);
  }
  
  // Если API не доступен, используем локальное хранилище
  const existingData = localStorage.getItem(STORAGE_KEY);
  
  if (existingData) {
    try {
      return JSON.parse(existingData);
    } catch (e) {
      console.error('Error parsing analytics data:', e);
    }
  }
  
  // Инициализация данных по умолчанию
  const defaultData: AdminPageData = {
    visitorStats: {
      total: 0,
      unique: 0
    },
    buttonClicks: TRACKED_BUTTONS.map(button => ({
      id: button.id,
      name: button.name,
      clicks: 0
    }))
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  return defaultData;
};

// Сохранение данных аналитики
const saveAnalytics = (data: AdminPageData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Отслеживание нового посетителя
export const trackVisitor = async (): Promise<void> => {
  const visitorId = getVisitorId();
  
  // Проверяем, является ли посетитель новым
  const isNewVisitor = visitorId.startsWith('v_') && 
    localStorage.getItem('ftdiam_visit_recorded') !== 'true';
  
  // Отправляем данные на сервер через API
  await fetchAPI('/visitor', 'POST', { 
    visitorId, 
    isUnique: isNewVisitor 
  });
  
  if (isNewVisitor) {
    localStorage.setItem('ftdiam_visit_recorded', 'true');
  }
  
  // Для локального кэша тоже обновляем
  const analytics = await initializeAnalytics();
  analytics.visitorStats.total += 1;
  
  if (isNewVisitor) {
    analytics.visitorStats.unique += 1;
  }
  
  saveAnalytics(analytics);
};

// Отслеживание клика по кнопке
export const trackButtonClick = async (buttonId: string): Promise<void> => {
  // Отправляем данные на сервер через API
  await fetchAPI('/button', 'POST', { buttonId });
  
  // Для локального кэша тоже обновляем
  const analytics = await initializeAnalytics();
  
  const buttonIndex = analytics.buttonClicks.findIndex(btn => btn.id === buttonId);
  if (buttonIndex !== -1) {
    analytics.buttonClicks[buttonIndex].clicks += 1;
    saveAnalytics(analytics);
  }
};

// Получение данных аналитики
export const getAnalyticsData = async (): Promise<AdminPageData> => {
  try {
    // Пробуем получить данные с сервера
    const apiData = await fetchAPI('');
    
    if (apiData) {
      return apiData as AdminPageData;
    }
  } catch (error) {
    console.error('Error fetching analytics data:', error);
  }
  
  // Если API не доступен, используем локальное хранилище
  return await initializeAnalytics();
};

// Проверка авторизации админа
export const checkAdminAuth = (login: string, password: string): boolean => {
  return login === 'Qwerty' && password === 'MegaDanik';
};

// Очистка аналитики (только для тестирования)
export const resetAnalytics = async (): Promise<void> => {
  try {
    // Пробуем сбросить данные на сервере
    await fetchAPI('/reset', 'POST', { 
      login: 'Qwerty', 
      password: 'MegaDanik' 
    });
  } catch (error) {
    console.error('Error resetting analytics data:', error);
  }
  
  // Для локального кэша тоже сбрасываем
  const analytics = await initializeAnalytics();
  
  analytics.visitorStats.total = 0;
  analytics.visitorStats.unique = 0;
  
  analytics.buttonClicks.forEach(button => {
    button.clicks = 0;
  });
  
  saveAnalytics(analytics);
}; 