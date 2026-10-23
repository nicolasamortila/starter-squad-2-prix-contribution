import { readFileSync } from 'node:fs';

/** Événement d'achat, d'après teams/squad-4-experience/contracts/evenements-achat.md v0.1.0. */
export interface PurchaseEvent {
  event: 'tile_viewed' | 'offer_viewed' | 'slot_selected' | 'purchase_started' | 'purchase_completed' | 'purchase_failed';
  event_id: string;
  occurred_at: string;
  reservation_id: string;
  hotel_id: string;
  platform: 'web' | 'ios' | 'android';
  offer_id?: string;
  slot?: string;
  amount_minor?: number;
  currency?: 'EUR';
  mode?: 'ONLINE' | 'AT_HOTEL';
  payment_id?: string;
  error_code?: string;
}

/** Flux d'événements synthétiques, tel que l'émettrait l'Expérience (data/purchase-events.json). */
export function loadPurchaseEvents(): PurchaseEvent[] {
  return JSON.parse(readFileSync(new URL('../../data/purchase-events.json', import.meta.url), 'utf8')) as PurchaseEvent[];
}
