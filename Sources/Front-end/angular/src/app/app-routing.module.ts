import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularDefautPageComponent } from './component/angular-defaut-page/angular-defaut-page.component';
import { ClientEditComponent } from './component/client-edit/client-edit.component';
import {ClientListComponent} from './component/client-list/client-list.component';
import { Error404Component } from './component/error404/error404.component';
import {LoginComponent} from './component/login/login.component';

const routes: Routes = [
    {path: '', component: AngularDefautPageComponent},
    {path: 'Client', children: [
        {path: '' ,component: ClientListComponent,data: { animationState: 'One' }},
        {path: ':id' ,component: ClientEditComponent, data: { animationState: 'Two' }},
      ]
    },
    {path: 'Error', children: [
      {path: '404' ,component: Error404Component},
    ]
  },
    {path: 'Login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
