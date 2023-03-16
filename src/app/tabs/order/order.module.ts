import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderPage } from './order.page';

import { OrderPageRoutingModule } from './order-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    OrderPageRoutingModule
  ],
  declarations: [OrderPage]
})
export class OrderPageModule {}
