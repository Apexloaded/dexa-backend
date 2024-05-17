export default () => ({
  APPNAME: process.env.APP_NAME,
  APPID: process.env.APP_ID,
  HOSTNAME: process.env.HOSTNAME,
  LOCALHOST: process.env.LOCALHOST,
  DB_URI: process.env.MONGO_DB_URI,
  BUCKET: process.env.BUCKET_NAME,
  SP_HOST: process.env.SP_HOST,
});
