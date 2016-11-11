module.exports = {
  port: process.env.PORT || 3000,
  jwt: {
    secret: 'monsecret',
    expiresIn: 30 * 60,
    refresh: {
      secret: 'monsecret',
      expiresIn: 7 * 24 * 60 * 60
    }
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mean-ts',
  }
};
