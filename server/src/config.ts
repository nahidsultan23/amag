import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) console.log('Port is required');
if (!process.env.DB_HOST) console.log('DB Host is required');
if (!process.env.DB_NAME) console.log('DB Name is required');

export const config = {
  port: Number(process.env.PORT),
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUri: 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME,
  userName: process.env.USER_NAME || 'Admin',
};
