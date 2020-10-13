import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {Chooser} from '@ionic-native/chooser/ngx'
import { ToastController } from '@ionic/angular';

import {AuxService} from '../../services/aux.service';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss']
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule]
})

export class FooterComponent{

  showDrawer = false;
  uploadRecipe = false;

  constructor(
    private router: Router,
    private auxService: AuxService,
    private chooser: Chooser,
    private toastController: ToastController
  ) {}

  tienda(){
    this.router.navigate(['/home']);
  }

  hideCarrito(){
    this.showDrawer = false;
    this.uploadRecipe = false;
  }

  carrito(){
    this.showDrawer = true;
  }

  profile(){
    this.router.navigate(['/home/profile'])
  }

  sumarTotal(){
    return this.auxService.carrito.reduce(
      (accumulator, productoCarrito)=> accumulator + productoCarrito.producto.price*productoCarrito.cantidad
    , 0);
  }

  openCheckout(){
    if(this.auxService.carrito.length > 0){
      this.uploadRecipe = true;
    }
  }

  async choose(){
    this.chooser.getFile('image/*')
      .then(file=>console.log(file?file.name:'canceled'))
      .catch((error:any)=>console.log(error));

    const toast = await this.toastController.create({
      message:'El archivo se ha seleccionado correctamente',
      duration:2000
    })

    await toast.present();
  }

  async subir(){
    const toast = await this.toastController.create({
      message:'Su compra se ha realizado correctamente',
      duration:2000
    })
    this.auxService.carrito = [];
    this.hideCarrito();
    await toast.present();
  }

}
