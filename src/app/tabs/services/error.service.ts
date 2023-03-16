import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toastController: ToastController
  ) { }

  public errorHandler(error: any) {
    this.presentToast(error);
  }

  async presentToast(err: any) {
    const toast = await this.toastController.create({
      message: err.error,
      duration: 2000
    });
    toast.present();
  }
}
