import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DesignService } from './common/design.service';
import { AppRouterModule } from './app.router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './navbar/navbar.component';
import { StepOneComponent } from './stepOne/step1.component';
import { StepTwoComponent } from './stepTwo/step2.component';
import {MatStepperModule} from '@angular/material/stepper';
import { StepThreeComponent } from './stepThree/step3.component';
import { SecondScreenComponent } from './secondScreen/secondScreen.component';
import { MatButtonModule } from '@angular/material/button';
import { SecondNavBarComponent } from './secondNavBar/secondNavBar.component';
import { MatFormFieldModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    NavComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    SecondScreenComponent,
    SecondNavBarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    HttpModule,
    AppRouterModule,
    MatCheckboxModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [DesignService],
  bootstrap: [AppComponent]
})
export class AppModule { }
