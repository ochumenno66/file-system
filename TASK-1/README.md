# Копирование папки на Node.js

## 📁 Структура проекта

```bash
├── index.js  # Запускает генерацию и копирование.
├── modules/
│   ├── copyDir.js   # Функция copyDir(sourceDir, targetDir, callback)
│   └── setupTestFiles.js  # Создаёт тестовую папку ./files с вложениями и большими файлами
├── files/    # создаётся автоматически
└── newFolder/   # создаётся автоматически


## 🚀 Как запустить

```bash
node index.js
