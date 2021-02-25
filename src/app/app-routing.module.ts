import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'history', loadChildren: './history/history.module#HistoryPageModule' },
  { path: 'camt', loadChildren: './camt/camt.module#CamtPageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'Cdetails', loadChildren: './details/details.module#DetailsPageModule' },
  { path: 'details', loadChildren: './camt/details/details.module#DetailsPageModule' },
  { path: 'refresh', loadChildren: './refresh/refresh.module#RefreshPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
