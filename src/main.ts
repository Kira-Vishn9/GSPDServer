import { NestFactory } from '@nestjs/core'
import { AppModule } from './module/app/app.module'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'http://146.59.16.17:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })
  await app.listen(3000)
}

bootstrap()
// http://146.59.16.17:5173
