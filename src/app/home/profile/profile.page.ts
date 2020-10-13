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
