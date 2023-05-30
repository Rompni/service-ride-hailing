require('dotenv').config()

import 'reflect-metadata'
import { DataSource } from 'typeorm'
import config from 'config'


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
   logging: false,
   entities: ['src/models/**/*.entity{.ts,.js}'],
   migrations: [process.env.MIGRATION_PATH || 'src/migrations/**/*{.ts,.js}'],
   subscribers: ['src/subscribers/**/*{.ts,.js}'],
})
