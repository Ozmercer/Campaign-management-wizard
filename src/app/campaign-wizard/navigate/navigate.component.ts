import { Component, OnInit, Input } from "@angular/core";
import { CampaignService } from "../campaign.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navigate",
  templateUrl: "./navigate.component.html",
  styleUrls: ["./navigate.component.scss"]
})
export class NavigateComponent implements OnInit {
  @Input() validForm: boolean;
  @Input() currPage: number;

  totalPages: number;

  constructor(
    private campaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit() {
    this.totalPages = this.campaignService.stages.length - 1;
    this.campaignService.campaignPage.subscribe(
      currPage => (this.currPage = currPage)
    );
  }

  prevPage() {
    this.campaignService.submitForm.next();
    this.router.navigate([
      "/campaign-wizard/" + this.campaignService.stages[this.currPage - 1]
    ]);
  }

  nextPage() {
    this.campaignService.submitForm.next();
    this.router.navigate([
      "/campaign-wizard/" + this.campaignService.stages[this.currPage + 1]
    ]);
  }

  onSubmit() {
    this.campaignService.storeData();
  }
}
