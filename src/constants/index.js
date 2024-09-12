import path from 'path';

export const ACCESS_TOKEN_AGE = '30m';
export const REFRESH_TOKEN_AGE = '2d';
export const MAX_REFRESH_TOKEN_AGE = 7 * 24 * 60 * 60 * 1000;

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const TEMPLATE_DIR = path.resolve('src', 'templates');
export const TMP_UPLOAD_DIR = path.resolve('src', 'tmp');
export const UPLOAD_AVATAR_DIR = path.resolve('src', 'uploads', 'avatars');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');
