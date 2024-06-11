import { Routes } from '@angular/router';

import { ListComponent } from './domains/products/pages/list/list.component';
import { ProductDetailComponent } from './domains/products/pages/product-detail/product-detail.component';
import { AboutComponent } from './domains/info/pages/about/about.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayaoutComponent } from './domains/shared/components/layaout/layaout.component';
import { AddProductComponent } from './domains/products/pages/add-product/add-product.component';

export const routes: Routes = [

    {
        path: "",
        component: LayaoutComponent,
        children: [
            {
                path: "",
                loadComponent: () => import('./domains/products/pages/list/list.component').then(m=>m.ListComponent)
            },
            {
                path: "product/:id",
                component: ProductDetailComponent
            },
            {
                path: "about",
                component: AboutComponent
            },
            {
                path: "addProduct",
                component: AddProductComponent
            },
            {
                path: "**",
                component: NotFoundComponent
            }
            
        ]
    },
    
];
