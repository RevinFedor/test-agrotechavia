

## Возможности ✨

- **Создание полигонов**: Интуитивно понятный интерфейс для рисования полигонов на карте
- **Редактирование границ**: Возможность изменять форму и размер существующих полигонов
- **Расчет параметров**: Автоматический расчет площади (в гектарах) и периметра (в метрах)
- **Проверка точек**: Инструмент для проверки, находится ли указанная точка внутри полигона
- **Экспорт/Импорт**: Сохранение и загрузка данных полигонов в формате JSON
- **Координаты вершин**: Отображение точных координат всех вершин полигона
- **Множественные полигоны**: Поддержка работы с несколькими полигонами одновременно


## Описание основных компонентов

### Components
- `CoordinatesList.tsx` - Отображает список координат вершин полигона
- `ErrorBoundary.tsx` - Обрабатывает ошибки в компонентах
- `FileControls.tsx` - Управление импортом/экспортом файлов
- `MapComponent.tsx` - Основной компонент карты с функционалом рисования
- `PointChecker.tsx` - Проверяет, находится ли точка внутри полигона
- `PolygonDetails.tsx` - Показывает информацию о выбранном полигоне

### Utils
- `calculations.ts` - Функции для расчёта площади и периметра полигона
- `fileHandlers.ts` - Обработка импорта/экспорта JSON файлов
- `polygonUtils.ts` - Утилиты для работы с полигонами

### Config
- `mapConfig.ts` - Конфигурация карты, включая центр, масштаб и настройки рисования

## Установка и запуск 🚀

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/field-mapping-app.git
cd field-mapping-app
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите приложение в режиме разработки:
```bash
npm run dev
```