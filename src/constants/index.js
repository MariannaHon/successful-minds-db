import path from 'path';

export const MAX_TOKEN_AGE = 60 * 60 * 1000;

export const TEMPLATE_DIR = path.resolve('src', 'templates');
export const TMP_UPLOAD_DIR = path.resolve('src', 'tmp');
export const UPLOAD_AVATAR_DIR = path.resolve('src', 'uploads', 'avatars');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');
