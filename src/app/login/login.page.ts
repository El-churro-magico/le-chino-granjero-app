import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

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
  private alertController: AlertController) {}

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

      fetch('https://'+this.ipAddress+':'+this.port+'/api/SignIn/client/'+this.usuario,{
        method:'POST',
        mode: 'cors',
        body: this.password,
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

           console.log(json);
          
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
    else
    {
      const alert= await this.alertController.create({
        header: 'Campos faltantes!',
        message: 'Por favor llene todos los campos correspondientes!',
        buttons:['Ok']
      });
      await alert.present();
    }
  }

}
