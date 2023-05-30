import express, { Application } from 'express'
import { AppConfig } from './configuration/project-configutation'
import { MainRouter } from './routes/router'
import { DataSource } from 'typeorm'
import config from 'config'
import { AppDataSource } from './database/data-source'
import session from 'express-session'

class ExpressApp {
   app: Application
   appConfig: AppConfig
   mainRouter: MainRouter
   connection: DataSource

   constructor(appConfig: AppConfig, mainRouter: MainRouter) {
      this.app = express()
      //this.app.use(cors())
      //this.app.options('*', cors())
      this.appConfig = {
         ...appConfig,
         port: config.get<number>('port') || 3000,
      }
      this.mainRouter = mainRouter
      this.connection = AppDataSource
   }

   private configApp(): void {
      const app = this.app
      app.use(express.json())
      app.use(express.urlencoded())
      app.use(this.mainRouter.getRouter())
      app.use(
         session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true,
         })
      )
   }

   boot(): Application {
      if (!this.app) {
         this.app = express()
      }

      this.configApp()

      this.connection.initialize().then(async () => {
         this.app.listen(this.appConfig.port, () => {
            console.log(
               `Express server has started on port ${this.appConfig.port}. Open http://localhost:${this.appConfig.port} to see results`
            )
         })
      })

      return this.app
   }

   getConnection(): DataSource {
      return this.connection
   }
}

export default ExpressApp
