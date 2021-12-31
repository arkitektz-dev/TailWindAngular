import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '../app/post/index/index.component';
import { ViewComponent } from '../app/post/view/view.component';
import { CreateComponent } from '../app/post/create/create.component';
import { EditComponent } from '../app/post/edit/edit.component';

const routes: Routes = [ 
  { path: 'post', redirectTo: 'post/index', pathMatch: 'full'},
  { path: 'post/index', component: IndexComponent },
  { path: 'post/:postId/view', component: ViewComponent },
  { path: 'post/create', component: CreateComponent },
  { path: '',   redirectTo: '/post/index', pathMatch: 'full' },
  { path: 'post/:postId/edit', component: CreateComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
   