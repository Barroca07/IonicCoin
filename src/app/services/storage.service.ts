import { Injectable } from '@angular/core';

export interface ConversionRecord {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  date: string;
}

export interface CachedRates {
  base: string;
  rates: any;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  private historyKey = 'conversion_history';
  private ratesKey = 'cached_rates';
  private settingsKey = 'app_settings';

  saveConversion(record: ConversionRecord): void {
    const history = this.getHistory();
    history.unshift(record);
    if (history.length > 50) history.pop();
    localStorage.setItem(this.historyKey, JSON.stringify(history));
  }

  getHistory(): ConversionRecord[] {
    const data = localStorage.getItem(this.historyKey);
    return data ? JSON.parse(data) : [];
  }

  clearHistory(): void {
    localStorage.removeItem(this.historyKey);
  }

  saveRates(base: string, rates: any): void {
    const cache: CachedRates = { base, rates, timestamp: Date.now() };
    localStorage.setItem(this.ratesKey, JSON.stringify(cache));
  }

  getCachedRates(base: string): CachedRates | null {
    const data = localStorage.getItem(this.ratesKey);
    if (!data) return null;
    const cache: CachedRates = JSON.parse(data);
    return cache.base === base ? cache : null;
  }

  saveSettings(settings: any): void {
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
  }

  getSettings(): any {
    const data = localStorage.getItem(this.settingsKey);
    return data ? JSON.parse(data) : { updateFrequency: 'always', notifications: false };
  }
}