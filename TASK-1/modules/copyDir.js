import {
  readdir,
  mkdir,
  copyFile,
  stat
} from 'node:fs/promises';

export const copyDir = async (sourceDir, targetDir, callback) => {
  try {
    await mkdir(targetDir, { recursive: true });

    const items = await readdir(sourceDir);

    for (const item of items) {
      const src = `${sourceDir}/${item}`;
      const dest = `${targetDir}/${item}`;
      const itemStat = await stat(src);

      if (itemStat.isDirectory()) {
        await copyDir(src, dest, callback);
      } else {
        await copyFile(src, dest);
        console.log(`Файл скопирован: ${src}`);
      }
    }

    callback(null);
  } catch (err) {
    callback(err);
  }
};
