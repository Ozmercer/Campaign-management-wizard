import { Component, OnInit, OnDestroy, NgModule } from "@angular/core";
import { CampaignService } from "../campaign.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    imports:[MatSelectModule]
})

@Component({
  selector: "app-segment",
  templateUrl: "./segment.component.html",
  styleUrls: ["./segment.component.scss"]
})
export class SegmentComponent implements OnInit, OnDestroy {
  campaignSegment: FormGroup;
  devices: string[] = [];
  subscription: Subscription;
  deviceItems = ['desktop', 'mobile', 'tablet']

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.campaignService.changePage(1);
    if (this.campaignService.buildMode) {
        this.devices = this.campaignService.campaignData.devices
    }
    this.campaignSegment = new FormGroup({
      devices: new FormControl(this.devices, Validators.required)
    });
    this.subscription = this.campaignService.submitForm.subscribe(
        () => {
            this.onSubmit()
        }
    )
  }

  onSubmit() {
    this.devices = this.campaignSegment.get("devices").value;
    this.campaignService.saveDevices(this.devices)
  }

  ngOnDestroy() {
      this.subscription.unsubscribe()
  }
}
