import { Component, OnInit, OnDestroy } from '@angular/core';
import { CampaignService } from './campaign.service';

@Component({
  selector: 'app-campaign-wizard',
  templateUrl: './campaign-wizard.component.html',
  styleUrls: ['./campaign-wizard.component.scss']
})
export class CampaignWizardComponent implements OnDestroy {

  constructor(private campaignService: CampaignService) { }

  ngOnDestroy() {
      this.campaignService.buildMode = false;
      this.campaignService.editMode = false;
  }
}
