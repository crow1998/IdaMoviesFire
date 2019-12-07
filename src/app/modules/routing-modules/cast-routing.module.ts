import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CastProfileComponent } from 'src/app/components/movies/cast-profile/cast-profile.component';

const routes: Routes = [
  { path: ':id', component: CastProfileComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CastRoutingModule { }
