import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { CampaignData } from '../campaign-data.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
    campaignData: CampaignData = {
        name: '',
        budget: 0,
        bid: 0,
        start: '',
        end: '',
        devices: []
      };
      devicesToShow: string;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.campaignService.changePage(2);
    if (this.campaignService.buildMode) {
        this.campaignData = this.campaignService.getData();
        this.devicesToShow = this.campaignData.devices ? this.campaignData.devices.join(', ') : '';
    }    
  }

}
