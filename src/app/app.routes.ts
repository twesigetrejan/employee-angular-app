import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employee } from './pages/employee/employee';
import { Projects } from './pages/projects/projects';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,

  },
  {
    path: '',
    component: Layout,
    children:[
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path : "employee",
        component : Employee
      },
      {
        path : "projects",
        component : Projects
      }

    ]

  }
];
