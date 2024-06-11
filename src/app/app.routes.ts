import { Routes } from '@angular/router';

import { ListComponent } from './domains/products/pages/list/list.component';
import { ProductDetailComponent } from './domains/products/pages/product-detail/product-detail.component';
import { AboutComponent } from './domains/info/pages/about/about.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayaoutComponent } from './domains/shared/components/layaout/layaout.component';

export const routes: Routes = [

    {
        path: "",
        component: LayaoutComponent,
        children: [
            {
                path: "",
                component: ListComponent
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
                path: "**",
                component: NotFoundComponent
            }
        ]
    },
    
];
