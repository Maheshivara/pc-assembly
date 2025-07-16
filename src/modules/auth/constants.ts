export const jwtConstants = {
  accessTokenSecret: process.env.JWT_SECRET || 'IAmNotSoSmart',
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || '1h',
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET || 'IDefinitelyAmNotSoSmart',
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
};
