import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

import {AuxService} from '../services/aux.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})

export class LoginPage
{

  ipAddress: string="192.168.86.250";
  port: string="44371";

  usuario:string;
  password:string;


  constructor(
    private router: Router,
    private alertController: AlertController,
    private auxService: AuxService
  ) {}

  signup(){
    this.router.navigate(['/signup']);
    console.log("A");
  }

  async login()
  {
    if(!(this.usuario==""||this.password==""))
    {
      var alert;
      console.log(this.usuario+"\n"+this.password);

      let data= {password:this.password}


      fetch('https://'+this.ipAddress+':'+this.port+'/api/SignIn/client/'+this.usuario,{
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
      }).then(async (response)=>{
         response.json().then(json=>{
           // logica aqui
           this.auxService.token = json;
           this.fetchProfile();
         })
      }).catch(async (error) => {  // Agarran los errores
          alert = await this.alertController.create({
          header: 'Alert',
          message:'Error: El usuario o contrasena proporcionado es incorrecto!',
          buttons:['Ok']
        })
        await alert.present();
        console.log(error);
      })
    }
  }

  async fetchProfile()
  {
    var alert;
    let data={token:this.auxService.token}
    fetch('https://'+this.ipAddress+':'+this.port+'/api/Client/getUserByUserName/'+this.usuario,{
      method:'POST',
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
    }).then(async (response)=>{
       response.json().then(json=>{
         // logica aqui
         this.auxService.profile = json;
       })
    })
  }
}
