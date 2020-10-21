import { Component, OnInit, Input } from '@angular/core';

import {AuxService} from '../../services/aux.service'

import {Productor} from '../../services/auxClasses/productor';

@Component({
  selector: 'app-productor',
  templateUrl: 'productor.page.html',
  styleUrls: ['productor.page.scss'],
})

/** Clase que representa la página de un productor */
export class ProductorPage implements OnInit {

  productor: Productor;

  constructor(
    private auxService: AuxService
  ) {}

  /** Método ejecutado al inicializar el componente, se encarga de cargar el productor
  * y su info en la página.
  */
  ngOnInit(){
    this.productor = this.auxService.productorCargado;
    console.log(this.auxService.productorCargado.name);
  }

}
