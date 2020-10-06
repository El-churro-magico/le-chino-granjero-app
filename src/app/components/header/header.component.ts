import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule]
})

export class HeaderComponent{
  constructor() {}
}
