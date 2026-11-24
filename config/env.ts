import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_BASE_URL = 'https://demowebshop.tricentis.com';

export const BASE_URL: string = process.env.BASE_URL ?? DEFAULT_BASE_URL;
