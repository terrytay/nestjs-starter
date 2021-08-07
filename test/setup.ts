import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    console.log('Removing previous test database');
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (e) {
    console.log('No test database to delete');
  }
});
