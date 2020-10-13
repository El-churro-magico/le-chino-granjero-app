import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AuxService} from '../../services/aux.service'

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})

export class ProfilePage implements OnInit {

  constructor(
    private auxService: AuxService,
    private router: Router
  ) {}

  ngOnInit(){  //  On init
  }

  borrarCuenta(){
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
          text:'No',
          handler: ()=>{
            console.log('No se borra');
          }
        }
      ]
    });
    await alert.present();
    console.log('Borrar cuenta');

  }

  cerrarSesion(){

  }

}
