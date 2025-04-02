/**
 * Эффекты визуализации для кристаллических решеток
 * Оптимизировано в соответствии с дизайн-системой и брендбуком
 * 
 * Цветовая палитра:
 * - Темно-синий: #241e46 (RGB: 36, 30, 70 | Pantone: 275 C)
 * - Бирюзовый: #00837f (RGB: 0, 131, 127 | Pantone: 7717 C)
 * - Тёмно-серый: #545352 (RGB: 84, 83, 82 | Pantone: P 179-13 C)
 */

/**
 * Активирует параллакс-эффект для кристаллических решеток
 */
export function activateCrystalLatticeEffects(): void {
  if (typeof window === 'undefined') return;
  
  // Используем requestAnimationFrame для оптимизации анимаций
  let ticking = false;
  let lastScrollY = 0;
  
  // Обработчик DOM, запускаемый после полной загрузки страницы
  document.addEventListener('DOMContentLoaded', (): void => {
    // Улучшенный селектор для поиска секций с кристаллическими решетками
    const sections = document.querySelectorAll<HTMLElement>('.crystal-lattice-bg');
    if (!sections.length) return;
    
    sections.forEach((section: HTMLElement): void => {
      // Добавляем класс parallax ко всем секциям
      section.classList.add('parallax');
      
      // Создаем узлы кристаллической решетки для визуального эффекта
      createLatticeNodes(section);
    });
    
    // Оптимизированный обработчик скролла с использованием requestAnimationFrame
    window.addEventListener('scroll', (): void => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame((): void => {
          updateParallaxEffects(sections, lastScrollY);
          ticking = false;
        });
        
        ticking = true;
      }
    });
    
    // Добавляем слои для параллакса, если их нет
    sections.forEach((section: HTMLElement): void => {
      if (!section.querySelector(':scope > .parallax-layer')) {
        const parallaxLayer = document.createElement('div');
        parallaxLayer.className = 'parallax-layer';
        parallaxLayer.style.cssText = `
          position: absolute;
          top: -20%;
          left: 0;
          right: 0;
          bottom: -20%;
          background-image: inherit;
          background-size: 150% 150%;
          background-position: center;
          background-repeat: no-repeat;
          z-index: -1;
          opacity: 0.5;
          pointer-events: none;
        `;
        
        section.style.position = 'relative';
        section.style.overflow = 'hidden';
        section.appendChild(parallaxLayer);
      }
    });
  });
}

/**
 * Обновляет эффекты параллакса на основе текущей позиции скролла
 * @param sections - Элементы с кристаллическими решетками
 * @param scrollY - Текущая позиция скролла
 */
function updateParallaxEffects(sections: NodeListOf<HTMLElement>, scrollY: number): void {
  sections.forEach((section: HTMLElement): void => {
    const rect = section.getBoundingClientRect();
    const offset = scrollY + rect.top;
    const height = rect.height;
    
    // Параллакс-эффект применяем только когда секция видна в области просмотра
    if (scrollY > offset - window.innerHeight && scrollY < offset + height) {
      const speed = 0.15; // Оптимизированная скорость параллакса
      const yPos = -(scrollY - offset) * speed;
      
      // Применяем смещение фона для более плавного эффекта
      const parallaxElement = section.querySelector<HTMLElement>(':scope > .parallax-layer');
      if (parallaxElement) {
        parallaxElement.style.transform = `translateY(${yPos}px)`;
      }
    }
  });
}

/**
 * Создает узлы кристаллической решетки для эффекта пульсации
 * @param container - Контейнер, в котором будут созданы узлы
 */
function createLatticeNodes(container: HTMLElement): void {
  // Проверяем существующие узлы
  if (container.querySelector('.crystal-lattice-nodes')) return;
  
  const nodesContainer = document.createElement('div');
  nodesContainer.className = 'crystal-lattice-nodes';
  nodesContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  `;
  
  container.appendChild(nodesContainer);
  
  // Определяем количество узлов в зависимости от размера контейнера
  const containerArea = container.offsetWidth * container.offsetHeight;
  const nodeDensity = 0.0001; // Узлов на единицу площади
  const nodeCount = Math.min(Math.max(Math.floor(containerArea * nodeDensity), 5), 30);
  
  // Создаем узлы
  for (let i = 0; i < nodeCount; i++) {
    const node = document.createElement('div');
    node.className = 'crystal-lattice-node';
    node.style.cssText = `
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--primary-teal, #00837f);
      box-shadow: 0 0 8px rgba(0, 131, 127, 0.6);
      pointer-events: none;
    `;
    
    // Создаем равномерное распределение точек по сетке
    // Используем золотое сечение для эстетически приятного расположения
    const phi = 1.618033988749895;
    const x = ((i * phi) % 1) * 100;
    const y = ((i * phi * phi) % 1) * 100;
    
    node.style.left = `${x}%`;
    node.style.top = `${y}%`;
    
    // Добавляем анимацию пульсации с разными задержками
    node.style.animation = `pulsePattern ${3 + Math.random() * 2}s ${Math.random() * 5}s infinite alternate ease-in-out`;
    
    nodesContainer.appendChild(node);
  }
}

/**
 * Активирует эффект свечения для интерактивных элементов
 */
export function activateGlowEffects(): void {
  if (typeof window === 'undefined') return;
  
  document.addEventListener('DOMContentLoaded', (): void => {
    // Находим все элементы, которым нужно добавить эффект свечения
    const glowElements = document.querySelectorAll<HTMLElement>('.btn, .btn-primary, .feature-card, .technology-card');
    
    glowElements.forEach((element: HTMLElement): void => {
      // Добавляем класс для свечения, если его нет
      if (!element.classList.contains('glow-effect')) {
        element.classList.add('glow-effect');
        
        // Добавляем обработчики для интерактивного свечения при наведении
        element.addEventListener('mouseenter', (): void => {
          element.style.boxShadow = '0 0 15px rgba(0, 131, 127, 0.6)';
          element.style.transition = 'all 0.3s ease';
        });
        
        element.addEventListener('mouseleave', (): void => {
          element.style.boxShadow = '';
        });
      }
    });
  });
}

/**
 * Активирует все визуальные эффекты на странице
 * Основная точка входа для инициализации эффектов
 */
export function activateAllEffects(): void {
  // Проверяем наличие предпочтения пользователя по уменьшению движения
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Добавляем класс для оптимизации анимаций
  document.documentElement.classList.add('js-enabled');
  
  if (!prefersReducedMotion) {
    // Активируем эффекты с анимацией, если пользователь не против
    activateCrystalLatticeEffects();
    activateGlowEffects();
    
    // Добавляем класс для плавного появления элементов
    document.addEventListener('DOMContentLoaded', (): void => {
      setTimeout((): void => {
        document.documentElement.classList.add('crystal-patterns-ready');
      }, 300);
    });
  } else {
    // Для пользователей с предпочтением уменьшенного движения 
    // Сразу показываем контент без анимаций
    document.documentElement.classList.add('reduced-motion');
    document.documentElement.classList.add('crystal-patterns-ready');
  }
}

// Автоматически активируем эффекты при импорте модуля
activateAllEffects(); 