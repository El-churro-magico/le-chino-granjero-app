import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AlertController} from '@ionic/angular';

import {AuxService} from '../../services/aux.service'

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})

export class ProfilePage implements OnInit {

  constructor(
    private auxService: AuxService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit(){  //  On init
  }

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
            fetch('https://'+this.auxService.ipAddress+':'+this.auxService.port+'/api/Client',{
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

  async cerrarSesion(){
    const alert = await this.alertController.create({
      header:'Confirmar',
      message:'Desea cerrar sesion?',
      buttons:[
        {
          text:'Si',
          handler: ()=>{
            this.router.navigate(['/login']);
          }
        },
        {text:'No'}
      ]
    });
    await alert.present();
  }

}
