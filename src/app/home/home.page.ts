import { Component, OnInit } from '@angular/core';

// Services
import {AuxService} from '../services/aux.service';
import {Productor} from '../services/auxClasses/productor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

/** Clase que representa la pagina principal */
export class HomePage{
  /**
  * Al ser auxService un inyectable se tiene que definir dentro de los parametros
  * del constructor para poder ser utilizado
  */
  constructor(private auxService: AuxService) {}

}
