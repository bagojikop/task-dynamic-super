import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AddItemComponent } from './component/add-item/add-item.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'addItem',
    component: AddItemComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
