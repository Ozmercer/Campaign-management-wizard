import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CampaignWizardComponent } from './campaign-wizard/campaign-wizard.component';
import { ProgressComponent } from './campaign-wizard/progress/progress.component';
import { CampaignFormComponent } from './campaign-wizard/campaign-form/campaign-form.component';
import { NavigateComponent } from './campaign-wizard/navigate/navigate.component';
import { CampaignService } from './campaign-wizard/campaign.service';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { SegmentComponent } from './campaign-wizard/segment/segment.component';
import { SummaryComponent } from './campaign-wizard/summary/summary.component';
import { CampaignsListComponent } from './campaigns-list/campaigns-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    CampaignWizardComponent,
    ProgressComponent,
    CampaignFormComponent,
    NavigateComponent,
    SignupComponent,
    SegmentComponent,
    SummaryComponent,
    CampaignsListComponent,
],
imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CampaignService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
