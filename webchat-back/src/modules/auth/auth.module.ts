import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AuthResolver } from './resolvers/auth.resolver'
import { AuthService } from './services/auth.service'
import { ConfigurationModule } from '@/infrastructure/configuration/configuration.module'
import { ConfigurationService } from '@/infrastructure/configuration/services/configuration.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigurationService) => {
        return {
          secret: configService.jwtConfig.jwtSecret,
          signOptions: { expiresIn: configService.jwtConfig.jwtExpiration }
        }
      },
      inject: [ConfigurationService]
    })
  ],
  providers: [
    AuthResolver,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AuthModule {}
