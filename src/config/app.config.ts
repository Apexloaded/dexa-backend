export default () => ({
  APPNAME: process.env.APP_NAME,
  APPID: process.env.APP_ID,
  HOSTNAME: process.env.HOSTNAME,
  LOCALHOST: process.env.LOCALHOST,
  DB_URI: process.env.MONGO_DB_URI,
  BUCKET: process.env.BUCKET_NAME,
  SP_HOST: process.env.SP_HOST,
  STREAM_URL: process.env.STREAM_URL,
  STREAM_KEY: process.env.STREAM_KEY,
  STREAM_SECRET: process.env.STREAM_SECRET,
});
