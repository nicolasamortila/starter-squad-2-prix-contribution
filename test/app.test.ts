import { describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';

const call = { method: 'GET' as const, url: '/v1/pricing/late-checkout/bounds?hotelId=VEL-LYO-02&date=2026-11-01' };

describe('starter squad-2-prix', () => {
  it('répond sur /health avec la squad et ses flags', async () => {
    const app = buildApp({ flags: { lco_prix_bounds: false } });
    const res = await app.inject({ method: 'GET', url: '/health' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ status: 'ok', squad: 'squad-2-prix', flags: { lco_prix_bounds: false } });
  });

  it('masque la route tant que le flag est désactivé', async () => {
    const app = buildApp({ flags: { lco_prix_bounds: false } });
    const res = await app.inject(call);
    expect(res.statusCode).toBe(404);
    expect(res.json()).toMatchObject({ code: 'LCO_FEATURE_DISABLED' });
  });

  it('expose la route en bouchon quand le flag est activé', async () => {
    const app = buildApp({ flags: { lco_prix_bounds: true } });
    const res = await app.inject(call);
    expect(res.statusCode).toBe(501);
    expect(res.json()).toMatchObject({ code: 'LCO_NOT_IMPLEMENTED' });
  });

  it('compte les requêtes dans /metrics', async () => {
    const app = buildApp({ flags: { lco_prix_bounds: false } });
    await app.inject({ method: 'GET', url: '/health' });
    const res = await app.inject({ method: 'GET', url: '/metrics' });
    expect(res.json().requests).toMatchObject({ '/health 200': 1 });
  });
});
