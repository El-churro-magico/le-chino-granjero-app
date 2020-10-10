import { Component} from "@angular/core";

@Component({
  selector:'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})

export class TiendaComponent{

  ngOnInit() {
    console.log("Estamos en TiendaComponent");
  }

  ionViewDidEnter(){
    console.log("eee");

  }

}
