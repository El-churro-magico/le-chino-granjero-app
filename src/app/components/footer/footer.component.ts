import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss']
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule]
})

export class FooterComponent{
  constructor() {}
}
