import 'reflect-metadata'
import { DataSource } from 'typeorm'
import config from 'config'
require('dotenv').config()

const postgresConfig = config.get<{
  host: string
  port: number
  username: string
  password: string
  database: string
}>('postgresConfig')

export const AppDataSource = new DataSource({
  ...postgresConfig,
  type: 'postgres',
  synchronize: false,
  logging: true,
  entities: ['src/models/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscribers/**/*{.ts,.js}']
})
