import { Body, Controller, Get, Headers, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { SiteService } from './site.service';

@Controller('api')
export class SiteController {
  constructor(private readonly site: SiteService) {}

  // Data situs (layanan, FAQ, kontak) untuk halaman depan
  @Get('config')
  config() {
    return this.site.getConfig();
  }

  // Mencatat klik tombol pesan
  @Post('track')
  @HttpCode(204)
  track(@Body() body: { label?: string }) {
    if (body && typeof body.label === 'string' && body.label.trim()) {
      this.site.track(body.label.trim());
    }
  }

  // Statistik klik. Header: x-admin-token
  @Get('stats')
  stats(@Headers('x-admin-token') token?: string) {
    if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
      throw new UnauthorizedException();
    }
    return this.site.stats();
  }
}
