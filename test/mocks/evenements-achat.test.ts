import { describe, expect, it } from 'vitest';
import { loadPurchaseEvents } from '../../src/mocks/evenements-achat.js';

describe('mock evenements-achat v0', () => {
  it("fournit un flux d'événements au format du contrat", () => {
    const events = loadPurchaseEvents();
    expect(events.length).toBeGreaterThan(10);
    const completed = events.filter((e) => e.event === 'purchase_completed');
    expect(completed.every((e) => Number.isInteger(e.amount_minor))).toBe(true);
  });
});
