import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;

  noticias:Article[] = [];

  constructor(private storage: Storage, public toastController: ToastController) { 

    this.init();
    this.cargarFavoritos();

  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    //await this.storage.create();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  guardarNoticia(noticia:Article){

    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if( !existe ){

      this.noticias.unshift(noticia);
      this._storage?.set('favoritos', this.noticias);

    }

    this.presentToast('Agregado a favoritos');

  }

  borrarNoticia(noticia:Article){

    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    this._storage?.set('favoritos', this.noticias);

    this.presentToast('Eliminado de favoritos');

  }

  async cargarFavoritos(){
    /*this.storage.get('favoritos')
      .then( favoritos => {
        console.log('fav',favoritos);
      });*/

    const favoritos = await this.storage.get('favoritos');
    console.log('fav',favoritos);

    if( favoritos ){
      this.noticias = favoritos;
    }
      
  }

}
