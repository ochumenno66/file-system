import { EventEmitter } from "node:events";
import {
  readFile,
  writeFile,
  stat,
  copyFile,
  truncate,
} from "node:fs/promises";
import { constants } from "node:fs";

export class Logger extends EventEmitter {
  constructor(filename, maxSize) {
    super();
    this.filename = filename;
    this.maxSize = maxSize;
    this.logQueue = [];
    this.writing = false;
  }

  log(message) {
    this.logQueue.unshift(message);
    if (!this.writing) {
      this.writing = true;
      this.writeLog();
    }
  }

  async writeLog() {
    const messages = this.logQueue.join("\n") + "\n";
    this.logQueue = [];

    try {
      let existing = "";
      try {
        existing = await readFile(this.filename, "utf8");
      } catch (err) {
        if (err.code !== "ENOENT") throw err;
      }

      await writeFile(this.filename, messages + existing);
      this.emit("messageLogged", messages.trim());

      await this.checkFileSize();
    } catch (err) {
      console.error("Ошибка записи лога:", err);
    }

    if (this.logQueue.length > 0) {
      await this.writeLog();
    } else {
      this.writing = false;
    }
  }

  async getFileSize() {
    try {
      const stats = await stat(this.filename);
      return stats.size;
    } catch {
      return 0;
    }
  }

  async checkFileSize() {
    const size = await this.getFileSize();
    if (size > this.maxSize) {
      await this.rotateLog();
    }
  }

  async rotateLog() {
    try {
      await copyFile(
        this.filename,
        this.filename + ".bak",
        constants.COPYFILE_FICLONE,
      );
      await truncate(this.filename, 0);
    } catch (err) {
      console.error("Ошибка при ротации логов:", err);
    }
  }
}
