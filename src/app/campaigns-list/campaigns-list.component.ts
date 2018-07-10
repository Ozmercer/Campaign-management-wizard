import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign-wizard/campaign.service';
import * as moment from 'moment'
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss']
})
export class CampaignsListComponent implements OnInit {
    campaigns: {};

  constructor(private campignService: CampaignService,
              private router: Router) { }

  ngOnInit() {
    this.campignService.getDataAsync().subscribe(
        (campaigns) => {
            this.campaigns = Object.values(campaigns);
            console.log(moment('2018-08-09').format('MMM Do, YYYY'));
        }
    )
  }

  editCampaign(idx) {
    this.campignService.campaignData = this.campaigns[idx];
    this.campignService.originalName = this.campaigns[idx].name;
    this.campignService.editMode = true;
    this.campignService.buildMode = true;
    this.router.navigate(['/campaign-wizard/targeting']);
  }
}
