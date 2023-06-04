import path from 'path';
import fs from 'fs';
import CustomError from '../custom/error.custom.js';

export default class FilesUtils {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Create a directory.
   *
   * Create a directory by a given path.
   * @param pathToCreate - The path of the directory to create.
   * @return {void}
   */
  static createDirectory(pathToCreate) {
    let currentPath = '';
    const folders = path.normalize(pathToCreate).split(path.sep);
    for (let i = 0; i < folders.length; i += 1) {
      currentPath += folders[i] + path.sep;
      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath);
      }
    }
  }
}
