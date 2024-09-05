import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { LoggerService } from '@infrastructure/logger/services/logger.service'

import {
  APP_NAME,
  APP_PORT,
  APP_VERSION,
  AppConfiguration,
  NODE_ENV
} from '../model/app-configuration'
import { JWT_EXPIRATION, JWT_SECRET, JWTConfiguration } from '../model/jwt-configuration'

@Injectable()
export class ConfigurationService {
  private logger = new LoggerService()

  private _appConfig!: AppConfiguration
  private _jwtConfig!: JWTConfiguration

  public isProd!: boolean

  get appConfig(): AppConfiguration {
    return this._appConfig
  }

  get jwtConfig(): JWTConfiguration {
    return this._jwtConfig
  }

  constructor(private nestConfigService: ConfigService) {
    this.setupEnvironment()
    this.logger.log('Configuration service initialized.', this.constructor.name)
    this.logger.log(`App name: ${this._appConfig.name}`, this.constructor.name)
  }

  private setupEnvironment(): void {
    // APP
    const appEnv = this.getVariableFromEnvFile(NODE_ENV)

    this._appConfig = {
      name: this.getVariableFromEnvFile(APP_NAME),
      version: this.getVariableFromEnvFile(APP_VERSION),
      port: parseInt(this.getVariableFromEnvFile(APP_PORT)),
      env: appEnv
    }

    this.isProd = appEnv.includes('prod')

    // JWT
    this._jwtConfig = {
      jwtSecret: this.getVariableFromEnvFile(JWT_SECRET),
      jwtExpiration: this.getVariableFromEnvFile(JWT_EXPIRATION)
    }
  }

  private getVariableFromEnvFile(key: string): string {
    const variable = this.nestConfigService.get<string>(key)
    if (!variable) {
      this.logger.error(`No ${key} could be found from env file.`, this.constructor.name)
      throw new Error(`No ${key} could be found from env file.`)
    }
    return variable
  }
}
