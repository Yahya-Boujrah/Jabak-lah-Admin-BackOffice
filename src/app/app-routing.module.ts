import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AgentsComponent } from './components/agents/agents.component';
import { AdminInfosComponent } from './components/admin-infos/admin-infos.component';
import { ClientsComponent } from './components/clients/clients.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ChangePwdComponent } from './components/change-pwd/change-pwd.component';
import { AuthGuard } from './auth-guard.guard';

const routes: Routes = [
  {
    path:'', component: LoginComponent
  },
  {
    path:'', canActivate: [AuthGuard], children: [
      {
        path:'navigation', component: NavigationComponent,children: [
          {
            path:'', component: HomeComponent
          },
          {
            path:'agents', component: AgentsComponent,
          },
          {
            path:'clients', component: ClientsComponent
          },
          {
            path:'info', component:AdminInfosComponent
          },
          {
            path:'change-pwd', component: ChangePwdComponent
          }
        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
