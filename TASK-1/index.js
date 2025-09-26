import { copyDir } from './modules/copyDir.js';
import { setupTestFiles } from './modules/setupTestFiles.js';

const app = async () => {
  try {
    await setupTestFiles('./files');

    await copyDir('./files', './newFolder', (err) => {
      if (err) {
        console.error('Ошибка при копировании:', err.message);
      } else {
        console.log('Копирование завершено успешно!');
      }
    });
  } catch (err) {
    console.error('Ошибка в setup:', err);
  }
};

app();
