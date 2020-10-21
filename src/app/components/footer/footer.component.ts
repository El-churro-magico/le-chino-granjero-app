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

/** Clase encargada de cargar el componente del footer*/
export class FooterComponent{

  showDrawer = false; // Variable booleana para mostrar el carrito
  uploadRecipe = false; // Variable binaria para mostrar la seccion de subir el recibo en el carrito

  /**
  * Router para usar redirecciones,
  * auxService para usar el servicio,
  * chooser para utilizar el selector de archivos nativo de android
  * toastController para enviar un toast cuando se hace algo
  */
  constructor(
    private router: Router,
    private auxService: AuxService,
    private chooser: Chooser,
    private toastController: ToastController
  ) {}

  /** Se usa para navegar a la tienda*/
  tienda(){
    this.router.navigate(['/home']);
  }

  /** Esconde el componente de carrito*/
  hideCarrito(){
    this.showDrawer = false;
    this.uploadRecipe = false;
  }

  /** Muestra el componente de carrito*/
  carrito(){
    this.showDrawer = true;
  }

  /** Navega a la pagina de perfil */
  profile(){
    this.router.navigate(['/home/profile'])
  }

  /**Se encarga de sumar el total de la orden del carrito*/
  sumarTotal(){
    return this.auxService.carrito.reduce(
      (accumulator, productoCarrito)=> accumulator + productoCarrito.producto.price*productoCarrito.cantidad
    , 0);
  }

  /**Cambia la pantalla del carrito para que se pueda subir el recibo*/
  openCheckout(){
    if(this.auxService.carrito.length > 0){
      this.uploadRecipe = true;
    }
  }

  /** Abre el selector de archivos*/
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

  /** Sube el pedido y el recibo del carrito al REST*/
  async subir(){

    const data:{
      clientID:number,
      invoice:string,
      token:String,
      address:String,
      productIds:number[][]
    } = {
      clientID:this.auxService.profile.cedula,
      invoice:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmisfit120.files.wordpress.com%2F2013%2F08%2Fmoron2.jpg&f=1&nofb=1',
      token:this.auxService.token,
      address:this.auxService.profile.address,
      productIds:this.auxService.carrito.map(element=>{
        const toSend:number[] = [];
        toSend.push(element.producto.id);
        toSend.push(element.cantidad);
        return toSend;
      })
    };
    console.log('Subir: ' + JSON.stringify(data));

    fetch('http://'+this.auxService.ipAddress+':'+this.auxService.port+'/api/orders',{
        method:'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers:{
          'Content-Type':'application/json'
        }
      }).then(response =>{// Maneja los errores
        if(!response.ok){
          throw Error(response.statusText);
        }
        return response;
      }).then(async (response)=>{  // Agarran los success

        const toast = await this.toastController.create({
          message:'Su compra se ha realizado correctamente',
          duration:2000
        });
        this.auxService.carrito = [];
        this.hideCarrito();
        await toast.present();

        //this.router.navigate(['/login']);  // Asi se navega a otra parte de la app
      }).catch(async (error) => {  // Agarran los errores
        console.log(error);
      });


  }

}
