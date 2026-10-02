import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';

@Module({
  imports: [
    // Menyajikan folder /public (index.html) di alamat utama
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveStaticOptions: { extensions: ['html'] },
      exclude: ['/api/(.*)'],
    }),
  ],
  controllers: [SiteController],
  providers: [SiteService],
})
export class AppModule {}
