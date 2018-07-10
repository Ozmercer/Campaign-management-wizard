import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
    stages: string[];
    subscription: Subscription;
    currPage: number = null

  constructor(private campaginService: CampaignService,
              private router: Router) { }

  ngOnInit() {
      this.stages = this.campaginService.stages;
      this.subscription = this.campaginService.campaignPage
        .subscribe(
            (page: number) => {
                this.currPage = page;
            }
        )
  }

  changePage(idx) {
    this.router.navigate([`/campaign-wizard/${this.campaginService.stages[idx]}`])
  }
}
