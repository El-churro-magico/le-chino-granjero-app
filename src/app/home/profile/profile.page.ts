import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AlertController} from '@ionic/angular';

import {AuxService} from '../../services/aux.service'

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})

/** Clase encargada de representar la página del perfil del cliente */
export class ProfilePage implements OnInit {

  constructor(
    private auxService: AuxService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit(){  //  On init
  }

  /** Método encargado de borrar la cuenta del cliente y enviar la solicitud al REST*/
  async borrarCuenta(){
    const alert = await this.alertController.create({
      header:'Confirmar',
      message:'Desea borrar su cuenta?',
      buttons:[
        {
          text:'Si',
          handler: ()=>{
            console.log('Borrar cuenta');
            let data={token:this.auxService.token}
            fetch('http://'+this.auxService.ipAddress+':'+this.auxService.port+'/api/Client',{
              method:'DELETE',
              mode: 'cors',
              body:JSON.stringify(data),
              headers:{
                'Content-Type':'application/json'
              }
            }).then(response =>{// Maneja los errores
              if(!response.ok){
                throw Error(response.statusText);
              }
              return response;
            })
            this.router.navigate(['/login']);
          }
        },
        {
          text:'No'
        }
      ]
    });
    await alert.present();
  }

  /** Método encargado de cerrar la sesión del cliente y enviar la solicitud al REST*/
  async cerrarSesion(){
    const alert = await this.alertController.create({
      header:'Confirmar',
      message:'Desea cerrar sesion?',
      buttons:[
        {
          text:'Si',
          handler: ()=>{
            let data={token:this.auxService.token,
                      type:"clientes"}
            fetch('http://'+this.auxService.ipAddress+':'+this.auxService.port+'/api/SignIn',{
              method:'DELETE',
              mode: 'cors',
              body:JSON.stringify(data),
              headers:{
                'Content-Type':'application/json'
              }
            }).then(response =>{// Maneja los errores
              if(!response.ok){
                throw Error(response.statusText);
              }
              return response;
            })

            this.router.navigate(['/login']);
          }
        },
        {text:'No'}
      ]
    });
    await alert.present();
  }

}
