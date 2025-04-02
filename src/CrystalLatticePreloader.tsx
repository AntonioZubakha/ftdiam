import { useEffect } from 'react';

/**
 * Компонент для оптимизированной предзагрузки SVG изображений кристаллических решеток
 * Предотвращает мерцание при прокрутке страницы
 */
const CrystalLatticePreloader: React.FC = () => {
  useEffect(() => {
    // Список паттернов SVG для предзагрузки
    const svgPatterns = [
      // Паттерн для Technology Section - кубическая кристаллическая решетка
      `data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(0, 131, 127, 0.25)' stroke-width='1.5'%3E%3Cpath d='M25,25 L75,25 L75,75 L25,75 Z' /%3E%3Cpath d='M25,25 L50,0 L75,25' /%3E%3Cpath d='M25,75 L0,50 L25,25' /%3E%3Cpath d='M75,75 L100,50 L75,25' /%3E%3Cpath d='M25,75 L50,100 L75,75' /%3E%3Cpath d='M50,50 L50,0' /%3E%3Cpath d='M50,50 L0,50' /%3E%3Cpath d='M50,50 L100,50' /%3E%3Cpath d='M50,50 L50,100' /%3E%3C/g%3E%3C/svg%3E`,
      
      // Паттерн для Products Section - ромбическая кристаллическая решетка с узлами
      `data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(0, 131, 127, 0.28)' stroke-width='1.6'%3E%3Cpath d='M33,33 L66,33 L66,66 L33,66 Z' /%3E%3Cpath d='M33,33 L50,16 L66,33' /%3E%3Cpath d='M33,66 L16,50 L33,33' /%3E%3Cpath d='M66,66 L83,50 L66,33' /%3E%3Cpath d='M33,66 L50,83 L66,66' /%3E%3Ccircle cx='50' cy='50' r='3.5' fill='rgba(0, 131, 127, 0.25)' stroke='none' /%3E%3Ccircle cx='33' cy='33' r='2.5' fill='rgba(0, 131, 127, 0.25)' stroke='none' /%3E%3Ccircle cx='66' cy='33' r='2.5' fill='rgba(0, 131, 127, 0.25)' stroke='none' /%3E%3Ccircle cx='33' cy='66' r='2.5' fill='rgba(0, 131, 127, 0.25)' stroke='none' /%3E%3Ccircle cx='66' cy='66' r='2.5' fill='rgba(0, 131, 127, 0.25)' stroke='none' /%3E%3C/g%3E%3C/svg%3E`,
      
      // Паттерн для Quality Section - квадратная кристаллическая решетка с диагоналями
      `data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(36, 30, 70, 0.22)' stroke-width='1.5'%3E%3Cpath d='M20,20 L80,20 L80,80 L20,80 Z' /%3E%3Cpath d='M50,20 L50,80' /%3E%3Cpath d='M20,50 L80,50' /%3E%3Cpath d='M20,20 L80,80' /%3E%3Cpath d='M80,20 L20,80' /%3E%3Ccircle cx='50' cy='50' r='4' fill='rgba(36, 30, 70, 0.2)' stroke='none' /%3E%3Ccircle cx='20' cy='20' r='3' fill='rgba(36, 30, 70, 0.2)' stroke='none' /%3E%3Ccircle cx='80' cy='20' r='3' fill='rgba(36, 30, 70, 0.2)' stroke='none' /%3E%3Ccircle cx='20' cy='80' r='3' fill='rgba(36, 30, 70, 0.2)' stroke='none' /%3E%3Ccircle cx='80' cy='80' r='3' fill='rgba(36, 30, 70, 0.2)' stroke='none' /%3E%3C/g%3E%3C/svg%3E`,
      
      // Паттерн для About Section - ромбический кристалл
      `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(36, 30, 70, 0.2)' stroke-width='1.4'%3E%3Cpath d='M30,10 L50,30 L30,50 L10,30 Z' /%3E%3Cpath d='M30,10 L30,50' /%3E%3Cpath d='M10,30 L50,30' /%3E%3Ccircle cx='30' cy='30' r='3' fill='rgba(36, 30, 70, 0.2)' stroke='none' /%3E%3Ccircle cx='30' cy='10' r='2' fill='rgba(36, 30, 70, 0.2)' stroke='none' /%3E%3Ccircle cx='50' cy='30' r='2' fill='rgba(36, 30, 70, 0.2)' stroke='none' /%3E%3Ccircle cx='30' cy='50' r='2' fill='rgba(36, 30, 70, 0.2)' stroke='none' /%3E%3Ccircle cx='10' cy='30' r='2' fill='rgba(36, 30, 70, 0.2)' stroke='none' /%3E%3C/g%3E%3C/svg%3E`
    ];
    
    // Оптимизированная предзагрузка SVG
    const preloadImages = async (): Promise<void> => {
      // Используем Promise.all для параллельной загрузки
      await Promise.all(
        svgPatterns.map(url => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = (): void => resolve();
            img.onerror = (): void => resolve(); // Продолжаем даже при ошибке
            img.src = url;
          });
        })
      );
      
      // Уведомляем о завершении предзагрузки
      console.log('Crystal lattice patterns preloaded successfully');
    };
    
    // Используем requestIdleCallback для предзагрузки в момент простоя браузера
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        preloadImages();
      });
    } else {
      // Запасной вариант для браузеров без поддержки requestIdleCallback
      setTimeout(preloadImages, 200);
    }
    
    // Добавляем класс для плавного появления фонов после загрузки
    document.documentElement.classList.add('crystal-patterns-ready');
    
    return () => {
      document.documentElement.classList.remove('crystal-patterns-ready');
    };
  }, []);
  
  // Компонент не рендерит содержимое
  return null;
};

export default CrystalLatticePreloader; 