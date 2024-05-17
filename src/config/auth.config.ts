export default () => ({
  jwtKey: process.env.JWT_CONSTANT,
  expiresIn: process.env.JWT_EXPIRE_IN,
  ADMIN_WALLET: process.env.ADMIN_WALLET,
  ADMIN_KEY: process.env.ADMIN_PRIVATE,
});
