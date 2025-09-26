import { mkdir, writeFile } from 'node:fs/promises';

export const setupTestFiles = async baseDir => {
  await mkdir(baseDir, { recursive: true });

  await writeFile(`${baseDir}/text.txt`, 'Тестовый текстовый файл');
  await writeFile(`${baseDir}/data.json`, JSON.stringify({ test: true }, null, 2));
  await writeFile(`${baseDir}/archive.zip`, 'Псевдо ZIP');

  const sizeMB = 8;
  const buffer = Buffer.alloc(sizeMB * 1024 * 1024, 'A');
  await writeFile(`${baseDir}/bigfile.bin`, buffer);

  await mkdir(`${baseDir}/images`, { recursive: true });
  await writeFile(`${baseDir}/images/image.png`, 'PNG-файл');

  await mkdir(`${baseDir}/docs`, { recursive: true });
  await writeFile(`${baseDir}/docs/readme.txt`, 'Файл в подпапке');

  console.log('Тестовая структура создана');
};

