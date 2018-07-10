import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "../../node_modules/@angular/core";
import { LoginComponent } from "./auth/login/login.component";
import { CampaignWizardComponent } from "./campaign-wizard/campaign-wizard.component";
import { CampaignFormComponent } from "./campaign-wizard/campaign-form/campaign-form.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SegmentComponent } from "./campaign-wizard/segment/segment.component";
import { SummaryComponent } from "./campaign-wizard/summary/summary.component";
import { CampaignsListComponent } from "./campaigns-list/campaigns-list.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'campaign-wizard', component: CampaignWizardComponent, children: [
        {path: 'targeting', component: CampaignFormComponent},
        {path: 'segment', component: SegmentComponent},
        {path: 'summary', component: SummaryComponent},
    ]},
    { path: 'campaign-list', component: CampaignsListComponent},
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
      ],
      exports: [RouterModule]
})

export class AppRoutingModule {

}