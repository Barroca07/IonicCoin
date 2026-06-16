import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons, IonMenuButton, AlertController, ToastController } from '@ionic/angular/standalone';
import { StorageService, ConversionRecord } from '../../services/storage.service';
import { addIcons } from 'ionicons';
import { trashOutline, timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons, IonMenuButton],
})
export class HistoryPage implements OnInit {
  history: ConversionRecord[] = [];

  constructor(
    private storageService: StorageService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    addIcons({ trashOutline, timeOutline });
  }

  ngOnInit() { this.load(); }
  ionViewWillEnter() { this.load(); }

  load() {
    this.history = this.storageService.getHistory();
  }

  async clearAll() {
    const alert = await this.alertCtrl.create({
      header: 'Limpar histórico',
      message: 'Tem certeza que deseja apagar todo o histórico?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Apagar', role: 'destructive', handler: () => {
            this.storageService.clearHistory();
            this.history = [];
            this.showToast('Histórico apagado!');
          }
        }
      ]
    });
    await alert.present();
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000, position: 'bottom' });
    await toast.present();
  }
}