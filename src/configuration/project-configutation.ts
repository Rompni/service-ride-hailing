import ExpressApp from '../ExpressApp'
import { MainRouter } from '../routes/router'

export interface AppConfig {
   port: number
}

class ProjectConfiguration {
   static getExpressApp(config: AppConfig, mainRouter: MainRouter): ExpressApp {
      return new ExpressApp(config, mainRouter)
   }
}

export default ProjectConfiguration
