import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { ProfilePage } from './profile/profile.page'

import { HomePageRoutingModule } from './home-routing.module';
import { ProductorCardComponent } from '../components/productor-card/productor-card.component';
import { HeaderComponent } from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    ProfilePage,
    ProductorCardComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class HomePageModule {}
