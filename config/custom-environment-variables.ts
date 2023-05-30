export default {
   port: 'PORT',
   salt: 'BCRYPT_SALT_ROUNDS',
   jwt: 'JWT_SECRET',
   postgresConfig: {
      host: 'POSTGRES_HOST',
      port: 'POSTGRES_PORT',
      username: 'POSTGRES_USER',
      password: 'POSTGRES_PASSWORD',
      database: 'POSTGRES_DB',
   },
   wompiConfig: {
      publicKey: 'WOMPI_PUBLIC_KEY',
      privateKey: 'WOMPI_PRIVATE_KEY',
      baseUrl: 'WOMPI_BASE_URL',
   },
}
