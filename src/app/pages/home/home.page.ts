import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, IonIcon, IonBadge, IonSearchbar, IonButtons, IonMenuButton, ToastController, LoadingController } from '@ionic/angular/standalone';
import { CurrencyService } from '../../services/currency.service';
import { StorageService } from '../../services/storage.service';
import { addIcons } from 'ionicons';
import { swapVerticalOutline, calculatorOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, IonIcon, IonBadge, IonSearchbar, IonButtons, IonMenuButton],
})
export class HomePage implements OnInit {
  currencies: string[] = [];
  fromCurrency = 'USD';
  toCurrency = 'BRL';
  amount: number = 1;
  result: number | null = null;
  rate: number | null = null;
  rates: any = null;
  searchFrom = '';
  searchTo = '';
  isOnline = navigator.onLine;

  constructor(
    private currencyService: CurrencyService,
    private storageService: StorageService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    addIcons({ swapVerticalOutline, calculatorOutline });
  }

  ngOnInit() {
    this.loadCurrencies();
    this.loadRates();
    window.addEventListener('online', () => { this.isOnline = true; this.loadRates(); });
    window.addEventListener('offline', () => { this.isOnline = false; });
  }

  async loadCurrencies() {
    this.currencyService.getSupportedCurrencies().subscribe({
      next: (res: any) => {
        this.currencies = res.supported_codes.map((c: any) => c[0]);
      },
      error: () => {
        this.currencies = ['USD','EUR','BRL','GBP','JPY','CAD','AUD','CHF','CNY','ARS'];
      }
    });
  }

  async loadRates() {
    if (!this.isOnline) {
      const cached = this.storageService.getCachedRates(this.fromCurrency);
      if (cached) {
        this.rates = cached.rates;
        this.showToast('Usando taxas salvas offline', 'warning');
      }
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Atualizando taxas...' });
    await loading.present();

    this.currencyService.getRates(this.fromCurrency).subscribe({
      next: (res: any) => {
        this.rates = res.conversion_rates;
        this.storageService.saveRates(this.fromCurrency, this.rates);
        loading.dismiss();
      },
      error: () => {
        loading.dismiss();
        const cached = this.storageService.getCachedRates(this.fromCurrency);
        if (cached) {
          this.rates = cached.rates;
          this.showToast('Erro ao buscar taxas. Usando cache.', 'warning');
        } else {
          this.showToast('Sem conexão e sem cache disponível.', 'danger');
        }
      }
    });
  }

  convert() {
    if (!this.rates || !this.amount) return;
    this.rate = this.rates[this.toCurrency];
    this.result = this.amount * this.rate!;
    this.storageService.saveConversion({
      from: this.fromCurrency,
      to: this.toCurrency,
      amount: this.amount,
      result: this.result,
      rate: this.rate!,
      date: new Date().toLocaleString('pt-BR')
    });
  }

  swapCurrencies() {
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
    this.result = null;
    this.loadRates();
  }

  onFromChange() {
    this.result = null;
    this.loadRates();
  }

  filteredFrom() {
    return this.currencies.filter(c => c.toLowerCase().includes(this.searchFrom.toLowerCase()));
  }

  filteredTo() {
    return this.currencies.filter(c => c.toLowerCase().includes(this.searchTo.toLowerCase()));
  }

  async showToast(message: string, color = 'dark') {
    const toast = await this.toastCtrl.create({ message, duration: 2500, color, position: 'bottom' });
    await toast.present();
  }
}