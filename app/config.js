import dotenv from 'dotenv';
dotenv.config({ silent: true });

export default {
  secret: process.env.API_SECRET,
};
