import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { HomeComponent } from './home/home.component';

const ROUTES : Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'dashboard', component: DashboardComponent
    },
    {
        path: '**', redirectTo: 'home', pathMatch: 'full'
    }
]
@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRouterModule{
    
}