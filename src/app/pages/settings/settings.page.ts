import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel, IonSelect, IonSelectOption, IonToggle, IonButton, IonIcon, IonButtons, IonMenuButton, ToastController } from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage.service';
import { addIcons } from 'ionicons';
import { saveOutline } from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel, IonSelect, IonSelectOption, IonToggle, IonButton, IonIcon, IonButtons, IonMenuButton],
})
export class SettingsPage implements OnInit {
  settings = { updateFrequency: 'always', notifications: false };

  constructor(private storageService: StorageService, private toastCtrl: ToastController) {
    addIcons({ saveOutline });
  }

  ngOnInit() {
    this.settings = this.storageService.getSettings();
  }

  save() {
    this.storageService.saveSettings(this.settings);
    this.showToast('Configurações salvas!');
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000, position: 'bottom' });
    await toast.present();
  }
}