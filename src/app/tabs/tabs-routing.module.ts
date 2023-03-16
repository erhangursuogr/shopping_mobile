import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductPageModule)
      },
      {
        path: 'basket',
        loadChildren: () => import('./basket/basket.module').then(m => m.BasketPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderPageModule)
      },    
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
