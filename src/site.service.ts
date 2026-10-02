import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const SITE = join(process.cwd(), 'data', 'site.json');
const CLICKS = join(process.cwd(), 'data', 'clicks.json');

@Injectable()
export class SiteService {
  // Dibaca ulang setiap permintaan, jadi edit data/site.json langsung berlaku tanpa restart
  getConfig() {
    return JSON.parse(readFileSync(SITE, 'utf8'));
  }

  track(label: string) {
    const data: Record<string, number> = existsSync(CLICKS)
      ? JSON.parse(readFileSync(CLICKS, 'utf8'))
      : {};
    const key = label.slice(0, 80);
    data[key] = (data[key] || 0) + 1;
    writeFileSync(CLICKS, JSON.stringify(data, null, 2));
  }

  stats() {
    return existsSync(CLICKS) ? JSON.parse(readFileSync(CLICKS, 'utf8')) : {};
  }
}
